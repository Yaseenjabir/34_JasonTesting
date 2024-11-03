import { useRef, useState } from "react";
import { app } from "../../../../../firebasedatabase/firebase";
import {
  collection,
  addDoc,
  getFirestore,
  doc,
  setDoc,
} from "firebase/firestore";

import { BsArrowClockwise } from "react-icons/bs";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useTheme } from "@mui/material/styles";

import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SnackbarComp from "./Snackbar";

export default function AddCategory() {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [loader, setLoader] = useState(false);

  const [open, setOpen] = useState(false);

  const [imageErrorText, setImageErrorText] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [responseText, setResponseText] = useState();
  const snackBarRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const storage = getStorage(app);
  const firestore = getFirestore(app);
  const onSubmit = async (data) => {
    if (!file) {
      setImageErrorText("Please select an image");
      handleOpen();
      return;
    }
    try {
      setLoader(true);

      const storageRef = ref(
        storage,
        `categories/${data.categoryName}/coverImage.jpg`
      );
      await uploadBytes(storageRef, file);
      const imageURL = await getDownloadURL(storageRef);

      const categoryRef = doc(
        collection(firestore, "categories"),
        data.categoryName
      );

      const dataToInsert = {
        title: data.categoryName.trim(),
        craftWork: data.craftWork.trim(),
        CanvasSize: data.canvasSize.trim(),
        description: data.description.trim(),
        postLength: 0,
        image: imageURL,
      };

      await setDoc(categoryRef, dataToInsert);

      setResponseText("Category create successfully");
      snackBarRef.current?.click();
      setTimeout(() => {
        location.reload();
      }, 2000);
    } catch (error) {
      const errorMessage = error.message || "An unknown error occurred";
      setResponseText(errorMessage);
      snackBarRef.current?.click();
    } finally {
      setLoader(false);
    }
  };

  // onSubmit copy
  // const onSubmit = async (data) => {
  //   if (!file) {
  //     setImageErrorText("Please select an image");
  //     handleOpen();
  //     return;
  //   }
  //   try {
  //     setLoader(true);
  //     const storage = getStorage(app);
  //     const imgRef = ref(storage, `categories/${data.categoryName}`);
  //     await uploadBytes(imgRef, file);
  //     const imageURL = await getDownloadURL(imgRef);

  //     const firestore = getFirestore(app);
  //     const docRef = await addDoc(collection(firestore, "categories"), {
  //       name: data.categoryName.trim(),
  //       craftWork: data.craftWork.trim(),
  //       CanvasSize: data.canvasSize.trim(),
  //       description: data.description.trim(),
  //       image: imageURL,
  //       postLength: 0,
  //     }).then(() => {
  //       setResponseText("Category create successfully");
  //       snackBarRef.current?.click();
  //       setTimeout(() => {
  //         location.reload();
  //       }, 2000);
  //     });
  //   } catch (error) {
  //     const errorMessage = error.message || "An unknown error occurred";
  //     setResponseText(errorMessage);
  //     snackBarRef.current?.click();
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    maxWidth: 400,
    bgcolor: "background.paper",
    border: "1px solid #00000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full px-2 lg:py-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${isDarkMode ? "bg-[#191919]" : "bg-slate-50"} drop-shadow-xl py-5 max-w-[500px] w-full px-4 rounded-lg gap-4 flex items-start justify-center flex-col`}
        >
          <div>
            <h1 className="text-xl font-bold">Add Category</h1>
            <p>Please fill the form to add new category</p>
          </div>
          <div className="flex flex-col w-full">
            <TextField
              fullWidth
              label="Category Name *"
              id="categoryName"
              placeholder="Enter category name"
              helperText={
                errors.categoryName
                  ? errors.categoryName.message
                  : "Please enter your category name"
              }
              error={!!errors.categoryName}
              {...register("categoryName", {
                required: "Category name cannot be empty",
                minLength: {
                  value: 5,
                  message: "Category name cannot be less than 5 characters",
                },
              })}
            />
          </div>
          <div className="flex flex-col w-full">
            <TextField
              fullWidth
              label="Craft Work"
              id="craftWork"
              placeholder="Enter craft work"
              error={!!errors.craftWork}
              helperText={
                errors.craftWork
                  ? "Craft work must be at least 10 characters long"
                  : "Please enter your craft work"
              }
              {...register("craftWork", {
                minLength: {
                  value: 10,
                },
              })}
            />
          </div>
          <div className="flex flex-col w-full">
            <TextField
              fullWidth
              label="Canvas Size"
              id="canvasSize"
              placeholder="Enter canvas size"
              error={!!errors.canvasSize}
              helperText={
                errors.canvasSize
                  ? errors.canvasSize.message
                  : "Please enter your canvas size"
              }
              {...register("canvasSize", {
                minLength: {
                  value: 10,
                  message: "Canvas size must be at least 10 characters long",
                },
              })}
            />
          </div>
          <div className="flex flex-col w-full">
            <TextField
              id="categoryDesc"
              label="Description"
              multiline
              rows={6}
              placeholder="Enter category description..."
              variant="outlined"
              fullWidth
              error={!!errors.description}
              helperText={
                errors.description
                  ? errors.description.message
                  : "Please enter description"
              }
              {...register("description", {
                minLength: {
                  value: 20,
                  message: "Description must be at least 20 characters long",
                },
              })}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="image"
              className="font-medium text-sm text-gray-300 px-2 mb-2"
            >
              Category Pic (*)
            </label>
            <Button fullWidth variant="outlined" component="label">
              Upload Image
              <input
                type="file"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    if (!file.type.startsWith("image/")) {
                      setImageErrorText(
                        "Please upload a valid image file (e.g., .jpg, .png, .gif)."
                      );
                      handleOpen();
                      return;
                    }
                    setFile(file);
                    setImage(URL.createObjectURL(file));
                  }
                }}
              />
            </Button>
            {image && (
              <Box mt={2}>
                {image && (
                  <p className="text-sm text-gray-300 text-center">
                    Image Preview
                  </p>
                )}

                <img src={image} alt="Selected" className="w-[200px] mx-auto" />
              </Box>
            )}
          </div>
          {loader ? (
            <button
              type="submit"
              className="bg-blue-500 px-2 py-1 my-2 rounded-md w-full font-medium text-white text-lg hover:bg-transparent hover:text-blue-500 hover:border-blue-500 border border-blue-500 transition-all ease-in-out duration-300 flex items-center justify-center gap-2"
            >
              <BsArrowClockwise className="text-2xl animate-spin" />
              Please wait
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 px-2 py-1 my-2 rounded-md w-full font-medium text-white text-lg hover:bg-transparent hover:text-blue-500 hover:border-blue-500 border border-blue-500 transition-all ease-in-out duration-300"
            >
              Submit
            </button>
          )}
        </form>
        {/*..................... Modal start .....................  */}
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-description">
                {imageErrorText}
              </Typography>
            </Box>
          </Modal>
        </div>
        {/*..................... Modal end .....................  */}
        <SnackbarComp responseText={responseText} snackBarRef={snackBarRef} />
      </div>
    </>
  );
}

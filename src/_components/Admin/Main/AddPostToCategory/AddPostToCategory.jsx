import {
  addDoc,
  collection,
  doc,
  getFirestore,
  increment,
  updateDoc,
} from "firebase/firestore";
import { app } from "../../../../../firebasedatabase/firebase";
import { useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { BsArrowClockwise } from "react-icons/bs";
import { nanoid } from "nanoid";

import { useTheme } from "@mui/material/styles";
import SelectOption from "./SelectOption";
import { Button, Modal, TextField, Typography, Box } from "@mui/material";

export default function AddPostToCategory() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [file, setFile] = useState();

  const [category, setCategory] = useState();

  const [loader, setLoader] = useState(false);

  console.log(category);

  const [categoryId, setCategoryId] = useState();

  const titleRef = useRef();
  const [modalMsg, setModalMsg] = useState("");
  const [image, setImage] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);

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

  const db = getFirestore(app);
  const storage = getStorage(app);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!file || !category) {
      setModalMsg("⚠ Mandatory fields cannot be empty");
      handleOpen();
      return;
    }

    const combineId = nanoid();

    try {
      setLoader(true);

      const categoryRef = doc(db, `categories/${category}`);
      await updateDoc(categoryRef, { postLength: increment(1) });

      const imgRef = ref(
        storage,
        `categories/${category}/posts/${titleRef.current?.value.trim() || combineId}`
      );
      await uploadBytes(imgRef, file);
      const imageURL = await getDownloadURL(imgRef);

      const postData = {
        title: titleRef.current?.value.trim() || "",
        image: imageURL,
        combineId: titleRef.current?.value.trim() || combineId,
      };

      const postRef = collection(db, `categories/${category}/posts`);
      await addDoc(postRef, postData);

      await clearAllCaches();
      setModalMsg("✅ Post added succesfully");
      handleOpen();
    } catch (error) {
      const errorMsg = `⛔${error.message}` || "Unknow error occurred";
      setModalMsg(errorMsg);
      handleOpen();
    } finally {
      setLoader(false);
    }
  }

  async function clearAllCaches() {
    const cacheNames = await caches.keys();

    console.log(cacheNames);

    await Promise.all(
      cacheNames.map(async (cacheName) => {
        return caches.delete(cacheName);
      })
    );

    console.log("All caches cleared!");
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full min-h-screen px-3">
        <form
          onSubmit={handleSubmit}
          className={`${isDarkMode ? "bg-[#191919]" : "bg-slate-50"} drop-shadow-xl py-5 max-w-[500px] w-full px-4 rounded-lg gap-4 flex items-start justify-center flex-col`}
        >
          <div>
            <h1 className="text-xl font-medium mb-3">Add post to category</h1>
            <p>Enter post and add into a category</p>
          </div>
          <div className="w-full">
            <label htmlFor="selectCategory" className="font-medium">
              Select Category *
            </label>
            <SelectOption
              setCategoryId={setCategoryId}
              setCategory={setCategory}
              category={category}
            />
          </div>

          <div className="w-full">
            <label htmlFor="selectCategory" className="font-medium">
              Enter Post Title (Optional)
            </label>

            <TextField
              fullWidth
              inputRef={titleRef}
              label="Post title"
              id="categoryName"
              placeholder="Enter post title"
              helperText={"Please enter title of your post"}
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="image"
              className="font-medium  text-gray-300 px-2 mb-2"
            >
              Category Pic *
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
                      setModalMsg(
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
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-description">{modalMsg}</Typography>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
}

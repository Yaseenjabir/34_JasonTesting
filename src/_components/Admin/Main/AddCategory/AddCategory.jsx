import { useRef, useState } from "react";
import { app } from "../../../../../firebasedatabase/firebase";
import { collection, addDoc, getFirestore } from "firebase/firestore";

import { BsArrowClockwise } from "react-icons/bs";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export default function AddCategory() {
  const categoryNameRef = useRef();

  const descriptionRef = useRef();

  const craftWorkRef = useRef();

  const canvasRef = useRef();

  const [file, setFile] = useState();

  const [loader, setLoader] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("FUNC CALLED");
    if (!categoryNameRef.current?.value || !file) {
      alert("Mandatory fields cannot be empty");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (e.g., .jpg, .png, .gif).");
      return;
    }

    try {
      setLoader(true);
      const storage = getStorage(app);
      const imgRef = ref(
        storage,
        `categories/${categoryNameRef.current?.value}`
      );
      await uploadBytes(imgRef, file);
      const imageURL = await getDownloadURL(imgRef);

      const firestore = getFirestore(app);
      const docRef = await addDoc(collection(firestore, "categories"), {
        name: categoryNameRef.current?.value.trim(),
        craftWork: craftWorkRef.current?.value.trim(),
        CanvasSize: canvasRef.current?.value.trim(),
        description: descriptionRef.current?.value.trim(),
        image: imageURL,
        postLength: 0,
      }).then(() => {
        alert("Category Created");
        location.reload();
      });
    } catch (error) {
      alert(error);
      console.log("ERROR OCCUED");
    } finally {
      setLoader(false);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full px-5 lg:py-10">
        <h1 className="text-xl font-medium mb-5">Add Category</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 py-5 max-w-[500px] w-full px-5 rounded-lg gap-2 flex items-start justify-center flex-col"
        >
          <div className="flex flex-col w-full">
            <label htmlFor="categoryName" className="font-medium px-2">
              Category Name (Mandatory)
            </label>
            <input
              id="categoryName"
              ref={categoryNameRef}
              type="text"
              placeholder="Enter Category Name"
              className="border outline-none py-2 bg-white px-2 rounded-full w-full"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="craftWork" className="font-medium px-2">
              Craft Work (Optional)
            </label>
            <input
              id="craftWork"
              ref={craftWorkRef}
              type="text"
              placeholder="Enter Craft Work"
              className="border outline-none py-2 bg-white px-2 rounded-full w-full"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="canvasSize" className="font-medium px-2">
              Canvas Size (Optional)
            </label>
            <input
              id="canvasSize"
              ref={canvasRef}
              type="text"
              placeholder="Enter Canvas Size"
              className="border outline-none py-2 bg-white px-2 rounded-full w-full"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="categoryDesc" className="font-medium px-2">
              Category Description (Optional)
            </label>
            <textarea
              id="categoryDesc"
              ref={descriptionRef}
              type="text"
              rows={10}
              placeholder="Enter Category Description"
              className="border outline-none py-2 px-2 rounded-md w-full"
            ></textarea>
          </div>
          <div>
            <label htmlFor="image" className="font-medium px-2">
              Category Pic (Mandatory)
            </label>
            <input
              id="image"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="border bg-white outline-none py-2 px-2 rounded-full w-full"
            />
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
      </div>
    </>
  );
}

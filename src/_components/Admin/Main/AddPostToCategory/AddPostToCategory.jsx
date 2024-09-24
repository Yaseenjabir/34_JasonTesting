import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  increment,
  updateDoc,
} from "firebase/firestore";
import { app } from "../../../../../firebasedatabase/firebase";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { BsArrowClockwise } from "react-icons/bs";
import { nanoid } from "nanoid";

export default function AddPostToCategory() {
  const [file, setFile] = useState();

  const [category, setCategory] = useState();

  const [loader, setLoader] = useState(false);

  const [categoryId, setCategoryId] = useState();

  const titleRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file || !category) {
      alert("Mandatory fields cannot be empty");
      return;
    }
    try {
      setLoader(true);
      const firestore = getFirestore(app);

      const docRef1 = doc(firestore, "categories", categoryId);
      await updateDoc(docRef1, {
        postLength: increment(1),
      });

      const storage = getStorage(app);
      const imgRef = ref(storage, `${category}Posts/${nanoid()}`);
      await uploadBytes(imgRef, file);
      const imageURL = await getDownloadURL(imgRef);

      const docRef2 = await addDoc(collection(firestore, `${category}`), {
        title: titleRef.current?.value.trim(),
        image: imageURL,
      }).then(() => {
        alert(`Post added to ${category}`);
        location.reload();
      });
    } catch (error) {
      alert(error);
    } finally {
      setLoader(false);
    }
  }

  const [data, setData] = useState();

  console.log(data);

  const fetchData = async () => {
    const firestore = getFirestore(app);
    const collectionRef = collection(firestore, "categories");
    const snapshot = await getDocs(collectionRef);
    const data = snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full min-h-screen px-5">
        <h1 className="text-xl font-medium mb-5">Add post to category</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 py-5 max-w-[500px] w-full px-5 rounded-lg gap-5 flex items-start justify-center flex-col"
        >
          <div>
            <label htmlFor="selectCategory" className="font-medium px-2">
              Select Category (Mandatory)
            </label>
            <select
              id="selectCategory"
              className="w-full py-2 px-3 rounded-full"
              onChange={(e) => {
                const selectedCategory = e.target.value;
                setCategory(selectedCategory);
                const selectedItem = data.find(
                  (item) => item.name === selectedCategory
                );
                if (selectedItem) {
                  setCategoryId(selectedItem.id);
                }
              }}
            >
              <option selected disabled>
                Select Category below
              </option>
              {data &&
                data.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label htmlFor="selectCategory" className="font-medium px-2">
              Enter Post Title (Optional)
            </label>
            <input
              ref={titleRef}
              type="text"
              placeholder="Enter Post Title"
              className="border outline-none py-2 bg-white px-2 rounded-full w-full"
            />
          </div>

          <div>
            <label htmlFor="selectCategory" className="font-medium px-2">
              Choose Image (Mandatory)
            </label>
            <input
              className="border bg-white outline-none py-2 px-2 rounded-full w-full"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
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

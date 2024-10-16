import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../../../../firebasedatabase/firebase";
import { useEffect, useState } from "react";

export default function DeleteCategory() {
  const [data, setData] = useState();

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
  const handleSubmit = () => {};

  return (
    <>
      <section className="flex flex-col items-center justify-center w-full min-h-screen px-5">
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
        </form>
      </section>
    </>
  );
}

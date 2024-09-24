import { collection, getDocs, getFirestore } from "firebase/firestore";
import { MyContext } from "../../../../context-Api/ContextAPI";
import AnimateOnClose from "../../../../framer-motion/AnimateOnClose";
import { useContext, useEffect, useState } from "react";
import { app } from "../../../../firebasedatabase/firebase";
import { useParams } from "react-router";
import NotFoundPage from "../404 Page/NotFoundPage";

export default function ReusableComp() {
  const { closeAnimation } = useContext(MyContext);

  const { category } = useParams();

  const [categoryData, setCategoryData] = useState([]);

  const decodedCategory = decodeURIComponent(category.replace(/-/g, " "));

  const [posts, setPosts] = useState([]);
  const [show404, setShow404] = useState(false);

  const singleData =
    categoryData && categoryData.find((item) => item.name === decodedCategory);

  async function fetchCategoryInfo() {
    const firestore = getFirestore(app);
    const collectionRef = collection(firestore, "categories");
    const snapshot = await getDocs(collectionRef);
    const data = snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));
    setCategoryData(data);
    if (!singleData) {
      setShow404(true);
    } else {
      setShow404(false);
    }
  }

  async function fetchCategoryPosts() {
    try {
      const firestore = getFirestore(app);
      const collectionRef = collection(firestore, decodedCategory);
      const snapshot = await getDocs(collectionRef);
      const data = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      setPosts(data);
    } catch (error) {
      alert(error);
    }
  }

  console.log(show404);

  useEffect(() => {
    fetchCategoryInfo();
    fetchCategoryPosts();
  }, [category, singleData]);

  return (
    <>
      <div
        id="category"
        style={{ backgroundImage: `url(${singleData?.image})` }}
        className="fixed top-0 left-0"
      ></div>
      <div
        id="category"
        className={`${!singleData ? "hidden" : "block"}`}
      ></div>

      {show404 ? (
        <NotFoundPage />
      ) : (
        <section className="relative z-10 bg-white w-full">
          <div className="w-full text-center px-5 py-10 max-w-[850px] mx-auto">
            <h1
              className="text-[30px] font-semibold sm:text-[40px] sm:font-bold md:text-[50px] lg:text-[55px] xl:text-[60px] mb-8"
              style={{ fontFamily: "Montserrat" }}
            >
              {singleData?.name}
            </h1>
            <p className="md:text-lg mb-2 lg:text-xl font-light sm:font-normal">
              {singleData?.craftWork && singleData.craftWork}
            </p>
            <p className="mb-5 md:text-lg lg:text-xl font-light sm:font-normal">
              {singleData?.CanvasSize && singleData.CanvasSize}
            </p>
            <p className=" leading-7 md:text-lg lg:text-xl font-light sm:font-normal">
              {singleData?.description}
            </p>
          </div>
          <div className="w-full">
            <div className="py-10 px-7 w-full sm:px-20 md:px-[120px] lg:px-[150px] xl:px-[250px]">
              <img
                className="w-full max-h-[900px]"
                src={singleData?.image}
                loading="lazy"
              />
            </div>
            {posts &&
              posts.map((item) => {
                return (
                  <>
                    <div
                      key={item.id}
                      className="py-10 px-7 w-full sm:px-20 md:px-[120px] lg:px-[150px] xl:px-[250px]"
                    >
                      <img
                        className="w-full max-h-[900px]"
                        src={item.image}
                        loading="lazy"
                      />
                      <p
                        className="mt-2 text-[14px] text-gray-600"
                        style={{ fontFamily: "sans-serif" }}
                      >
                        {item.title}
                      </p>
                    </div>
                  </>
                );
              })}
          </div>
        </section>
      )}

      {closeAnimation && <AnimateOnClose />}
    </>
  );
}

import { nanoid } from "nanoid";
import { useNavigate } from "react-router";
import AnimateOnRender from "../../../framer-motion/AnimateOnRender";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../../context-Api/ContextAPI";
import AnimateOnClose from "../../../framer-motion/AnimateOnClose";
import EntranceAnimation from "../../../framer-motion/EntranceAnimation";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../../firebasedatabase/firebase";
export default function MainComp() {
  const navigate = useNavigate();

  const { closeAnimation } = useContext(MyContext);

  const { setCloseAnimation } = useContext(MyContext);

  const [categoryData, setCategoryData] = useState([]);

  async function fetchCategoryInfo() {
    const firestore = getFirestore(app);
    const collectionRef = collection(firestore, "categories");
    const snapshot = await getDocs(collectionRef);
    const data = snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));
    setCategoryData(data);
  }
  useEffect(() => {
    fetchCategoryInfo();
  }, []);

  const [showAnimateOnRender, setShowAnimateOnRender] = useState(false);

  const [entranceAnimate, setEntranceAnimate] = useState(true);

  useEffect(() => {
    const entranceTimer = setTimeout(() => {
      setEntranceAnimate(false);
    }, 4200);
    const renderAnimateTimer = setTimeout(() => {
      setShowAnimateOnRender(true);
    }, 2500);

    return () => {
      clearTimeout(entranceTimer);
      clearTimeout(renderAnimateTimer);
    };
  }, []);

  async function handleDynamicNavigation(link) {
    console.log(link);
    setCloseAnimation(true);
    setTimeout(() => {
      navigate(link);
      setCloseAnimation(false);
    }, 2500);
  }

  const desiredOrder = [
    "Self-portraits",
    "Transcendence",
    "Father with his Father",
    "We both liked cars, my dad said about his dad",
    "Look at me, look at me",
    "Peace and Prosperity",
    "He loves you a lot, my mom says to me",
  ];

  const sortedData = categoryData.sort((a, b) => {
    const indexA = desiredOrder.indexOf(a.id.trim());
    const indexB = desiredOrder.indexOf(b.id.trim());

    const adjustedIndexA = indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA;
    const adjustedIndexB = indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB;

    return adjustedIndexA - adjustedIndexB;
  });

  console.log("Sorted data : ", sortedData);

  return (
    <>
      {entranceAnimate && <EntranceAnimation />}

      {showAnimateOnRender && <AnimateOnRender />}

      <main className="w-full px-5 mt-[85px]">
        <div className="flex flex-col gap-20">
          {sortedData.map((item, index) => {
            return (
              <>
                <div
                  onClick={() => handleDynamicNavigation(item.id)}
                  key={item.id}
                  className="w-full sm:px-[80px] md:px-[100px] lg:px-[180px] xl:px-[240px] cursor-pointer"
                >
                  <img
                    loading="lazy"
                    src={item.image}
                    className="w-full mx-auto"
                  />
                  <div className="flex justify-between w-full gap-1 mt-3 md:mt-5 items-center">
                    <span className="opacity-0"></span>
                    <h1
                      className="text-xl text-center max-w-[275px]"
                      style={{ fontFamily: "Montserrat", fontWeight: 600 }}
                    >
                      {item.id.toUpperCase()}
                    </h1>
                    <div className="relative w-[30px]">
                      <img
                        className="w-full"
                        src="https://www.jasonrevok.com/wp-content/themes/revok/assets/img/images-count.svg"
                      />
                      <h1 className="absolute top-[8px] right-[14px] font-semibold text-gray-800 text-[13px]">
                        {item.postLength}
                      </h1>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </main>

      {closeAnimation && <AnimateOnClose />}
    </>
  );
}

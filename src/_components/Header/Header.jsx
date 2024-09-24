import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router";
import { MyContext } from "../../../context-Api/ContextAPI";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../../firebasedatabase/firebase";
export default function Header() {
  const { setCloseAnimation } = useContext(MyContext);

  const location = useLocation();
  const { pathname } = location;

  const [top, setTop] = useState("top-[-120%]");
  const [direction, setDirection] = useState("down");
  const [visibility, setVisibility] = useState("opacity-1");

  const [showLogin, setShowLogin] = useState();

  useEffect(() => {
    const session = sessionStorage.getItem("admin");
    if (!session) {
      setShowLogin(true);
    }
  }, []);

  const handleClick = async () => {
    if (direction === "down") {
      setTop("top-[0%]");
      setVisibility("opacity-1");
      setDirection("up");
      setIsOpen(!isOpen);
    } else {
      setTop("top-[100%]");
      setDirection("down");
      setVisibility("opacity-0");
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    if (top === "top-[100%]") {
      setTimeout(() => {
        setTop("top-[-120%]");
        setVisibility("opacity-0");
      }, 1000);
    }
  }, [top]);

  const boldNavLin = [
    { name: "Profile", link: "/profile" },
    { name: "Work", link: "/" },
  ];

  const [animateIndex, setAnimateIndex] = useState(null);

  const [boldAnimateIndex, setBoldAnimateIndex] = useState(null);

  const navigate = useNavigate();

  const [data, setData] = useState([]);

  async function fetchData() {
    const firestore = getFirestore(app);
    const collectionRef = collection(firestore, "categories");
    const snapshot = await getDocs(collectionRef);
    const data = snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));
    setData(data);
  }

  const incomingOrder = data.map((item) => item.name.trim());

  const desiredOrder = [
    "Self-portraits",
    "Transcendence",
    "Father with his Father",
    "We both liked cars, my dad said about his dad",
    "Look at me, look at me",
    "Peace and Prosperity",
    "He loves you a lot, my mom says to me",
  ];

  const sortedOrder = incomingOrder.sort((a, b) => {
    const indexA = desiredOrder.indexOf(a);
    const indexB = desiredOrder.indexOf(b);

    const adjustedIndexA = indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA;
    const adjustedIndexB = indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB;

    return adjustedIndexA - adjustedIndexB;
  });

  useEffect(() => {
    fetchData();
  }, []);

  const handleDynamicNavigation = (link) => {
    setIsOpen(!isOpen);
    setCloseAnimation(true);
    setTop("top-[-120%]");
    setDirection("down");
    setVisibility("opacity-1");
    setTimeout(() => {
      navigate(`/${encodeURIComponent(link.replace(/ /g, "-"))}`);
      setCloseAnimation(false);
    }, 2500);
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`menu-btn ${isOpen ? "close" : ""} fixed top-5 right-5 z-50`}
        onClick={handleClick}
      >
        <div
          className={`btn-line ${
            pathname === "/profile" ? "bg-white" : "bg-black"
          }`}
        ></div>
        <div
          className={`btn-line ${
            pathname === "/profile" ? "bg-white" : "bg-black"
          }`}
        ></div>
        <div
          className={`btn-line ${
            pathname === "/profile" ? "bg-white" : "bg-black"
          }`}
        ></div>
      </div>

      <div
        className={`w-full bg-white fixed flex ${visibility} flex-col items-center justify-center left-0 transition-all ease-in-out duration-1000 ${top} z-40  h-[100vh]`}
      >
        <ul className="text-center flex flex-col items-center justify-center px-5">
          {boldNavLin.map((item, index) => {
            return (
              <>
                <li
                  onClick={() => {
                    setCloseAnimation(true);
                    setIsOpen(!isOpen);
                    setTop("top-[-120%]");
                    setDirection("down");
                    setVisibility("opacity-1");
                    setTimeout(() => {
                      navigate(item.link);
                      setCloseAnimation(false);
                    }, 2000);
                  }}
                  onMouseEnter={() => setBoldAnimateIndex(index)}
                  onMouseLeave={() => setBoldAnimateIndex(null)}
                  style={{ fontFamily: "Montserrat", fontWeight: 600 }}
                  className="text-2xl mb-2 max-w-min cursor-pointer"
                >
                  {item.name}
                  <div
                    className={`h-[1px] bg-black ${
                      boldAnimateIndex === index ? "w-full" : "w-0"
                    } mt-[2px] transition-all ease-in-out duration-500`}
                  ></div>
                </li>
              </>
            );
          })}

          {sortedOrder.map((item, index) => {
            return (
              <>
                <li
                  onClick={() => handleDynamicNavigation(item)}
                  style={{ fontFamily: "sans-serif" }}
                  key={index}
                  onMouseLeave={() => setAnimateIndex(null)}
                  onMouseEnter={() => setAnimateIndex(index)}
                  className="text-xl font-light my-1 cursor-pointer "
                >
                  {item}
                  <div
                    className={`h-[1px] bg-black ${
                      animateIndex === index ? "w-full" : "w-0"
                    } mt-[2px] transition-all ease-in-out duration-500`}
                  ></div>
                </li>
              </>
            );
          })}
        </ul>
        {showLogin ? (
          <button
            onClick={() => navigate("/login")}
            className="border-b text-blue-500 border-b-blue-500 mt-10"
          >
            Login
          </button>
        ) : (
          <button
            onClick={() => navigate("/admin")}
            className="border-b text-blue-500 border-b-blue-500 mt-10"
          >
            Dashboard
          </button>
        )}
      </div>
    </>
  );
}

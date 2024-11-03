import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { MyContext } from "../../../context-Api/ContextAPI";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../../firebasedatabase/firebase";

export default function Header() {
  const { setCloseAnimation } = useContext(MyContext);

  const location = useLocation();
  const { pathname } = location;

  const [loader, setLoader] = useState(false);

  const [top, setTop] = useState("top-[-120%]");
  const [direction, setDirection] = useState("down");
  const [visibility, setVisibility] = useState("opacity-1");

  const [click, setClick] = useState(true);

  const [showLogin, setShowLogin] = useState();

  useEffect(() => {
    const session = sessionStorage.getItem("admin");
    if (!session) {
      setShowLogin(true);
    }
  }, []);

  const handleClick = async () => {
    if (click) {
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
    }
  };

  useEffect(() => {
    if (top === "top-[100%]") {
      setClick(false);
      setTimeout(() => {
        setTop("top-[-120%]");
        setVisibility("opacity-0");
        setClick(true);
      }, 1000);
    }
  }, [top]);

  const boldNavLin = [
    { id: 1, name: "Profile", link: "/profile" },
    { id: 2, name: "Work", link: "/" },
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

  const incomingOrder = data.map((item) => item.id.trim());

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
      navigate(link);
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
              <li
                key={index}
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
            );
          })}

          {sortedOrder.map((item, index) => {
            return (
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
            );
          })}
        </ul>
        {showLogin ? (
          <>
            {loader ? (
              <div className="text-center">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setLoader(true);
                  setTimeout(() => {
                    navigate("/login");
                  }, 2000);
                }}
                className="border-b text-blue-500 border-b-blue-500 mt-10"
              >
                Login
              </button>
            )}
          </>
        ) : (
          <button
            onClick={() => navigate("/dashboard/category")}
            className="border-b text-blue-500 border-b-blue-500 mt-10"
          >
            Dashboard
          </button>
        )}
      </div>
    </>
  );
}

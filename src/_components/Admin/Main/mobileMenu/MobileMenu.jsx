import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
export default function MobileMenu({ setNav }) {
  const [top, setTop] = useState("top-[-120%]");
  const [direction, setDirection] = useState("down");
  const [visibility, setVisibility] = useState("opacity-1");

  const [boldAnimateIndex, setBoldAnimateIndex] = useState(null);

  const navigate = useNavigate();

  const handleClick = () => {
    if (direction === "down") {
      setTop("top-[0%]");
      setVisibility("opacity-1");
      setDirection("up");
    } else {
      setTop("top-[100%]");
      setDirection("down");
      setVisibility("opacity-0");
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
    { id: 1, name: "Add Category" },
    { id: 2, name: "Add Post" },
    { id: 3, name: "Delete Category" },
    { id: 4, name: "Home" },
  ];

  return (
    <>
      <header className="w-full lg:hidden border-b h-[70px] flex items-center justify-end px-5">
        <div
          onClick={handleClick}
          className="w-7 flex relative flex-col gap-[7px] before:absolute before:content-[''] before:w-full before:h-full before:top-0 before:left-0 before:cursor-pointer "
        >
          <hr className={"border border-black"} />
          <hr className={"border border-black"} />
          <hr className={"border border-black"} />
        </div>
        <div
          className={`w-full bg-white fixed flex ${visibility} flex-col items-center justify-center left-0 transition-all ease-in-out duration-1000 ${top} z-50  h-[100vh]`}
        >
          <ul className="text-center flex flex-col items-center justify-center">
            {boldNavLin.map((item, index) => {
              return (
                <>
                  <li
                    onClick={() => {
                      setTop("top-[-120%]");
                      setDirection("down");
                      setVisibility("opacity-1");
                      item.name === "Add Category"
                        ? setNav("addToCategory")
                        : item.name === "Delete Category"
                        ? setNav("deleteCategory")
                        : item.name === "Home"
                        ? navigate("/")
                        : setNav("addPostToCategory");
                    }}
                    onMouseEnter={() => setBoldAnimateIndex(index)}
                    onMouseLeave={() => setBoldAnimateIndex(null)}
                    style={{ fontFamily: "Montserrat", fontWeight: 600 }}
                    className="text-2xl mb-2 max-w-min text-nowrap cursor-pointer"
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
          </ul>
          <motion.div
            onClick={handleClick}
            initial={{ scale: 1 }}
            whileTap={{ scale: 0.5 }}
            transition={{ duration: 0.1 }}
            className="absolute top-5 right-5 cursor-pointer flex items-center justify-center"
          >
            <RxCross2 className="w-8 h-8 duration-300 ease-in-out transition-all" />
          </motion.div>
        </div>
      </header>
    </>
  );
}

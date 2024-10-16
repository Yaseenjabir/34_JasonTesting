import { IoIosAddCircleOutline } from "react-icons/io";
import { BiCategory } from "react-icons/bi";
import { useNavigate } from "react-router";
import { MdDelete, MdHome } from "react-icons/md";
export default function Sidebar({ setNav }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-[20%] hidden lg:flex border-r rounded-e-xl bg-blue-500 flex-col items-center justify-between py-20">
        <div className="flex flex-col items-center justify-center gap-2">
          <img
            src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726617600&semt=ais_hybrid"
            className="w-[80px] rounded-full"
            alt="profile"
          />
          <h1 className="text-white font-semibold text-xl">Hello Jason!</h1>
        </div>
        <div>
          <button
            onClick={() => navigate("/")}
            className="bg-white w-[190px] hover:bg-transparent text-blue-500 border border-blue-500 transition-all ease-in-out duration-300 hover:text-white hover:border-white hover:border flex items-center gap-2 text-start my-1 font-semibold px-3 py-1 rounded-md"
          >
            <MdHome />
            Home
          </button>
          <button
            onClick={() => setNav("addToCategory")}
            className="bg-white w-[190px] hover:bg-transparent text-blue-500 border border-blue-500 transition-all ease-in-out duration-300 hover:text-white hover:border-white hover:border flex items-center gap-2 text-start my-1 font-semibold px-3 py-1 rounded-md"
          >
            <IoIosAddCircleOutline />
            Add Category
          </button>
          <button
            onClick={() => setNav("addPost")}
            className="bg-white w-[190px] hover:bg-transparent text-blue-500 border border-blue-500 transition-all ease-in-out duration-300 hover:text-white hover:border-white hover:border flex items-center gap-2 text-start my-1 font-semibold px-3 py-1 rounded-md"
          >
            <BiCategory />
            Add Post
          </button>
          <button
            onClick={() => setNav("deleteCategory")}
            className="bg-white w-[190px] hover:bg-transparent text-blue-500 border border-blue-500 transition-all ease-in-out duration-300 hover:text-white hover:border-white hover:border flex items-center gap-2 text-start my-1 font-semibold px-3 py-1 rounded-md"
          >
            <MdDelete />
            Delete Categroy
          </button>
        </div>
        <div className="opacity-0">hidden</div>
      </div>
    </>
  );
}

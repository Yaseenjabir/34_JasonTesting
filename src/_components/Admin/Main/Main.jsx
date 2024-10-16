import AddCategory from "./AddCategory/AddCategory";
import AddPostToCategory from "./AddPostToCategory/AddPostToCategory";
import DeleteCategory from "./DeleteCategory/DeleteCategory";
import MobileMenu from "./mobileMenu/MobileMenu";

export default function Main({ nav, setNav }) {
  return (
    <>
      <div className=" w-full lg:w-[80%]">
        <MobileMenu setNav={setNav} />
        {nav === "addToCategory" ? (
          <AddCategory />
        ) : nav === "addPostToCategory" ? (
          <AddPostToCategory />
        ) : (
          <DeleteCategory />
        )}
      </div>
    </>
  );
}

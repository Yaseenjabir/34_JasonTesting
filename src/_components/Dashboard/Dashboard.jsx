import { AppProvider } from "@toolpad/core/react-router-dom";
import { Outlet } from "react-router-dom";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { AiOutlineFileAdd } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
export default function Dashboard() {
  const NAVIGATION = [
    {
      kind: "header",
      title: "Dashboard",
    },
    {
      segment: "dashboard/category",
      title: "Add Category",
      icon: <AiOutlineAppstoreAdd className="text-2xl" />,
    },
    {
      segment: "dashboard/post",
      title: "Add Post",
      icon: <AiOutlineFileAdd className="text-2xl" />,
    },
    {
      segment: "dashboard/delete",
      title: "Delete",
      icon: <MdDelete className="text-2xl" />,
    },
    {
      segment: "",
      title: "Home",
      icon: <IoMdHome className="text-2xl" />,
    },
  ];

  const BRANDING = {
    title: "Sehrish Hussain",
    logo: "",
  };

  return (
    <>
      <AppProvider navigation={NAVIGATION} branding={BRANDING}>
        <Outlet />
      </AppProvider>
    </>
  );
}

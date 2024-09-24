import { useEffect, useState } from "react";
import Main from "./Main/Main";
import Sidebar from "./sidebar/Sidebar";
import { useNavigate } from "react-router";

export default function Admin() {
  const [nav, setNav] = useState("addToCategory");

  const navigate = useNavigate();

  useEffect(() => {
    const session = sessionStorage.getItem("admin");
    if (!session) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <main className="w-full min-h-screen flex">
        <Sidebar setNav={setNav} />
        <Main nav={nav} setNav={setNav} />
      </main>
    </>
  );
}

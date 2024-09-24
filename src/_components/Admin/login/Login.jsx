import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import { LuLoader2 } from "react-icons/lu";

export default function Login() {
  const email = "admin@gmail.com";
  const password = "admin@1234";

  const emailRef = useRef();
  const passRef = useRef();

  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoader(true);
    if (!emailRef.current.value || !passRef.current.value) {
      alert("Please fill the form");
      return;
    }
    if (
      emailRef.current?.value === email &&
      passRef.current?.value === password
    ) {
      setTimeout(() => {
        alert("You are logged in");
        sessionStorage.setItem("admin", JSON.stringify(true));
        navigate("/admin");
        setLoader(false);
      }, 3000);
    } else {
      setTimeout(() => {
        alert("Invalid email or password");
        setLoader(false);
      }, 3000);
    }
  }

  useEffect(() => {
    const session = sessionStorage.getItem("admin");
    if (session) {
      navigate("/admin");
    }
  }, []);

  return (
    <>
      <section className="w-full h-screen flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex bg-gray-50 flex-col items-center justify-center gap-5 p-5 rounded-lg"
        >
          <h1 className="text-xl font-semibold">Login</h1>
          <input
            ref={emailRef}
            type="text"
            placeholder="Enter email here"
            className="border px-2 py-1 outline-none rounded-md"
          />
          <input
            ref={passRef}
            type="password"
            placeholder="Enter Password"
            className="border px-2 py-1 outline-none rounded-md"
          />
          {loader ? (
            <button
              className="w-full flex items-center justify-center gap-1 bg-blue-500 text-white py-2 rounded-full"
              type="submit"
            >
              <LuLoader2 className="text-xl mt-[2px] animate-spin" />
              Logging
            </button>
          ) : (
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-full"
              type="submit"
            >
              Submit
            </button>
          )}
        </form>
      </section>
    </>
  );
}

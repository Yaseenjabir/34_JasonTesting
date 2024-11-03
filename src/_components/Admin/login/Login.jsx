import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import CircularProgress from "@mui/material/CircularProgress";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function Login() {
  const email = "admin@gmail.com";
  const password = "admin@1234";

  const emailRef = useRef();
  const passRef = useRef();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);

  const [modalText, setModalText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setLoader(true);
    if (!emailRef.current.value || !passRef.current.value) {
      setModalText("Please enter email and password");
      handleOpen();
      return;
    }
    if (
      emailRef.current?.value === email &&
      passRef.current?.value === password
    ) {
      setTimeout(() => {
        setModalText("You are now logged in");
        handleOpen();
        sessionStorage.setItem("admin", JSON.stringify(true));
        setTimeout(() => {
          navigate("/dashboard/category");
          setLoader(false);
        }, 3000);
      }, 2000);
    } else {
      setTimeout(() => {
        setModalText("Email or password is invalid");
        handleOpen();
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-5">
        <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Login
          </h2>
          <form className="space-y-6">
            <div className="relative">
              <input
                ref={emailRef}
                type="email"
                id="email"
                name="email"
                className="block w-full px-4 py-2 mt-2 text-gray-900 bg-gray-200 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Email"
                required
              />
            </div>
            <div className="relative">
              <input
                ref={passRef}
                type="password"
                id="password"
                name="password"
                className="block w-full px-4 py-2 mt-2 text-gray-900 bg-gray-200 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Password"
                required
              />
            </div>
            <div>
              {loader ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-full px-4 py-2 font-semibold text-white bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Sign In
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description">{modalText}</Typography>
        </Box>
      </Modal>
    </>
  );
}

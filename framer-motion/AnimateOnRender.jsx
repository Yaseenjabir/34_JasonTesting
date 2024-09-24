import { motion } from "framer-motion";

export default function AnimateOnRender() {
  return (
    <>
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "100%" }}
        exit={{ x: "0%" }}
        transition={{ duration: 2, delay: 1.5 }}
        className="w-full fixed top-0 left-0 bg-white"
        style={{ height: "100vh", zIndex: 10000 }}
      ></motion.div>
    </>
  );
}

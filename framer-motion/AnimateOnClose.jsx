import { motion } from "framer-motion";

export default function AnimateOnClose() {
  return (
    <>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "-100%" }}
        transition={{ duration: 1, delay: 1 }}
        className="w-full fixed top-0 left-0 bg-white"
        style={{ height: "100vh", zIndex: 1000 }}
      ></motion.div>
    </>
  );
}

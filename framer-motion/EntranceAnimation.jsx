import { motion } from "framer-motion";
export default function EntranceAnimation() {
  return (
    <>
      <motion.div
        style={{ zIndex: 20000, height: "100vh" }}
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.5, delay: 2.7, ease: "easeInOut" }}
        className="w-full h-screen fixed top-0 left-0 bg-black flex flex-col items-center justify-center"
      >
        <div className="overflow-hidden relative">
          <h1 className="text-center text-white text-5xl font-bold whitespace-nowrap">
            Sehrish Hussain
          </h1>
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            transition={{ duration: 2.5 }}
            style={{ width: 350, height: 48 }}
            className="w-[50px] h-[48px] bg-black absolute top-0 left-0"
          ></motion.div>
        </div>
      </motion.div>
    </>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";

export default function ThankYou({
  disableScreen,
}: {
  disableScreen: () => void;
  position: any;
  setPosition: (position: any) => void;
  getRandomPosition: () => any;
}) {
  console.log(disableScreen);
  const colors = {
    background: "#FFF0F5",
    text: "#E32636",
    heart: "#FF597D",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full h-full grid place-items-center p-6 lg:p-0 overflow-hidden absolute top-0 left-0"
      style={{ backgroundColor: colors.background }}
    >
      <motion.div
        className="text-center space-y-6 flex flex-col justify-center items-center"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <img src="/image7.gif" alt="Cute gif" className="w-48 h-auto" />
        <motion.h1
          className="text-7xl font-bold mb-4"
          style={{ color: colors.text }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          YAAAY! 🎉
        </motion.h1>

        <motion.h1
          className="text-xl lg:text-3xl font-bold mb-4"
          style={{ color: colors.text }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          🎉 Yay! I knew it! 💕
        </motion.h1>
      </motion.div>
    </motion.div>
  );
}

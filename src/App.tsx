import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ThankYou from "./thank-you";
import { getRandomLine } from "./lines";
import confetti from "canvas-confetti";

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const [displayYesScreen, setDisplayYesScreen] = useState(false);
  const buttonSize = { width: 200, height: 100 };
  const [screenDisabled, setScreenDisabled] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");

  const disableScreen = () => {
    setScreenDisabled(false);
  };

  useEffect(() => {
    const updateBounds = () => {
      setBounds({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  const getRandomPosition = () => {
    const maxX = bounds.width - buttonSize.width - 40;
    const maxY = bounds.height - buttonSize.height - 40;
    const x = Math.random() * maxX - maxX / 2;
    const y = Math.random() * maxY - maxY / 2;
    return { x, y };
  };

  /* 🎆 Firework burst */
  const fireworkConfetti = () => {
    const duration = 2500;
    const end = Date.now() + duration;

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      if (Date.now() > end) return clearInterval(interval);

      confetti({
        particleCount: 90,
        startVelocity: 35,
        spread: 360,
        ticks: 70,
        gravity: 0.9,
        scalar: 1.2,
        zIndex: 9999,
        origin: {
          x: randomInRange(0.2, 0.8),
          y: Math.random() * 0.4,
        },
        colors: ["#ff4d6d", "#ff758f", "#ffd166", "#fff1c1"],
      });
    }, 300);
  };

  /* 💖 Heart rain */
  const heartConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 100,
      gravity: 0.6,
      scalar: 1.4,
      ticks: 200,
      shapes: ["square"],
      colors: ["#ff4d6d", "#ff85a1", "#ffc2d1"],
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden">
      <AnimatePresence mode="wait">
        {!displayYesScreen ? (
          <motion.div
            key="question"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#FFF0F5] w-full h-full grid place-items-center"
          >
            <img
              src="/image1.gif"
              alt="Cute gif"
              className="absolute top-10 left-1/2 -translate-x-1/2 w-48 h-auto"
            />
            {/* <img src="/image1.gif" alt="Cute gif" className="w-64 h-auto" /> */}
            <div className="space-y-10 lg:space-y-5">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl lg:text-5xl text-deep-red font-semibold text-center"
              >
               {name ? `${name}, ` : ""}Will you be my valentine?
              </motion.h1>

              <div className="flex items-center space-x-4 justify-center">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileTap={{ scale: 1.1 }}
                  onClick={() => {
                    fireworkConfetti();
                    setTimeout(heartConfetti, 600); // 💖
                    sessionStorage.setItem("message", getRandomLine());
                    setDisplayYesScreen(true);
                  }}
                  className="bg-light-coral text-creamy-white p-5 rounded-md font-semibold text-3xl"
                >
                  YES
                </motion.button>

                <motion.button
                  onHoverStart={() => setPosition(getRandomPosition())}
                  onTouchStart={() => setPosition(getRandomPosition())}
                  animate={position}
                  transition={{ type: "spring", stiffness: 100, damping: 10 }}
                  className="bg-red-600 text-creamy-white p-5 rounded-md font-semibold text-3xl"
                >
                  NO
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="thankyou"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute inset-0"
          >
            <ThankYou
              position={position}
              setPosition={setPosition}
              getRandomPosition={getRandomPosition}
              disableScreen={disableScreen}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {screenDisabled && (
        <button
          disabled={screenDisabled}
          className={`absolute inset-0 cursor-wait w-full h-full`}
        ></button>
      )}
    </div>
  );
}

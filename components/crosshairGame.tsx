/* eslint-disable @typescript-eslint/no-unused-vars  */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRef, useState, useEffect } from "react";
import Crosshair from "./Crosshair";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import confetti from "canvas-confetti";

const words = ['Quality', 'Firearms', 'for', 'Sports', 'Shooters'];

interface Word {
  id: number;
  word: string;
  x: number;
  y: number;
}

const HeroGame = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [heroWords, setHeroWords] = useState<Word[]>([]);
  const [fallingWords, setFallingWords] = useState<Word[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30); // 30 seconds
  const [showModal, setShowModal] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);

  const handleClickNew = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
 
    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;
 
    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();
 
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
 
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  }

  useEffect(() => {
    const initialWords = words.slice(0, 6).map((word, index) => ({
      id: index,
      word,
      x: 10 + index * 15,
      y: 50,
    }));
    setHeroWords(initialWords);
  }, []);

  useEffect(() => {
    if (!isGameActive) return;

    const interval = setInterval(() => {
      setFallingWords((prev) => [
        ...prev,
        {
          id: Date.now(),
          word: words[Math.floor(Math.random() * words.length)],
          x: Math.random() * 80,
          y: -50,
        },
      ]);
    }, 1000);

    const animate = () => {
      setFallingWords((prev) =>
        prev
          .map((word) => ({ ...word, y: word.y + 1 }))
          .filter((word) => word.y < 300)
      );
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
    return () => clearInterval(interval);
  }, [isGameActive]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsGameActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameActive, timeLeft, score]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isGameActive) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const hitTest = (el: HTMLElement | null) => {
      if (!el) return false;
      const wordRect = el.getBoundingClientRect();
      const wordX = wordRect.left - rect.left;
      const wordY = wordRect.top - rect.top;
      return (
        clickX >= wordX &&
        clickX <= wordX + wordRect.width &&
        clickY >= wordY &&
        clickY <= wordY + wordRect.height
      );
    };

    setHeroWords((prev) =>
      prev.filter((word) => {
        const el = document.getElementById(`hero-word-${word.id}`);
        if (hitTest(el)) {
          createSparkles(clickX, clickY);
          setScore((s) => s + 2);
          return false;
        }
        return true;
      })
    );

    setFallingWords((prev) =>
      prev.filter((word) => {
        const el = document.getElementById(`word-${word.id}`);
        if (hitTest(el)) {
          createSparkles(clickX, clickY);
          setScore((s) => s + 1);
          return false;
        }
        return true;
      })
    );
  };

  const createSparkles = (x: number, y: number) => {
    const sparkleContainer = document.createElement("div");
    sparkleContainer.style.position = "absolute";
    sparkleContainer.style.left = `${x}px`;
    sparkleContainer.style.top = `${y}px`;
    sparkleContainer.style.pointerEvents = "none";
    containerRef.current?.appendChild(sparkleContainer);

    for (let i = 0; i < 10; i++) {
      const sparkle = document.createElement("div");
      sparkle.style.position = "absolute";
      sparkle.style.width = "4px";
      sparkle.style.height = "4px";
      sparkle.style.backgroundColor = "#fff";
      sparkle.style.borderRadius = "50%";

      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 3;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      let posX = 0;
      let posY = 0;

      const animate = () => {
        posX += vx;
        posY += vy;
        sparkle.style.opacity = (1 - Math.sqrt(posX ** 2 + posY ** 2) / 100).toString();
        sparkle.style.transform = `translate(${posX}px, ${posY}px)`;

        if (Math.sqrt(posX ** 2 + posY ** 2) < 100) {
          requestAnimationFrame(animate);
        } else {
          sparkle.remove();
        }
      };

      sparkleContainer.appendChild(sparkle);
      requestAnimationFrame(animate);
    }

    setTimeout(() => sparkleContainer.remove(), 1000);
  };

  const startGame = () => {
    setIsGameActive(true);
    setTimeLeft(30);
    setScore(0);
    setHasWon(false);
    setShowModal(false);
  };

  return (
    <div className="font-sans overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none" />
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-[600px] flex flex-col items-center justify-center text-center relative z-10">
          <motion.h1
            className="text-4xl md:text-5xl font-bold tracking-tight mt-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-400 to-white drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Quality Firearms for Sports Shooters
          </motion.h1>

          <motion.button
            onClick={() => isGameActive ? setIsGameActive(false) : startGame()}
            className="mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-gray-100 via-white to-gray-100 text-black font-semibold shadow-xl hover:scale-105 transition"
            whileTap={{ scale: 0.95 }}
          >
            {isGameActive ? "Stop Game" : "Try A Game?"}
          </motion.button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 mt-12">
          <Image className="rounded-4xl p-4" src="/hero.jpg" width={600} height={600} alt="logo"/>
        </motion.div>
      </div>
      {isGameActive ? (
        <div
          className="relative h-[300px] cursor-crosshair"
          ref={containerRef}
          onClick={handleClick}
        >
          {isGameActive && <Crosshair containerRef={containerRef}  />}
          {fallingWords.map((word) => (
            <div
              key={word.id}
              id={`word-${word.id}`}
              className="absolute text-white text-xl font-bold pointer-events-none drop-shadow"
              style={{
                left: `${word.x}%`,
                top: `${word.y}px`,
                transform: "translateX(-50%)",
              }}
            >
              {word.word}
            </div>
          ))}
          {isGameActive && (
            <div className="absolute top-4 right-4  text-white text-xl font-bold z-20 flex gap-4">
              <div>Score: {score}</div>
              <div>Time: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default HeroGame;

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  messages: string[];
  onComplete: () => void;
  duration?: number;
}

export const LoadingScreen = ({
  messages,
  onComplete,
  duration = 3000,
}: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const messageInterval = duration / messages.length;
    const progressInterval = duration / 100;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 1;
      });
    }, progressInterval);

    const messageTimer = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        if (prev >= messages.length - 1) {
          clearInterval(messageTimer);
          return prev;
        }
        return prev + 1;
      });
    }, messageInterval);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration + 500);

    return () => {
      clearInterval(progressTimer);
      clearInterval(messageTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, messages.length, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-6"
    >
      {/* Animated loader */}
      <div className="relative w-24 h-24 mb-8">
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-muted"
          style={{ borderTopColor: "hsl(var(--primary))" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-4 border-muted"
          style={{ borderTopColor: "hsl(var(--secondary))" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-gradient">{progress}%</span>
        </div>
      </div>

      {/* Loading messages */}
      <motion.p
        key={currentMessageIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-lg text-muted-foreground text-center"
      >
        {messages[currentMessageIndex]}
      </motion.p>

      {/* Progress bar */}
      <div className="w-full max-w-xs mt-8">
        <div className="progress-bar h-2">
          <motion.div
            className="progress-bar-fill h-2"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

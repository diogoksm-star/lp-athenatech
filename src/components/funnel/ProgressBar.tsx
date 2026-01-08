import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <span>Etapa {currentStep} de {totalSteps}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="progress-bar">
        <motion.div
          className="progress-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

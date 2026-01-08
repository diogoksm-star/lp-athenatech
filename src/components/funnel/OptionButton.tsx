import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptionButtonProps {
  label: string;
  selected?: boolean;
  onClick: () => void;
  multiSelect?: boolean;
  delay?: number;
}

export const OptionButton = ({
  label,
  selected,
  onClick,
  multiSelect = false,
  delay = 0,
}: OptionButtonProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      onClick={onClick}
      className={cn("option-button flex items-center justify-between gap-4", selected && "selected")}
    >
      <span className="text-foreground font-medium">{label}</span>
      {multiSelect && (
        <div
          className={cn(
            "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
            selected
              ? "bg-secondary border-secondary"
              : "border-muted-foreground"
          )}
        >
          {selected && <Check className="w-4 h-4 text-secondary-foreground" />}
        </div>
      )}
    </motion.button>
  );
};

import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

interface DiagnosticResultProps {
  score: number;
  onContinue: () => void;
}

const getLevelInfo = (score: number) => {
  if (score < 40) {
    return {
      level: "Iniciante",
      color: "text-red-400",
      description: "Você está na zona de risco. Mas calma, isso pode mudar rapidamente.",
    };
  } else if (score < 70) {
    return {
      level: "Intermediário",
      color: "text-yellow-400",
      description: "Você está na zona de confusão. Tem potencial, mas falta sistema.",
    };
  } else {
    return {
      level: "Avançado",
      color: "text-green-400",
      description: "Você está quase na zona de clareza. Só falta automatizar.",
    };
  }
};

export const DiagnosticResult = ({ score, onContinue }: DiagnosticResultProps) => {
  const { level, color, description } = getLevelInfo(score);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center"
    >
      {/* Score display */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="relative mb-8"
      >
        <div className="w-40 h-40 rounded-full border-4 border-primary flex items-center justify-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `conic-gradient(hsl(var(--primary)) ${score}%, transparent ${score}%)`,
            }}
          />
          <span className="text-5xl font-bold text-gradient relative z-10">{score}%</span>
        </div>
      </motion.div>

      {/* Level */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl md:text-3xl font-bold mb-2"
      >
        Seu Nível de Clareza Financeira:
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`text-3xl md:text-4xl font-bold ${color} mb-6`}
      >
        {level}
      </motion.p>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-lg text-muted-foreground max-w-md mb-8"
      >
        {description}
      </motion.p>

      {/* Zone bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-md mb-8"
      >
        <div className="zone-bar mb-3">
          <motion.div
            initial={{ left: 0 }}
            animate={{ left: `${score}%` }}
            transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-foreground rounded-full shadow-lg border-2 border-background"
            style={{ marginLeft: "-8px" }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-red-400" />
            <span>Zona de Risco</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-yellow-400" />
            <span>Confusão</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-green-400" />
            <span>Clareza Total</span>
          </div>
        </div>
      </motion.div>

      {/* Motivational text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="athena-card max-w-md mb-8"
      >
        <p className="text-foreground">
          <span className="text-secondary font-semibold">O bom</span> é que você já não está no escuro.
        </p>
        <p className="text-foreground mt-2">
          <span className="text-primary font-semibold">O melhor</span> é que você ainda está longe do seu potencial máximo.
        </p>
      </motion.div>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        onClick={onContinue}
        className="athena-button text-foreground"
      >
        Criar meu Sistema Inteligente →
      </motion.button>
    </motion.div>
  );
};

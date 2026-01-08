import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProgressBar } from "./ProgressBar";
import { OptionButton } from "./OptionButton";
import { LoadingScreen } from "./LoadingScreen";
import { DiagnosticResult } from "./DiagnosticResult";
import { SalesPage } from "./SalesPage";
import {
  MessageCircle,
  DollarSign,
  CalendarClock,
  Gauge,
  CreditCard,
  Sparkles,
} from "lucide-react";

type FunnelStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface Answers {
  q1: number;
  q2: number;
  q3: number;
  q4: string[];
}

const questions = {
  q1: {
    icon: MessageCircle,
    question: "Como você registra suas movimentações financeiras atualmente?",
    subtitle: "Seja 100% honesto(a).",
    options: [
      "Não registro nada",
      "Anoto em caderno ou planilha",
      "Registro parcialmente",
      "Uso um app, mas não consistentemente",
      "Registro tudo certinho",
    ],
  },
  q2: {
    icon: CalendarClock,
    question: "Você tem controle real das contas a pagar e a receber?",
    options: [
      "Não, faço quando lembro",
      "Sim, mas às vezes me perco",
      "Sim, mas não tenho alertas",
      "Sim, mantenho tudo atualizado",
    ],
  },
  q3: {
    icon: Gauge,
    question: "Qual o seu nível atual de organização financeira?",
    options: [
      "Totalmente perdido(a)",
      "Consigo me virar",
      "Tenho uma base, mas falta consistência",
      "Me considero organizado(a)",
      "Extremamente organizado(a)",
    ],
  },
  q4: {
    icon: CreditCard,
    question: "O que mais atrapalha sua vida financeira hoje?",
    subtitle: "Selecione todas que se aplicam.",
    options: [
      "Falta de clareza",
      "Gastos que esqueço",
      "Falta de organização",
      "Dificuldade em manter o controle",
      "Não tenho um sistema simples",
      "Não sei por onde começar",
    ],
  },
};

const pageVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export const AthenaFunnel = () => {
  const [step, setStep] = useState<FunnelStep>(0);
  const [answers, setAnswers] = useState<Answers>({
    q1: -1,
    q2: -1,
    q3: -1,
    q4: [],
  });

  const calculateScore = useCallback(() => {
    const q1Score = answers.q1 * 5;
    const q2Score = answers.q2 * 8.33;
    const q3Score = answers.q3 * 5;
    const q4Penalty = answers.q4.length * 3;
    
    const baseScore = ((q1Score + q2Score + q3Score) / 3) * 4;
    const finalScore = Math.max(20, Math.min(95, baseScore - q4Penalty + 20));
    
    return Math.round(finalScore);
  }, [answers]);

  const handleQ1 = (index: number) => {
    setAnswers((prev) => ({ ...prev, q1: index }));
    setTimeout(() => setStep(2), 300);
  };

  const handleQ2 = (index: number) => {
    setAnswers((prev) => ({ ...prev, q2: index }));
    setTimeout(() => setStep(3), 300);
  };

  const handleQ3 = (index: number) => {
    setAnswers((prev) => ({ ...prev, q3: index }));
    setTimeout(() => setStep(4), 300);
  };

  const handleQ4Toggle = (option: string) => {
    setAnswers((prev) => ({
      ...prev,
      q4: prev.q4.includes(option)
        ? prev.q4.filter((o) => o !== option)
        : [...prev.q4, option],
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div
            key="step0"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
          >
            {/* Decorative element */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-8 shadow-lg animate-float"
              style={{ boxShadow: "0 0 60px hsl(244 100% 63% / 0.4)" }}
            >
              <DollarSign className="w-12 h-12 text-foreground" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 max-w-3xl leading-tight"
            >
              A maioria não perde dinheiro por falta de esforço,{" "}
              <span className="text-gradient">mas por falta de clareza.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl"
            >
              Hoje você descobrirá seu nível de clareza financeira — e terá
              acesso ao seu sistema inteligente personalizado.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-muted-foreground mb-10"
            >
              (Leva menos de 2 minutos)
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep(1)}
              className="athena-button text-foreground"
            >
              Começar Diagnóstico →
            </motion.button>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            key="step1"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center justify-center min-h-screen px-6 py-20"
          >
            <ProgressBar currentStep={1} totalSteps={4} />

            <div className="flex flex-col items-center mt-12 w-full max-w-md">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6"
              >
                <questions.q1.icon className="w-8 h-8 text-secondary" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl md:text-2xl font-bold text-center mb-2"
              >
                {questions.q1.question}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-muted-foreground text-center mb-8"
              >
                {questions.q1.subtitle}
              </motion.p>

              <div className="w-full space-y-3">
                {questions.q1.options.map((option, index) => (
                  <OptionButton
                    key={option}
                    label={option}
                    selected={answers.q1 === index}
                    onClick={() => handleQ1(index)}
                    delay={0.1 + index * 0.05}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center justify-center min-h-screen px-6 py-20"
          >
            <ProgressBar currentStep={2} totalSteps={4} />

            <div className="flex flex-col items-center mt-12 w-full max-w-md">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6"
              >
                <questions.q2.icon className="w-8 h-8 text-secondary" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl md:text-2xl font-bold text-center mb-8"
              >
                {questions.q2.question}
              </motion.h2>

              <div className="w-full space-y-3">
                {questions.q2.options.map((option, index) => (
                  <OptionButton
                    key={option}
                    label={option}
                    selected={answers.q2 === index}
                    onClick={() => handleQ2(index)}
                    delay={0.1 + index * 0.05}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center justify-center min-h-screen px-6 py-20"
          >
            <ProgressBar currentStep={3} totalSteps={4} />

            <div className="flex flex-col items-center mt-12 w-full max-w-md">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6"
              >
                <questions.q3.icon className="w-8 h-8 text-secondary" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl md:text-2xl font-bold text-center mb-8"
              >
                {questions.q3.question}
              </motion.h2>

              <div className="w-full space-y-3">
                {questions.q3.options.map((option, index) => (
                  <OptionButton
                    key={option}
                    label={option}
                    selected={answers.q3 === index}
                    onClick={() => handleQ3(index)}
                    delay={0.1 + index * 0.05}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center justify-center min-h-screen px-6 py-20"
          >
            <ProgressBar currentStep={4} totalSteps={4} />

            <div className="flex flex-col items-center mt-12 w-full max-w-md">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6"
              >
                <questions.q4.icon className="w-8 h-8 text-secondary" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl md:text-2xl font-bold text-center mb-2"
              >
                {questions.q4.question}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-muted-foreground text-center mb-8"
              >
                {questions.q4.subtitle}
              </motion.p>

              <div className="w-full space-y-3 mb-8">
                {questions.q4.options.map((option, index) => (
                  <OptionButton
                    key={option}
                    label={option}
                    selected={answers.q4.includes(option)}
                    onClick={() => handleQ4Toggle(option)}
                    multiSelect
                    delay={0.1 + index * 0.05}
                  />
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => setStep(5)}
                disabled={answers.q4.length === 0}
                className="athena-button text-foreground w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continuar →
              </motion.button>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <LoadingScreen
            key="step5"
            messages={[
              "Analisando padrões financeiros…",
              "Detectando hábitos…",
              "Criando seu Mapa de Clareza Financeira…",
            ]}
            onComplete={() => setStep(6)}
            duration={3000}
          />
        );

      case 6:
        return (
          <DiagnosticResult
            key="step6"
            score={calculateScore()}
            onContinue={() => setStep(7)}
          />
        );

      case 7:
        return (
          <LoadingScreen
            key="step7"
            messages={[
              "Configurando seu painel…",
              "Conectando inteligência financeira…",
              "Preparando visão 360°…",
            ]}
            onComplete={() => setStep(8)}
            duration={3000}
          />
        );

      case 8:
        return <SalesPage key="step8" />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[50vh] opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at top, hsl(244 100% 63% / 0.3), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[30vh] opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at bottom, hsl(188 100% 50% / 0.2), transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
    </div>
  );
};

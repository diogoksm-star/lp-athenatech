import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import athenaLogo from "@/assets/logo.svg";
import { trackFunnelStep } from "@/lib/pixel";
import {
  ArrowRight,
  Check,
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Paperclip,
  Mic,
  PieChart,
  Wallet,
  BarChart3,
  Play,
  Pause,
} from "lucide-react";

// ─── WhatsApp Chat Data ──────────────────────────────────────────────────────

interface ChatMessage {
  from: "user" | "athena";
  text: string;
  time: string;
  delay: number; // ms before this message appears
  image?: string; // optional image URL
  audio?: string; // optional audio URL
}

const chatScript: ChatMessage[] = [
  {
    from: "user",
    text: "gastei 37,80 em um café da manhã",
    time: "10:31",
    delay: 1200,
  },
  {
    from: "athena",
    text: "☕ Café da manhã registrado!\n\n💰 R$ 37,80 · Alimentação\n📅 17/03/2026 · ✅ Pago",
    time: "10:31",
    delay: 2000,
  },
  {
    from: "user",
    text: "paguei 150 de internet",
    time: "10:33",
    delay: 2500,
  },
  {
    from: "athena",
    text: "🌐 Internet registrada!\n\n💰 R$ 150,00 · Moradia\n📊 Gastos hoje: R$ 187,80",
    time: "10:33",
    delay: 2000,
  },
  {
    from: "user",
    text: "",
    time: "10:34",
    delay: 2500,
    audio: "/assets/audio-exemplo.m4a",
  },
  {
    from: "athena",
    text: "🎙️ Áudio processado!\n\n💼 Contrato: R$ 5.300,00\n🏢 Conta empresa: +R$ 3.300,00\n👤 Conta pessoal: +R$ 2.000,00\n\n✅ Receitas registradas!",
    time: "10:34",
    delay: 9000,
  },
  {
    from: "user",
    text: "gastei 317,85 no churrasco de ontem",
    time: "10:36",
    delay: 2500,
    image: "/assets/churrasco.jpg",
  },
  {
    from: "athena",
    text: "🔥 Churrasco registrado!\n\n💰 R$ 317,85 · Alimentação\n📅 16/03/2026 · ✅ Pago",
    time: "10:36",
    delay: 2000,
  },
  {
    from: "user",
    text: "quanto gastei esse mês?",
    time: "10:38",
    delay: 2800,
  },
  {
    from: "athena",
    text: "📊 Março/2026:\n\n🏠 Moradia: R$ 2.650,00\n🍔 Alimentação: R$ 955,65\n🚗 Transporte: R$ 360,00\n🎉 Lazer: R$ 150,00\n\n💰 Total gastos: R$ 4.115,65\n💵 Receitas: R$ 10.300,00\n📈 Saldo positivo! 🎯",
    time: "10:38",
    delay: 2400,
  },
];

// ─── Dashboard Data ──────────────────────────────────────────────────────────

const dashboardTransactions = [
  { desc: "Café da manhã", cat: "Alimentação", value: -37.80, date: "17/03" },
  { desc: "Internet", cat: "Moradia", value: -150.0, date: "17/03" },
  { desc: "Contrato (Empresa)", cat: "Receita", value: 3300.0, date: "17/03" },
  { desc: "Contrato (Pessoal)", cat: "Receita", value: 2000.0, date: "17/03" },
  { desc: "Churrasco", cat: "Alimentação", value: -317.85, date: "16/03" },
  { desc: "Salário", cat: "Receita", value: 5000.0, date: "15/03" },
];

const categoryData = [
  { name: "Moradia", percent: 64, color: "hsl(244 100% 63%)" },
  { name: "Alimentação", percent: 23, color: "hsl(188 100% 50%)" },
  { name: "Transporte", percent: 9, color: "hsl(150 70% 45%)" },
  { name: "Lazer", percent: 4, color: "hsl(45 90% 50%)" },
];

// ─── WhatsApp Phase ──────────────────────────────────────────────────────────

const WhatsAppPhase = ({ onComplete }: { onComplete: () => void }) => {
  const [started, setStarted] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typingFrom, setTypingFrom] = useState<"user" | "athena">("user");
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [showDashboardHint, setShowDashboardHint] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const typeSoundRef = useRef<HTMLAudioElement | null>(null);
  const notifSoundRef = useRef<HTMLAudioElement | null>(null);

  // Audio playback state for chat message
  const [isPlaying, setIsPlaying] = useState(false);

  // Index of the audio message in chatScript
  const audioMsgIndex = chatScript.findIndex((m) => m.audio);

  // Pre-load all audio assets on mount
  useEffect(() => {
    const audioSrc = chatScript.find((m) => m.audio)?.audio;
    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.volume = 1;
      audio.preload = "auto";
      audioRef.current = audio;
      audio.addEventListener("ended", () => setIsPlaying(false));
    }

    const typeSound = new Audio("/assets/whatsapp-type.mp3");
    typeSound.volume = 0.5;
    typeSound.preload = "auto";
    typeSoundRef.current = typeSound;

    const notifSound = new Audio("/assets/whatsapp-notification.mp3");
    notifSound.volume = 0.6;
    notifSound.preload = "auto";
    notifSoundRef.current = notifSound;
  }, []);

  // Play notification sound when Athena responds
  const playNotifSound = () => {
    if (notifSoundRef.current) {
      notifSoundRef.current.currentTime = 0;
      notifSoundRef.current.play().catch(() => {});
    }
  };

  // Play type sound during user typing
  const typeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTypingSound = () => {
    if (!typeSoundRef.current) return;
    typeSoundRef.current.currentTime = 0;
    typeSoundRef.current.play().catch(() => {});
    typeIntervalRef.current = setInterval(() => {
      if (typeSoundRef.current) {
        typeSoundRef.current.currentTime = 0;
        typeSoundRef.current.play().catch(() => {});
      }
    }, 400);
  };
  const stopTypingSound = () => {
    if (typeIntervalRef.current) {
      clearInterval(typeIntervalRef.current);
      typeIntervalRef.current = null;
    }
  };

  // Toggle play/pause on audio message
  const toggleAudioPlayback = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    // Force scroll to bottom of chat area after animation completes
    const el = chatAreaRef.current;
    if (el) {
      const scroll = () => { el.scrollTop = el.scrollHeight; };
      scroll();
      const t1 = setTimeout(scroll, 100);
      const t2 = setTimeout(scroll, 350);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [visibleMessages, isTyping, showDashboardHint]);

  // Unlock all audio on "Iniciar conversa" click and start the full flow
  const handleStart = () => {
    // Unlock audio context with user gesture
    [audioRef, typeSoundRef, notifSoundRef].forEach((ref) => {
      if (ref.current) {
        ref.current.play().then(() => {
          ref.current!.pause();
          ref.current!.currentTime = 0;
        }).catch(() => {});
      }
    });
    setStarted(true);
    trackFunnelStep('ChatStarted');
  };

  // Run the entire chat flow after started
  useEffect(() => {
    if (!started) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let accumulated = 800;

    chatScript.forEach((msg, i) => {
      const isUser = msg.from === "user";
      const isAudioMsg = !!msg.audio;

      // Start typing (2s) + type sound for user (skip for audio msg)
      if (!isAudioMsg) {
        timeouts.push(
          setTimeout(() => {
            setTypingFrom(msg.from);
            setIsTyping(true);
            if (isUser) startTypingSound();
          }, accumulated)
        );
        accumulated += 2000;

        // Stop typing + 1s pause
        timeouts.push(
          setTimeout(() => {
            if (isUser) stopTypingSound();
            setIsTyping(false);
          }, accumulated)
        );
        accumulated += 1000;
      }

      // Show message
      timeouts.push(
        setTimeout(() => {
          setVisibleMessages(i + 1);
          if (!isUser && !isAudioMsg) playNotifSound();

          // Track each message milestone
          trackFunnelStep('ChatMessage', { message_index: i, from: msg.from, has_audio: isAudioMsg, has_image: !!msg.image });

          // If this is the audio message, auto-play it
          if (isAudioMsg && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {});
            setIsPlaying(true);
            trackFunnelStep('AudioPlayed');
          }
        }, accumulated)
      );

      // If audio message, wait for audio duration before next message
      if (isAudioMsg) {
        accumulated += 9000; // audio duration + buffer

        // Show Athena typing 2s before response
        timeouts.push(
          setTimeout(() => {
            setTypingFrom("athena");
            setIsTyping(true);
          }, accumulated - 2000)
        );
      } else {
        accumulated += 500;
      }
    });

    // Show dashboard hint after all messages
    timeouts.push(
      setTimeout(() => {
        setShowDashboardHint(true);
        trackFunnelStep('ChatCompleted');
      }, accumulated + 1500)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [started]);

  return (
    <div className="h-[100dvh] flex flex-col bg-[#0b141a] relative">
      {/* WhatsApp Header */}
      <div className="flex items-center gap-3 px-3 py-2 bg-[#1f2c34]">
        <ChevronLeft className="w-6 h-6 text-[#aebac1]" />
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
          <img src={athenaLogo} alt="Athena" className="w-6 h-6 brightness-200" />
        </div>
        <div className="flex-1">
          <p className="text-[#e9edef] text-base font-medium">Athena IA</p>
          <p className="text-[#8696a0] text-xs">online</p>
        </div>
        <div className="flex items-center gap-5">
          <Video className="w-5 h-5 text-[#aebac1]" />
          <Phone className="w-5 h-5 text-[#aebac1]" />
          <MoreVertical className="w-5 h-5 text-[#aebac1]" />
        </div>
      </div>

      {/* Chat Area */}
      <div
        ref={chatAreaRef}
        className="flex-1 overflow-y-auto px-3 pt-3 pb-2 space-y-1"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23111b21' fill-opacity='0.6'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundColor: "#0b141a",
        }}
      >
        {/* Date header */}
        <div className="flex justify-center mb-3">
          <span className="bg-[#182229] text-[#8696a0] text-xs px-3 py-1 rounded-lg">
            Hoje
          </span>
        </div>

        <AnimatePresence>
          {chatScript.slice(0, visibleMessages).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} mb-1`}
            >
              <div
                className={`max-w-[85%] px-3 py-1.5 rounded-lg text-[14px] leading-[19px] whitespace-pre-line relative ${
                  msg.from === "user"
                    ? "bg-[#005c4b] text-[#e9edef] rounded-tr-none"
                    : "bg-[#1f2c34] text-[#e9edef] rounded-tl-none"
                }`}
              >
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="Foto enviada"
                    className="rounded-md mb-1.5 max-w-full"
                    style={{ maxHeight: 180 }}
                  />
                )}
                {msg.audio && (
                  <div
                    className="flex items-center gap-2 py-1 mb-1 cursor-pointer"
                    onClick={toggleAudioPlayback}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#00a884] flex items-center justify-center flex-shrink-0">
                      {isPlaying ? (
                        <Pause className="w-4 h-4 text-white" />
                      ) : (
                        <Play className="w-4 h-4 text-white ml-0.5" />
                      )}
                    </div>
                    <div className="flex-1 flex items-center gap-1">
                      {[4,10,7,14,9,12,6,15,8,11,5,13,7,10,14,6,12,8,11,5].map((h, k) => (
                        <div
                          key={k}
                          className="w-[3px] rounded-full transition-colors duration-200"
                          style={{
                            height: `${h}px`,
                            backgroundColor: isPlaying ? "#00a884" : "#8696a0",
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#8696a0] ml-1">0:08</span>
                  </div>
                )}
                {msg.text && msg.text}
                <span className="text-[11px] text-[#8696a0] float-right ml-2 mt-1 relative -bottom-0.5">
                  {msg.time}
                  {msg.from === "user" && (
                    <span className="ml-1 text-[#53bdeb]">✓✓</span>
                  )}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              key="typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`flex ${typingFrom === "user" ? "justify-end" : "justify-start"} mb-1`}
            >
              <div
                className={`px-4 py-2.5 rounded-lg ${
                  typingFrom === "user"
                    ? "bg-[#005c4b] rounded-tr-none"
                    : "bg-[#1f2c34] rounded-tl-none"
                }`}
              >
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map((j) => (
                    <div
                      key={j}
                      className="w-2 h-2 rounded-full bg-[#8696a0]"
                      style={{
                        animation: "bounce 1.2s infinite",
                        animationDelay: `${j * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={chatEndRef} />

        {/* Dashboard hint */}
        <AnimatePresence>
          {showDashboardHint && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center pt-4 pb-2"
            >
              <button
                onClick={onComplete}
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <BarChart3 className="w-4 h-4" />
                Ver meu dashboard
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input bar */}
      {!started ? (
        <div className="flex items-center gap-2 px-2 py-2 bg-[#1f2c34]">
          <Smile className="w-6 h-6 text-[#8696a0]" />
          <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2 flex items-center">
            <Paperclip className="w-5 h-5 text-[#8696a0] mr-2 rotate-45" />
            <span className="text-[#8696a0] text-[15px]">Mensagem</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#00a884] flex items-center justify-center">
            <Mic className="w-5 h-5 text-white" />
            </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 px-2 py-2 bg-[#1f2c34]">
          <Smile className="w-6 h-6 text-[#8696a0]" />
          <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2 flex items-center">
            <Paperclip className="w-5 h-5 text-[#8696a0] mr-2 rotate-45" />
            <span className="text-[#8696a0] text-[15px]">Mensagem</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#00a884] flex items-center justify-center">
            <Mic className="w-5 h-5 text-white" />
          </div>
        </div>
      )}

      {/* Start button overlay */}
      <AnimatePresence>
        {!started && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center bg-[#0b141a]/80 z-10"
          >
            <motion.button
              onClick={handleStart}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-base shadow-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Play className="w-5 h-5" />
              Iniciar conversa
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Dashboard Phase ─────────────────────────────────────────────────────────

const DashboardPhase = ({ onComplete }: { onComplete: () => void }) => {
  const [showContent, setShowContent] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [animatedBalance, setAnimatedBalance] = useState(0);
  const [animatedExpenses, setAnimatedExpenses] = useState(0);

  useEffect(() => {
    trackFunnelStep('DashboardViewed');
    setTimeout(() => setShowContent(true), 400);
    setTimeout(() => setShowTransactions(true), 1200);
    setTimeout(() => {
      setShowCTA(true);
      trackFunnelStep('CTAVisible');
    }, 3000);
  }, []);

  // Animate numbers
  useEffect(() => {
    if (!showContent) return;
    const targetBalance = 6184.35;
    const targetExpenses = 4115.65;
    const duration = 1500;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedBalance(targetBalance * eased);
      setAnimatedExpenses(targetExpenses * eased);
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [showContent]);

  return (
    <div className="h-[100dvh] flex flex-col bg-background overflow-hidden">
      {/* Dashboard Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <img src={athenaLogo} alt="Athena" className="h-7" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
            Março 2026
          </span>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Summary Cards */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-3"
            >
              <div className="athena-card !p-4">
                <p className="text-xs text-muted-foreground mb-1">Saldo atual</p>
                <p className="text-xl font-bold text-foreground">
                  R$ {animatedBalance.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-400">+12%</span>
                </div>
              </div>
              <div className="athena-card !p-4">
                <p className="text-xs text-muted-foreground mb-1">Gastos do mês</p>
                <p className="text-xl font-bold text-red-400">
                  R$ {animatedExpenses.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-400">-12% vs mês anterior</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Breakdown */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="athena-card !p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <PieChart className="w-4 h-4 text-secondary" />
                <p className="text-sm font-semibold text-foreground">Gastos por categoria</p>
              </div>
              <div className="space-y-2.5">
                {categoryData.map((cat, i) => (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                  >
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{cat.name}</span>
                      <span className="text-foreground font-medium">{cat.percent}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.percent}%` }}
                        transition={{ duration: 0.8, delay: 0.6 + i * 0.15, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Transactions */}
        <AnimatePresence>
          {showTransactions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="athena-card !p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <Wallet className="w-4 h-4 text-secondary" />
                <p className="text-sm font-semibold text-foreground">Últimas transações</p>
              </div>
              <div className="space-y-3">
                {dashboardTransactions.map((tx, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12 }}
                    className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          tx.value > 0
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {tx.value > 0 ? "+" : "-"}
                      </div>
                      <div>
                        <p className="text-sm text-foreground">{tx.desc}</p>
                        <p className="text-xs text-muted-foreground">{tx.cat}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-medium ${
                          tx.value > 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {tx.value > 0 ? "+" : ""}R${" "}
                        {Math.abs(tx.value).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground">{tx.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <AnimatePresence>
          {showCTA && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="pt-2 pb-8"
            >
              <div className="athena-card !p-6 text-center border-secondary/30">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-lg font-bold text-foreground mb-2">
                    Quer ter esse controle das suas finanças?
                  </p>
                  <p className="text-sm text-muted-foreground mb-5">
                    Tudo isso pelo WhatsApp — sem planilha, sem complicação.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onComplete}
                    className="athena-button text-foreground text-base px-8 py-4 w-full"
                  >
                    Quero começar agora
                    <ArrowRight className="w-5 h-5 inline ml-2" />
                  </motion.button>
                  <p className="text-xs text-muted-foreground mt-3">
                    7 dias de garantia · Cancele quando quiser
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ─── Main Experience Page ────────────────────────────────────────────────────

const Experience = () => {
  const [phase, setPhase] = useState<"whatsapp" | "dashboard">("whatsapp");
  const navigate = useNavigate();

  const handleWhatsAppComplete = () => {
    trackFunnelStep('ClickedViewDashboard');
    setPhase("dashboard");
  };

  const handleDashboardComplete = () => {
    trackFunnelStep('ClickedCTA_Offer');
    navigate("/oferta");
  };

  return (
    <div className="h-[100dvh] overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === "whatsapp" && (
          <motion.div
            key="whatsapp"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="h-full"
          >
            <WhatsAppPhase onComplete={handleWhatsAppComplete} />
          </motion.div>
        )}
        {phase === "dashboard" && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full"
          >
            <DashboardPhase onComplete={handleDashboardComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Experience;

import { motion } from "framer-motion";
import athenaLogo from "@/assets/logo.svg";
import mockupImage from "@/assets/macbookWPhone.png";
import {
  Sparkles,
  LayoutDashboard,
  Bell,
  BarChart3,
  TrendingUp,
  Target,
  Brain,
  ChevronDown,
  Check,
  Shield,
  MessageCircle,
  MessageSquare,
  FileText,
  Send,
  Bot,
  PieChart,
  Users,
  Star,
  ArrowRight,
  Zap,
  Lock,
  Instagram,
  Flame,
  X,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackEvent, trackCustomEvent, trackScrollDepth, trackGA4, clarityTag } from "@/lib/pixel";

// ─── Static Data ──────────────────────────────────────────────────────────────

const planFeatures = [
  "Registro ilimitado de gastos",
  "Dashboard Premium completo",
  "Alertas inteligentes de orçamento",
  "Insights e relatórios mensais",
  "Organização de investimentos",
  "Suporte técnico prioritário",
];

const testimonials = [
  {
    name: "Carolina S.",
    role: "Empreendedora",
    avatar: "CS",
    text: "Em 2 semanas eu já sabia pra onde ia cada centavo. Nunca fui tão organizada nas finanças na minha vida.",
    rating: 5,
  },
  {
    name: "Marcos R.",
    role: "CLT + Investidor",
    avatar: "MR",
    text: "Descobri que gastava R$ 800 por mês com delivery. A Athena me mostrou isso no primeiro mês. Cortei pela metade.",
    rating: 5,
  },
  {
    name: "Juliana M.",
    role: "Professora",
    avatar: "JM",
    text: "Tentei planilha, tentei app, nada colava. A Athena funciona porque é pelo WhatsApp — já abro o dia inteiro de qualquer jeito.",
    rating: 5,
  },
  {
    name: "Pedro A.",
    role: "Freelancer",
    avatar: "PA",
    text: "Meu dinheiro é irregular. A Athena me ajuda a saber quando posso gastar e quando tenho que segurar. Mudou tudo.",
    rating: 5,
  },
];

const faqs = [
  {
    question: "Meus dados financeiros estão seguros?",
    answer: "Absolutamente. Utilizamos criptografia de ponta a ponta e seguimos os mais rígidos padrões de segurança. Seus dados nunca são compartilhados com terceiros.",
  },
  {
    question: "E se eu não souber usar tecnologia?",
    answer: "A Athena foi feita para ser simples. Se você usa WhatsApp, você já sabe usar a Athena. Basta enviar uma mensagem, foto ou áudio — ela faz o resto.",
  },
  {
    question: "Preciso ter disciplina para usar?",
    answer: "Não. A Athena foi criada justamente para quem não tem tempo ou energia para planilhas. Você manda uma mensagem quando gasta — ela organiza tudo sozinha.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer: "Sim, sem burocracia. Você pode cancelar a qualquer momento diretamente pelo WhatsApp. Sem multas, sem pegadinhas.",
  },
  {
    question: "Funciona mesmo só pelo WhatsApp?",
    answer: "Sim! Toda a experiência de registro acontece no WhatsApp. Você também tem acesso a um dashboard completo na web para visualizar seus dados.",
  },
  {
    question: "Preciso cadastrar minha conta bancária?",
    answer: "Não! A Athena funciona apenas com os dados que você envia. Não acessamos suas contas bancárias. Você tem total controle.",
  },
  {
    question: "Quanto tempo leva para ver resultados?",
    answer: "A maioria percebe clareza financeira já na primeira semana. Em 30 dias, você terá uma visão completa de todos os seus padrões de gastos.",
  },
  {
    question: "A Athena funciona para autônomos e MEIs?",
    answer: "Sim! A Athena é ideal para MEIs, autônomos e freelancers — especialmente quem tem renda variável e precisa de mais controle.",
  },
];

// ─── Main Component ────────────────────────────────────────────────────────────

export const SalesPage = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const [pricingViewed, setPricingViewed] = useState(false);
  const pricingRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !pricingViewed) {
            setPricingViewed(true);
            trackEvent("ViewContent", {
              content_name: "Pricing Section",
              content_category: "Planos",
              content_ids: ["plano_mensal", "plano_anual"],
              value: 287.0,
              currency: "BRL",
            });
            trackGA4("view_pricing", { section: "pricing" });
            clarityTag("ViewPricing");
          }
        });
      },
      { threshold: 0.3 }
    );
    if (pricingRef.current) observer.observe(pricingRef.current);
    return () => observer.disconnect();
  }, [pricingViewed]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      if (scrollPercent >= 25) trackScrollDepth(25);
      if (scrollPercent >= 50) trackScrollDepth(50);
      if (scrollPercent >= 75) trackScrollDepth(75);
      if (scrollPercent >= 100) trackScrollDepth(100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToPlans = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] opacity-25 pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(244 100% 63% / 0.5), transparent 60%)" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl relative z-10 w-full"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-8"
          >
            <img src={athenaLogo} alt="Athena" className="h-12 md:h-16 w-auto mx-auto" />
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight">
              Pare de{" "}
              <span className="text-gradient">perder dinheiro</span>{" "}
              sem saber por quê.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
              A Athena controla suas finanças pelo WhatsApp — registre gastos, acompanhe investimentos e tenha clareza total. Sem planilha, sem esforço.
            </p>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {[
              { icon: Zap, label: "100% Automático" },
              { icon: MessageCircle, label: "Via WhatsApp" },
              { icon: Users, label: "+2.500 usuários" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-sm text-foreground"
              >
                <Icon className="w-4 h-4 text-secondary" />
                {label}
              </span>
            ))}
          </motion.div>

          {/* App Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="mb-8 flex justify-center"
          >
            <img
              src={mockupImage}
              alt="Athena - WhatsApp e Dashboard"
              className="w-full max-w-2xl h-auto drop-shadow-2xl"
            />
          </motion.div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              trackCustomEvent("ClickCTA", { location: "hero" });
              trackGA4("click_cta", { location: "hero" });
              clarityTag("ClickCTA_Hero");
              scrollToPlans();
            }}
            className="athena-button text-foreground text-xl px-12 py-5"
          >
            Quero Controlar Minhas Finanças →
          </motion.button>
          <p className="mt-4 text-sm text-muted-foreground">Sem compromisso. Cancele quando quiser.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-muted-foreground animate-bounce" />
        </motion.div>
      </section>

      {/* ── 2. SOCIAL PROOF BAR ─────────────────────────────────────────────── */}
      <section className="py-12 px-6 border-y border-border/50 bg-card/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-center">
            <span className="text-lg md:text-xl font-semibold text-gradient">R$ 50M+ organizados</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-lg md:text-xl font-semibold text-gradient">2.500+ usuários ativos</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-lg md:text-xl font-semibold text-gradient flex items-center gap-1">
              Nota <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 inline mx-1" /> 4.9
            </span>
          </div>
        </div>
      </section>

      {/* ── 3. PAIN / PROBLEMA ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Você se identifica com alguma dessas situações?
            </h2>
            <p className="text-muted-foreground text-lg">Se sim — você não está sozinho. E tem solução.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {[
              "Fim de mês chegou e o saldo não fecha — mas você não sabe por quê",
              "Tentou planilha, tentou app, desistiu em menos de uma semana",
              "Vive no \"acho que posso gastar\" sem nunca ter certeza",
              "Descobre pelo extrato que gastou muito mais do que imaginou",
              "Quer poupar para algum objetivo mas no fim do mês não sobrou nada",
              "Tem investimentos mas não sabe se estão rendendo o suficiente",
            ].map((pain, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/20"
              >
                <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-foreground">{pain}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-block px-6 py-4 rounded-2xl bg-green-500/10 border border-green-500/30">
              <p className="text-xl font-semibold text-foreground">
                Se você se identificou com pelo menos um — a Athena foi feita pra você.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. COMO FUNCIONA ────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Três passos. <span className="text-gradient">Clareza total.</span>
            </h2>
            <p className="text-muted-foreground text-lg">Sem aprender app novo. Sem disciplina sobre-humana.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-30" />

            {[
              {
                icon: Send,
                step: 1,
                title: "Você manda no WhatsApp",
                desc: "Texto, áudio ou foto da nota. Do jeito que quiser, na hora que acontece.",
              },
              {
                icon: Bot,
                step: 2,
                title: "A Athena organiza tudo",
                desc: "Ela classifica, calcula e estrutura automaticamente. Sem você fazer nada.",
              },
              {
                icon: LayoutDashboard,
                step: 3,
                title: "Você enxerga tudo",
                desc: "Painel completo com saldos, categorias, metas e investimentos em um só lugar.",
              },
            ].map(({ icon: Icon, step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center relative"
              >
                <div
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6 relative z-10"
                  style={{ boxShadow: "0 0 40px hsl(244 100% 63% / 0.4)" }}
                >
                  <Icon className="w-10 h-10 text-foreground" />
                </div>
                <div className="absolute -top-2 -right-2 md:right-auto md:left-1/2 md:ml-8 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-bold">
                  {step}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{title}</h3>
                <p className="text-muted-foreground">{desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-green-500/10 border border-green-500/30">
              <Check className="w-6 h-6 text-green-400 flex-shrink-0" />
              <p className="text-foreground font-medium">
                Você ganha clareza real sobre pra onde o dinheiro vai — e começa a decidir com segurança.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 5. ANTES / DEPOIS ───────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Sua vida financeira,{" "}
              <span className="text-gradient">antes e depois da Athena</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20"
            >
              <h3 className="font-bold text-red-400 text-lg mb-5 flex items-center gap-2">
                <X className="w-5 h-5" /> Sem a Athena
              </h3>
              <div className="space-y-4">
                {[
                  "Planilha que você abandona em 3 dias",
                  "Fim de mês sem saber onde o dinheiro foi",
                  "Surpresas desagradáveis no extrato",
                  '"Acho que posso gastar" — sem certeza',
                  "Gastos perdidos, nada anotado direito",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-green-500/5 border border-green-500/30"
            >
              <h3 className="font-bold text-green-400 text-lg mb-5 flex items-center gap-2">
                <Check className="w-5 h-5" /> Com a Athena
              </h3>
              <div className="space-y-4">
                {[
                  "WhatsApp que você já usa — sem app novo",
                  "Sabe exatamente onde cada real foi parar",
                  "Alertas antes de estourar o orçamento",
                  '"Posso gastar R$ 200 este fim de semana"',
                  "Tudo automático, organizado, sempre atualizado",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. FUNCIONALIDADES ──────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tudo que a <span className="text-gradient">Athena faz por você:</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: MessageSquare,
                title: "Registro direto no WhatsApp",
                description:
                  "Mande uma mensagem, um áudio ou uma foto da nota fiscal. A Athena registra e categoriza na hora.",
              },
              {
                icon: LayoutDashboard,
                title: "Dashboard 360°",
                description:
                  "Veja saldos, categorias, metas e evolução em um painel limpo — sem precisar entender de finanças.",
              },
              {
                icon: FileText,
                title: "Relatório mensal automático",
                description:
                  "A Athena te envia um resumo completo do mês e mostra o quão perto você está dos seus objetivos.",
              },
              {
                icon: TrendingUp,
                title: "Controle de investimentos",
                description:
                  "Aba separada com a situação dos seus investimentos e ativos — organizado e atualizado.",
              },
              {
                icon: Target,
                title: "Plano de metas financeiras",
                description:
                  "A Athena traça um plano personalizado para você chegar nos seus maiores objetivos financeiros.",
              },
              {
                icon: Bell,
                title: "Alertas inteligentes",
                description:
                  "Receba avisos antes de estourar limites, vencimentos chegando e insights do seu comportamento.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="athena-card group hover:border-primary/50 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors">
                  <feature.icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. DEPOIMENTOS ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Quem usa, <span className="text-gradient">recomenda:</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="athena-card"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-foreground font-semibold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. PRICING ──────────────────────────────────────────────────────── */}
      <section id="pricing" ref={pricingRef} className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Escolha seu plano</h2>
            <p className="text-muted-foreground text-lg mb-6">
              Investimento que se paga no primeiro mês de economia.
            </p>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-red-500/10 border border-red-500/30"
            >
              <Flame className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-semibold">Oferta expira em:</span>
              <div className="flex items-center gap-1 font-mono font-bold text-foreground">
                <span className="bg-card px-2 py-1 rounded">{String(timeLeft.hours).padStart(2, "0")}</span>
                <span>:</span>
                <span className="bg-card px-2 py-1 rounded">{String(timeLeft.minutes).padStart(2, "0")}</span>
                <span>:</span>
                <span className="bg-card px-2 py-1 rounded">{String(timeLeft.seconds).padStart(2, "0")}</span>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Mensal */}
            <div className="pricing-card animate-fade-in">
              <h3 className="text-xl font-semibold mb-2 text-foreground">Mensal</h3>
              <div className="mb-1">
                <span className="text-sm text-muted-foreground line-through">R$ 49,90</span>
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-foreground">R$ 34,90</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <ul className="space-y-3 mb-8">
                {planFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  trackEvent("InitiateCheckout", {
                    content_name: "Plano Mensal",
                    value: 34.9,
                    currency: "BRL",
                  });
                  trackGA4("begin_checkout", { plan: "mensal", value: 34.9 });
                  clarityTag("Checkout_Mensal");
                  window.location.href =
                    "https://pay.hotmart.com/W102950871U?off=6jeru4fn&bid=1765464759738";
                }}
                className="block w-full py-4 rounded-2xl border-2 border-primary text-foreground font-semibold hover:bg-primary/10 transition-colors text-center cursor-pointer"
              >
                Começar agora →
              </button>
            </div>

            {/* Anual */}
            <div
              className="pricing-card featured relative overflow-visible pt-8 animate-fade-in"
              style={{ animationDelay: "0.15s" }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold whitespace-nowrap z-10">
                🔥 Mais Popular
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Anual</h3>
              <div className="mb-1">
                <span className="text-sm text-muted-foreground line-through">R$ 598,80</span>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-foreground">R$ 287</span>
                <span className="text-muted-foreground">/ano</span>
              </div>
              <p className="text-secondary font-semibold mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Economize mais de 50%
              </p>
              <ul className="space-y-3 mb-8">
                {planFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
                <li className="flex items-center gap-3 text-foreground font-medium">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span>Clareza garantida por 12 meses</span>
                </li>
                <li className="flex items-center gap-3 text-foreground font-medium">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span>Todos os bônus inclusos</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  trackEvent("InitiateCheckout", {
                    content_name: "Plano Anual",
                    value: 287.0,
                    currency: "BRL",
                  });
                  trackGA4("begin_checkout", { plan: "anual", value: 287.0 });
                  clarityTag("Checkout_Anual");
                  window.location.href =
                    "https://pay.hotmart.com/W102950871U?off=tglbzob2&bid=1764979505775";
                }}
                className="athena-button w-full text-foreground text-center cursor-pointer"
              >
                Garantir Plano Anual →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. GARANTIA ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="athena-card text-center border-secondary/30 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

            <div
              className="w-24 h-24 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center mx-auto mb-6"
              style={{ boxShadow: "0 0 60px hsl(188 100% 50% / 0.4)" }}
            >
              <Shield className="w-12 h-12 text-foreground" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              7 dias de <span className="text-gradient">garantia total</span>
            </h2>

            <p className="text-muted-foreground max-w-xl mx-auto mb-4">
              Se você não sentir transformação na sua vida financeira em 7 dias, é só pedir reembolso.
              Sem perguntas, sem enrolação. Risco zero.
            </p>

            <div className="mt-6 flex items-center justify-center gap-2 text-secondary">
              <Lock className="w-5 h-5" />
              <span className="font-semibold">Compra 100% segura e protegida</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 10. FAQ ─────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ainda com dúvidas?</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="athena-card border-border px-6"
                >
                  <AccordionTrigger className="text-foreground text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ── 11. CTA FINAL ───────────────────────────────────────────────────── */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at bottom, hsl(244 100% 63% / 0.3), transparent 70%)" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Cada mês sem clareza <span className="text-gradient">custa caro.</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Junte-se às +2.500 pessoas que pararam de perder dinheiro sem saber por quê.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {[
              "Clareza total em dias",
              "100% automático",
              "Garantia 7 dias",
            ].map((label) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border"
              >
                <Check className="w-4 h-4 text-secondary" />
                <span className="text-sm text-foreground">{label}</span>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              trackCustomEvent("ClickCTA", { location: "final" });
              trackGA4("click_cta", { location: "final" });
              clarityTag("ClickCTA_Final");
              scrollToPlans();
            }}
            className="athena-button text-foreground text-xl px-16 py-6"
          >
            Quero Controlar Minhas Finanças →
          </motion.button>

          <p className="mt-6 text-sm text-muted-foreground">
            Sem compromisso. Cancele quando quiser. 7 dias de garantia.
          </p>
        </motion.div>
      </section>

      {/* ── 12. FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="py-12 px-6 border-t border-border bg-card/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img src={athenaLogo} alt="Athena" className="h-8 w-auto" />
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Controle financeiro automático via WhatsApp e dashboard. Transforme sua relação com o
                dinheiro de forma simples e inteligente.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/athenatecnologias/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary transition-colors"
                >
                  <Instagram className="w-5 h-5 text-muted-foreground" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Sobre nós</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Como funciona</a></li>
                <li><a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Preços</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Termos de uso</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Política de privacidade</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Suporte</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2026 Athena. Todos os direitos reservados.</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4" />
              <span>Pagamento 100% seguro</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

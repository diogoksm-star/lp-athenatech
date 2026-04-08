import { motion } from "framer-motion";
import athenaLogo from "@/assets/logo.svg";
import mockupImage from "@/assets/macbookWPhone.png";
import dashboardReal from "@/assets/dashboard-real.jpg";
import {
  Sparkles,
  LayoutDashboard,
  Bell,
  TrendingUp,
  Target,
  ChevronDown,
  Check,
  CheckCheck,
  Shield,
  MessageCircle,
  MessageSquare,
  FileText,
  Send,
  Bot,
  Users,
  Star,
  Zap,
  Lock,
  Instagram,
  X,
  Briefcase,
  Laptop,
  RefreshCw,
  Quote,
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

const profiles = [
  {
    icon: Briefcase,
    title: "CLT com salário fixo",
    pain: "Sabe quanto entra, não sabe quanto sai. Fim do mês aparece no vermelho sem explicação.",
    solution: "A Athena te mostra em tempo real onde cada real foi parar.",
  },
  {
    icon: Laptop,
    title: "Autônomo ou Freelancer",
    pain: "Renda variável é caos quando você não sabe o que pode gastar. Um mês de folga destrói o próximo.",
    solution: "A Athena rastreia suas entradas e te avisa quando está no limite.",
  },
  {
    icon: TrendingUp,
    title: "Quem quer investir mas não sabe se pode",
    pain: "Tem reserva de emergência? Sobra algo para investir? Sem clareza, nenhuma das duas perguntas tem resposta.",
    solution: "A Athena organiza gastos e investimentos no mesmo painel.",
  },
  {
    icon: RefreshCw,
    title: "Quem tentou de tudo e não ficou em nada",
    pain: "Planilha: abandonou. App: não lembrou de abrir. Método 50/30/20: funcionou por dois dias.",
    solution: "A Athena mora no WhatsApp. Você já abre 87 vezes por dia de qualquer jeito.",
  },
];

const testimonials = [
  {
    name: "Marcos R.",
    role: "CLT + Investidor",
    avatar: "MR",
    text: "Descobri que gastava R$ 800 por mês com delivery. A Athena me mostrou isso no primeiro mês. Cortei pela metade.",
    rating: 5,
    time: "usuário há 4 meses",
    sent: "10:47",
  },
  {
    name: "Carolina S.",
    role: "Empreendedora",
    avatar: "CS",
    text: "Em 2 semanas eu já sabia pra onde ia cada centavo. Nunca fui tão organizada nas finanças na minha vida.",
    rating: 5,
    time: "usuária há 6 meses",
    sent: "09:12",
  },
  {
    name: "Juliana M.",
    role: "Professora",
    avatar: "JM",
    text: "Tentei planilha, tentei app, nada colava. A Athena funciona porque é pelo WhatsApp — já abro o dia inteiro de qualquer jeito.",
    rating: 5,
    time: "usuária há 3 meses",
    sent: "14:23",
  },
  {
    name: "Pedro A.",
    role: "Freelancer",
    avatar: "PA",
    text: "Meu dinheiro é irregular. A Athena me ajuda a saber quando posso gastar e quando tenho que segurar. Mudou tudo.",
    rating: 5,
    time: "usuário há 5 meses",
    sent: "11:55",
  },
];

const faqs = [
  {
    question: "A Athena acessa minha conta bancária?",
    answer: "Não. A Athena não tem acesso a nenhuma conta, cartão ou banco. Tudo que ela sabe é o que você manda no WhatsApp. Seus dados ficam só com você — nenhuma conexão automática com bancos.",
  },
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
    question: "Funciona mesmo só pelo WhatsApp?",
    answer: "Sim! Toda a experiência de registro acontece no WhatsApp. Você também tem acesso a um dashboard completo na web para visualizar seus dados.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer: "Sim, sem burocracia. Você pode cancelar a qualquer momento diretamente pelo WhatsApp. Sem multas, sem pegadinhas.",
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
  const [pricingViewed, setPricingViewed] = useState(false);
  const pricingRef = useRef<HTMLElement>(null);

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

  const scrollToHowItWorks = () => {
    document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" });
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
              Você sabe quanto{" "}
              <span className="text-gradient">gastou esse mês?</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-xl mx-auto">
              A Athena registra tudo que você gasta, classifica automaticamente e te mostra para onde
              seu dinheiro foi — sem planilha, sem app novo, sem esforço. Só pelo WhatsApp.
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
              { icon: Zap, label: "Via WhatsApp — zero atrito" },
              { icon: Bot, label: "100% automático" },
              { icon: Users, label: "+2.500 já controlam as finanças" },
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
              scrollToHowItWorks();
            }}
            className="athena-button text-foreground text-xl px-12 py-5"
          >
            Ver como funciona →
          </motion.button>
          <p className="mt-4 text-sm text-foreground/60">Sem cartão de crédito. Teste 7 dias sem risco.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-foreground/40 animate-bounce" />
        </motion.div>
      </section>

      {/* ── 2. SOCIAL PROOF BAR ─────────────────────────────────────────────── */}
      <section className="py-12 px-6 border-y border-border/50 bg-card/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-center">
            <span className="text-lg md:text-xl font-semibold text-gradient">R$ 50M+ organizados</span>
            <span className="text-foreground/30 hidden md:block">•</span>
            <span className="text-lg md:text-xl font-semibold text-gradient">2.500+ usuários ativos</span>
            <span className="text-foreground/30 hidden md:block">•</span>
            <span className="text-lg md:text-xl font-semibold text-gradient flex items-center gap-1">
              Nota <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 inline mx-1" /> 4.9
            </span>
            <span className="text-foreground/30 hidden md:block">•</span>
            <span className="text-sm md:text-base text-foreground/70 italic max-w-xs">
              "Em 2 semanas eu já sabia pra onde ia cada centavo" — <span className="font-semibold not-italic text-foreground">Carolina S.</span>
            </span>
          </div>
        </div>
      </section>

      {/* ── 3. PARA QUEM É ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Feita para quem cansa de planilha{" "}
              <span className="text-gradient">e nunca se encontra em app complicado.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {profiles.map(({ icon: Icon, title, pain, solution }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="athena-card group hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors">
                    <Icon className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
                    <p className="text-foreground/60 text-sm mb-3">{pain}</p>
                    <p className="text-secondary text-sm font-medium flex items-start gap-2">
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      {solution}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PROBLEMA ─────────────────────────────────────────────────────── */}
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
            <p className="text-foreground/60 text-lg">Se sim — você não está sozinho. E tem solução.</p>
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
            <div className="inline-block px-6 py-4 rounded-2xl bg-primary/10 border border-primary/30 max-w-2xl">
              <p className="text-lg font-semibold text-foreground">
                A maioria das pessoas gasta R$ 300 a R$ 800 por mês em coisas que não lembram.
              </p>
              <p className="text-foreground/60 mt-2 text-sm">
                Não porque são irresponsáveis — mas porque nunca viram o número escrito.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 5. FUNCIONALIDADES ──────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que a Athena faz por você —{" "}
              <span className="text-gradient">em linguagem humana.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: MessageSquare,
                title: "Registro direto no WhatsApp",
                description:
                  "Acabou de pagar o almoço? Manda uma mensagem: \"almoço 35\". Pronto. Áudio funciona. Foto da nota funciona. Do jeito que for mais fácil na hora.",
              },
              {
                icon: LayoutDashboard,
                title: "Painel de gastos completo",
                description:
                  "Acesse e veja exatamente onde foi cada real: por categoria, por semana, por mês. Sem precisar entender nada de finanças para interpretar.",
              },
              {
                icon: Bell,
                title: "Aviso antes de estourar o limite",
                description:
                  "Você define R$ 500 para lazer no mês. Quando chegar em R$ 400, a Athena te manda um aviso no WhatsApp. Chega de surpresa no extrato.",
              },
              {
                icon: FileText,
                title: "Resumo mensal automático",
                description:
                  "Todo mês, sem você pedir, a Athena te manda um resumo completo: onde gastou mais, o que mudou em relação ao mês anterior e o quão perto está dos seus objetivos.",
              },
              {
                icon: TrendingUp,
                title: "Investimentos no mesmo lugar",
                description:
                  "Tem renda fixa, ações ou fundo? Registre na Athena e veja seus ativos junto com seus gastos. Uma tela. Tudo junto.",
              },
              {
                icon: Target,
                title: "Metas com plano real",
                description:
                  "Quer juntar R$ 5.000 para uma viagem? A Athena te diz quanto precisa guardar por mês e acompanha seu progresso automaticamente.",
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
                <p className="text-foreground/60 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Dashboard Screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="text-center mb-6">
              <span className="text-xs text-foreground/40 uppercase tracking-widest">Dashboard real da Athena</span>
              <h3 className="text-xl font-semibold mt-2 text-foreground">
                Tudo em um painel. Sem precisar entender de finanças.
              </h3>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
              <img
                src={dashboardReal}
                alt="Dashboard Athena — Visão Geral com saldos, categorias e transações"
                className="w-full h-auto"
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── 6. COMO FUNCIONA ────────────────────────────────────────────────── */}
      <section id="como-funciona" className="py-20 px-6 bg-card/30">
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
            <p className="text-foreground/60 text-lg">Sem aprender app novo. Sem precisar de disciplina sobre-humana.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-30" />

            {[
              {
                icon: Send,
                step: 1,
                title: "Você manda no WhatsApp",
                desc: "Texto, áudio ou foto da nota. Manda como mensagem normal, do jeito que já faz no dia a dia.",
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
                <p className="text-foreground/60">{desc}</p>
              </motion.div>
            ))}
          </div>

          {/* WhatsApp demo video */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14"
          >
            <div className="max-w-xs mx-auto">
              <div className="text-center mb-4">
                <span className="text-xs text-foreground/40 uppercase tracking-widest">veja ao vivo como funciona</span>
              </div>
              {/* Phone frame */}
              <div className="relative mx-auto" style={{ maxWidth: 280 }}>
                <div className="relative rounded-[2.5rem] border-[6px] border-foreground/10 bg-black overflow-hidden shadow-2xl" style={{ aspectRatio: "9/19" }}>
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-b-xl z-10" />
                  <video
                    src="https://i.imgur.com/5Ed7Vi9.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Reflection glow */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-primary/20 blur-xl rounded-full" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
            className="mt-12 text-center"
          >
            <div className="inline-block px-6 py-4 rounded-2xl bg-green-500/10 border border-green-500/30 max-w-2xl">
              <Check className="w-5 h-5 text-green-400 mx-auto mb-2" />
              <p className="text-foreground font-medium">
                A maioria dos usuários percebe no primeiro mês para onde ia o dinheiro que "some".
              </p>
              <p className="text-foreground/60 text-sm mt-1">
                Normalmente entre R$ 200 e R$ 500 em gastos invisíveis.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 7. ANTES / DEPOIS ───────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              O que muda em <span className="text-gradient">30 dias.</span>
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
                    <span className="text-foreground/60">{item}</span>
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
                  "Registro em 10 segundos no WhatsApp que já está aberto",
                  "Sabe exatamente onde cada real foi parar — por categoria",
                  "Aviso antes de estourar — não depois",
                  '"Posso gastar R$ 180 este fim de semana" — com número real',
                  "Tudo automático, categorizado, sempre atualizado",
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

      {/* ── 8. DEPOIMENTOS ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que mudou pra <span className="text-gradient">quem usa:</span>
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
                className="rounded-2xl overflow-hidden border border-border/50 bg-[#0b141a]"
              >
                {/* Contact header */}
                <div className="flex items-center gap-3 px-5 py-4 bg-[#202c33] border-b border-[#2a3942]">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-foreground font-bold text-sm flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-xs text-[#8696a0]">{t.role} · {t.time}</p>
                  </div>
                  <MessageCircle className="w-4 h-4 text-[#8696a0] ml-auto" />
                </div>

                {/* Chat body */}
                <div className="px-4 py-5">
                  {/* Stars */}
                  <div className="flex justify-end mb-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>

                  {/* Message bubble */}
                  <div className="flex justify-end">
                    <div
                      className="relative px-4 py-3 max-w-[85%] rounded-xl rounded-tr-none"
                      style={{ backgroundColor: "#005c4b" }}
                    >
                      <p className="text-white text-sm leading-relaxed">"{t.text}"</p>
                      <div className="flex items-center justify-end gap-1 mt-2">
                        <span className="text-[11px] text-white/50">{t.sent}</span>
                        <CheckCheck className="w-4 h-4 text-[#53bdeb]" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. PRICING ──────────────────────────────────────────────────────── */}
      <section id="pricing" ref={pricingRef} className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Invista menos do que você provavelmente gasta{" "}
              <span className="text-gradient">por mês com delivery.</span>
            </h2>
            <p className="text-foreground/60 text-lg mb-6">
              A maioria dos usuários identifica no primeiro mês pelo menos R$ 200 em gastos desnecessários que não sabia que tinha.
            </p>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary/10 border border-secondary/30">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-secondary font-semibold text-sm">Preço de lançamento — vai subir em breve</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Mensal */}
            <div className="pricing-card animate-fade-in">
              <h3 className="text-xl font-semibold mb-2 text-foreground">Mensal</h3>
              <div className="mb-1">
                <span className="text-sm text-foreground/40 line-through">R$ 49,90</span>
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-foreground">R$ 34,90</span>
                <span className="text-foreground/60">/mês</span>
              </div>
              <ul className="space-y-3 mb-8">
                {planFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-foreground/60">
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
                Quero começar pelo mensal →
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
                <span className="text-sm text-foreground/40 line-through">R$ 598,80</span>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-foreground">R$ 287</span>
                <span className="text-foreground/60">/ano</span>
              </div>
              <p className="text-secondary font-semibold mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Economize mais de 52%
              </p>
              <ul className="space-y-3 mb-8">
                {planFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-foreground/60">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
                <li className="flex items-center gap-3 text-foreground font-medium">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span>Clareza garantida por 12 meses</span>
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

      {/* ── 10. GARANTIA ────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-card/30">
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
              7 dias para você ter certeza.{" "}
              <span className="text-gradient">Não gostou, devolvemos tudo.</span>
            </h2>

            <p className="text-foreground/60 max-w-xl mx-auto mb-2">
              Use a Athena por 7 dias completos. Se não ver clareza real nas suas finanças, é só mandar
              uma mensagem no WhatsApp e devolvemos 100% do que você pagou.
            </p>
            <p className="text-foreground/60 max-w-xl mx-auto mb-6">
              Sem formulário. Sem justificativa. Sem enrolação.
            </p>

            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-secondary/10 border border-secondary/30 text-secondary font-semibold">
              <Lock className="w-5 h-5" />
              Risco zero. Porque não fazemos sentido se não funcionar pra você.
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 11. FAQ ─────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
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
                  <AccordionContent className="text-foreground/60">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ── 12. CTA FINAL ───────────────────────────────────────────────────── */}
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
          <p className="text-xl text-foreground/60 mb-8">
            Junte-se às +2.500 pessoas que pararam de perder dinheiro sem saber por quê.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {[
              "Começa em minutos",
              "Sem app novo",
              "7 dias de garantia",
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
            Quero saber para onde meu dinheiro vai →
          </motion.button>

          <p className="mt-6 text-sm text-foreground/50">
            Sem cartão para testar. Cancele quando quiser. 7 dias de garantia total.
          </p>
        </motion.div>
      </section>

      {/* ── 13. FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="py-12 px-6 border-t border-border bg-card/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img src={athenaLogo} alt="Athena" className="h-8 w-auto" />
              </div>
              <p className="text-foreground/50 text-sm mb-4">
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
                  <Instagram className="w-5 h-5 text-foreground/50" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-foreground/50 hover:text-foreground transition-colors">Sobre nós</a></li>
                <li><a href="#como-funciona" className="text-foreground/50 hover:text-foreground transition-colors">Como funciona</a></li>
                <li><a href="#pricing" className="text-foreground/50 hover:text-foreground transition-colors">Preços</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-foreground/50 hover:text-foreground transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="text-foreground/50 hover:text-foreground transition-colors">Privacidade</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-6 text-center">
            <p className="text-foreground/40 text-sm">© 2025 Athena Tecnologia. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

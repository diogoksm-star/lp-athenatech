import { motion } from "framer-motion";
import {
  Sparkles,
  LayoutDashboard,
  Bell,
  BarChart3,
  TrendingUp,
  Target,
  Eye,
  Scissors,
  Brain,
  ChevronDown,
  Check,
  Shield,
  MessageCircle,
  Smartphone,
  Send,
  Bot,
  PieChart,
  Gift,
  Users,
  Star,
  Clock,
  Briefcase,
  GraduationCap,
  Home,
  ArrowRight,
  Zap,
  Lock,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  X,
  BadgeCheck,
  Flame,
  Heart,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackEvent, trackCustomEvent } from "@/lib/pixel";

// External image links for faster loading
const macbookMockup = "https://i.imgur.com/tg0fFKQ.png";
const demoGif = "https://i.imgur.com/5Ed7Vi9.gif";

const features = [
  {
    icon: Sparkles,
    title: "Clareza Financeira Automática",
    description: "Registre qualquer gasto com foto, áudio ou texto. A Athena organiza tudo sozinha.",
  },
  {
    icon: LayoutDashboard,
    title: "Painel 360°",
    description: "Entradas, saídas, categorias, padrões e tendências em uma visão completa.",
  },
  {
    icon: Bell,
    title: "Alertas Inteligentes",
    description: "Contas, vencimentos, riscos e insights diários direto no seu WhatsApp.",
  },
  {
    icon: BarChart3,
    title: "Relatórios Personalizados",
    description: "Gráficos claros para decisões mais inteligentes.",
  },
  {
    icon: TrendingUp,
    title: "Controle de Investimentos",
    description: "Acompanhamento simples e direto do seu patrimônio.",
  },
  {
    icon: Target,
    title: "Metas e Progresso",
    description: "Visual de avanço automático para suas conquistas financeiras.",
  },
];

const benefits = [
  {
    icon: Eye,
    title: "Você passa a enxergar o que antes era invisível",
    description: "Cada centavo ganha visibilidade. Adeus surpresas no fim do mês.",
  },
  {
    icon: Scissors,
    title: "Você elimina desperdícios sem esforço",
    description: "A Athena identifica padrões e te mostra onde cortar sem dor.",
  },
  {
    icon: Brain,
    title: "Você toma decisões com clareza, não emoção",
    description: "Dados reais no lugar de achismos. Seu dinheiro agradece.",
  },
];

const planFeatures = [
  "Registro ilimitado",
  "Dashboard Premium",
  "Alertas inteligentes",
  "Insights diários",
  "Relatórios completos",
  "Suporte técnico",
];

const bonuses = [
  {
    icon: BarChart3,
    title: "Relatório mensal de hábitos",
    description: "Análise completa dos seus padrões financeiros todo mês.",
  },
  {
    icon: Target,
    title: "Plano de metas personalizado",
    description: "Metas criadas especificamente para sua realidade.",
  },
  {
    icon: MessageCircle,
    title: "Suporte prioritário no WhatsApp",
    description: "Atendimento rápido sempre que precisar.",
  },
];

const testimonials = [
  {
    name: "Carolina S.",
    role: "Empreendedora",
    avatar: "CS",
    text: "Em 2 semanas eu já tinha clareza total de para onde meu dinheiro ia. Nunca foi tão fácil me organizar!",
    rating: 5,
  },
  {
    name: "Ricardo M.",
    role: "Autônomo",
    avatar: "RM",
    text: "A Athena salvou minha vida financeira. Hoje sei exatamente quanto posso gastar e investir todo mês.",
    rating: 5,
  },
  {
    name: "Juliana P.",
    role: "Professora",
    avatar: "JP",
    text: "Finalmente consegui sair do vermelho. Os alertas da Athena me ajudam a não esquecer nenhuma conta.",
    rating: 5,
  },
];

const targetAudience = [
  {
    icon: Briefcase,
    title: "Autônomos e Freelancers",
    description: "Que perdem tempo com planilhas e precisam de organização automática.",
  },
  {
    icon: Home,
    title: "Famílias",
    description: "Que querem organização financeira sem complicação no dia a dia.",
  },
  {
    icon: Users,
    title: "Empreendedores e MEIs",
    description: "Que precisam separar finanças pessoais e do negócio com clareza.",
  },
  {
    icon: GraduationCap,
    title: "Quem quer começar a investir",
    description: "Mas não sabe quanto sobra no fim do mês para aplicar.",
  },
];

const faqs = [
  {
    question: "Meus dados financeiros estão seguros?",
    answer: "Absolutamente. Utilizamos criptografia de ponta a ponta e seguimos os mais rígidos padrões de segurança. Seus dados nunca são compartilhados com terceiros.",
  },
  {
    question: "E se eu não souber usar tecnologia?",
    answer: "A Athena foi feita para ser simples. Se você usa WhatsApp, você já sabe usar a Athena. Basta enviar uma mensagem, foto ou áudio e pronto.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer: "Sim, sem burocracia. Você pode cancelar a qualquer momento diretamente pelo WhatsApp. Sem multas, sem pegadinhas.",
  },
  {
    question: "Preciso ter disciplina?",
    answer: "Não! A Athena foi criada justamente para quem não tem tempo ou energia para planilhas. Ela faz o trabalho pesado por você.",
  },
  {
    question: "Funciona mesmo no WhatsApp?",
    answer: "Sim! Toda a experiência acontece no WhatsApp. Você não precisa baixar nenhum app adicional. É organização financeira onde você já está.",
  },
  {
    question: "Quanto tempo leva para ver resultados?",
    answer: "A maioria dos usuários percebe clareza financeira já na primeira semana. Em 30 dias, você terá uma visão completa dos seus padrões de gastos.",
  },
  {
    question: "A Athena funciona para empresas também?",
    answer: "A Athena é ideal para MEIs e autônomos. Para empresas maiores, entre em contato para soluções personalizadas.",
  },
  {
    question: "Preciso cadastrar minha conta bancária?",
    answer: "Não! A Athena funciona apenas com os dados que você envia. Não acessamos suas contas bancárias. Você tem total controle.",
  },
];

const howItWorks = [
  {
    step: 1,
    icon: Smartphone,
    title: "Envie pelo WhatsApp",
    description: "Foto de cupom, áudio explicando o gasto, ou texto simples. Como preferir.",
  },
  {
    step: 2,
    icon: Bot,
    title: "Athena organiza tudo",
    description: "Categorização automática, cálculos e organização sem você fazer nada.",
  },
  {
    step: 3,
    icon: PieChart,
    title: "Receba insights",
    description: "Relatórios, alertas e dicas personalizadas direto no seu WhatsApp.",
  },
];

const beforeAfter = {
  before: [
    "Surpresas no fim do mês",
    "Contas esquecidas e juros",
    "Sem saber para onde o dinheiro vai",
    "Estresse com finanças",
    "Decisões por impulso",
  ],
  after: [
    "Clareza total de cada centavo",
    "Alertas antes do vencimento",
    "Visão completa do seu dinheiro",
    "Paz e controle financeiro",
    "Decisões com dados reais",
  ],
};

export const SalesPage = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToPlans = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section - Aprimorado */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] opacity-30 pointer-events-none" style={{ background: "radial-gradient(circle, hsl(244 100% 63% / 0.4), transparent 60%)" }} />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-4"
          >
            <BadgeCheck className="w-4 h-4 text-secondary" />
            <span className="text-sm text-foreground">Sistema Personalizado para Você</span>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 mb-8 ml-2"
          >
            <Users className="w-4 h-4 text-secondary" />
            <span className="text-sm text-secondary">+2.500 pessoas já organizadas</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Seu sistema financeiro inteligente{" "}
            <span className="text-gradient">está pronto.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10">
            Clareza total, todos os dias, direto no WhatsApp.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              trackCustomEvent('ClickCTA', { location: 'hero' });
              scrollToPlans();
            }}
            className="athena-button text-foreground text-xl px-12 py-5"
          >
            Começar Agora →
          </motion.button>

          {/* Hero Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 w-full max-w-4xl mx-auto"
          >
            <img 
              src={macbookMockup} 
              alt="Athena - Sistema financeiro no MacBook e celulares" 
              className="w-full h-auto drop-shadow-2xl"
              style={{ filter: "drop-shadow(0 25px 50px hsl(244 100% 63% / 0.3))" }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-muted-foreground animate-bounce" />
        </motion.div>
      </section>

      {/* 2. Prova Social Rápida */}
      <section className="py-12 px-6 border-y border-border/50 bg-card/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-2xl md:text-4xl font-bold text-gradient">R$ 50M+</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">já organizados</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <p className="text-2xl md:text-4xl font-bold text-gradient">2.500+</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">usuários ativos</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-1">
                <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 fill-yellow-400" />
                <p className="text-2xl md:text-4xl font-bold text-gradient">4.9</p>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">avaliação média</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Mockup do Produto */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(ellipse at top, hsl(188 100% 50% / 0.3), transparent 60%)" }} />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Veja a <span className="text-gradient">Athena</span> em ação
            </h2>
            <p className="text-muted-foreground text-lg">
              Organização financeira simples, direto no seu WhatsApp
            </p>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mb-12"
          >
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-72 md:w-80 bg-card rounded-[3rem] p-3 border-4 border-border shadow-2xl" style={{ boxShadow: "0 25px 60px -12px hsl(244 100% 63% / 0.4)" }}>
                {/* Phone Screen with GIF */}
                <div className="bg-background rounded-[2.5rem] overflow-hidden min-h-[500px]">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover rounded-[2.5rem]"
                  >
                    <source src="https://i.imgur.com/5Ed7Vi9.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
              
              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -left-4 md:-left-32 top-20 bg-card rounded-2xl p-4 border border-border shadow-xl hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <PieChart className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Este mês</p>
                    <p className="font-bold text-foreground">R$ 2.450,00</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -right-4 md:-right-32 top-40 bg-card rounded-2xl p-4 border border-border shadow-xl hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Economia</p>
                    <p className="font-bold text-green-400">+R$ 380</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -right-4 md:-right-24 bottom-20 bg-card rounded-2xl p-4 border border-border shadow-xl hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Alerta</p>
                    <p className="font-bold text-foreground text-sm">Conta de luz vence amanhã</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que vem dentro da <span className="text-gradient">Athena</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Tudo que você precisa para clareza financeira total
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="athena-card group hover:border-primary/50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  <feature.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Como Funciona */}
      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Como <span className="text-gradient">funciona</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Simples assim. Em 3 passos você tem clareza total.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-30" />
            
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center relative"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6 relative z-10" style={{ boxShadow: "0 0 40px hsl(244 100% 63% / 0.4)" }}>
                  <item.icon className="w-10 h-10 text-foreground" />
                </div>
                <div className="absolute -top-2 -right-2 md:right-auto md:left-1/2 md:ml-8 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Antes vs Depois */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              A transformação que <span className="text-gradient">você merece</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="athena-card border-red-500/30 bg-red-500/5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <X className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-red-400">Sem Athena</h3>
              </div>
              <ul className="space-y-4">
                {beforeAfter.before.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="athena-card border-green-500/30 bg-green-500/5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-green-400">Com Athena</h3>
              </div>
              <ul className="space-y-4">
                {beforeAfter.after.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. Benefits Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(ellipse at center, hsl(188 100% 50% / 0.2), transparent 70%)" }} />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que muda na sua vida
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6 shadow-lg" style={{ boxShadow: "0 0 40px hsl(244 100% 63% / 0.3)" }}>
                  <benefit.icon className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Bônus Inclusos */}
      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 mb-6">
              <Gift className="w-4 h-4 text-secondary" />
              <span className="text-sm text-secondary font-semibold">BÔNUS EXCLUSIVOS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              E você ainda leva <span className="text-gradient">tudo isso</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Sem custo adicional, incluído em todos os planos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bonuses.map((bonus, index) => (
              <motion.div
                key={bonus.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="athena-card group border-secondary/30 hover:border-secondary/50"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/30 transition-colors">
                    <bonus.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">{bonus.title}</h3>
                    <p className="text-muted-foreground text-sm">{bonus.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Depoimentos */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que dizem sobre a <span className="text-gradient">Athena</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Histórias reais de transformação financeira
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="athena-card"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-foreground font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Para Quem é a Athena */}
      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              A Athena é para <span className="text-gradient">você?</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Se você se identifica com algum desses perfis, sim!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {targetAudience.map((audience, index) => (
              <motion.div
                key={audience.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="athena-card flex items-start gap-4"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <audience.icon className="w-7 h-7 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{audience.title}</h3>
                  <p className="text-muted-foreground">{audience.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Pricing Section - Aprimorado */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Escolha seu plano
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Investimento que se paga no primeiro mês
            </p>
            
            {/* Urgency Timer */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-red-500/10 border border-red-500/30"
            >
              <Flame className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-semibold">Oferta expira em:</span>
              <div className="flex items-center gap-1 font-mono font-bold text-foreground">
                <span className="bg-card px-2 py-1 rounded">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span>:</span>
                <span className="bg-card px-2 py-1 rounded">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span>:</span>
                <span className="bg-card px-2 py-1 rounded">{String(timeLeft.seconds).padStart(2, '0')}</span>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Monthly Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pricing-card"
            >
              <h3 className="text-xl font-semibold mb-2 text-foreground">Mensal</h3>
              <div className="mb-1">
                <span className="text-sm text-muted-foreground line-through">R$ 49,90</span>
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-foreground">R$ 34,90</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <ul className="space-y-3 mb-8">
                {planFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a 
                href="https://pay.hotmart.com/W102950871U?off=6jeru4fn&bid=1765464759738"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('InitiateCheckout', { 
                  content_name: 'Plano Mensal', 
                  value: 34.90, 
                  currency: 'BRL' 
                })}
                className="block w-full py-4 rounded-2xl border-2 border-primary text-foreground font-semibold hover:bg-primary/10 transition-colors text-center"
              >
                Começar agora →
              </a>
            </motion.div>

            {/* Annual Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="pricing-card featured relative"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold">
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
                {planFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-secondary" />
                    <span>{feature}</span>
                  </li>
                ))}
                <li className="flex items-center gap-3 text-foreground font-medium">
                  <Check className="w-5 h-5 text-secondary" />
                  <span>Clareza garantida por 12 meses</span>
                </li>
                <li className="flex items-center gap-3 text-foreground font-medium">
                  <Check className="w-5 h-5 text-secondary" />
                  <span>Todos os bônus inclusos</span>
                </li>
              </ul>
              <a 
                href="https://pay.hotmart.com/W102950871U?off=tglbzob2&bid=1764979505775"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('InitiateCheckout', { 
                  content_name: 'Plano Anual', 
                  value: 287.00, 
                  currency: 'BRL' 
                })}
                className="athena-button w-full text-foreground block text-center"
              >
                Garantir Plano Anual →
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 12. Garantia de 7 Dias */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="athena-card text-center border-secondary/30 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
            
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center mx-auto mb-6" style={{ boxShadow: "0 0 60px hsl(188 100% 50% / 0.4)" }}>
              <Shield className="w-12 h-12 text-foreground" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Garantia de <span className="text-gradient">7 Dias</span>
            </h2>
            
            <p className="text-xl text-foreground mb-4">
              100% do seu dinheiro de volta
            </p>
            
            <p className="text-muted-foreground max-w-xl mx-auto">
              Se dentro de 7 dias você não sentir que a Athena está transformando sua vida financeira, 
              basta enviar uma mensagem e devolvemos cada centavo. Sem perguntas, sem burocracia.
            </p>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-secondary">
              <Lock className="w-5 h-5" />
              <span className="font-semibold">Compra 100% segura</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 13. FAQ Section - Expandido */}
      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-muted-foreground">
              Ainda tem dúvidas? Encontre as respostas aqui.
            </p>
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
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* 14. CTA Final - Aprimorado */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at bottom, hsl(244 100% 63% / 0.3), transparent 70%)" }} />
        
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
            Comece hoje — e veja sua vida financeira destravar em semanas.
          </p>
          
          {/* Mini Benefits Recap */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <Eye className="w-4 h-4 text-secondary" />
              <span className="text-sm text-foreground">Clareza total</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <Zap className="w-4 h-4 text-secondary" />
              <span className="text-sm text-foreground">100% automático</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <Shield className="w-4 h-4 text-secondary" />
              <span className="text-sm text-foreground">Garantia 7 dias</span>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              trackCustomEvent('ClickCTA', { location: 'final' });
              scrollToPlans();
            }}
            className="athena-button text-foreground text-xl px-16 py-6"
          >
            Quero Clareza Financeira →
          </motion.button>
          
          <p className="mt-6 text-sm text-muted-foreground">
            Junte-se a +2.500 pessoas que já transformaram suas finanças
          </p>
        </motion.div>
      </section>

      {/* 15. Footer - Aprimorado */}
      <footer className="py-12 px-6 border-t border-border bg-card/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Athena</span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Organização e clareza financeira automatizada via WhatsApp. 
                Transforme sua relação com o dinheiro de forma simples e inteligente.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary transition-colors">
                  <Instagram className="w-5 h-5 text-muted-foreground" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary transition-colors">
                  <Twitter className="w-5 h-5 text-muted-foreground" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary transition-colors">
                  <Linkedin className="w-5 h-5 text-muted-foreground" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Sobre nós</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Como funciona</a></li>
                <li><a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Preços</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Termos de uso</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Política de privacidade</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Suporte</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Athena. Todos os direitos reservados.
            </p>
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

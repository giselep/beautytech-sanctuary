import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-spa.webp";

const WHATSAPP_LINK = "https://wa.me/351931670667";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="BeautyTech — Estética avançada em Braga"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/20" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-body font-medium text-primary-foreground/90">
              Estética Avançada em Braga
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6"
          >
            <span className="text-primary-foreground">A sua beleza,</span>
            <br />
            <span className="text-primary">elevada pela</span>
            <br />
            <span className="text-primary-foreground italic">tecnologia</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body text-lg sm:text-xl text-primary-foreground/70 mb-10 max-w-lg leading-relaxed"
          >
            Tratamentos de estética corporal e facial com tecnologia de ponta em Braga.
            Cuide de si com quem entende de beleza.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#tratamentos"
              className="inline-flex items-center justify-center gap-2 bg-gradient-hero text-primary-foreground px-8 py-4 rounded-full text-base font-semibold font-body hover:opacity-90 transition-all hover:scale-105 shadow-lg"
            >
              Ver Tratamentos
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-full text-base font-semibold font-body hover:bg-primary-foreground/10 transition-all backdrop-blur-sm"
            >
              Agendar Consulta
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-6 h-6 text-primary-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
import { motion } from "framer-motion";
import { Tag, Sparkles, CreditCard, Gift, ArrowRight } from "lucide-react";
import promocoesImg from "@/assets/promocoes.jpeg";

const highlights = [
  { icon: CreditCard, label: "MB WAY & Cartão" },
  { icon: Tag, label: "Até 50% desconto" },
  { icon: Sparkles, label: "3x Sem Juros" },
  { icon: Gift, label: "Packs Exclusivos" },
];

const PromotionsSection = () => {
  return (
    <section id="promocoes" className="section-padding bg-gradient-soft relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block font-body text-sm font-semibold tracking-widest uppercase text-primary mb-3">
              Ofertas Especiais
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Promoções{" "}
              <span className="text-gradient">Imperdíveis</span>
            </h2>
            <p className="font-body text-muted-foreground text-lg mb-8 leading-relaxed">
              Packs exclusivos com descontos especiais e pagamento parcelado em 3x sem juros.
              As nossas clientes merecem o melhor ao melhor preço.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3 bg-card rounded-2xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-body text-sm font-medium text-foreground">{item.label}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://pt.zappysoftware.com/m/BEAUTYTECH"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-body font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                Compre Já
                <ArrowRight className="w-4 h-4" />
              </a>
              <p className="font-body text-xs text-muted-foreground self-center">
                Promoções por tempo limitado
              </p>
            </div>
          </motion.div>

          {/* Right: Image with QR codes */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border bg-card">
              <div className="bg-gradient-hero px-5 py-3 flex items-center justify-center gap-2">
                <span className="text-xl">📱</span>
                <p className="font-display text-base font-bold text-primary-foreground">
                  Leia o QR Code para comprar
                </p>
              </div>
              <img
                src={promocoesImg}
                alt="Promoções BeautyTech - Packs com desconto e pagamento parcelado 3x sem juros em Braga"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground rounded-2xl px-5 py-3 shadow-lg font-body text-sm font-bold hidden sm:block">
              🔥 Até 50% OFF
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PromotionsSection;

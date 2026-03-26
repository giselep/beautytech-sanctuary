import { motion } from "framer-motion";
import { Tag, Sparkles, CreditCard } from "lucide-react";
import promocoesImg from "@/assets/promocoes.jpeg";

const PromotionsSection = () => {
  return (
    <section id="promocoes" className="section-padding bg-gradient-soft">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block font-body text-sm font-semibold tracking-widest uppercase text-primary mb-3">
            Ofertas Especiais
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Promoções <span className="text-gradient">Imperdíveis</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            Pagamento parcelado 3x sem juros. As nossas clientes merecem o melhor ao melhor preço.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2">
              <CreditCard className="w-4 h-4 text-primary" />
              <span className="font-body text-sm text-foreground font-medium">MB WAY & Cartão</span>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2">
              <Tag className="w-4 h-4 text-primary" />
              <span className="font-body text-sm text-foreground font-medium">Até 50% desconto</span>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-body text-sm text-foreground font-medium">3x Sem Juros</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="rounded-3xl overflow-hidden shadow-xl border border-border bg-card">
            <div className="bg-gradient-hero p-4 text-center">
              <p className="font-display text-lg font-bold text-primary-foreground">
                📱 Leia o QR Code para comprar diretamente
              </p>
            </div>
            <img
              src={promocoesImg}
              alt="Promoções BeautyTech - Packs com desconto e pagamento parcelado 3x sem juros em Braga"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-6 font-body text-sm text-muted-foreground"
        >
          Promoções válidas por tempo limitado. Entre em contacto pelo{" "}
          <a
            href="https://wa.me/351931670667"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:underline"
          >
            WhatsApp
          </a>{" "}
          para mais informações.
        </motion.p>
      </div>
    </section>
  );
};

export default PromotionsSection;

import { motion } from "framer-motion";
import { MessageCircle, Calendar } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/351931670667";

const CTABanner = () => {
  return (
    <section className="section-padding bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>
      
      <div className="container mx-auto relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Pronta para se transformar?
          </h2>
          <p className="font-body text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Agende a sua consulta gratuita e descubra o tratamento perfeito para si.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary px-8 py-4 rounded-full text-base font-semibold font-body hover:bg-primary-foreground/90 transition-all hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground/40 text-primary-foreground px-8 py-4 rounded-full text-base font-semibold font-body hover:bg-primary-foreground/10 transition-all"
            >
              <Calendar className="w-5 h-5" />
              Agendar Consulta
            </a>
          </div>
          <p className="font-body text-sm text-primary-foreground/50 mt-6">
            Facilidades de pagamento disponíveis • Consulta gratuita
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
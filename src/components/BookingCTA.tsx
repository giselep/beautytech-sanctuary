import { motion } from "framer-motion";
import { CalendarDays, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const BookingCTA = () => {
  return (
    <section className="section-padding bg-gradient-soft relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-gold/10 blur-2xl" />

      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Agende o Seu Tratamento
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto mb-8">
            Escolha o melhor horário para si e garanta já o seu momento de cuidado e bem-estar.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {[
              { icon: CalendarDays, text: "Agendamento online 24h" },
              { icon: Clock, text: "Confirmação imediata" },
              { icon: Shield, text: "Cancelamento flexível" },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                <Icon className="w-4 h-4 text-primary" />
                {text}
              </div>
            ))}
          </div>

          <Link
            to="/agendar"
            className="inline-flex items-center gap-2 bg-gradient-hero text-primary-foreground px-10 py-4 rounded-full text-lg font-semibold font-body hover:opacity-90 transition-all hover:scale-105 shadow-lg"
          >
            <CalendarDays className="w-5 h-5" />
            Agendar Agora
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingCTA;

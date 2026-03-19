import { motion } from "framer-motion";
import { Award, Heart, Zap, Shield } from "lucide-react";

const features = [
  { icon: Zap, title: "Tecnologia Avançada", desc: "Equipamentos de última geração para resultados superiores" },
  { icon: Heart, title: "Cuidado Personalizado", desc: "Cada tratamento adaptado às suas necessidades" },
  { icon: Award, title: "Profissionais Certificados", desc: "Equipa especializada e em formação contínua" },
  { icon: Shield, title: "Segurança Total", desc: "Protocolos rigorosos e produtos de alta qualidade" },
];

const AboutSection = () => {
  return (
    <section id="sobre" className="section-padding">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block font-body text-sm font-semibold tracking-widest uppercase text-primary mb-3">
              Sobre Nós
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Com as técnicas avançadas de hoje, <span className="text-gradient italic">a idade não existe</span>
            </h2>
            <p className="font-body text-muted-foreground text-lg leading-relaxed mb-4">
              Na BeautyTech, transformamos cuidado e inovação numa experiência que celebra a beleza atemporal em cada detalhe.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Combinamos as mais avançadas tecnologias estéticas com protocolos personalizados para oferecer tratamentos corporais, faciais e capilares que realmente fazem a diferença. Cada sessão é pensada para si.
            </p>
            <p className="font-display text-lg italic text-primary">
              — Helena Cabral, Sócia Gerente
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-soft p-6 rounded-2xl border border-border hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-base font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

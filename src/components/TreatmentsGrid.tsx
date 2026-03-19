import { motion } from "framer-motion";
import { categories } from "@/data/treatments";
import CategoryCard from "./CategoryCard";

const TreatmentsGrid = () => {
  return (
    <section id="tratamentos" className="section-padding bg-gradient-soft">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block font-body text-sm font-semibold tracking-widest uppercase text-primary mb-3">
            Os Nossos Tratamentos
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Descubra a sua <span className="text-gradient">melhor versão</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Tecnologia de ponta combinada com cuidado personalizado para resultados extraordinários.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.slug} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TreatmentsGrid;

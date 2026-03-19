import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Euro } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories, getTreatmentsByCategory } from "@/data/treatments";
import { getImage } from "@/components/CategoryCard";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find((c) => c.slug === slug);
  const catTreatments = getTreatmentsByCategory(slug || "");

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-body text-muted-foreground">Categoria não encontrada.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-20">
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <img
            src={getImage(category.image)}
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-charcoal/30" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            <div className="container mx-auto">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary transition-colors font-body text-sm mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar ao início
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{category.icon}</span>
                <div>
                  <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground">
                    {category.name}
                  </h1>
                  <p className="font-body text-primary-foreground/60 mt-1">{category.subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments list */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {catTreatments.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={`/tratamento/${t.id}`}
                  className="group block bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all hover:shadow-lg"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={getImage(t.image)}
                      alt={t.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {t.name}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground line-clamp-2 mb-4">
                      {t.shortDescription}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm font-body text-muted-foreground">
                        {t.duration && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {t.duration}
                          </span>
                        )}
                      </div>
                      <span className="font-display font-bold text-primary text-lg">
                        {t.price}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;

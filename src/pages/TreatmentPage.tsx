import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Check, Phone, CreditCard } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import { getTreatmentById, getTreatmentsByCategory } from "@/data/treatments";
import { getImage } from "@/components/CategoryCard";

const TreatmentPage = () => {
  const { id } = useParams<{ id: string }>();
  const treatment = getTreatmentById(id || "");

  if (!treatment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-body text-muted-foreground">Tratamento não encontrado.</p>
      </div>
    );
  }

  const relatedTreatments = getTreatmentsByCategory(treatment.categorySlug)
    .filter((t) => t.id !== treatment.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-20">
        {/* Hero image */}
        <div className="relative h-72 sm:h-96 overflow-hidden">
          <img
            src={getImage(treatment.image)}
            alt={treatment.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            <div className="container mx-auto">
              <Link
                to={`/categoria/${treatment.categorySlug}`}
                className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary transition-colors font-body text-sm mb-3"
              >
                <ArrowLeft className="w-4 h-4" />
                {treatment.category}
              </Link>
              <h1 className="font-display text-3xl sm:text-5xl font-bold text-primary-foreground">
                {treatment.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <section className="section-padding">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Main content */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    Sobre o tratamento
                  </h2>
                  <p className="font-body text-muted-foreground text-lg leading-relaxed mb-8">
                    {treatment.fullDescription}
                  </p>

                  {/* Benefits */}
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">
                    Benefícios
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {treatment.benefits.map((b, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 p-3 rounded-xl bg-soft-pink"
                      >
                        <div className="w-5 h-5 rounded-full bg-gradient-hero flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary-foreground" />
                        </div>
                        <span className="font-body text-sm text-foreground">{b}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Sub-treatments / price table */}
                  {treatment.subTreatments && treatment.subTreatments.length > 0 && (
                    <>
                      <h3 className="font-display text-xl font-bold text-foreground mb-4">
                        Tabela de Preços
                      </h3>
                      <div className="rounded-2xl border border-border overflow-hidden mb-8">
                        {treatment.subTreatments.map((sub, i) => (
                          <div
                            key={i}
                            className={`flex items-center justify-between px-5 py-3.5 font-body ${
                              i % 2 === 0 ? "bg-soft-pink" : "bg-background"
                            }`}
                          >
                            <span className="text-foreground text-sm">{sub.name}</span>
                            <span className="font-display font-bold text-primary">{sub.price}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="sticky top-24 space-y-6"
                >
                  {/* Price card */}
                  <div className="bg-gradient-soft rounded-2xl border border-border p-6">
                    <div className="text-center mb-6">
                      {treatment.priceNote && (
                        <p className="font-body text-sm text-muted-foreground line-through mb-1">
                          {treatment.priceNote}
                        </p>
                      )}
                      <p className="font-display text-4xl font-bold text-gradient mb-1">
                        {treatment.price}
                      </p>
                      {treatment.duration && (
                        <p className="font-body text-sm text-muted-foreground flex items-center justify-center gap-1">
                          <Clock className="w-4 h-4" />
                          {treatment.duration}
                        </p>
                      )}
                    </div>

                    <a
                      href="tel:+351914997187"
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-hero text-primary-foreground px-6 py-4 rounded-full text-base font-semibold font-body hover:opacity-90 transition-all hover:scale-105 shadow-lg mb-3"
                    >
                      <Phone className="w-5 h-5" />
                      Agendar Agora
                    </a>

                    <p className="text-center font-body text-xs text-muted-foreground flex items-center justify-center gap-1 mt-3">
                      <CreditCard className="w-3.5 h-3.5" />
                      Facilidades de pagamento disponíveis
                    </p>
                  </div>

                  {/* Contact info */}
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h4 className="font-display font-semibold text-foreground mb-3">Contacto</h4>
                    <div className="space-y-2 font-body text-sm text-muted-foreground">
                      <p>📞 +351 914 997 187</p>
                      <p>📞 +351 931 670 667</p>
                      <p>📍 Liberty Fitness Center</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Related treatments */}
            {relatedTreatments.length > 0 && (
              <div className="mt-16 pt-10 border-t border-border">
                <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                  Outros tratamentos de {treatment.category}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedTreatments.map((t) => (
                    <Link
                      key={t.id}
                      to={`/tratamento/${t.id}`}
                      className="group block bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all"
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={getImage(t.image)}
                          alt={t.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                          {t.name}
                        </h4>
                        <p className="font-display font-bold text-primary mt-1">{t.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      <CTABanner />
      <Footer />
    </div>
  );
};

export default TreatmentPage;

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Check, CreditCard, CalendarDays, ShoppingBag, Gift } from "lucide-react";
import TreatmentSections from "@/components/TreatmentSections";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import { getTreatmentById, getTreatmentsByCategory } from "@/data/treatments";
import { getImage } from "@/components/CategoryCard";
import { treatmentPriceMap, subTreatmentPriceMap } from "@/data/stripe-prices";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const TreatmentPage = () => {
  const { id } = useParams<{ id: string }>();
  const treatment = getTreatmentById(id || "");
  const [payLoading, setPayLoading] = useState(false);
  const [giftLoading, setGiftLoading] = useState(false);
  const [selectedSub, setSelectedSub] = useState<string>("");
  const { toast } = useToast();

  const hasSubPrices = treatment ? !!subTreatmentPriceMap[treatment.id] : false;
  const hasSinglePrice = treatment ? !!treatmentPriceMap[treatment.id] : false;

  const getSelectedPriceId = (): string | null => {
    if (!treatment) return null;
    if (hasSubPrices) {
      return subTreatmentPriceMap[treatment.id]?.[selectedSub] || null;
    }
    return treatmentPriceMap[treatment.id] || null;
  };

  const handlePayment = async (isGift: boolean) => {
    if (!treatment) return;

    if (hasSubPrices && !selectedSub) {
      toast({ title: "Selecione uma opção", description: "Escolha a zona/área antes de continuar.", variant: "destructive" });
      return;
    }

    const priceId = getSelectedPriceId();
    if (!priceId) {
      toast({ title: "Erro", description: "Pagamento não disponível para este tratamento.", variant: "destructive" });
      return;
    }

    isGift ? setGiftLoading(true) : setPayLoading(true);
    try {
      const treatmentLabel = hasSubPrices ? `${treatment.name} - ${selectedSub}` : treatment.name;
      const { data, error } = await supabase.functions.invoke("create-payment", {
        body: { priceId, treatmentName: treatmentLabel, isGift },
      });
      if (error) throw error;
      if (data?.url) window.open(data.url, "_blank");
    } catch {
      toast({ title: "Erro", description: "Não foi possível iniciar o pagamento.", variant: "destructive" });
    } finally {
      setPayLoading(false);
      setGiftLoading(false);
    }
  };

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

  // Parse price to number (e.g. "150€" -> 150, "A partir de 20€" -> 20)
  const parsePrice = (priceStr: string): number => {
    const match = priceStr.replace(/\s/g, "").match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  const currentPrice = hasSubPrices && selectedSub
    ? parsePrice(treatment.subTreatments?.find(s => s.name === selectedSub)?.price || "0")
    : parsePrice(treatment.price);

  const meetsMinimum = currentPrice >= 60;
  const canPay = hasSubPrices ? !!selectedSub : hasSinglePrice;

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

                  {/* Structured sections */}
                  {treatment.sections && treatment.sections.length > 0 && (
                    <div className="mb-8">
                      <TreatmentSections sections={treatment.sections} />
                    </div>
                  )}

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
                        {treatment.subTreatments.map((sub, i) => {
                          const isSelectable = hasSubPrices;
                          const isSelected = selectedSub === sub.name;
                          return (
                            <div
                              key={i}
                              onClick={isSelectable ? () => setSelectedSub(sub.name) : undefined}
                              className={`flex items-center justify-between px-5 py-3.5 font-body transition-all ${
                                isSelectable ? "cursor-pointer hover:bg-primary/5" : ""
                              } ${
                                isSelected
                                  ? "bg-primary/10 border-l-4 border-l-primary"
                                  : i % 2 === 0
                                  ? "bg-soft-pink"
                                  : "bg-background"
                              }`}
                            >
                              <span className={`text-sm ${isSelected ? "text-primary font-semibold" : "text-foreground"}`}>
                                {isSelectable && (
                                  <span className={`inline-block w-4 h-4 rounded-full border-2 mr-3 align-middle ${
                                    isSelected ? "bg-primary border-primary" : "border-muted-foreground/30"
                                  }`} />
                                )}
                                {sub.name}
                              </span>
                              <span className="font-display font-bold text-primary">{sub.price}</span>
                            </div>
                          );
                        })}
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

                    {/* Sub-treatment selector hint */}
                    {hasSubPrices && !selectedSub && (
                      <p className="text-center font-body text-xs text-amber-600 bg-amber-50 rounded-lg p-2 mb-3">
                        👆 Selecione uma zona na tabela de preços para comprar
                      </p>
                    )}

                    {hasSubPrices && selectedSub && (
                      <p className="text-center font-body text-sm text-primary font-semibold mb-3">
                        ✓ {selectedSub}
                      </p>
                    )}

                    <Link
                      to={`/agendar?tratamento=${treatment.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-hero text-primary-foreground px-6 py-4 rounded-full text-base font-semibold font-body hover:opacity-90 transition-all hover:scale-105 shadow-lg mb-3"
                    >
                      <CalendarDays className="w-5 h-5" />
                      Agendar Tratamento
                    </Link>

                    <button
                      onClick={() => handlePayment(false)}
                      disabled={payLoading || !canPay}
                      className="w-full inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-full text-sm font-semibold font-body hover:bg-primary hover:text-primary-foreground transition-all mb-3 disabled:opacity-50"
                    >
                      {payLoading ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <ShoppingBag className="w-4 h-4" />
                      )}
                      Comprar Online
                    </button>

                    <button
                      onClick={() => handlePayment(true)}
                      disabled={giftLoading || !canPay}
                      className="w-full inline-flex items-center justify-center gap-2 border border-gold text-gold px-6 py-3 rounded-full text-sm font-semibold font-body hover:bg-gold hover:text-primary-foreground transition-all disabled:opacity-50"
                    >
                      {giftLoading ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Gift className="w-4 h-4" />
                      )}
                      Oferecer de Presente
                    </button>

                    {meetsMinimum ? (
                      <p className="text-center font-body text-xs text-muted-foreground flex items-center justify-center gap-1 mt-3">
                        <CreditCard className="w-3.5 h-3.5" />
                        Facilidades de pagamento disponíveis
                      </p>
                    ) : (
                      <p className="text-center font-body text-xs text-muted-foreground flex items-center justify-center gap-1 mt-3">
                        <CreditCard className="w-3.5 h-3.5" />
                        Pagamento por cartão e MB WAY
                      </p>
                    )}
                  </div>

                  {/* Contact info */}
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h4 className="font-display font-semibold text-foreground mb-3">Contacto</h4>
                    <div className="space-y-2 font-body text-sm text-muted-foreground">
                      <p>
                        <a href="https://wa.me/351931670667" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                          📞 +351 931 670 667 (WhatsApp)
                        </a>
                      </p>
                      <p>📍 Liberty Fitness Center, Braga</p>
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

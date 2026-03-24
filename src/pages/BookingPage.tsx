import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { ArrowLeft, CalendarDays, CheckCircle2, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingCalendar from "@/components/BookingCalendar";
import BookingForm, { type BookingFormData } from "@/components/BookingForm";
import { treatments } from "@/data/treatments";
import { supabase } from "@/integrations/supabase/client";
import { parseDurationMinutes, formatWhatsAppMessage } from "@/lib/booking-utils";
import { useToast } from "@/hooks/use-toast";

const WHATSAPP_NUMBER = "351914997187";

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const treatmentId = searchParams.get("tratamento");
  const treatment = treatmentId ? treatments.find((t) => t.id === treatmentId) : null;

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  // If no treatment selected, show treatment picker
  const [selectedTreatmentId, setSelectedTreatmentId] = useState(treatmentId || "");
  const activeTreatment = treatment || treatments.find((t) => t.id === selectedTreatmentId);

  const handleBooking = async (formData: BookingFormData) => {
    if (!activeTreatment || !selectedDate || !selectedTime) {
      toast({ title: "Erro", description: "Preencha todos os campos.", variant: "destructive" });
      return;
    }

    setLoading(true);
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    const durationMinutes = parseDurationMinutes(activeTreatment.duration);

    const { error } = await supabase.from("bookings").insert({
      treatment_id: activeTreatment.id,
      treatment_name: activeTreatment.name,
      client_name: formData.name,
      client_email: formData.email,
      client_phone: formData.phone,
      booking_date: dateStr,
      booking_time: selectedTime,
      duration_minutes: durationMinutes,
    });

    if (error) {
      toast({ title: "Erro", description: "Não foi possível agendar. Tente novamente.", variant: "destructive" });
      setLoading(false);
      return;
    }

    // Send WhatsApp notification
    const formattedDate = format(selectedDate, "dd/MM/yyyy");
    const whatsappMsg = formatWhatsAppMessage({
      clientName: formData.name,
      clientPhone: formData.phone,
      treatmentName: activeTreatment.name,
      date: formattedDate,
      time: selectedTime,
    });
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`, "_blank");

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20 section-padding">
          <div className="container mx-auto max-w-lg text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-gradient-hero flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-3">
              Agendamento Confirmado!
            </h1>
            <p className="font-body text-muted-foreground mb-2">
              O seu tratamento <strong>{activeTreatment?.name}</strong> foi agendado com sucesso.
            </p>
            <p className="font-body text-muted-foreground mb-8">
              {selectedDate && format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: pt })} às {selectedTime}
            </p>
            <p className="font-body text-sm text-muted-foreground mb-8">
              Receberá um email de confirmação com todos os detalhes.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-gradient-hero text-primary-foreground px-8 py-3 rounded-full font-body font-semibold hover:opacity-90 transition-all"
            >
              Voltar ao Início
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        {/* Hero */}
        <div className="bg-gradient-soft py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body text-sm mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <CalendarDays className="w-8 h-8 text-primary" />
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                Agendar Tratamento
              </h1>
            </div>
            <p className="font-body text-muted-foreground max-w-xl">
              Escolha o tratamento, a data e o horário pretendido. Confirmamos o seu agendamento de imediato.
            </p>
          </div>
        </div>

        <section className="section-padding">
          <div className="container mx-auto max-w-4xl">
            {/* Treatment selector (if not pre-selected) */}
            {!activeTreatment && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h2 className="font-display text-xl font-bold text-foreground mb-4">
                  <Sparkles className="w-5 h-5 inline text-primary mr-2" />
                  Selecione o tratamento
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {treatments.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTreatmentId(t.id)}
                      className={`text-left p-4 rounded-2xl border transition-all font-body ${
                        selectedTreatmentId === t.id
                          ? "border-primary bg-soft-pink shadow-md"
                          : "border-border bg-card hover:border-primary/30"
                      }`}
                    >
                      <p className="font-display font-semibold text-foreground text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {t.duration} • {t.price}
                      </p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTreatment && (
              <>
                {/* Selected treatment info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-soft-pink rounded-2xl p-4 mb-8 flex items-center justify-between"
                >
                  <div>
                    <p className="font-display font-bold text-foreground">{activeTreatment.name}</p>
                    <p className="font-body text-sm text-muted-foreground">
                      {activeTreatment.duration} • {activeTreatment.price}
                    </p>
                  </div>
                  {!treatment && (
                    <button
                      onClick={() => setSelectedTreatmentId("")}
                      className="font-body text-sm text-primary hover:underline"
                    >
                      Alterar
                    </button>
                  )}
                </motion.div>

                {/* Step 1: Calendar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-8"
                >
                  <h2 className="font-display text-xl font-bold text-foreground mb-4">
                    1. Escolha a data e horário
                  </h2>
                  <BookingCalendar
                    treatmentId={activeTreatment.id}
                    treatmentName={activeTreatment.name}
                    duration={activeTreatment.duration}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    onDateSelect={(d) => {
                      setSelectedDate(d);
                      setSelectedTime(undefined);
                    }}
                    onTimeSelect={setSelectedTime}
                  />
                </motion.div>

                {/* Step 2: Client info */}
                {selectedDate && selectedTime && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md"
                  >
                    <h2 className="font-display text-xl font-bold text-foreground mb-4">
                      2. Os seus dados
                    </h2>
                    <div className="bg-card rounded-2xl border border-border p-6">
                      <BookingForm onSubmit={handleBooking} loading={loading} />
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;

import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Gift, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const treatmentName = searchParams.get("tratamento") || "Tratamento";
  const isGift = searchParams.get("gift") === "true";

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
            {isGift ? (
              <Gift className="w-10 h-10 text-primary-foreground" />
            ) : (
              <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
            )}
          </motion.div>

          <h1 className="font-display text-3xl font-bold text-foreground mb-3">
            {isGift ? "Voucher de Presente Criado!" : "Pagamento Confirmado!"}
          </h1>

          <p className="font-body text-muted-foreground mb-2">
            {isGift
              ? `O seu voucher de presente para "${treatmentName}" foi criado com sucesso.`
              : `O pagamento para "${treatmentName}" foi processado com sucesso.`}
          </p>

          {isGift && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-soft rounded-2xl border border-gold/30 p-8 my-8"
            >
              <Gift className="w-12 h-12 text-gold mx-auto mb-4" />
              <h2 className="font-display text-xl font-bold text-foreground mb-2">
                🎁 Voucher de Presente
              </h2>
              <p className="font-display text-lg font-bold text-gradient mb-1">
                {treatmentName}
              </p>
              <p className="font-body text-sm text-muted-foreground mb-4">
                Válido por 3 meses a partir da data de compra
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-body text-xs text-muted-foreground">
                  Apresente este voucher na receção para agendar o tratamento.
                </p>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  📞 +351 931 670 667
                </p>
              </div>
            </motion.div>
          )}

          <p className="font-body text-sm text-muted-foreground mb-8">
            {isGift
              ? "Pode imprimir esta página ou fazer captura de ecrã para entregar à pessoa presenteada."
              : "Receberá um email de confirmação com todos os detalhes."}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-gradient-hero text-primary-foreground px-8 py-3 rounded-full font-body font-semibold hover:opacity-90 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Início
            </Link>
            {!isGift && (
              <Link
                to="/agendar"
                className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-full font-body font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Agendar Tratamento
              </Link>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;

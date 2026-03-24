import { Link } from "react-router-dom";
import { XCircle, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PaymentCancelled = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="pt-20 section-padding">
      <div className="container mx-auto max-w-lg text-center">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-muted-foreground" />
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-3">
          Pagamento Cancelado
        </h1>
        <p className="font-body text-muted-foreground mb-8">
          O pagamento foi cancelado. Pode tentar novamente quando quiser.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-gradient-hero text-primary-foreground px-8 py-3 rounded-full font-body font-semibold hover:opacity-90 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Início
        </Link>
      </div>
    </div>
    <Footer />
  </div>
);

export default PaymentCancelled;

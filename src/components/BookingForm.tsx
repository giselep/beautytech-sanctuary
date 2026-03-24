import { useState } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone } from "lucide-react";

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z.string().trim().min(9, "Telefone inválido").max(20),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  onSubmit: (data: BookingFormData) => void;
  loading: boolean;
}

const BookingForm = ({ onSubmit, loading }: BookingFormProps) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = bookingSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    onSubmit(result.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="font-body text-sm font-medium text-foreground mb-1.5 block">
          Nome completo
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="O seu nome"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="pl-10 rounded-xl"
          />
        </div>
        {errors.name && <p className="font-body text-xs text-destructive mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="font-body text-sm font-medium text-foreground mb-1.5 block">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder="o.seu@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="pl-10 rounded-xl"
          />
        </div>
        {errors.email && <p className="font-body text-xs text-destructive mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="font-body text-sm font-medium text-foreground mb-1.5 block">
          Telefone
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="tel"
            placeholder="+351 9XX XXX XXX"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="pl-10 rounded-xl"
          />
        </div>
        {errors.phone && <p className="font-body text-xs text-destructive mt-1">{errors.phone}</p>}
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-hero text-primary-foreground rounded-full py-6 text-base font-semibold font-body hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
        ) : (
          "Confirmar Agendamento"
        )}
      </Button>
    </form>
  );
};

export default BookingForm;

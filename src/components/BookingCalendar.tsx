import { useState, useEffect } from "react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { supabase } from "@/integrations/supabase/client";
import { generateTimeSlots, isValidBookingDay, parseDurationMinutes } from "@/lib/booking-utils";
import { Clock } from "lucide-react";

interface BookingCalendarProps {
  treatmentId: string;
  treatmentName: string;
  duration?: string;
  selectedDate: Date | undefined;
  selectedTime: string | undefined;
  onDateSelect: (date: Date | undefined) => void;
  onTimeSelect: (time: string) => void;
}

const BookingCalendar = ({
  treatmentId,
  treatmentName,
  duration,
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
}: BookingCalendarProps) => {
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const durationMinutes = parseDurationMinutes(duration);

  useEffect(() => {
    if (!selectedDate) return;

    const fetchSlots = async () => {
      setLoading(true);
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      
      const { data, error } = await supabase.rpc("get_booked_slots", {
        p_date: dateStr,
      });

      const booked = error ? [] : (data || []);
      const slots = generateTimeSlots(durationMinutes, booked);
      setAvailableSlots(slots);
      setLoading(false);
    };

    fetchSlots();
  }, [selectedDate, durationMinutes]);

  const disabledDays = (date: Date) => !isValidBookingDay(date);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Calendar */}
      <div className="bg-card rounded-2xl border border-border p-4">
        <h3 className="font-display text-lg font-semibold text-foreground mb-3 px-2">
          Escolha a data
        </h3>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateSelect}
          disabled={disabledDays}
          locale={pt}
          className="rounded-xl"
        />
      </div>

      {/* Time Slots */}
      <div className="bg-card rounded-2xl border border-border p-4">
        <h3 className="font-display text-lg font-semibold text-foreground mb-1 px-2">
          Escolha o horário
        </h3>
        <p className="font-body text-sm text-muted-foreground mb-4 px-2 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          Duração: {duration || "60 min"}
        </p>

        {!selectedDate ? (
          <p className="font-body text-sm text-muted-foreground text-center py-8">
            Selecione uma data primeiro
          </p>
        ) : loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : availableSlots.length === 0 ? (
          <p className="font-body text-sm text-muted-foreground text-center py-8">
            Sem horários disponíveis nesta data
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-2 max-h-72 overflow-y-auto px-1">
            {availableSlots.map((time) => (
              <button
                key={time}
                onClick={() => onTimeSelect(time)}
                className={`py-2.5 px-3 rounded-xl font-body text-sm font-medium transition-all ${
                  selectedTime === time
                    ? "bg-gradient-hero text-primary-foreground shadow-md scale-105"
                    : "bg-soft-pink text-foreground hover:bg-accent"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCalendar;

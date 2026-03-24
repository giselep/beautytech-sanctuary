/**
 * Parse duration string like "40 min" to minutes number
 */
export function parseDurationMinutes(duration?: string): number {
  if (!duration) return 60;
  const match = duration.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 60;
}

/**
 * Generate available time slots for a given date based on business hours
 * Business hours: Mon-Sat 9:00-19:00
 */
export function generateTimeSlots(
  durationMinutes: number,
  bookedSlots: { booking_time: string; duration_minutes: number }[]
): string[] {
  const startHour = 9;
  const endHour = 19;
  const slots: string[] = [];

  for (let hour = startHour; hour < endHour; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const slotStart = hour * 60 + min;
      const slotEnd = slotStart + durationMinutes;

      // Check if slot fits within business hours
      if (slotEnd > endHour * 60) continue;

      const timeStr = `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;

      // Check if slot overlaps with any booked slot
      const isBooked = bookedSlots.some((booked) => {
        const [bh, bm] = booked.booking_time.split(':').map(Number);
        const bookedStart = bh * 60 + bm;
        const bookedEnd = bookedStart + booked.duration_minutes;
        return slotStart < bookedEnd && slotEnd > bookedStart;
      });

      if (!isBooked) {
        slots.push(timeStr);
      }
    }
  }

  return slots;
}

/**
 * Check if a date is a valid booking day (Mon-Sat, not in the past)
 */
export function isValidBookingDay(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Not in the past
  if (date < today) return false;
  
  // Not Sunday (0 = Sunday)
  if (date.getDay() === 0) return false;
  
  return true;
}

/**
 * Format WhatsApp message for booking notification
 */
export function formatWhatsAppMessage(booking: {
  clientName: string;
  clientPhone: string;
  treatmentName: string;
  date: string;
  time: string;
}): string {
  return encodeURIComponent(
    `📅 *Novo Agendamento*\n\n` +
    `👤 Cliente: ${booking.clientName}\n` +
    `📞 Telefone: ${booking.clientPhone}\n` +
    `💆 Tratamento: ${booking.treatmentName}\n` +
    `📅 Data: ${booking.date}\n` +
    `🕐 Hora: ${booking.time}\n\n` +
    `_Agendamento realizado pelo site._`
  );
}

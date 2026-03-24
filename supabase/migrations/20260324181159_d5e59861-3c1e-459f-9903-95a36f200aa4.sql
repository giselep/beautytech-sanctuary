
-- Drop the overly permissive SELECT policy
DROP POLICY "Anyone can read booking slots" ON public.bookings;

-- Create a security definer function to check availability without exposing personal data
CREATE OR REPLACE FUNCTION public.get_booked_slots(p_date DATE)
RETURNS TABLE(booking_time TIME, duration_minutes INTEGER, treatment_name TEXT)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT booking_time, duration_minutes, treatment_name
  FROM public.bookings
  WHERE booking_date = p_date
    AND status = 'confirmed';
$$;

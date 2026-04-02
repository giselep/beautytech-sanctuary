
-- Remove the permissive INSERT policy
DROP POLICY IF EXISTS "Allow anonymous booking creation" ON public.bookings;

-- Block all inserts from client (anon and authenticated)
CREATE POLICY "Block all client inserts"
  ON public.bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

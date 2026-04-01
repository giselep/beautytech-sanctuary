
-- Remove the broken SELECT policy (service role bypasses RLS anyway)
DROP POLICY IF EXISTS "Service role can read bookings" ON public.bookings;

-- Block anonymous reads explicitly
CREATE POLICY "Block anonymous reads"
  ON public.bookings
  FOR SELECT
  TO anon
  USING (false);

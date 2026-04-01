
-- Drop the overly permissive INSERT policy
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;

-- Allow anonymous inserts but only for the specific columns needed (no reading back)
CREATE POLICY "Allow anonymous booking creation"
  ON public.bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only service role (edge functions) can read bookings
CREATE POLICY "Service role can read bookings"
  ON public.bookings
  FOR SELECT
  TO authenticated
  USING (false);

-- Block all updates from client
CREATE POLICY "No public updates"
  ON public.bookings
  FOR UPDATE
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- Block all deletes from client
CREATE POLICY "No public deletes"
  ON public.bookings
  FOR DELETE
  TO anon, authenticated
  USING (false);

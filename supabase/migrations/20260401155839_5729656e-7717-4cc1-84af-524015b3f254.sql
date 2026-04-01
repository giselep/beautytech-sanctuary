
CREATE POLICY "Block authenticated reads"
  ON public.bookings
  FOR SELECT
  TO authenticated
  USING (false);

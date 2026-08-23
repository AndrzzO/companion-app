-- Settings Table
CREATE TABLE public.settings (
    key text PRIMARY KEY,
    value text NOT NULL,
    updated_at timestamptz DEFAULT now()
);

GRANT SELECT ON public.settings TO anon, authenticated;
GRANT ALL ON public.settings TO service_role;
GRANT ALL ON public.settings TO authenticated;

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read for settings"
ON public.settings FOR SELECT
USING (true);

CREATE POLICY "Allow admin update settings"
ON public.settings FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Allow admin insert settings"
ON public.settings FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Initial WhatsApp Setting
INSERT INTO public.settings (key, value)
VALUES ('whatsapp_link', 'https://wa.me/5511999999999')
ON CONFLICT (key) DO NOTHING;

-- Ensure RLS policies for categories and services allow admins to insert and delete
-- (Updating existing policies to be more explicit if needed, though FOR ALL should cover it)
-- The existing migration already has:
-- CREATE POLICY "Allow admin all access to categories" ON public.categories FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
-- CREATE POLICY "Allow admin all access to services" ON public.services FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

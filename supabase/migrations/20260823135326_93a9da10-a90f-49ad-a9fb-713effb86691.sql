-- Create enum for app roles
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- User roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Categories Table
CREATE TABLE public.categories (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    icon text,
    display_order integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now()
);

GRANT SELECT ON public.categories TO anon, authenticated;
GRANT ALL ON public.categories TO service_role;
GRANT ALL ON public.categories TO authenticated; -- Admin check handled by policy

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read for active categories"
ON public.categories FOR SELECT
USING (is_active = true);

CREATE POLICY "Allow admin all access to categories"
ON public.categories FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Services Table
CREATE TABLE public.services (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
    name text NOT NULL,
    description text,
    price numeric,
    price_prefix text DEFAULT 'A partir de',
    image_url text,
    status text DEFAULT 'active',
    is_featured boolean DEFAULT false,
    display_order integer DEFAULT 0,
    cta_text text DEFAULT 'Solicitar orçamento',
    created_at timestamptz DEFAULT now()
);

GRANT SELECT ON public.services TO anon, authenticated;
GRANT ALL ON public.services TO service_role;
GRANT ALL ON public.services TO authenticated; -- Admin check handled by policy

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read for active services"
ON public.services FOR SELECT
USING (status = 'active');

CREATE POLICY "Allow admin all access to services"
ON public.services FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Initial Seed Data
INSERT INTO public.categories (name, description, icon, display_order)
VALUES 
('Desenvolvimento Web', 'Criação de sites e portais corporativos.', 'Layout', 1),
('Sistemas Empresariais', 'Software sob medida para gestão interna.', 'Settings', 2),
('Automação', 'Fluxos de trabalho digitais e robôs.', 'Cpu', 3);

INSERT INTO public.services (category_id, name, description, is_featured, display_order)
SELECT id, 'Sites Institucionais', 'Sites profissionais, rápidos e responsivos.', true, 1
FROM public.categories WHERE name = 'Desenvolvimento Web';

INSERT INTO public.services (category_id, name, description, is_featured, display_order)
SELECT id, 'Dashboards', 'Painéis para visualização de indicadores e métricas.', true, 2
FROM public.categories WHERE name = 'Sistemas Empresariais';

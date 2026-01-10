-- ============================================
-- MULTI-TENANT PORTFOLIO SYSTEM - SQL MIGRATION
-- ============================================
-- Futtasd le ezt a Supabase Dashboard → SQL Editor-ban
-- ============================================

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create tenants table
CREATE TABLE public.tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    domain TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create tenant_users table
CREATE TABLE public.tenant_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'owner')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, tenant_id)
);

-- 4. Create portfolio_images table
CREATE TABLE public.portfolio_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    alt_text TEXT,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Enable RLS
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_images ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies

-- Tenants: Everyone can read (to get tenant info by slug)
CREATE POLICY "Public can read tenants" ON public.tenants
    FOR SELECT USING (true);

-- Tenants: Only owners can update
CREATE POLICY "Owners can update tenants" ON public.tenants
    FOR UPDATE USING (
        id IN (SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid() AND role = 'owner')
    );

-- Tenant Users: Users can see their own memberships
CREATE POLICY "Users can see own memberships" ON public.tenant_users
    FOR SELECT USING (user_id = auth.uid());

-- Portfolio Images: Everyone can read (public gallery)
CREATE POLICY "Public can read portfolio images" ON public.portfolio_images
    FOR SELECT USING (true);

-- Portfolio Images: Admins can insert
CREATE POLICY "Admins can insert portfolio images" ON public.portfolio_images
    FOR INSERT WITH CHECK (
        tenant_id IN (SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid())
    );

-- Portfolio Images: Admins can update
CREATE POLICY "Admins can update portfolio images" ON public.portfolio_images
    FOR UPDATE USING (
        tenant_id IN (SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid())
    );

-- Portfolio Images: Admins can delete
CREATE POLICY "Admins can delete portfolio images" ON public.portfolio_images
    FOR DELETE USING (
        tenant_id IN (SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid())
    );

-- 7. Create indexes for performance
CREATE INDEX idx_portfolio_images_tenant ON public.portfolio_images(tenant_id);
CREATE INDEX idx_portfolio_images_order ON public.portfolio_images(tenant_id, "order");
CREATE INDEX idx_tenant_users_user ON public.tenant_users(user_id);
CREATE INDEX idx_tenants_slug ON public.tenants(slug);

-- ============================================
-- SUCCESS! A táblák és policy-k létrejöttek.
-- ============================================
-- Következő lépés: Hozd létre a Storage bucket-et
-- Dashboard → Storage → New Bucket → "portfolio-images" (Public: ON)
-- ============================================

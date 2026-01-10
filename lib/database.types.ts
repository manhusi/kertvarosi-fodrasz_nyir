// Generated types for Supabase database
// These match the schema defined in supabase/migrations/001_portfolio_system.sql

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
    public: {
        Tables: {
            tenants: {
                Row: {
                    id: string;
                    name: string;
                    slug: string;
                    domain: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    slug: string;
                    domain?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    slug?: string;
                    domain?: string | null;
                    created_at?: string;
                };
            };
            tenant_users: {
                Row: {
                    id: string;
                    user_id: string;
                    tenant_id: string;
                    role: 'admin' | 'owner';
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    tenant_id: string;
                    role?: 'admin' | 'owner';
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    tenant_id?: string;
                    role?: 'admin' | 'owner';
                    created_at?: string;
                };
            };
            portfolio_images: {
                Row: {
                    id: string;
                    tenant_id: string;
                    storage_path: string;
                    alt_text: string | null;
                    order: number;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    tenant_id: string;
                    storage_path: string;
                    alt_text?: string | null;
                    order?: number;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    tenant_id?: string;
                    storage_path?: string;
                    alt_text?: string | null;
                    order?: number;
                    created_at?: string;
                };
            };
        };
    };
}

// Convenience types
export type Tenant = Database['public']['Tables']['tenants']['Row'];
export type TenantUser = Database['public']['Tables']['tenant_users']['Row'];
export type PortfolioImage = Database['public']['Tables']['portfolio_images']['Row'];
export type InsertPortfolioImage = Database['public']['Tables']['portfolio_images']['Insert'];

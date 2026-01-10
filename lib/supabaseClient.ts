import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = 'https://gjclyrsmjlgrtnvranoq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqY2x5cnNtamxncnRudnJhbm9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwMjgyMzksImV4cCI6MjA4MzYwNDIzOX0.sj-h0Y74UH1lDjk_7XDq7Vf-_zeJ9_GNFfgdXlae2VA';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper function to get public URL for storage images
export function getPublicImageUrl(storagePath: string): string {
    const { data } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(storagePath);
    return data.publicUrl;
}

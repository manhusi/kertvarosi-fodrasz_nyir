-- ============================================
-- STORAGE BUCKET RLS POLICIES
-- ============================================
-- Futtasd le MIUTÁN létrehoztad a "portfolio-images" bucket-et
-- Dashboard → Storage → New Bucket → "portfolio-images" (Public: ON)
-- ============================================

-- Allow public read access to all images
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'portfolio-images' 
    AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'portfolio-images' 
    AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'portfolio-images' 
    AND auth.role() = 'authenticated'
);

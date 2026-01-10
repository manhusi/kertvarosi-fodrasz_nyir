import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, getPublicImageUrl } from '../../lib/supabaseClient';
import type { Tenant, PortfolioImage } from '../../lib/database.types';
import {
    LogOut,
    Upload,
    Trash2,
    GripVertical,
    Image as ImageIcon,
    Loader2,
    AlertCircle,
    Check,
    X,
    Edit2
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
    const [images, setImages] = useState<PortfolioImage[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editAltText, setEditAltText] = useState('');

    // Check auth and load tenants
    useEffect(() => {
        checkAuthAndLoadTenants();
    }, []);

    // Load images when tenant changes
    useEffect(() => {
        if (selectedTenant) {
            loadImages();
        }
    }, [selectedTenant]);

    const checkAuthAndLoadTenants = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                navigate('/admin/login');
                return;
            }

            // Get user's tenants
            const { data: tenantUsers, error: tenantError } = await supabase
                .from('tenant_users')
                .select('tenant_id')
                .eq('user_id', user.id);

            if (tenantError) throw tenantError;

            if (!tenantUsers || tenantUsers.length === 0) {
                setError('Nincs hozzáférésed egyetlen weboldalhoz sem.');
                setIsLoading(false);
                return;
            }

            const tenantIds = tenantUsers.map(tu => tu.tenant_id);

            const { data: tenantsData, error: tenantsError } = await supabase
                .from('tenants')
                .select('*')
                .in('id', tenantIds);

            if (tenantsError) throw tenantsError;

            setTenants(tenantsData || []);
            if (tenantsData && tenantsData.length > 0) {
                setSelectedTenant(tenantsData[0]);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Hiba történt');
        } finally {
            setIsLoading(false);
        }
    };

    const loadImages = async () => {
        if (!selectedTenant) return;

        try {
            const { data, error } = await supabase
                .from('portfolio_images')
                .select('*')
                .eq('tenant_id', selectedTenant.id)
                .order('order', { ascending: true });

            if (error) throw error;
            setImages(data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Nem sikerült betölteni a képeket');
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0 || !selectedTenant) return;

        setIsUploading(true);
        setUploadProgress(0);
        setError(null);

        try {
            const totalFiles = files.length;
            let uploaded = 0;

            for (const file of Array.from(files)) {
                // Validate file type
                if (!file.type.startsWith('image/')) {
                    continue;
                }

                // Create unique filename
                const ext = file.name.split('.').pop();
                const fileName = `${selectedTenant.slug}/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

                // Upload to storage
                const { error: uploadError } = await supabase.storage
                    .from('portfolio-images')
                    .upload(fileName, file, {
                        cacheControl: '3600',
                        upsert: false
                    });

                if (uploadError) throw uploadError;

                // Get max order
                const maxOrder = images.length > 0
                    ? Math.max(...images.map(img => img.order)) + 1
                    : 0;

                // Create database record
                const { error: dbError } = await supabase
                    .from('portfolio_images')
                    .insert({
                        tenant_id: selectedTenant.id,
                        storage_path: fileName,
                        alt_text: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
                        order: maxOrder + uploaded
                    });

                if (dbError) throw dbError;

                uploaded++;
                setUploadProgress(Math.round((uploaded / totalFiles) * 100));
            }

            setSuccessMessage(`${uploaded} kép sikeresen feltöltve!`);
            setTimeout(() => setSuccessMessage(null), 3000);
            await loadImages();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Feltöltési hiba');
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
            // Reset file input
            e.target.value = '';
        }
    };

    const handleDelete = async (image: PortfolioImage) => {
        if (!confirm('Biztosan törölni szeretnéd ezt a képet?')) return;

        try {
            // Delete from storage
            const { error: storageError } = await supabase.storage
                .from('portfolio-images')
                .remove([image.storage_path]);

            if (storageError) throw storageError;

            // Delete from database
            const { error: dbError } = await supabase
                .from('portfolio_images')
                .delete()
                .eq('id', image.id);

            if (dbError) throw dbError;

            setSuccessMessage('Kép törölve!');
            setTimeout(() => setSuccessMessage(null), 3000);
            await loadImages();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Törlési hiba');
        }
    };

    const handleUpdateAltText = async (imageId: string) => {
        try {
            const { error } = await supabase
                .from('portfolio_images')
                .update({ alt_text: editAltText })
                .eq('id', imageId);

            if (error) throw error;

            setEditingId(null);
            setEditAltText('');
            await loadImages();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Mentési hiba');
        }
    };

    const moveImage = async (index: number, direction: 'up' | 'down') => {
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= images.length) return;

        const newImages = [...images];
        [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];

        // Update orders in database
        try {
            for (let i = 0; i < newImages.length; i++) {
                await supabase
                    .from('portfolio_images')
                    .update({ order: i })
                    .eq('id', newImages[i].id);
            }
            setImages(newImages);
        } catch (err) {
            setError('Sorrend mentési hiba');
            await loadImages();
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-barbershop-charcoal to-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-barbershop-beige animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-barbershop-charcoal to-black">
            {/* Header */}
            <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h1 className="text-xl font-bold text-white font-heading">Admin Panel</h1>

                            {/* Tenant selector */}
                            {tenants.length > 1 && (
                                <select
                                    value={selectedTenant?.id || ''}
                                    onChange={(e) => {
                                        const tenant = tenants.find(t => t.id === e.target.value);
                                        setSelectedTenant(tenant || null);
                                    }}
                                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-barbershop-beige/50"
                                >
                                    {tenants.map(tenant => (
                                        <option key={tenant.id} value={tenant.id} className="bg-barbershop-charcoal">
                                            {tenant.name}
                                        </option>
                                    ))}
                                </select>
                            )}

                            {tenants.length === 1 && selectedTenant && (
                                <span className="text-barbershop-beige/60 text-sm">{selectedTenant.name}</span>
                            )}
                        </div>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Kijelentkezés</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Messages */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-red-400 text-sm">{error}</p>
                        <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-300">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {successMessage && (
                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <p className="text-green-400 text-sm">{successMessage}</p>
                    </div>
                )}

                {/* Portfolio Section */}
                <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <ImageIcon className="w-6 h-6 text-barbershop-beige" />
                            <h2 className="text-lg font-semibold text-white">Portfólió Képek</h2>
                            <span className="text-sm text-white/50">({images.length} kép)</span>
                        </div>

                        {/* Upload Button */}
                        <label className={`flex items-center gap-2 px-4 py-2 bg-barbershop-beige text-barbershop-charcoal font-semibold rounded-xl cursor-pointer hover:bg-barbershop-cream transition-colors ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                            {isUploading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    {uploadProgress}%
                                </>
                            ) : (
                                <>
                                    <Upload className="w-4 h-4" />
                                    Kép feltöltése
                                </>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileUpload}
                                className="hidden"
                                disabled={isUploading}
                            />
                        </label>
                    </div>

                    {/* Images Grid */}
                    {images.length === 0 ? (
                        <div className="text-center py-12">
                            <ImageIcon className="w-12 h-12 text-white/20 mx-auto mb-4" />
                            <p className="text-white/50">Még nincsenek feltöltött képek</p>
                            <p className="text-white/30 text-sm mt-1">Kattints a "Kép feltöltése" gombra a kezdéshez</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {images.map((image, index) => (
                                <div
                                    key={image.id}
                                    className="group relative bg-black/20 rounded-xl overflow-hidden border border-white/10 hover:border-barbershop-beige/30 transition-colors"
                                >
                                    {/* Image */}
                                    <div className="aspect-[3/4] relative">
                                        <img
                                            src={getPublicImageUrl(image.storage_path)}
                                            alt={image.alt_text || ''}
                                            className="w-full h-full object-cover"
                                        />

                                        {/* Overlay with actions */}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            {/* Move buttons */}
                                            <button
                                                onClick={() => moveImage(index, 'up')}
                                                disabled={index === 0}
                                                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                                title="Előrébb"
                                            >
                                                <GripVertical className="w-4 h-4 text-white rotate-180" />
                                            </button>
                                            <button
                                                onClick={() => moveImage(index, 'down')}
                                                disabled={index === images.length - 1}
                                                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                                title="Hátrébb"
                                            >
                                                <GripVertical className="w-4 h-4 text-white" />
                                            </button>

                                            {/* Delete button */}
                                            <button
                                                onClick={() => handleDelete(image)}
                                                className="p-2 bg-red-500/80 rounded-lg hover:bg-red-500 transition-colors"
                                                title="Törlés"
                                            >
                                                <Trash2 className="w-4 h-4 text-white" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Alt text */}
                                    <div className="p-3">
                                        {editingId === image.id ? (
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={editAltText}
                                                    onChange={(e) => setEditAltText(e.target.value)}
                                                    className="flex-1 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-barbershop-beige/50"
                                                    autoFocus
                                                />
                                                <button
                                                    onClick={() => handleUpdateAltText(image.id)}
                                                    className="p-1 text-green-400 hover:text-green-300"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setEditingId(null);
                                                        setEditAltText('');
                                                    }}
                                                    className="p-1 text-red-400 hover:text-red-300"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between">
                                                <p className="text-white/70 text-sm truncate flex-1">
                                                    {image.alt_text || 'Nincs leírás'}
                                                </p>
                                                <button
                                                    onClick={() => {
                                                        setEditingId(image.id);
                                                        setEditAltText(image.alt_text || '');
                                                    }}
                                                    className="p-1 text-white/50 hover:text-white"
                                                >
                                                    <Edit2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

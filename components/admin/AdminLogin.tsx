import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { LogIn, AlertCircle, Loader2 } from 'lucide-react';

export const AdminLogin: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) {
                throw authError;
            }

            if (data.user) {
                // Check if user has any tenant access
                const { data: tenantUsers, error: tenantError } = await supabase
                    .from('tenant_users')
                    .select('tenant_id')
                    .eq('user_id', data.user.id);

                if (tenantError) {
                    throw tenantError;
                }

                if (!tenantUsers || tenantUsers.length === 0) {
                    await supabase.auth.signOut();
                    throw new Error('Nincs hozzáférésed egyetlen weboldalhoz sem.');
                }

                navigate('/admin');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ismeretlen hiba történt');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-barbershop-charcoal to-black flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-barbershop-beige/10 rounded-2xl mb-4">
                        <LogIn className="w-8 h-8 text-barbershop-beige" />
                    </div>
                    <h1 className="text-2xl font-bold text-white font-heading">Admin Belépés</h1>
                    <p className="text-barbershop-beige/60 mt-2">Jelentkezz be a weboldal kezeléséhez</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    <div className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-barbershop-beige/80 mb-2">
                                Email cím
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-barbershop-beige/50 focus:border-transparent transition-all"
                                placeholder="admin@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-barbershop-beige/80 mb-2">
                                Jelszó
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-barbershop-beige/50 focus:border-transparent transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 bg-barbershop-beige text-barbershop-charcoal font-semibold rounded-xl hover:bg-barbershop-cream transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Bejelentkezés...
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    Bejelentkezés
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Back link */}
                <p className="text-center mt-6">
                    <a href="/" className="text-barbershop-beige/60 hover:text-barbershop-beige text-sm transition-colors">
                        ← Vissza a weboldalra
                    </a>
                </p>
            </div>
        </div>
    );
};

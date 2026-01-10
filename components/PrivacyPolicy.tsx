import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, Database, Lock, UserCheck, Bell, FileText, Mail } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-barbershop-charcoal to-black">
            {/* Header */}
            <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-barbershop-beige/70 hover:text-barbershop-beige transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Vissza a főoldalra
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
                    {/* Title */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-barbershop-beige/10 rounded-xl">
                            <Shield className="w-8 h-8 text-barbershop-beige" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white font-heading">
                                Adatkezelési Tájékoztató
                            </h1>
                            <p className="text-white/50 text-sm mt-1">
                                Hatályos: 2024. január 1-től
                            </p>
                        </div>
                    </div>

                    {/* Sections */}
                    <div className="space-y-8 text-white/80">
                        {/* 1. Adatkezelő */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <UserCheck className="w-5 h-5 text-barbershop-beige" />
                                <h2 className="text-xl font-semibold text-white">1. Az adatkezelő megnevezése</h2>
                            </div>
                            <div className="pl-8 space-y-2">
                                <p><strong className="text-white">Név:</strong> Kertvárosi Fodrászat</p>
                                <p><strong className="text-white">Cím:</strong> 4400 Nyíregyháza, Újház sor 15.</p>
                                <p><strong className="text-white">E-mail:</strong> info@kertvarosifodraszat.hu</p>
                            </div>
                        </section>

                        {/* 2. Adatfeldolgozó */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <Database className="w-5 h-5 text-barbershop-beige" />
                                <h2 className="text-xl font-semibold text-white">2. Adatfeldolgozó</h2>
                            </div>
                            <div className="pl-8 space-y-3">
                                <p>
                                    Az online időpontfoglaló rendszert a <strong className="text-white">DBSflow</strong> szolgáltatás biztosítja,
                                    amely adatfeldolgozóként jár el az adatkezelő nevében.
                                </p>
                                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                    <p><strong className="text-white">Adatfeldolgozó neve:</strong> DBSflow</p>
                                    <p><strong className="text-white">Tevékenység:</strong> Online időpontfoglaló rendszer üzemeltetése</p>
                                    <p><strong className="text-white">Tárhelyszolgáltató:</strong> Supabase Inc. (EU régió)</p>
                                </div>
                                <p className="text-sm text-white/60">
                                    Az adatfeldolgozó kizárólag az adatkezelő utasításai szerint, a szolgáltatás nyújtásához
                                    szükséges mértékben kezeli a személyes adatokat.
                                </p>
                            </div>
                        </section>

                        {/* 3. Kezelt adatok */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <FileText className="w-5 h-5 text-barbershop-beige" />
                                <h2 className="text-xl font-semibold text-white">3. Kezelt személyes adatok köre</h2>
                            </div>
                            <div className="pl-8">
                                <p className="mb-4">Az időpontfoglalás során az alábbi adatokat kérjük:</p>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-barbershop-beige">•</span>
                                        <span><strong className="text-white">Név</strong> – az azonosítás és megszólítás céljából</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-barbershop-beige">•</span>
                                        <span><strong className="text-white">Telefonszám</strong> – kapcsolattartás, emlékeztető küldése céljából</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-barbershop-beige">•</span>
                                        <span><strong className="text-white">E-mail cím</strong> – foglalás visszaigazolása céljából</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-barbershop-beige">•</span>
                                        <span><strong className="text-white">Választott időpont és szolgáltatás</strong> – a foglalás teljesítéséhez</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* 4. Adatkezelés célja */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <Lock className="w-5 h-5 text-barbershop-beige" />
                                <h2 className="text-xl font-semibold text-white">4. Adatkezelés célja és jogalapja</h2>
                            </div>
                            <div className="pl-8 space-y-4">
                                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                    <p className="font-semibold text-white mb-2">Cél:</p>
                                    <ul className="space-y-1 text-sm">
                                        <li>• Időpontfoglalás kezelése és nyilvántartása</li>
                                        <li>• Foglalás visszaigazolása</li>
                                        <li>• Emlékeztető küldése a foglalt időpontról</li>
                                        <li>• Kapcsolattartás szükség esetén (pl. időpont módosítás)</li>
                                    </ul>
                                </div>
                                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                    <p className="font-semibold text-white mb-2">Jogalap:</p>
                                    <p className="text-sm">
                                        GDPR 6. cikk (1) bekezdés b) pont – szerződés teljesítéséhez szükséges adatkezelés
                                        (az időpontfoglalás a szolgáltatási szerződés előkészítését és teljesítését szolgálja).
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 5. Hírlevél */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <Bell className="w-5 h-5 text-barbershop-beige" />
                                <h2 className="text-xl font-semibold text-white">5. Hírlevél és marketing</h2>
                            </div>
                            <div className="pl-8">
                                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                                    <p className="text-green-400 font-semibold mb-2">✓ Nem küldünk hírlevelet</p>
                                    <p className="text-sm text-white/70">
                                        Az Ön személyes adatait kizárólag az időpontfoglalással kapcsolatos kommunikációra használjuk.
                                        Nem küldünk marketing célú hírleveleket, reklámokat vagy promóciós anyagokat.
                                        Az adatait harmadik félnek marketing célokra nem adjuk át.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 6. Adatmegőrzés */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <Database className="w-5 h-5 text-barbershop-beige" />
                                <h2 className="text-xl font-semibold text-white">6. Adatmegőrzés időtartama</h2>
                            </div>
                            <div className="pl-8">
                                <p>
                                    A foglalással kapcsolatos adatokat a szolgáltatás teljesítését követő <strong className="text-white">1 évig</strong> őrizzük meg,
                                    amely után automatikusan törlésre kerülnek. A visszatérő vendégek adatait a vendégkapcsolat
                                    fenntartása érdekében legfeljebb <strong className="text-white">3 évig</strong> tároljuk az utolsó látogatástól számítva.
                                </p>
                            </div>
                        </section>

                        {/* 7. Jogok */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <UserCheck className="w-5 h-5 text-barbershop-beige" />
                                <h2 className="text-xl font-semibold text-white">7. Az Ön jogai</h2>
                            </div>
                            <div className="pl-8">
                                <p className="mb-4">A GDPR alapján Önt az alábbi jogok illetik meg:</p>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="text-barbershop-beige font-bold">→</span>
                                        <span><strong className="text-white">Hozzáférés joga:</strong> Tájékoztatást kérhet arról, hogy milyen adatait kezeljük.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-barbershop-beige font-bold">→</span>
                                        <span><strong className="text-white">Helyesbítés joga:</strong> Kérheti adatai módosítását, ha azok pontatlanok.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-barbershop-beige font-bold">→</span>
                                        <span><strong className="text-white">Törlés joga:</strong> Kérheti adatai törlését ("elfeledtetéshez való jog").</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-barbershop-beige font-bold">→</span>
                                        <span><strong className="text-white">Adathordozhatóság:</strong> Kérheti adatai géppel olvasható formátumban történő kiadását.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-barbershop-beige font-bold">→</span>
                                        <span><strong className="text-white">Tiltakozás joga:</strong> Tiltakozhat az adatkezelés ellen.</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* 8. Kapcsolat */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <Mail className="w-5 h-5 text-barbershop-beige" />
                                <h2 className="text-xl font-semibold text-white">8. Kapcsolat és panasz</h2>
                            </div>
                            <div className="pl-8 space-y-4">
                                <p>
                                    Adatkezeléssel kapcsolatos kérdéseivel, kéréseivel forduljon hozzánk bizalommal:
                                </p>
                                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                    <p><strong className="text-white">E-mail:</strong> info@kertvarosifodraszat.hu</p>
                                    <p><strong className="text-white">Telefon:</strong> +36 30 123 4567</p>
                                </div>
                                <p className="text-sm text-white/60">
                                    Amennyiben úgy érzi, hogy megsértettük az adatvédelmi jogait, panaszt tehet a
                                    Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH):
                                    <br />
                                    <span className="text-white/80">Cím: 1055 Budapest, Falk Miksa utca 9-11.</span>
                                    <br />
                                    <span className="text-white/80">Honlap: www.naih.hu</span>
                                </p>
                            </div>
                        </section>

                        {/* Footer note */}
                        <div className="pt-8 mt-8 border-t border-white/10 text-center text-sm text-white/40">
                            <p>Utolsó módosítás: 2024. január 1.</p>
                            <p className="mt-1">Kertvárosi Fodrászat – Nyíregyháza</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

import { LandingData } from './types';

// Multi-tenant configuration - identifies this website
export const TENANT_SLUG = 'kertvarosi-fodrasz';

export const FULL_SERVICES_DATA = {
  "kertvarosifodraszat_barbershop_services": [
    {
      "service_name": "Férfi Hajvágás",
      "detailed_description": "Professzionális férfi hajvágás tapasztalt fodrászaink által. Minden hajvágás tartalmaz konzultációt, hajmosást, vágást és szárítást. Figyelembe vesszük az arc formáját és a hajszerkezetet, hogy a legjobb eredményt érjük el.",
      "duration": "30-45 perc",
      "pricing": "3500 Ft"
    },
    {
      "service_name": "Férfi Hajvágás + Szakáll",
      "detailed_description": "Komplett ápolási csomag, amely tartalmazza a hajvágást és a szakáll formázását/igazítását. Tökéletes választás azoknak, akik egy helyen szeretnék megoldani a teljes külsejük ápolását.",
      "duration": "45-60 perc",
      "pricing": "5000 Ft"
    },
    {
      "service_name": "Szakáll Igazítás",
      "detailed_description": "Precíz szakáll formázás és igazítás. Géppel és ollóval dolgozunk, hogy a szakállad mindig ápolt és stílusos legyen. Tartalmaz kontúr igazítást és nyakszőr eltávolítást.",
      "duration": "20-30 perc",
      "pricing": "2000 Ft"
    },
    {
      "service_name": "Klasszikus Borotválás",
      "detailed_description": "Hagyományos borbély borotválás borotvapengével, meleg törölközővel és ápoló termékekkel. Luxus élmény, amely simává és frissé teszi az arcbőrt.",
      "duration": "30-40 perc",
      "pricing": "3000 Ft"
    },
    {
      "service_name": "Gyerek Hajvágás (12 éves korig)",
      "detailed_description": "Gyerekbarát környezetben, türelemmel és szakértelemmel végzett hajvágás. Gyors és hatékony, hogy a kicsik ne unatkozzanak.",
      "duration": "20-30 perc",
      "pricing": "2500 Ft"
    },
    {
      "service_name": "Kontúr Igazítás",
      "detailed_description": "Hajvonal és nyakszőr precíz igazítása. Ideális két hajvágás között a rendezett megjelenés fenntartásához.",
      "duration": "15 perc",
      "pricing": "1500 Ft"
    },
    {
      "service_name": "Hajmosás",
      "detailed_description": "Professzionális hajmosás minőségi termékekkel, masszázzsal és szárítással.",
      "duration": "15 perc",
      "pricing": "1000 Ft"
    }
  ]
};

export const LANDING_DATA: LandingData = {
  "service_categories": [
    {
      "category_name": "Hajvágás",
      "description": "Professzionális férfi hajvágás minden hajtípusra. Modern és klasszikus stílusok egyaránt."
    },
    {
      "category_name": "Szakáll Ápolás",
      "description": "Szakáll formázás, igazítás és klasszikus borotválás. Tökéletes szakáll minden alkalomra."
    },
    {
      "category_name": "Gyerek Hajvágás",
      "description": "Gyerekbarát környezetben, türelemmel és szakértelemmel végzett hajvágás a kicsiknek."
    },
    {
      "category_name": "Kiegészítő Szolgáltatások",
      "description": "Kontúr igazítás, hajmosás és egyéb kiegészítő szolgáltatások a tökéletes megjelenésért."
    }
  ],
  "treatment_benefits": [],
  "unique_selling_propositions": [
    { "value": "Tapasztalt, képzett fodrászok" },
    { "value": "Modern és klasszikus technikák" },
    { "value": "Tiszta, kellemes környezet" },
    { "value": "Könnyen megközelíthető helyszín" },
    { "value": "Rugalmas időpontfoglalás" },
    { "value": "Kiváló ár-érték arány" }
  ],
  "pricing_structures": [],
  "contact_details": {
    "phone_number": "+36 30 123 4567",
    "address": "Újház sor 15., Nyíregyháza 4400",
    "email_address": "info@kertvarosifodraszat.hu",
    "opening_hours": "Hétfő-Péntek: 9:00-18:00, Szombat: 9:00-14:00"
  },
  "trust_signals": [
    {
      "type": "testimonial",
      "content": "Évek óta járok ide, tökéletes. Hozzáértés, rugalmas időpontfoglalás, jó parkolási lehetőség.",
      "source": "Norbert Bátyi",
      "reviewCount": "28 vélemény",
      "date": "3 éve",
      "avatar": "/images/reviews/review-norbert-batyi.png"
    },
    {
      "type": "testimonial",
      "content": "Rugalmas, gyors, fiatal borbély, nagyon szép eredménnyel nyírt meg. Ajánlom mindenkinek!",
      "source": "Balázs Győre",
      "reviewCount": "85 vélemény · 66 fotó",
      "date": "2 éve",
      "avatar": "/images/reviews/review-balazs-gyore.png"
    },
    {
      "type": "testimonial",
      "content": "Végtelenül kedves és türelmes fodrászt ismertünk meg! Két kisfiam nagyon boldog volt, pedig megijjedtek az elején, de türelemmel és szeretettel vágta a hajukat. Mindenkinek csak ajánlani tudom! 😊😊",
      "source": "Alexandra Júlia Varga",
      "reviewCount": "5 vélemény",
      "date": "3 hónapja",
      "avatar": "/images/reviews/review-alexandra-varga.png"
    },
    {
      "type": "testimonial",
      "content": "Szuper🥰🥰. Csak ajánlani tudom. ...",
      "source": "Lajos Emese",
      "reviewCount": "114 vélemény · 93 fotó",
      "date": "3 éve",
      "avatar": "/images/reviews/review-lajos-emese.png"
    },
    {
      "type": "testimonial",
      "content": "Kedvesek és precízen végzik a munkát. Egy kicsit hosszabb volt időben, mint számítottam rá, de nem vészes.",
      "source": "Gábor Nádasi",
      "reviewCount": "45 vélemény · 36 fotó",
      "date": "3 éve",
      "avatar": "/images/reviews/review-gabor-nadasi.png"
    }
  ]
};

export const FAQ_ITEMS = [
  {
    question: "Kell-e előre időpontot foglalni?",
    answer: "Időpontfoglalás ajánlott, hogy biztosan ne kelljen várakozni. Természetesen betérő vendégeket is szívesen látunk, ha van szabad időpontunk."
  },
  {
    question: "Mennyi időt vegyek számításba egy hajvágásra?",
    answer: "Egy átlagos férfi hajvágás 30-45 percet vesz igénybe, beleértve a konzultációt, hajmosást és szárítást. Ha szakáll igazítást is kérsz, számolj 45-60 perccel."
  },
  {
    question: "Milyen fizetési módokat fogadnak el?",
    answer: "Készpénz és bankkártyás fizetést egyaránt elfogadunk. Átutalással is lehet fizetni előzetes egyeztetés alapján."
  },
  {
    question: "Van-e parkolási lehetőség?",
    answer: "Igen, az üzlet közelében ingyenes parkolási lehetőség áll rendelkezésre az utcán."
  },
  {
    question: "Milyen korú gyerekeket vállalnak?",
    answer: "Minden korosztályt vállalunk! Türelemmel és szakértelemmel dolgozunk a legkisebb vendégeinkkel is. Gyerek hajvágás 12 éves korig kedvezményes áron érhető el."
  },
  {
    question: "Mikor NEM tudok hajat vágni/borotválkozni?",
    answer: "Fertőző betegség, bőrfertőzés vagy friss sérülés esetén kérjük, halaszd el a látogatást. Ha bizonytalan vagy, hívj minket telefonon!"
  }
];
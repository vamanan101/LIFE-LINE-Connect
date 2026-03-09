export type HospitalInfo = {
  id: string;
  name: string;
  type: string;
  status: "Optimal" | "Moderate" | "Critical Load";
  color: string;
  glow: string;
  map: string;
  image: string;
  organs: { heart: number; liver: number; kidney: number; cornea: number };
  wards: { icu_available: number; icu_total: number; general_available: number; general_total: number; maternity_available: number; maternity_total: number };
  blood_units: { a_pos: number; o_pos: number; b_pos: number; o_neg: number; ab_pos: number };
  last_updated: string;
};

export const HOSPITALS: HospitalInfo[] = [
  { 
    id: 'kmch', 
    name: "KMCH (Kovai Medical Center)", 
    type: "Multi-Specialty", 
    status: "Optimal", 
    color: "emerald", 
    glow: "bg-emerald-200/40", 
    map: "Avinashi Road, Coimbatore",
    image: "https://www.indheal.com/ModernImages/Hospitals/Kovai_Medical_Center/Kovai_Medical_Center1.webp",
    organs: { heart: 0, liver: 1, kidney: 2, cornea: 4 },
    wards: { icu_available: 12, icu_total: 45, general_available: 130, general_total: 300, maternity_available: 15, maternity_total: 40 },
    blood_units: { a_pos: 120, o_pos: 210, b_pos: 85, o_neg: 15, ab_pos: 20 },
    last_updated: "Just now"
  },
  { 
    id: 'psg', 
    name: "PSG Hospitals", 
    type: "Teaching Hospital", 
    status: "Critical Load", 
    color: "rose", 
    glow: "bg-rose-200/40", 
    map: "Peelamedu, Coimbatore",
    image: "https://www.psghospitals.com/wp-content/uploads/2022/01/gal-img1.jpg",
    organs: { heart: 1, liver: 0, kidney: 0, cornea: 2 },
    wards: { icu_available: 2, icu_total: 60, general_available: 45, general_total: 400, maternity_available: 8, maternity_total: 50 },
    blood_units: { a_pos: 240, o_pos: 310, b_pos: 150, o_neg: 8, ab_pos: 42 },
    last_updated: "5 mins ago"
  },
  { 
    id: 'ganga', 
    name: "Ganga Hospital", 
    type: "Orthopaedics & Trauma", 
    status: "Optimal", 
    color: "teal", 
    glow: "bg-teal-200/40", 
    map: "Mettupalayam Road, Coimbatore",
    image: "https://www.gangahospital.com/public/assets/images/hospital_facilities/b-block_1.jpg",
    organs: { heart: 0, liver: 0, kidney: 1, cornea: 0 },
    wards: { icu_available: 18, icu_total: 35, general_available: 80, general_total: 200, maternity_available: 0, maternity_total: 0 },
    blood_units: { a_pos: 80, o_pos: 120, b_pos: 50, o_neg: 40, ab_pos: 30 },
    last_updated: "1 min ago"
  },
  { 
    id: 'gknm', 
    name: "GKNM Hospital", 
    type: "Multi-Specialty", 
    status: "Moderate", 
    color: "amber", 
    glow: "bg-amber-200/40", 
    map: "Pappanaickenpalayam, Coimbatore",
    image: "https://www.gknmhospital.org/images/why-gknm-hospital.webp",
    organs: { heart: 1, liver: 1, kidney: 2, cornea: 6 },
    wards: { icu_available: 7, icu_total: 40, general_available: 75, general_total: 250, maternity_available: 20, maternity_total: 45 },
    blood_units: { a_pos: 110, o_pos: 190, b_pos: 130, o_neg: 25, ab_pos: 85 },
    last_updated: "10 mins ago"
  },
  { 
    id: 'srh', 
    name: "Sri Ramakrishna", 
    type: "Multi-Specialty", 
    status: "Optimal", 
    color: "indigo", 
    glow: "bg-indigo-200/40", 
    map: "Avarampalayam, Coimbatore",
    image: "https://www.sriramakrishnahospital.com/wp-content/uploads/2024/09/home_6_1-1.webp",
    organs: { heart: 0, liver: 2, kidney: 3, cornea: 2 },
    wards: { icu_available: 15, icu_total: 50, general_available: 160, general_total: 350, maternity_available: 25, maternity_total: 60 },
    blood_units: { a_pos: 180, o_pos: 240, b_pos: 90, o_neg: 30, ab_pos: 70 },
    last_updated: "Just now"
  },
  { 
    id: 'royal', 
    name: "Royal Care", 
    type: "Super Specialty", 
    status: "Critical Load", 
    color: "rose", 
    glow: "bg-rose-200/40", 
    map: "Neelambur, Coimbatore",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2938&auto=format&fit=crop",
    organs: { heart: 2, liver: 0, kidney: 1, cornea: 0 },
    wards: { icu_available: 1, icu_total: 30, general_available: 12, general_total: 180, maternity_available: 5, maternity_total: 20 },
    blood_units: { a_pos: 45, o_pos: 90, b_pos: 35, o_neg: 5, ab_pos: 15 },
    last_updated: "2 mins ago"
  },
  { 
    id: 'gem', 
    name: "GEM Hospital", 
    type: "Gastroenterology & Surgery", 
    status: "Optimal", 
    color: "cyan", 
    glow: "bg-cyan-200/40", 
    map: "Ramanathapuram, Coimbatore",
    image: "https://static.toiimg.com/thumb/msid-81268597,width-1200,height-900,resizemode-4/81268597.jpg",
    organs: { heart: 0, liver: 3, kidney: 1, cornea: 0 },
    wards: { icu_available: 8, icu_total: 20, general_available: 50, general_total: 120, maternity_available: 0, maternity_total: 0 },
    blood_units: { a_pos: 60, o_pos: 80, b_pos: 40, o_neg: 0, ab_pos: 0 },
    last_updated: "7 mins ago"
  },
  { 
    id: 'kg', 
    name: "KG Hospital", 
    type: "Multi-Specialty", 
    status: "Moderate", 
    color: "orange", 
    glow: "bg-orange-200/40", 
    map: "Arts College Road, Coimbatore",
    image: "https://www.kghospital.com/assets/img/kghospital.webp",
    organs: { heart: 0, liver: 0, kidney: 2, cornea: 2 },
    wards: { icu_available: 6, icu_total: 25, general_available: 40, general_total: 200, maternity_available: 10, maternity_total: 30 },
    blood_units: { a_pos: 100, o_pos: 140, b_pos: 80, o_neg: 10, ab_pos: 60 },
    last_updated: "4 mins ago"
  },
  { 
    id: 'kongunad', 
    name: "Kongunad Hospitals", 
    type: "Multi-Specialty", 
    status: "Optimal", 
    color: "pink", 
    glow: "bg-pink-200/40", 
    map: "Tatabad, Coimbatore",
    image: "https://www.kongunad.com/wp-content/uploads/2017/01/wel-img.jpg",
    organs: { heart: 0, liver: 0, kidney: 0, cornea: 8 },
    wards: { icu_available: 14, icu_total: 30, general_available: 90, general_total: 180, maternity_available: 15, maternity_total: 25 },
    blood_units: { a_pos: 50, o_pos: 110, b_pos: 40, o_neg: 12, ab_pos: 20 },
    last_updated: "15 mins ago"
  },
  { 
    id: 'womens', 
    name: "Women's Center", 
    type: "Maternity & Gynecology", 
    status: "Moderate", 
    color: "violet", 
    glow: "bg-violet-200/40", 
    map: "Mettupalayam Road, Coimbatore",
    image: "https://www.motherhoodindia.com/wp-content/uploads/2025/08/Location-Page-Banner_Coimbatore_1354X364-px.jpg",
    organs: { heart: 0, liver: 0, kidney: 0, cornea: 0 },
    wards: { icu_available: 5, icu_total: 15, general_available: 40, general_total: 80, maternity_available: 18, maternity_total: 30 },
    blood_units: { a_pos: 40, o_pos: 60, b_pos: 30, o_neg: 5, ab_pos: 10 },
    last_updated: "Just now"
  },
];

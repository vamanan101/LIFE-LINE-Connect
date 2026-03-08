# ARCHITECTURE.md

## 1. System Overview
**Project:** Premium Hospital Portfolio Web Portal (Coimbatore Top 10 Elite Hospitals)
**Design Philosophy:** "Apple Health meets Airbnb" - High signal-to-noise ratio, premium feel, and intuitive navigation.

## 2. Technical Stack Mandate
- **Framework:** Next.js 14+ (App Router)
- **Styling & UI:** Tailwind CSS for strictly utility-based styling, `clsx` & `tailwind-merge` for dynamic class management.
- **Animations:** Framer Motion (page transitions, micro-interactions, bento-grid reveals).
- **Iconography:** Lucide React.
- **Data Visualization:** Recharts or raw SVGs for charts.
- **Database & Auth:** Supabase (PostgreSQL).

## 3. Scope
The portal features the top 10 elite hospitals in Coimbatore:
1. KMCH
2. PSG
3. Ganga
4. GKNM
5. Sri Ramakrishna
6. Royal Care
7. GEM
8. KG
9. Kongunad
10. Women's Center

## 4. Core Entities (Database Schema)
Designed for Supabase (PostgreSQL).

### Table: `hospitals`
- `id`: UUID (Primary Key)
- `name`: String
- `slug`: String (Unique, e.g., `kmch`, `psg`)
- `address`: Text
- `specialties`: Array of Strings
- `description`: Text
- `image_url`: String (URL to high-res facility image)
- `theme_color`: String (Hex code for hospital-specific accents)

### Table: `bed_availability`
- `hospital_id`: UUID (Foreign Key -> `hospitals.id`)
- `icu_total`: Integer
- `icu_occupied`: Integer
- `general_total`: Integer
- `general_occupied`: Integer
- `updated_at`: Timestamp (with time zone)

### Table: `blood_inventory`
- `hospital_id`: UUID (Foreign Key -> `hospitals.id`)
- `a_pos`: Integer (Units)
- `a_neg`: Integer
- `b_pos`: Integer
- `b_neg`: Integer
- `o_pos`: Integer
- `o_neg`: Integer
- `ab_pos`: Integer
- `ab_neg`: Integer
- `updated_at`: Timestamp (with time zone)

## 5. Routing Structure
Next.js App Router (`/app` directory layout):

- **`/`**: Immersive Landing / Search.
  - Global overview, search functionality, and aggregated data.
- **`/hospital/[slug]`**: Premium Dynamic Portfolio.
  - Bento-Grid layout for the specific hospital view.
- **`/admin/login`**: Authentication View.
  - Secure login portal for hospital administrators.
- **`/admin/dashboard`**: Data Entry / Management.
  - Dashboard for admins to update bed availability and blood inventory live.

## 6. UI/UX Design System & Rules
Strict adherence to the following design constraints is mandatory:

- **Backgrounds:** Must strictly use `slate-50` (`bg-slate-50`) as the foundation for all pages to ensure a premium, clean look.
- **Layout:** Modern Bento-Grid layout for hospital portfolios to organize complex information symmetrically and aesthetically.
- **Typography:**
  - **Headers:** *Playfair Display* (for an elegant, editorial, "Apple Health meets Airbnb" aesthetic).
  - **UI/Body:** *Plus Jakarta Sans* (for extreme legibility and modern cleanliness).
- **Numerics:** *Tabular lining* (`tabular-nums` in Tailwind) is strictly **mandatory** for all live numbers (bed counts, blood units, timers) to prevent layout shifting during real-time updates.
- **Micro-interactions:** Use Framer Motion for subtle spring animations on hover, smooth page transitions, and staggered reveal of Bento-Grid cards.

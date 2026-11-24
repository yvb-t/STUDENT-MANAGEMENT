# EduTrack — Enterprise Student Management Portal

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Preview-blue?style=for-the-badge&logo=github)](https://yvb-t.github.io/STUDENT-MANAGEMENT/)
[![React](https://img.shields.io/badge/React-19.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

EduTrack is a responsive, institutional student information and academic operations portal engineered for modern school administrators, registrars, and academic counselors. Built with a deep-navy aesthetic, tactile touch ergonomics, scale magnification physics, and offline-first client persistence.

🌐 **Live Production App:** [https://yvb-t.github.io/STUDENT-MANAGEMENT/](https://yvb-t.github.io/STUDENT-MANAGEMENT/)

---

## 🌟 Key Highlights & Features

### 📊 1. Academic Operations Dashboard & Institutional KPIs
- **Time-Aware Greeting & Hero Banner**: Contextual morning, afternoon, and evening banners dynamically tailored to administrator working shifts.
- **Institutional Metric Tiles**: Real-time KPI summaries computing Total Enrollments, Active Student Cohorts, Average Institutional GPA, and Campus-wide Attendance.
- **Automated "Needs Follow-Up" Early Warning Engine**: Proactively detects and flags students with attendance below the 85% institutional benchmark, displaying severity indicators (amber: 70–84%, red: <70%) and one-click counselor outreach shortcuts.
- **Faculty & Department Distribution**: Visual progress breakdown charting student counts across active academic departments (Computer Science, Science & Mathematics, Business Administration, Engineering, Humanities).

### 📋 2. Student Directory & Multi-Criteria Filtering
- **Real-Time Fuzzy Search**: Fast live querying across student names, roll numbers, institutional IDs, and institutional email addresses.
- **Touch-Friendly Filter Chips**: Instant single-tap filtering by enrollment status (*All*, *Active*, *On leave*, *Alumni*) and grade levels (*Grade 9* through *Grade 12*).
- **Dual View Layout**: One-click toggling between an interactive card grid and a compact administrative data table.
- **Elevation & Scale Magnification**: Smooth scale hover physics (`transform: translateY(-4px) scale(1.02)`) with ambient drop shadows elevating active elements.

### 🎓 3. Comprehensive Student Profiles & Records
- **Academic Performance Overview**: Detailed display of enrolled coursework, course codes, semester letter grades, and cumulative GPA standing.
- **Institutional Contact Toolbar**: One-touch native telephone dialing (`tel:`) and email dispatching (`mailto:`) directly from the profile header.
- **Guardian & Emergency Information**: Immediate access to primary guardian records, relationship classifications, and emergency phone numbers.
- **Safe Record Deletion Safeguard**: Two-step modal confirmation dialog preventing inadvertent record loss.

### 📱 4. Mobile-First Ergonomics & Tactile Physics
- **48px Minimum Touch Targets**: Every button, chip, input, and link complies with WCAG accessibility and mobile tap standards.
- **Anchored Bottom Navigation**: Accessible bottom tab bar for mobile viewports providing quick switching between Dashboard, Directory, and Registration.
- **Slide-Up Bottom Sheets**: On mobile devices, the student registration and profile editing modals open as native bottom sheets with tactile grab handles.
- **Spring-Damped Transitions**: Fluid motion curves (`cubic-bezier(0.34, 1.56, 0.64, 1)`) with visual toast confirmations for all record additions, edits, and deletions.

### 🛡️ 5. Offline-First Resilience & Error Recovery
- **LocalStorage Data Synchronization**: All enrollments, edits, and deletions persist locally in the browser's HTML5 LocalStorage, allowing seamless operation across network drops.
- **Pre-Populated Working Seed Data**: Ships with realistic demo records representing diverse departments, grades, and attendance benchmarks.
- **Resilient 404 & Error Boundaries**: Client-side single-page app (SPA) routing with redirect decoding for GitHub Pages, accompanied by a Google-styled recovery view for unhandled routes or exceptions.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 (Functional Components, Custom Hooks, Context API) |
| **Client-Side Routing** | React Router DOM v7 (SPA routing with production basename) |
| **Build System** | Vite 8 (Ultra-fast Hot Module Replacement, optimized bundling) |
| **Styling & Design System** | Tailwind CSS v4 & CSS Modern Variable Tokens |
| **Iconography** | Lucide React (Feather-style SVG icon system) |
| **Data Persistence** | HTML5 LocalStorage with schema validators & fallback sanitizers |
| **Continuous Integration** | GitHub Actions Automated Pages Deployment |

---

## 📂 Project Architecture

```text
student/
├── index.html               # HTML5 entry point with SPA redirection decoder
├── package.json             # NPM package manifest, scripts, and dependencies
├── vite.config.js           # Vite configuration with production base URL
├── public/
│   ├── 404.html             # Client-side routing redirector for GitHub Pages
│   └── favicon.svg          # EduTrack branding vector icon
└── src/
    ├── main.jsx             # React DOM root with global error monitoring
    ├── App.jsx              # React Router v7 routes with production basename
    ├── index.css            # Design tokens, scale physics, and responsive styles
    │
    ├── data/
    │   └── students.js      # Student schema, data sanitizers, and demo dataset
    │
    ├── context/
    │   └── StudentContext.jsx # Global state management, CRUD methods, and toast notifications
    │
    ├── layouts/
    │   └── DashboardLayout.jsx # App shell with sidebar, navbar, and modal container
    │
    ├── components/
    │   ├── Navbar.jsx       # Header search bar with autocomplete dropdown and quick add
    │   ├── Sidebar.jsx      # Deep navy navigation drawer with amber active highlights
    │   └── ErrorBoundary.jsx# React component error containment barrier
    │
    └── pages/
        ├── Home.jsx         # Institutional dashboard with KPI tiles and Needs Follow-Up
        ├── Students.jsx     # Directory with filter chips, card grid, and table toggle
        ├── StudentDetails.jsx # Detailed student records with Call, Email, Edit, Delete
        └── NotFound.jsx     # Google-styled full-screen error screen
```

---

## 🚀 Local Development Setup

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### Step-by-Step Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yvb-t/STUDENT-MANAGEMENT.git
   cd STUDENT-MANAGEMENT
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Run code quality checks:**
   ```bash
   npm run lint
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

6. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

---

## 🎨 Design System & Color Palette

- **Primary Brand Colors**: Deep Navy (`#0f172a`), Slate Surface (`#1e293b`), Royal Blue (`#2563eb`)
- **Status & Indicators**: Emerald Green (`#10b981`), Amber Warning (`#f59e0b`), Crimson Red (`#ef4444`)
- **Typography**: Plus Jakarta Sans for executive administrative typography; JetBrains Mono for student IDs and roll codes.
- **Physical Feel**: Spring-damped transitions (`cubic-bezier(0.34, 1.56, 0.64, 1)`), 48px tactile tap targets, active compression states.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 👤 Author

**D Yuva Raja**
- GitHub: [@yvb-t](https://github.com/yvb-t)
- Profile: [AI/ML & Full-Stack Developer](https://github.com/yvb-t)

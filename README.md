# EduTrack — Student Management Portal

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Preview-blue?style=for-the-badge&logo=github)](https://yvb-t.github.io/STUDENT-MANAGEMENT/)
[![React](https://img.shields.io/badge/React-19.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

EduTrack is an institutional student information and academic operations portal engineered for modern school administrators, registrars, and academic counselors. Built with a responsive deep-navy aesthetic, tactile touch ergonomics, and client-side data persistence.

🔗 **Live Deployment:** [https://yvb-t.github.io/STUDENT-MANAGEMENT/](https://yvb-t.github.io/STUDENT-MANAGEMENT/)

---

## 🌟 Key Highlights & Features

### 📊 1. Academic Dashboard & Institutional KPIs
- **Time-Aware Personalized Greeting**: Contextual morning, afternoon, and evening welcome banners for school staff.
- **Institutional Metric Tiles**: Real-time KPI summaries tracking Total Enrollments, Active Students, Average Institutional GPA, and Campus-wide Attendance.
- **Automated "Needs Follow-Up" Warning Engine**: Proactively flags students falling below the 85% attendance benchmark with color-coded severity bars (amber: 70–84%, red: <70%) and one-click counselor outreach shortcuts.
- **Department Distribution Analytics**: Visual distribution bars breaking down student enrollments across active faculties.

### 📋 2. Student Directory & Multi-Filter Engine
- **Instant Search**: Real-time querying across student names, roll numbers, institutional IDs, and email addresses.
- **Touch-Friendly Filter Chips**: Rapid, single-tap filtering by enrollment status (*Active*, *On leave*, *Alumni*) and grade levels (*Grade 9* through *Grade 12*).
- **Dual View Layout**: Seamless toggling between an interactive card grid and a compact administrative data table.
- **Card Magnification & Elevation**: Spring-physics hover magnification (`scale(1.02)`) with depth shadows elevating cards above the grid.

### 🎓 3. Detailed Academic Profiles & Actions
- **In-Depth Academic Records**: Displays enrolled coursework, semester letter grades, cumulative GPA benchmarks, and attendance progress.
- **Direct Contact Shortcuts**: One-tap native telephone dialing (`tel:`) and email dispatching (`mailto:`) directly from the profile toolbar.
- **Safe Record Deletion**: Confirmation dialog safeguard ensuring records are not deleted unintentionally.

### 📱 4. Mobile Ergonomics & Tactile Physics
- **48px Minimum Touch Targets**: All interactive elements adhere to accessibility and touch standards.
- **Phone Bottom Navigation Bar**: Anchored mobile tab bar providing thumb-accessible navigation across Dashboard, Directory, and Registration.
- **Slide-Up Bottom Sheets**: On mobile viewports, the registration and profile editing forms open as native slide-up bottom sheets with grab handles.
- **Tactile Active Feedback**: Spring compression physics on press (`active:scale-95`) with custom toast notifications confirming operations.

### 🛡️ 5. Zero-Crash Error Fallbacks
- **LocalStorage Persistence**: Student registrations and updates persist locally in browser storage.
- **Google-Styled 404 Recovery**: Unmatched routes, missing IDs, or caught exceptions gracefully transition to an isolated full-screen Google-style 404 view.
- **React ErrorBoundary**: Enclosing boundary catching unexpected rendering errors with built-in state reset handlers.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 (Hooks, Context API, Suspense-ready) |
| **Routing** | React Router DOM v7 (Data Router ready, client-side SPA routing) |
| **Build Tool** | Vite 8 (Hot Module Replacement, optimized ES modules) |
| **Styling** | Tailwind CSS v4 & Modular Design Tokens |
| **Icons** | Lucide React (feather-style clean SVG icon set) |
| **Storage** | Client-side HTML5 LocalStorage with schema sanitizers |
| **Deployment** | GitHub Pages with SPA fallback routing |

---

## 📂 Project Architecture

```text
student/
├── index.html               # SPA entry point with GitHub Pages redirect decoder
├── package.json             # Scripts, dependencies, and project metadata
├── vite.config.js           # Vite configuration with production base URL
├── public/
│   ├── 404.html             # Client-side routing redirector for GitHub Pages
│   └── favicon.svg          # EduTrack branding vector icon
└── src/
    ├── main.jsx             # React DOM root with global unhandled error listeners
    ├── App.jsx              # React Router v6 route configuration
    ├── index.css            # Global theme variables, touch physics, and layout styles
    │
    ├── data/
    │   └── students.js      # Student schema, data sanitizers, and localStorage persistence
    │
    ├── context/
    │   └── StudentContext.jsx # Global state management, CRUD methods, and toast engine
    │
    ├── layouts/
    │   └── DashboardLayout.jsx # App shell with navy sidebar, navbar, and bottom sheet modal
    │
    ├── components/
    │   ├── Navbar.jsx       # Header search bar with auto-match dropdown and quick add
    │   ├── Sidebar.jsx      # Deep navy navigation drawer with amber active indicators
    │   └── ErrorBoundary.jsx# React component error containment barrier
    │
    └── pages/
        ├── Home.jsx         # Institutional dashboard with KPI tiles and Needs Follow-Up
        ├── Students.jsx     # Directory with filter chips, card grid, and table toggle
        ├── StudentDetails.jsx # Detailed student records with Call, Email, Edit, Delete
        └── NotFound.jsx     # Google-styled full-screen error screen
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Installation

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

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production bundle locally:**
   ```bash
   npm run preview
   ```

---

## 🎨 Design System

- **Primary Colors**: Deep Navy (`#0f172a`), Dark Navy Surface (`#1e293b`), Royal Blue (`#2563eb`)
- **Accent & Alerts**: Amber (`#f59e0b`), Emerald Green (`#10b981`), Crimson Red (`#ef4444`)
- **Typography**: Plus Jakarta Sans for clean administrative reading; JetBrains Mono for student IDs and roll codes.
- **Physical Feel**: Spring-damped transitions (`cubic-bezier(0.34, 1.56, 0.64, 1)`), 48px tactile tap targets, active compression states.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 👤 Author

**D Yuva Raja**
- GitHub: [@yvb-t](https://github.com/yvb-t)
- Profile: [AI/ML & Full-Stack Developer](https://github.com/yvb-t)

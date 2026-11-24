import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StudentProvider } from './context/StudentContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Students from './pages/Students';
import StudentDetails from './pages/StudentDetails';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ErrorBoundary>
      <StudentProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Home />} />
              <Route path="students" element={<Students />} />
              <Route path="students/:id" element={<StudentDetails />} />
            </Route>
            {/* Catch-all 404 route placed OUTSIDE DashboardLayout so Sidebar and Navbar are never shown */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </StudentProvider>
    </ErrorBoundary>
  );
}

export default App;

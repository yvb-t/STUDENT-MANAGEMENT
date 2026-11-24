import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  X,
  GraduationCap
} from 'lucide-react';
import { useStudents } from '../context/StudentContext';

export default function Sidebar({ isOpen, onClose }) {
  const { stats } = useStudents();

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar-container ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand-box">
            <GraduationCap size={22} className="text-amber" />
            <span className="sidebar-brand-title">School Admin</span>
          </div>
          <button
            type="button"
            className="sidebar-close-btn touch-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">ACADEMIC MODULES</div>

          <NavLink
            to="/"
            end
            onClick={onClose}
            className={({ isActive }) =>
              `nav-link touch-btn ${isActive ? 'active' : ''}`
            }
          >
            <LayoutDashboard size={20} className="nav-icon" />
            <span className="nav-text">Dashboard</span>
          </NavLink>

          <NavLink
            to="/students"
            onClick={onClose}
            className={({ isActive }) =>
              `nav-link touch-btn ${isActive ? 'active' : ''}`
            }
          >
            <Users size={20} className="nav-icon" />
            <span className="nav-text">Students Directory</span>
            <span className="nav-badge">{stats.total}</span>
          </NavLink>
        </nav>

        {/* Sidebar Summary Card */}
        <div className="sidebar-quick-status">
          <div className="status-label">Active Records</div>
          <div className="status-metric-row">
            <span className="status-number">{stats.active}</span>
            <span className="status-caption">Enrolled Students</span>
          </div>
        </div>
      </aside>
    </>
  );
}

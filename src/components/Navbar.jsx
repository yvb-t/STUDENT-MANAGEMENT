import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Search,
  PlusCircle,
  Menu,
  X
} from 'lucide-react';
import { useStudents } from '../context/StudentContext';

export default function Navbar({ onToggleSidebar, isSidebarOpen }) {
  const { students, openAddModal } = useStudents();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();

  const filteredQuickList = searchTerm.trim()
    ? students
        .filter(
          (s) =>
            s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.id.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/students?search=${encodeURIComponent(searchTerm.trim())}`);
      setShowSearchResults(false);
      setSearchTerm('');
    }
  };

  const handleSelectStudent = (studentId) => {
    navigate(`/students/${studentId}`);
    setShowSearchResults(false);
    setSearchTerm('');
  };

  return (
    <header className="navbar-container">
      <div className="navbar-left">
        <button
          type="button"
          className="sidebar-toggle-btn touch-btn"
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
        >
          {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link to="/" className="navbar-brand">
          <div className="brand-icon-box">
            <GraduationCap size={24} className="brand-icon" />
          </div>
          <div className="brand-text-group">
            <span className="brand-name">EduTrack</span>
            <span className="brand-tagline">Administration Portal</span>
          </div>
        </Link>
      </div>

      <div className="navbar-center">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search student by name, roll no or ID..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSearchResults(true);
            }}
            onFocus={() => setShowSearchResults(true)}
            onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
          />
          {showSearchResults && filteredQuickList.length > 0 && (
            <div className="search-dropdown">
              <div className="search-dropdown-header">Matching Students</div>
              {filteredQuickList.map((st) => (
                <div
                  key={st.id}
                  className="search-dropdown-item touch-dropdown-item"
                  onMouseDown={() => handleSelectStudent(st.id)}
                >
                  <div className="item-avatar-small">
                    {st.name.charAt(0)}
                  </div>
                  <div className="item-info">
                    <span className="item-name">{st.name}</span>
                    <span className="item-meta">
                      {st.rollNo} • {st.grade || st.department}
                    </span>
                  </div>
                  <span className="item-id-badge">{st.id}</span>
                </div>
              ))}
              <div
                className="search-dropdown-footer"
                onMouseDown={handleSearchSubmit}
              >
                Press Enter to view all results in Directory
              </div>
            </div>
          )}
        </form>
      </div>

      <div className="navbar-right">
        {/* Big Add Student Button */}
        <button
          type="button"
          onClick={openAddModal}
          className="btn btn-primary nav-add-btn touch-btn"
        >
          <PlusCircle size={18} />
          <span>Add Student</span>
        </button>

        {/* Admin Profile Chip */}
        <div className="user-profile-pill">
          <div className="profile-avatar">AD</div>
          <div className="profile-details">
            <span className="profile-name">Registrar</span>
            <span className="profile-role">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}

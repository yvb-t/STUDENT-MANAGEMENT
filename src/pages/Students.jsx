import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Users,
  Search,
  PlusCircle,
  Eye,
  Edit2,
  X,
  Building,
  Mail,
  Phone,
  Grid,
  List,
  RotateCcw
} from 'lucide-react';
import { useStudents } from '../context/StudentContext';

export default function Students() {
  const { students, openAddModal, openEditModal } = useStudents();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search filter
  const initialSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  // Status Chip filter: 'All' | 'Active' | 'On leave' | 'Alumni'
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Grade Chip filter: 'All' | 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12'
  const [selectedGrade, setSelectedGrade] = useState('All');

  // Layout View mode: 'grid' | 'table'
  const [viewMode, setViewMode] = useState('grid');

  // Filter students based on search, status chip, and grade chip
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      if (!student) return false;

      // Search match
      const query = searchTerm.toLowerCase().trim();
      const matchSearch =
        !query ||
        student.name?.toLowerCase().includes(query) ||
        student.email?.toLowerCase().includes(query) ||
        student.rollNo?.toLowerCase().includes(query) ||
        student.id?.toLowerCase().includes(query);

      // Status chip match
      const matchStatus =
        selectedStatus === 'All' ||
        student.status?.toLowerCase() === selectedStatus.toLowerCase();

      // Grade chip match
      const matchGrade =
        selectedGrade === 'All' ||
        (student.grade && student.grade.toLowerCase() === selectedGrade.toLowerCase());

      return matchSearch && matchStatus && matchGrade;
    });
  }, [students, searchTerm, selectedStatus, selectedGrade]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('All');
    setSelectedGrade('All');
    setSearchParams({});
  };

  const getAttendanceBarClass = (rate) => {
    const val = Number(rate || 0);
    if (val >= 85) return 'bar-green';
    if (val >= 70) return 'bar-amber';
    return 'bar-red';
  };

  const getAttendanceTextClass = (rate) => {
    const val = Number(rate || 0);
    if (val >= 85) return 'text-success';
    if (val >= 70) return 'text-amber';
    return 'text-danger';
  };

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Students Directory</h1>
          <p className="page-subtitle">
            Showing {filteredStudents.length} of {students.length} enrolled student profiles
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="btn btn-primary touch-btn"
        >
          <PlusCircle size={18} />
          <span>Add Student</span>
        </button>
      </div>

      {/* Search Bar & View Mode Toggle */}
      <div className="directory-search-bar-row">
        <div className="search-input-box">
          <Search size={18} className="search-box-icon" />
          <input
            type="text"
            className="directory-search-input"
            placeholder="Search by student name, roll number, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-search-btn touch-btn"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="view-mode-toggle-group">
          <button
            type="button"
            className={`view-toggle-btn touch-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            aria-label="Card Grid View"
            title="Card Grid View"
          >
            <Grid size={18} />
          </button>
          <button
            type="button"
            className={`view-toggle-btn touch-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
            aria-label="Table View"
            title="Table View"
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Touch-Friendly Filter Chips */}
      <div className="filter-chips-container">
        {/* Status Chips */}
        <div className="chips-section">
          <span className="chips-section-label">Status:</span>
          <div className="chips-row">
            {['All', 'Active', 'On leave', 'Alumni'].map((st) => (
              <button
                key={st}
                type="button"
                className={`filter-chip touch-btn ${selectedStatus === st ? 'active' : ''}`}
                onClick={() => setSelectedStatus(st)}
              >
                <span>{st}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grade Chips */}
        <div className="chips-section">
          <span className="chips-section-label">Grade:</span>
          <div className="chips-row">
            {['All', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map((gr) => (
              <button
                key={gr}
                type="button"
                className={`filter-chip touch-btn ${selectedGrade === gr ? 'active' : ''}`}
                onClick={() => setSelectedGrade(gr)}
              >
                <span>{gr}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content: Card Grid or Table View */}
      {filteredStudents.length === 0 ? (
        <div className="empty-state-card">
          <Users size={48} className="text-muted" />
          <h2 className="empty-title">
            {students.length === 0 ? 'No Students Registered Yet' : 'No Students Found'}
          </h2>
          <p className="empty-desc">
            {students.length === 0
              ? 'Your student directory is currently empty. Click below to add your first student profile with grades, department, and contact info.'
              : 'No student records match your current search or filter criteria. Try resetting filters or adding a new student.'}
          </p>
          <div className="empty-actions">
            {students.length > 0 && (
              <button
                type="button"
                className="btn btn-outline touch-btn"
                onClick={handleClearFilters}
              >
                <RotateCcw size={16} />
                <span>Reset Filters</span>
              </button>
            )}
            <button
              type="button"
              className="btn btn-primary touch-btn"
              onClick={openAddModal}
            >
              <PlusCircle size={18} />
              <span>Register New Student</span>
            </button>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        /* Card Grid View */
        <div className="students-card-grid">
          {filteredStudents.map((student) => {
            const statusClass = (student.status || 'Active').toLowerCase().replace(/\s+/g, '-');
            return (
              <article key={student.id} className="student-grid-card">
                {/* Top Status & ID Bar */}
                <div className="card-top-bar">
                  <span className="student-id-chip">{student.id}</span>
                  <span className={`status-badge ${statusClass}`}>
                    {student.status}
                  </span>
                </div>

                {/* Avatar & Header */}
                <div className="card-avatar-row">
                  <div className="card-avatar">
                    {student.name ? student.name.charAt(0) : 'S'}
                  </div>
                  <div className="card-header-info">
                    <h2 className="card-student-name">
                      <Link to={`/students/${student.id}`}>{student.name}</Link>
                    </h2>
                    <div className="card-roll-no">{student.rollNo}</div>
                    <span className="card-grade-tag">{student.grade || 'Grade 10'}</span>
                  </div>
                </div>

                {/* Details List */}
                <div className="card-details-list">
                  <div className="card-detail-item">
                    <Building size={14} className="text-muted" />
                    <span className="truncate">{student.department}</span>
                  </div>
                  <div className="card-detail-item">
                    <Mail size={14} className="text-muted" />
                    <span className="truncate">{student.email}</span>
                  </div>
                  <div className="card-detail-item">
                    <Phone size={14} className="text-muted" />
                    <span>{student.phone}</span>
                  </div>
                </div>

                {/* Metrics: GPA & Attendance Bar */}
                <div className="card-metrics-block">
                  <div className="metric-row">
                    <span className="metric-title">GPA</span>
                    <span className="metric-gpa-val">{student.gpa} <span className="stat-scale">/ 4.0</span></span>
                  </div>

                  <div className="metric-row">
                    <span className="metric-title">Attendance</span>
                    <span className={`metric-attendance-val ${getAttendanceTextClass(student.attendance)}`}>
                      {student.attendance}%
                    </span>
                  </div>

                  {/* Attendance Bar (Green >=85%, Amber 70-84%, Red <70%) */}
                  <div className="attendance-track">
                    <div
                      className={`attendance-fill ${getAttendanceBarClass(student.attendance)}`}
                      style={{ width: `${Math.min(student.attendance, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Touch-Friendly Action Buttons (>=48px) */}
                <div className="card-actions-row">
                  <Link
                    to={`/students/${student.id}`}
                    className="btn btn-outline btn-card-action touch-btn"
                  >
                    <Eye size={16} />
                    <span>View Profile</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => openEditModal(student)}
                    className="btn btn-secondary btn-card-icon touch-btn"
                    aria-label={`Edit ${student.name}`}
                    title="Edit Record"
                  >
                    <Edit2 size={16} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="dashboard-panel">
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Roll No</th>
                  <th>Grade</th>
                  <th>Department</th>
                  <th>GPA</th>
                  <th>Attendance</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((st) => (
                  <tr key={st.id}>
                    <td>
                      <div className="table-student-cell">
                        <div className="table-avatar">{st.name.charAt(0)}</div>
                        <div>
                          <div className="table-student-name">{st.name}</div>
                          <div className="table-student-email">{st.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <code className="roll-badge">{st.rollNo}</code>
                    </td>
                    <td>{st.grade || 'Grade 10'}</td>
                    <td>{st.department}</td>
                    <td>
                      <span className="gpa-pill">{st.gpa}</span>
                    </td>
                    <td>
                      <div className="table-attendance-cell">
                        <span className={`attendance-number ${getAttendanceTextClass(st.attendance)}`}>
                          {st.attendance}%
                        </span>
                        <div className="attendance-track-mini">
                          <div
                            className={`attendance-fill ${getAttendanceBarClass(st.attendance)}`}
                            style={{ width: `${Math.min(st.attendance, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${st.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {st.status}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions-cell">
                        <Link to={`/students/${st.id}`} className="table-view-btn touch-btn">
                          <Eye size={15} />
                          <span>View</span>
                        </Link>
                        <button
                          type="button"
                          className="table-edit-btn touch-btn"
                          onClick={() => openEditModal(st)}
                          aria-label="Edit student"
                        >
                          <Edit2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

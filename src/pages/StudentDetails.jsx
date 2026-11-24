import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import NotFound from './NotFound';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Edit2,
  Trash2,
  AlertTriangle,
  X,
  Building,
  GraduationCap
} from 'lucide-react';
import { useStudents } from '../context/StudentContext';

export default function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getStudentById, deleteStudent, openEditModal } = useStudents();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Safe lookup: returns null if ID doesn't exist
  const student = getStudentById(id);

  // ---------------------------------------------------------------------------
  // 404 NOT FOUND FALLBACK IF STUDENT DOES NOT EXIST OR INVALID ID
  // ---------------------------------------------------------------------------
  if (!student) {
    return <NotFound />;
  }

  const handleDeleteConfirm = () => {
    deleteStudent(student.id);
    setShowDeleteConfirm(false);
    navigate('/students');
  };

  const statusClass = (student.status || 'Active').toLowerCase().replace(/\s+/g, '-');

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

  const courses = Array.isArray(student.courses) ? student.courses : [];

  return (
    <div className="page-container">
      {/* Back to Directory Link */}
      <div className="back-nav-row">
        <Link to="/students" className="back-link touch-btn">
          <ArrowLeft size={18} />
          <span>Back to Students Directory</span>
        </Link>
      </div>

      {/* Student Profile Card Header */}
      <section className="student-profile-header-card">
        <div className="profile-main-info">
          <div className="profile-large-avatar">
            {student.name ? student.name.charAt(0) : 'S'}
          </div>
          <div className="profile-text-group">
            <div className="profile-badge-row">
              <span className="profile-id-badge">{student.id}</span>
              <span className={`status-badge ${statusClass}`}>{student.status}</span>
              <span className="grade-badge">{student.grade || 'Grade 10'}</span>
            </div>
            <h1 className="profile-student-name">{student.name}</h1>
            <div className="profile-meta-row">
              <span>Roll No: <code>{student.rollNo}</code></span>
              <span>•</span>
              <span>{student.department}</span>
              <span>•</span>
              <span>{student.year || '1st Year'}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Call, Email, Edit, Delete (All >= 48px tall) */}
        <div className="profile-actions-toolbar">
          {student.phone && student.phone !== 'N/A' && (
            <a
              href={`tel:${student.phone.replace(/[^0-9+]/g, '')}`}
              className="btn btn-secondary touch-btn action-contact-btn"
              title="Call Student"
            >
              <Phone size={18} />
              <span>Call</span>
            </a>
          )}

          {student.email && (
            <a
              href={`mailto:${student.email}`}
              className="btn btn-secondary touch-btn action-contact-btn"
              title="Send Email"
            >
              <Mail size={18} />
              <span>Email</span>
            </a>
          )}

          <button
            type="button"
            className="btn btn-primary touch-btn"
            onClick={() => openEditModal(student)}
          >
            <Edit2 size={18} />
            <span>Edit Profile</span>
          </button>

          <button
            type="button"
            className="btn btn-danger touch-btn"
            onClick={() => setShowDeleteConfirm(true)}
          >
            <Trash2 size={18} />
            <span>Delete</span>
          </button>
        </div>
      </section>

      {/* Two-Column Grid: Academic Metrics & Personal Details */}
      <div className="content-columns-grid">
        {/* Left Column: Academic Performance & Courses */}
        <div className="details-col-left">
          {/* Key Metrics: GPA & Attendance */}
          <section className="dashboard-panel">
            <h2 className="panel-title" style={{ marginBottom: 16 }}>Academic Performance Metrics</h2>
            <div className="profile-metrics-grid">
              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-label">Cumulative GPA</span>
                  <Award size={20} className="text-purple" />
                </div>
                <div className="stat-value">{student.gpa} <span className="stat-scale">/ 4.0</span></div>
                <div className="stat-subtext">Official Registrar Standing</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-label">Overall Attendance</span>
                  <span className={`font-bold ${getAttendanceTextClass(student.attendance)}`}>
                    {student.attendance}%
                  </span>
                </div>
                <div className="stat-value">{student.attendance}%</div>
                <div className="attendance-track" style={{ marginTop: 8 }}>
                  <div
                    className={`attendance-fill ${getAttendanceBarClass(student.attendance)}`}
                    style={{ width: `${Math.min(student.attendance, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Enrolled Courses */}
          <section className="dashboard-panel" style={{ marginTop: 20 }}>
            <div className="panel-header">
              <div>
                <h2 className="panel-title">Enrolled Courses & Grading</h2>
                <p className="panel-subtitle">Current academic semester registration</p>
              </div>
              <BookOpen size={20} className="text-muted" />
            </div>

            {courses.length === 0 ? (
              <p className="text-muted" style={{ padding: '16px 0', fontSize: 14 }}>
                No active courses recorded for this student.
              </p>
            ) : (
              <div className="courses-table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Course Code</th>
                      <th>Course Title</th>
                      <th>Current Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course, idx) => (
                      <tr key={idx}>
                        <td>
                          <code className="roll-badge">{course.code}</code>
                        </td>
                        <td className="font-medium">{course.title}</td>
                        <td>
                          <span className="course-grade-badge">{course.grade || 'In Progress'}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Contact, Emergency Info & Guardian */}
        <div className="details-col-right">
          <section className="dashboard-panel">
            <h2 className="panel-title" style={{ marginBottom: 16 }}>Student Profile & Contact</h2>
            <div className="profile-info-list">
              <div className="info-item">
                <Mail size={18} className="text-muted" />
                <div>
                  <div className="info-label">Institutional Email</div>
                  <div className="info-value">{student.email}</div>
                </div>
              </div>

              <div className="info-item">
                <Phone size={18} className="text-muted" />
                <div>
                  <div className="info-label">Contact Telephone</div>
                  <div className="info-value">{student.phone}</div>
                </div>
              </div>

              <div className="info-item">
                <Building size={18} className="text-muted" />
                <div>
                  <div className="info-label">Faculty / Department</div>
                  <div className="info-value">{student.department}</div>
                </div>
              </div>

              <div className="info-item">
                <GraduationCap size={18} className="text-muted" />
                <div>
                  <div className="info-label">Grade Level & Standing</div>
                  <div className="info-value">{student.grade || 'Grade 10'} • {student.year || '1st Year'}</div>
                </div>
              </div>

              <div className="info-item">
                <MapPin size={18} className="text-muted" />
                <div>
                  <div className="info-label">Residential Address</div>
                  <div className="info-value">{student.address || 'Campus Housing'}</div>
                </div>
              </div>

              <div className="info-item">
                <Calendar size={18} className="text-muted" />
                <div>
                  <div className="info-label">Enrollment Date</div>
                  <div className="info-value">{student.enrolledDate || '2024-09-01'}</div>
                </div>
              </div>
            </div>

            {student.bio && (
              <div className="profile-bio-box">
                <h3 className="bio-title">Student Biography & Counselor Notes</h3>
                <p className="bio-content">{student.bio}</p>
              </div>
            )}
          </section>

          {/* Emergency Guardian Contact Card */}
          <section className="dashboard-panel" style={{ marginTop: 20 }}>
            <h2 className="panel-title" style={{ marginBottom: 14 }}>Emergency Contact & Guardian</h2>
            <div className="emergency-contact-box">
              <div className="guardian-name">
                {student.emergencyContact?.name || 'Primary Guardian'}
              </div>
              <div className="guardian-relation">
                Relationship: <strong>{student.emergencyContact?.relation || 'Parent'}</strong>
              </div>
              <div className="guardian-phone">
                Phone: <strong>{student.emergencyContact?.phone || student.phone || 'N/A'}</strong>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Confirm Delete Dialog Modal */}
      {showDeleteConfirm && (
        <div
          className="modal-backdrop"
          onClick={() => setShowDeleteConfirm(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="confirm-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="confirm-icon-box">
              <AlertTriangle size={32} className="text-danger" />
            </div>

            <h2 className="confirm-title">Delete Student Record?</h2>
            <p className="confirm-desc">
              Are you sure you want to permanently delete <strong>{student.name}</strong> ({student.id})? All academic history, enrollment records, and contact details will be removed from local storage.
            </p>

            <div className="confirm-actions-row">
              <button
                type="button"
                className="btn btn-outline touch-btn confirm-btn"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger touch-btn confirm-btn"
                onClick={handleDeleteConfirm}
              >
                Delete Record
              </button>
            </div>

            <button
              type="button"
              className="modal-close-corner touch-btn"
              onClick={() => setShowDeleteConfirm(false)}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

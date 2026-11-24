import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useStudents } from '../context/StudentContext';
import {
  LayoutDashboard,
  Users,
  PlusCircle,
  X,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

// Dedicated Form Modal component that automatically initializes with initialData using key prop
function StudentFormModal({ mode, student, onClose, onSubmit }) {
  const [formData, setFormData] = useState(() => {
    if (mode === 'edit' && student) {
      return {
        name: student.name || '',
        email: student.email || '',
        phone: student.phone || '',
        rollNo: student.rollNo || '',
        grade: student.grade || 'Grade 10',
        department: student.department || 'Science & Mathematics',
        year: student.year || '1st Year',
        gpa: String(student.gpa ?? '3.50'),
        attendance: String(student.attendance ?? '90'),
        status: student.status || 'Active',
        address: student.address || '',
        bio: student.bio || '',
        emergencyName: student.emergencyContact?.name || '',
        emergencyPhone: student.emergencyContact?.phone || ''
      };
    }
    return {
      name: '',
      email: '',
      phone: '',
      rollNo: '',
      grade: 'Grade 10',
      department: 'Science & Mathematics',
      year: '1st Year',
      gpa: '3.50',
      attendance: '90',
      status: 'Active',
      address: '',
      bio: '',
      emergencyName: '',
      emergencyPhone: ''
    };
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = "Please enter the student's full name (at least 2 letters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address (e.g. name@school.edu).";
    }

    const attendanceNum = Number(formData.attendance);
    if (isNaN(attendanceNum) || attendanceNum < 0 || attendanceNum > 100) {
      errors.attendance = "Attendance must be a valid number between 0% and 100%.";
    }

    const gpaNum = Number(formData.gpa);
    if (isNaN(gpaNum) || gpaNum < 0.0 || gpaNum > 4.0) {
      errors.gpa = "GPA must be a valid number between 0.0 and 4.0.";
    }

    if (!formData.grade) {
      errors.grade = "Please select a grade level.";
    }

    if (!formData.status) {
      errors.status = "Please select an enrollment status.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(formData);
  };

  return (
    <div className="bottom-sheet-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div
        className="bottom-sheet-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grab handle for touch users on mobile bottom sheet */}
        <div className="sheet-drag-handle" aria-hidden="true" />

        <div className="modal-header">
          <div className="modal-title-group">
            <h2 className="modal-title">
              {mode === 'edit' ? 'Edit Student Record' : 'Register New Student'}
            </h2>
            <p className="modal-subtitle">
              {mode === 'edit'
                ? 'Update profile, grade, attendance, and contact information.'
                : 'Fill in student details to enroll them into the academic system.'}
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn touch-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="student-form-body">
          <div className="form-fields-grid">
            {/* Full Name */}
            <div className="form-group full-width">
              <label className="form-label" htmlFor="student-name">
                Full Name <span className="text-danger">*</span>
              </label>
              <input
                id="student-name"
                type="text"
                className={`form-input ${formErrors.name ? 'input-error' : ''}`}
                placeholder="e.g. Maya Lin"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {formErrors.name && (
                <p className="form-error-msg">{formErrors.name}</p>
              )}
            </div>

            {/* Email Address */}
            <div className="form-group">
              <label className="form-label" htmlFor="student-email">
                Email Address <span className="text-danger">*</span>
              </label>
              <input
                id="student-email"
                type="email"
                className={`form-input ${formErrors.email ? 'input-error' : ''}`}
                placeholder="e.g. maya.lin@school.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {formErrors.email && (
                <p className="form-error-msg">{formErrors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label className="form-label" htmlFor="student-phone">Phone Number</label>
              <input
                id="student-phone"
                type="tel"
                className="form-input"
                placeholder="e.g. +1 (555) 432-1098"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            {/* Grade Level */}
            <div className="form-group">
              <label className="form-label" htmlFor="student-grade">
                Grade Level <span className="text-danger">*</span>
              </label>
              <select
                id="student-grade"
                className="form-select"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              >
                <option value="Grade 9">Grade 9 (Freshman)</option>
                <option value="Grade 10">Grade 10 (Sophomore)</option>
                <option value="Grade 11">Grade 11 (Junior)</option>
                <option value="Grade 12">Grade 12 (Senior)</option>
              </select>
            </div>

            {/* Enrollment Status */}
            <div className="form-group">
              <label className="form-label" htmlFor="student-status">
                Enrollment Status <span className="text-danger">*</span>
              </label>
              <select
                id="student-status"
                className="form-select"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="On leave">On leave</option>
                <option value="Alumni">Alumni</option>
              </select>
            </div>

            {/* Department */}
            <div className="form-group">
              <label className="form-label" htmlFor="student-department">Department / Faculty</label>
              <select
                id="student-department"
                className="form-select"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              >
                <option value="Science & Mathematics">Science & Mathematics</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Arts & Humanities">Arts & Humanities</option>
                <option value="Engineering">Engineering</option>
                <option value="Business & Economics">Business & Economics</option>
              </select>
            </div>

            {/* Roll Number */}
            <div className="form-group">
              <label className="form-label" htmlFor="student-roll">Roll / Registration No.</label>
              <input
                id="student-roll"
                type="text"
                className="form-input"
                placeholder="Leave empty for auto-generated"
                value={formData.rollNo}
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
              />
            </div>

            {/* Attendance Rate */}
            <div className="form-group">
              <label className="form-label" htmlFor="student-attendance">
                Attendance Rate (%) <span className="text-danger">*</span>
              </label>
              <input
                id="student-attendance"
                type="number"
                min="0"
                max="100"
                className={`form-input ${formErrors.attendance ? 'input-error' : ''}`}
                placeholder="e.g. 92"
                value={formData.attendance}
                onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
              />
              {formErrors.attendance && (
                <p className="form-error-msg">{formErrors.attendance}</p>
              )}
            </div>

            {/* Cumulative GPA */}
            <div className="form-group">
              <label className="form-label" htmlFor="student-gpa">
                Cumulative GPA (0.00 - 4.00) <span className="text-danger">*</span>
              </label>
              <input
                id="student-gpa"
                type="number"
                step="0.01"
                min="0"
                max="4.0"
                className={`form-input ${formErrors.gpa ? 'input-error' : ''}`}
                placeholder="e.g. 3.75"
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
              />
              {formErrors.gpa && (
                <p className="form-error-msg">{formErrors.gpa}</p>
              )}
            </div>

            {/* Emergency Contact Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="student-emergency-name">Emergency Contact Name</label>
              <input
                id="student-emergency-name"
                type="text"
                className="form-input"
                placeholder="e.g. Sarah Lin (Parent)"
                value={formData.emergencyName}
                onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
              />
            </div>

            {/* Emergency Contact Phone */}
            <div className="form-group">
              <label className="form-label" htmlFor="student-emergency-phone">Emergency Phone</label>
              <input
                id="student-emergency-phone"
                type="tel"
                className="form-input"
                placeholder="e.g. +1 (555) 432-1099"
                value={formData.emergencyPhone}
                onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
              />
            </div>

            {/* Address */}
            <div className="form-group full-width">
              <label className="form-label" htmlFor="student-address">Residential Address</label>
              <input
                id="student-address"
                type="text"
                className="form-input"
                placeholder="e.g. 104 University Ave, Boston, MA"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-actions-row">
            <button
              type="button"
              className="btn btn-outline touch-btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary touch-btn"
            >
              {mode === 'edit' ? 'Save Changes' : 'Register Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {
    toasts,
    removeToast,
    modalState,
    closeModal,
    addStudent,
    updateStudent,
    openAddModal
  } = useStudents();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleModalSubmit = (formData) => {
    if (modalState.mode === 'edit' && modalState.student) {
      updateStudent(modalState.student.id, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        rollNo: formData.rollNo.trim() || modalState.student.rollNo,
        grade: formData.grade,
        department: formData.department,
        year: formData.year,
        gpa: parseFloat(formData.gpa) || 3.5,
        attendance: parseInt(formData.attendance, 10) || 90,
        status: formData.status,
        address: formData.address.trim(),
        bio: formData.bio.trim(),
        emergencyContact: {
          name: formData.emergencyName.trim() || 'Guardian',
          relation: 'Parent',
          phone: formData.emergencyPhone.trim() || formData.phone.trim() || 'N/A'
        }
      });
    } else {
      addStudent({
        ...formData,
        gpa: parseFloat(formData.gpa) || 3.5,
        attendance: parseInt(formData.attendance, 10) || 90
      });
    }
  };

  return (
    <div className="dashboard-app-root">
      {/* Main Header Navbar */}
      <Navbar
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="dashboard-body">
        {/* Deep Navy Sidebar Navigation */}
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        <main className="main-viewport">
          <div className="main-content-inner">
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Tab Bar (phones only) */}
      <nav className="mobile-bottom-tab-bar" aria-label="Mobile Navigation">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `bottom-tab-item ${isActive ? 'active' : ''}`}
        >
          <LayoutDashboard size={20} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/students"
          className={({ isActive }) => `bottom-tab-item ${isActive ? 'active' : ''}`}
        >
          <Users size={20} />
          <span>Students</span>
        </NavLink>

        <button
          type="button"
          onClick={openAddModal}
          className="bottom-tab-item tab-action-btn"
          aria-label="Add Student"
        >
          <div className="tab-add-icon-circle">
            <PlusCircle size={22} />
          </div>
          <span>Add</span>
        </button>
      </nav>

      {/* Toast Notification Container */}
      <div className="toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast-card toast-${toast.type}`}>
            <div className="toast-icon">
              {toast.type === 'warning' ? (
                <AlertTriangle size={18} />
              ) : (
                <CheckCircle size={18} />
              )}
            </div>
            <div className="toast-message">{toast.message}</div>
            <button
              type="button"
              className="toast-close-btn"
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss toast"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Add / Edit Student Bottom Sheet Form (Key resets state on mode/student change) */}
      {modalState.isOpen && (
        <StudentFormModal
          key={`${modalState.mode}-${modalState.student?.id || 'new'}`}
          mode={modalState.mode}
          student={modalState.student}
          onClose={closeModal}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
}

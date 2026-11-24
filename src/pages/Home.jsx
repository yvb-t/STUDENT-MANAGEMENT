import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Award,
  CalendarCheck,
  Building2,
  ArrowRight,
  PlusCircle,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import { useStudents } from '../context/StudentContext';

export default function Home() {
  const { students, stats, openAddModal } = useStudents();

  // Time-based greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const recentStudents = students.slice(0, 5);
  const needsFollowUp = stats.needsFollowUp || [];

  return (
    <div className="page-container">
      {/* Time-Based Greeting Hero Section */}
      <section className="dashboard-hero-card">
        <div className="hero-text">
          <div className="greeting-pill">
            <span className="greeting-dot" />
            <span>School Administration Portal</span>
          </div>
          <h1 className="hero-title">{greeting}, Administrator</h1>
          <p className="hero-subtitle">
            Welcome to the academic management dashboard. Track student enrollments, monitor attendance risk factors, and coordinate institutional records.
          </p>
          <div className="hero-actions">
            {/* Big "Add Student" Button (Touch-Friendly >= 48px) */}
            <button
              type="button"
              onClick={openAddModal}
              className="btn btn-primary btn-large touch-btn"
            >
              <PlusCircle size={20} />
              <span>Add Student</span>
            </button>

            <Link to="/students" className="btn btn-secondary btn-large touch-btn">
              <Users size={20} />
              <span>Browse All Students</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Metric KPI Stat Tiles */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Total Students</span>
            <div className="stat-icon-wrapper blue">
              <Users size={22} />
            </div>
          </div>
          <div className="stat-value">{stats.total}</div>
          <div className="stat-subtext">
            <span>Registered institutional profiles</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Active Enrollment</span>
            <div className="stat-icon-wrapper green">
              <CheckCircle size={22} />
            </div>
          </div>
          <div className="stat-value">{stats.active}</div>
          <div className="stat-subtext">
            <span>{stats.onLeave} on leave • {stats.alumni} alumni</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Average Institutional GPA</span>
            <div className="stat-icon-wrapper purple">
              <Award size={22} />
            </div>
          </div>
          <div className="stat-value">
            {stats.avgGpa} <span className="stat-scale">/ 4.0</span>
          </div>
          <div className="stat-subtext">
            <span>Academic performance benchmark</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Avg Attendance Rate</span>
            <div className="stat-icon-wrapper amber">
              <CalendarCheck size={22} />
            </div>
          </div>
          <div className="stat-value">{stats.avgAttendance}%</div>
          <div className="attendance-track">
            <div
              className={`attendance-fill ${
                stats.avgAttendance >= 85
                  ? 'bar-green'
                  : stats.avgAttendance >= 70
                  ? 'bar-amber'
                  : 'bar-red'
              }`}
              style={{ width: `${Math.min(stats.avgAttendance, 100)}%` }}
            />
          </div>
        </div>
      </section>

      {/* "Needs Follow-Up" List (Attendance below 85%) */}
      <section className="dashboard-panel follow-up-panel">
        <div className="panel-header">
          <div className="panel-title-with-badge">
            <div className="follow-up-indicator">
              <AlertCircle size={20} className="text-danger" />
            </div>
            <div>
              <h2 className="panel-title">Needs Follow-Up (Attendance Below 85%)</h2>
              <p className="panel-subtitle">
                Students requiring counselor outreach, absence reviews, or academic support.
              </p>
            </div>
          </div>
          <span className="warning-count-badge">
            {needsFollowUp.length} {needsFollowUp.length === 1 ? 'Student' : 'Students'}
          </span>
        </div>

        {students.length === 0 ? (
          <div className="follow-up-empty-card">
            <Users size={32} className="text-muted" />
            <div className="empty-text">
              <h3>No Student Records Yet</h3>
              <p>Add your first student to begin tracking attendance, grades, and academic records.</p>
            </div>
            <button
              type="button"
              onClick={openAddModal}
              className="btn btn-primary btn-sm touch-btn"
              style={{ marginLeft: 'auto' }}
            >
              <PlusCircle size={16} />
              <span>Add Student</span>
            </button>
          </div>
        ) : needsFollowUp.length === 0 ? (
          <div className="follow-up-empty-card">
            <CheckCircle size={32} className="text-success" />
            <div className="empty-text">
              <h3>Excellent Attendance Record!</h3>
              <p>All currently enrolled students meet or exceed the 85% attendance standard.</p>
            </div>
          </div>
        ) : (
          <div className="follow-up-grid">
            {needsFollowUp.map((st) => {
              const isCritical = Number(st.attendance) < 70;
              return (
                <div key={st.id} className="follow-up-card">
                  <div className="follow-up-header">
                    <div className="follow-up-avatar">
                      {st.name.charAt(0)}
                    </div>
                    <div className="follow-up-info">
                      <h4 className="follow-up-name">{st.name}</h4>
                      <div className="follow-up-meta">
                        <span>{st.grade || 'Grade 10'}</span> • <code>{st.rollNo}</code>
                      </div>
                    </div>
                    <span className={`status-badge-compact ${st.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {st.status}
                    </span>
                  </div>

                  <div className="follow-up-attendance-section">
                    <div className="attendance-label-row">
                      <span className="rate-caption">
                        <TrendingDown size={14} className={isCritical ? 'text-danger' : 'text-amber'} />
                        <span>Attendance Rate</span>
                      </span>
                      <span className={`rate-value ${isCritical ? 'text-danger' : 'text-amber'}`}>
                        {st.attendance}%
                      </span>
                    </div>
                    <div className="attendance-track">
                      <div
                        className={`attendance-fill ${isCritical ? 'bar-red' : 'bar-amber'}`}
                        style={{ width: `${Math.min(st.attendance, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="follow-up-footer">
                    <span className="department-tag">{st.department}</span>
                    <Link
                      to={`/students/${st.id}`}
                      className="btn btn-outline btn-sm follow-up-btn touch-btn"
                    >
                      <span>Follow Up</span>
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Two-column layout: Recent Students & Department Distribution */}
      <div className="content-columns-grid">
        {/* Left Column: Recent Students */}
        <section className="dashboard-panel">
          <div className="panel-header">
            <div>
              <h2 className="panel-title">Recent Student Records</h2>
              <p className="panel-subtitle">Profiles registered or updated in the system</p>
            </div>
            <Link to="/students" className="panel-action-link">
              <span>View All</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {recentStudents.length === 0 ? (
            <div className="empty-inline-state">
              <Users size={36} className="text-muted" style={{ margin: '0 auto 10px', display: 'block' }} />
              <p>No student records registered yet.</p>
              <button
                type="button"
                onClick={openAddModal}
                className="btn btn-primary btn-sm touch-btn"
                style={{ marginTop: 12 }}
              >
                <PlusCircle size={16} />
                <span>Register First Student</span>
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Grade</th>
                    <th>Attendance</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentStudents.map((st) => (
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
                        <span className="grade-badge">{st.grade || 'Grade 10'}</span>
                      </td>
                      <td>
                        <div className="table-attendance-cell">
                          <span className={`attendance-number ${
                            st.attendance >= 85 ? 'text-success' : st.attendance >= 70 ? 'text-amber' : 'text-danger'
                          }`}>
                            {st.attendance}%
                          </span>
                          <div className="attendance-track-mini">
                            <div
                              className={`attendance-fill ${
                                st.attendance >= 85 ? 'bar-green' : st.attendance >= 70 ? 'bar-amber' : 'bar-red'
                              }`}
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
                        <Link to={`/students/${st.id}`} className="table-view-btn touch-btn">
                          <span>Details</span>
                          <ExternalLink size={14} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Right Column: Department Distribution */}
        <aside className="dashboard-side-panels">
          <div className="dashboard-panel">
            <div className="panel-header">
              <div>
                <h2 className="panel-title">Faculty Distribution</h2>
                <p className="panel-subtitle">{stats.departmentsCount} Active Departments</p>
              </div>
              <Building2 size={20} className="text-muted" />
            </div>

            {Object.keys(stats.deptBreakdown).length === 0 ? (
              <p className="text-muted" style={{ fontSize: 13, padding: '12px 0' }}>
                Department statistics will appear once students are enrolled.
              </p>
            ) : (
              <div className="department-list">
                {Object.entries(stats.deptBreakdown).map(([dept, count]) => {
                  const percentage = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                  return (
                    <div key={dept} className="department-item">
                      <div className="dept-info">
                        <span className="dept-name">{dept}</span>
                        <span className="dept-count">
                          {count} {count === 1 ? 'student' : 'students'} ({percentage}%)
                        </span>
                      </div>
                      <div className="dept-bar-track">
                        <div
                          className="dept-bar-fill"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

import { useState } from 'react';
import {
  GraduationCap,
  Users,
  CalendarCheck,
  Building,
  Download,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';
import { useStudents } from '../context/StudentContext';

export default function About() {
  const { students, stats, resetToDefault, showToast } = useStudents();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExportData = () => {
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(students, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `edutrack_students_backup_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      setDownloadSuccess(true);
      showToast('Student data exported successfully!');
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (e) {
      console.error('Export failed:', e);
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-row">
        <div>
          <h1 className="page-title">About EduTrack Portal</h1>
          <p className="page-subtitle">
            Comprehensive student information system designed for academic administration, enrollment tracking, and student performance monitoring.
          </p>
        </div>
      </div>

      {/* School Overview & Operational Pillars */}
      <div className="about-cards-grid">
        <div className="about-feature-card">
          <div className="feature-icon-wrapper blue">
            <GraduationCap size={28} />
          </div>
          <h3>Academic Record Keeping</h3>
          <p>
            Maintains structured academic profiles, course registrations, department allocations, and cumulative GPA metrics for all enrolled students across secondary grade levels.
          </p>
        </div>

        <div className="about-feature-card">
          <div className="feature-icon-wrapper green">
            <CalendarCheck size={28} />
          </div>
          <h3>Attendance & Performance Monitoring</h3>
          <p>
            Enables educators and counselors to proactively identify students requiring follow-up interventions when attendance rates dip below institutional benchmarks.
          </p>
        </div>

        <div className="about-feature-card">
          <div className="feature-icon-wrapper purple">
            <ShieldCheck size={28} />
          </div>
          <h3>Data Privacy & Safety</h3>
          <p>
            Emergency contact information, guardian relationships, and student addresses are securely stored with instant access for authorized school personnel.
          </p>
        </div>
      </div>

      {/* Institutional Statistics & Data Management */}
      <div className="content-columns-grid" style={{ marginTop: 8 }}>
        <section className="dashboard-panel">
          <div className="panel-header">
            <div>
              <h2 className="panel-title">Institutional Overview</h2>
              <p className="panel-subtitle">Current school enrollment and academic standing</p>
            </div>
            <Building size={20} className="text-muted" />
          </div>

          <div className="diagnostics-list">
            <div className="diagnostic-item">
              <span className="diag-label">Total Registered Students:</span>
              <span className="font-semibold">{stats.total} Profiles</span>
            </div>
            <div className="diagnostic-item">
              <span className="diag-label">Active Enrollment:</span>
              <span className="status-badge active">{stats.active} Active</span>
            </div>
            <div className="diagnostic-item">
              <span className="diag-label">On Leave / Alumni:</span>
              <span className="font-semibold">{stats.onLeave + stats.alumni} Students</span>
            </div>
            <div className="diagnostic-item">
              <span className="diag-label">Average Institutional GPA:</span>
              <span className="font-semibold">{stats.avgGpa} / 4.0</span>
            </div>
            <div className="diagnostic-item">
              <span className="diag-label">Average Attendance Rate:</span>
              <span className="font-semibold">{stats.avgAttendance}%</span>
            </div>
          </div>
        </section>

        <section className="dashboard-panel">
          <div className="panel-header">
            <div>
              <h2 className="panel-title">Data Administration</h2>
              <p className="panel-subtitle">Backup and manage student database</p>
            </div>
            <Users size={20} className="text-muted" />
          </div>

          <p className="text-muted" style={{ marginBottom: 16 }}>
            Export the complete student registry as a structured JSON file to your local computer, or clear all records from the browser database.
          </p>

          <div className="data-admin-buttons">
            <button
              type="button"
              className="btn btn-secondary touch-btn"
              onClick={handleExportData}
            >
              <Download size={18} />
              <span>{downloadSuccess ? 'Exported!' : 'Export JSON Backup'}</span>
            </button>

            <button
              type="button"
              className="btn btn-outline touch-btn"
              onClick={resetToDefault}
            >
              <RotateCcw size={18} />
              <span>Clear All Records</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

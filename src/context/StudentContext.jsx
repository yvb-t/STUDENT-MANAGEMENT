/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  INITIAL_STUDENTS,
  loadStudents,
  saveStudents,
  findStudent,
  sanitizeStudent
} from '../data/students';

const StudentContext = createContext(null);

export function StudentProvider({ children }) {
  const [students, setStudents] = useState(() => {
    try {
      return loadStudents();
    } catch (err) {
      console.error('Silent fallback on initial load:', err);
      return INITIAL_STUDENTS.map(sanitizeStudent);
    }
  });

  const [isOffline, setIsOffline] = useState(() => {
    try {
      return typeof navigator !== 'undefined' ? !navigator.onLine : false;
    } catch (err) {
      console.error('Silent fallback on navigator check:', err);
      return false;
    }
  });

  // Toast Notification Queue
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Global Add/Edit Modal Bottom Sheet State
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'add', // 'add' | 'edit'
    student: null
  });

  const openAddModal = useCallback(() => {
    setModalState({ isOpen: true, mode: 'add', student: null });
  }, []);

  const openEditModal = useCallback((student) => {
    setModalState({ isOpen: true, mode: 'edit', student: sanitizeStudent(student) });
  }, []);

  const closeModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  // Online / Offline window listeners
  useEffect(() => {
    try {
      const handleOnline = () => {
        setIsOffline(false);
      };
      const handleOffline = () => {
        setIsOffline(true);
      };
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    } catch (err) {
      console.error('Silent fallback on network listeners:', err);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      saveStudents(students);
    } catch (err) {
      console.error('Silent fallback on students save:', err);
    }
  }, [students]);

  const getStudentById = (id) => {
    try {
      return findStudent(students, id);
    } catch (err) {
      console.error('Silent fallback on getStudentById:', err);
      return null;
    }
  };

  const addStudent = (studentData) => {
    try {
      const nextNumericId =
        students.reduce((max, s) => {
          const num = parseInt(String(s.id || '').replace(/\D/g, ''), 10);
          return isNaN(num) ? max : Math.max(max, num);
        }, 1000) + 1;

      const raw = {
        id: `STU-${nextNumericId}`,
        name: studentData.name?.trim() || 'Unnamed Student',
        email: studentData.email?.trim() || 'student@edutrack.edu',
        phone: studentData.phone?.trim() || 'N/A',
        rollNo: studentData.rollNo?.trim() || `REG-2024-${String(nextNumericId).slice(-3)}`,
        department: studentData.department || 'Science & Mathematics',
        grade: studentData.grade || 'Grade 10',
        year: studentData.year || '1st Year',
        gpa: parseFloat(studentData.gpa) || 3.5,
        attendance: parseInt(studentData.attendance, 10) || 90,
        status: studentData.status || 'Active',
        enrolledDate: new Date().toISOString().split('T')[0],
        address: studentData.address?.trim() || 'Campus Hostel',
        bio: studentData.bio?.trim() || '',
        emergencyContact: {
          name: studentData.emergencyName?.trim() || 'Guardian',
          relation: studentData.emergencyRelation?.trim() || 'Parent',
          phone: studentData.emergencyPhone?.trim() || studentData.phone?.trim() || 'N/A'
        },
        courses: [
          { code: 'GEN-CORE-101', title: 'Core Academic Studies', grade: 'A' }
        ]
      };

      const newStudent = sanitizeStudent(raw);
      setStudents((prev) => [newStudent, ...prev]);
      showToast('Student registered successfully!');
      closeModal();
      return newStudent;
    } catch (err) {
      console.error('Silent fallback on addStudent:', err);
      return null;
    }
  };

  const updateStudent = (id, updatedFields) => {
    try {
      setStudents((prev) =>
        prev.map((s) => (s.id === id ? sanitizeStudent({ ...s, ...updatedFields }) : s))
      );
      showToast('Changes saved');
      closeModal();
    } catch (err) {
      console.error('Silent fallback on updateStudent:', err);
    }
  };

  const deleteStudent = (id) => {
    try {
      setStudents((prev) => prev.filter((s) => s.id !== id));
      showToast('Student record deleted', 'info');
    } catch (err) {
      console.error('Silent fallback on deleteStudent:', err);
    }
  };

  const resetToDefault = () => {
    try {
      setStudents(INITIAL_STUDENTS.map(sanitizeStudent));
      saveStudents(INITIAL_STUDENTS);
      showToast('Reset to demo records', 'info');
    } catch (err) {
      console.error('Silent fallback on resetToDefault:', err);
    }
  };

  const stats = useMemo(() => {
    try {
      const list = Array.isArray(students) ? students : [];
      const total = list.length;
      const active = list.filter((s) => s.status === 'Active').length;
      const onLeave = list.filter((s) => s.status === 'On leave').length;
      const alumni = list.filter((s) => s.status === 'Alumni').length;
      const avgGpa = total > 0 ? (list.reduce((acc, s) => acc + (Number(s.gpa) || 0), 0) / total).toFixed(2) : '0.00';
      const avgAttendance = total > 0 ? Math.round(list.reduce((acc, s) => acc + (Number(s.attendance) || 0), 0) / total) : 0;
      
      // Needs follow-up list: students with attendance below 85%
      const needsFollowUp = list.filter((s) => Number(s.attendance || 0) < 85);

      const depts = {};
      list.forEach((s) => {
        const d = s.department || 'General';
        depts[d] = (depts[d] || 0) + 1;
      });

      return {
        total,
        active,
        onLeave,
        alumni,
        avgGpa,
        avgAttendance,
        needsFollowUp,
        departmentsCount: Object.keys(depts).length,
        deptBreakdown: depts
      };
    } catch (err) {
      console.error('Silent fallback on stats calculation:', err);
      return {
        total: 0,
        active: 0,
        onLeave: 0,
        alumni: 0,
        avgGpa: '0.00',
        avgAttendance: 0,
        needsFollowUp: [],
        departmentsCount: 0,
        deptBreakdown: {}
      };
    }
  }, [students]);

  return (
    <StudentContext.Provider
      value={{
        students,
        isOffline,
        getStudentById,
        addStudent,
        updateStudent,
        deleteStudent,
        resetToDefault,
        stats,
        toasts,
        showToast,
        removeToast,
        modalState,
        openAddModal,
        openEditModal,
        closeModal
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudents() {
  const context = useContext(StudentContext);
  if (!context) {
    return {
      students: [],
      isOffline: false,
      getStudentById: () => null,
      addStudent: () => null,
      updateStudent: () => {},
      deleteStudent: () => {},
      resetToDefault: () => {},
      stats: { total: 0, active: 0, onLeave: 0, alumni: 0, avgGpa: '0.00', avgAttendance: 0, needsFollowUp: [], departmentsCount: 0, deptBreakdown: {} },
      toasts: [],
      showToast: () => {},
      removeToast: () => {},
      modalState: { isOpen: false, mode: 'add', student: null },
      openAddModal: () => {},
      openEditModal: () => {},
      closeModal: () => {}
    };
  }
  return context;
}

export const STORAGE_KEY = 'edutrack_students_clean_v1';

// Empty mock data: all student records are created dynamically by the user
export const INITIAL_STUDENTS = [];

// Safe default values for student objects to prevent missing field crashes
export const DEFAULT_STUDENT = {
  id: 'STU-1001',
  name: 'Unnamed Student',
  rollNo: 'REG-2026-001',
  grade: 'Grade 10',
  attendance: 90,
  gpa: 3.50,
  department: 'Science & Mathematics',
  year: '1st Year',
  status: 'Active',
  email: 'student@edutrack.edu',
  phone: 'N/A',
  address: 'Campus Hostel',
  bio: '',
  enrolledDate: '2026-01-01',
  courses: [],
  emergencyContact: {
    name: 'Guardian',
    relation: 'Family',
    phone: 'N/A'
  }
};

export function sanitizeStudent(student) {
  if (!student || typeof student !== 'object') {
    return { ...DEFAULT_STUDENT };
  }
  return {
    ...DEFAULT_STUDENT,
    ...student,
    gpa: typeof student.gpa === 'number' ? student.gpa : parseFloat(student.gpa) || 3.50,
    attendance: typeof student.attendance === 'number' ? student.attendance : parseInt(student.attendance, 10) || 90,
    courses: Array.isArray(student.courses) ? student.courses : [],
    emergencyContact: {
      ...DEFAULT_STUDENT.emergencyContact,
      ...(student.emergencyContact || {})
    }
  };
}

export function loadStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.map(sanitizeStudent);
      }
    }
  } catch (err) {
    console.error('Silent fallback: Could not read students from localStorage:', err);
  }
  return [];
}

export function saveStudents(students) {
  try {
    const safeData = Array.isArray(students) ? students.map(sanitizeStudent) : [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeData));
  } catch (err) {
    console.error('Silent fallback: Could not save students to localStorage:', err);
  }
}

export function findStudent(students, id) {
  try {
    if (!id || !Array.isArray(students)) return null;
    const cleanId = String(id).trim().toLowerCase();
    const cleanNum = cleanId.replace(/\D/g, '');

    const found = students.find((s) => {
      if (!s) return false;
      const sId = String(s.id || '').trim().toLowerCase();
      const sRoll = String(s.rollNo || '').trim().toLowerCase();
      const sNum = sId.replace(/\D/g, '');

      return sId === cleanId || sRoll === cleanId || (cleanNum && sNum === cleanNum);
    });

    return found ? sanitizeStudent(found) : null;
  } catch (err) {
    console.error('Silent fallback: findStudent error:', err);
    return null;
  }
}

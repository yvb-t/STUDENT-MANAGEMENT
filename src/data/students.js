export const STORAGE_KEY = 'edutrack_students_v2';

// Realistic working institutional demo dataset
export const INITIAL_STUDENTS = [
  {
    id: 'STU-1001',
    name: 'Aarav Sharma',
    rollNo: 'REG-2026-001',
    grade: 'Grade 12',
    attendance: 96,
    gpa: 3.92,
    department: 'Computer Science',
    year: '4th Year',
    status: 'Active',
    email: 'aarav.sharma@edutrack.edu',
    phone: '+1 (555) 234-5678',
    address: '42 Campus Heights, Block B',
    bio: 'Dean\'s Honor Roll scholar specializing in algorithms and distributed systems. Student council representative for engineering faculty.',
    enrolledDate: '2023-08-15',
    courses: [
      { code: 'CS-401', title: 'Advanced Algorithms', grade: 'A' },
      { code: 'CS-402', title: 'Distributed Systems', grade: 'A' },
      { code: 'MA-301', title: 'Linear Algebra & Optimization', grade: 'A-' }
    ],
    emergencyContact: {
      name: 'Rajesh Sharma',
      relation: 'Father',
      phone: '+1 (555) 234-9988'
    }
  },
  {
    id: 'STU-1002',
    name: 'Sophia Chen',
    rollNo: 'REG-2026-002',
    grade: 'Grade 11',
    attendance: 91,
    gpa: 3.78,
    department: 'Business Administration',
    year: '3rd Year',
    status: 'Active',
    email: 'sophia.chen@edutrack.edu',
    phone: '+1 (555) 345-6789',
    address: '108 University Ave, Suite 4',
    bio: 'Finance and corporate strategy major with leadership roles in the collegiate investment society.',
    enrolledDate: '2024-08-20',
    courses: [
      { code: 'BA-201', title: 'Corporate Finance', grade: 'A' },
      { code: 'BA-205', title: 'Marketing Analytics', grade: 'A-' },
      { code: 'EC-101', title: 'Managerial Economics', grade: 'B+' }
    ],
    emergencyContact: {
      name: 'Mei Chen',
      relation: 'Mother',
      phone: '+1 (555) 345-1122'
    }
  },
  {
    id: 'STU-1003',
    name: 'Marcus Vance',
    rollNo: 'REG-2026-003',
    grade: 'Grade 12',
    attendance: 72,
    gpa: 3.45,
    department: 'Mechanical Engineering',
    year: '4th Year',
    status: 'Active',
    email: 'marcus.vance@edutrack.edu',
    phone: '+1 (555) 456-7890',
    address: '15 West Campus Dorms, Rm 302',
    bio: 'Robotics and thermodynamics lead. Currently in absence recovery review following mid-semester orthopedic treatment.',
    enrolledDate: '2023-08-15',
    courses: [
      { code: 'ME-310', title: 'Thermodynamics II', grade: 'B' },
      { code: 'ME-320', title: 'Fluid Dynamics', grade: 'B-' },
      { code: 'MA-302', title: 'Partial Differential Equations', grade: 'C+' }
    ],
    emergencyContact: {
      name: 'Diane Vance',
      relation: 'Mother',
      phone: '+1 (555) 456-3344'
    }
  },
  {
    id: 'STU-1004',
    name: 'Priya Patel',
    rollNo: 'REG-2026-004',
    grade: 'Grade 10',
    attendance: 98,
    gpa: 3.88,
    department: 'Science & Mathematics',
    year: '2nd Year',
    status: 'Active',
    email: 'priya.patel@edutrack.edu',
    phone: '+1 (555) 567-8901',
    address: '77 Lakeview Quadrangle',
    bio: 'Biochemistry researcher with outstanding academic consistency and peer tutoring contributions in organic chemistry.',
    enrolledDate: '2025-08-18',
    courses: [
      { code: 'SC-101', title: 'Molecular Genetics', grade: 'A' },
      { code: 'SC-102', title: 'Organic Chemistry Lab', grade: 'A' },
      { code: 'MA-101', title: 'Multivariate Calculus', grade: 'A' }
    ],
    emergencyContact: {
      name: 'Vikram Patel',
      relation: 'Father',
      phone: '+1 (555) 567-5566'
    }
  },
  {
    id: 'STU-1005',
    name: 'Ethan Walker',
    rollNo: 'REG-2026-005',
    grade: 'Grade 9',
    attendance: 68,
    gpa: 3.10,
    department: 'Humanities & Arts',
    year: '1st Year',
    status: 'Active',
    email: 'ethan.walker@edutrack.edu',
    phone: '+1 (555) 678-9012',
    address: '22 Elm Street, Apt 1A',
    bio: 'Freshman student focusing on modern media ethics and creative writing. Outreach scheduled with faculty counselor.',
    enrolledDate: '2026-01-10',
    courses: [
      { code: 'HU-101', title: 'Global Civilizations', grade: 'B-' },
      { code: 'EN-102', title: 'Rhetoric & Composition', grade: 'C+' },
      { code: 'AR-105', title: 'Visual Composition', grade: 'B' }
    ],
    emergencyContact: {
      name: 'Sarah Walker',
      relation: 'Mother',
      phone: '+1 (555) 678-7788'
    }
  },
  {
    id: 'STU-1006',
    name: 'Ananya Gupta',
    rollNo: 'REG-2026-006',
    grade: 'Grade 11',
    attendance: 94,
    gpa: 3.95,
    department: 'Computer Science',
    year: '3rd Year',
    status: 'Active',
    email: 'ananya.gupta@edutrack.edu',
    phone: '+1 (555) 789-0123',
    address: '58 North Hall, Floor 2',
    bio: 'Competitive programming champion and machine learning research intern. Top GPA standing across the department.',
    enrolledDate: '2024-08-20',
    courses: [
      { code: 'CS-301', title: 'Operating Systems & Kernels', grade: 'A' },
      { code: 'CS-305', title: 'Artificial Intelligence', grade: 'A' },
      { code: 'MA-201', title: 'Discrete Mathematics', grade: 'A' }
    ],
    emergencyContact: {
      name: 'Sunita Gupta',
      relation: 'Mother',
      phone: '+1 (555) 789-8899'
    }
  },
  {
    id: 'STU-1007',
    name: 'Liam O\'Connor',
    rollNo: 'REG-2026-007',
    grade: 'Grade 10',
    attendance: 82,
    gpa: 3.30,
    department: 'Electrical Engineering',
    year: '2nd Year',
    status: 'On leave',
    email: 'liam.oconnor@edutrack.edu',
    phone: '+1 (555) 890-1234',
    address: '90 South Campus Court',
    bio: 'Hardware electronics and signal processing focus. On approved medical sabbatical for the current semester.',
    enrolledDate: '2025-08-18',
    courses: [
      { code: 'EE-201', title: 'Analog Circuits', grade: 'B' },
      { code: 'EE-204', title: 'Digital Logic Architecture', grade: 'B+' }
    ],
    emergencyContact: {
      name: 'Sean O\'Connor',
      relation: 'Father',
      phone: '+1 (555) 890-4455'
    }
  },
  {
    id: 'STU-1008',
    name: 'Maya Lin',
    rollNo: 'REG-2026-008',
    grade: 'Grade 12',
    attendance: 95,
    gpa: 3.90,
    department: 'Science & Mathematics',
    year: '4th Year',
    status: 'Alumni',
    email: 'maya.lin@alumni.edutrack.edu',
    phone: '+1 (555) 901-2345',
    address: '112 Commonwealth Ave',
    bio: 'Distinguished graduate with departmental honors. Currently pursuing biomedical research fellowship.',
    enrolledDate: '2022-08-15',
    courses: [
      { code: 'SC-401', title: 'Advanced Biochemistry', grade: 'A' },
      { code: 'SC-402', title: 'Structural Bioinformatics', grade: 'A' }
    ],
    emergencyContact: {
      name: 'Kevin Lin',
      relation: 'Father',
      phone: '+1 (555) 901-6677'
    }
  }
];

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
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(sanitizeStudent);
      }
    }
  } catch (err) {
    console.error('Silent fallback: Could not read students from localStorage:', err);
  }
  return INITIAL_STUDENTS.map(sanitizeStudent);
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

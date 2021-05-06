export interface DisciplinesDB {
  id: string;
  disciplineValue: string;
  semesterId: string;
  attendanceWeight: number;
  countWithAttendance: boolean;
  five: number;
  four: number;
  three: number;
}

export interface DisciplineTeacherDB {
  id: string;
  disciplineId: string;
  teacherId: string;
}

export interface DisciplinesDB {
  id: string;
  disciplineValue: string;
  semesterId: string;
  attendanceWeight: number;
  countWithAttendance: boolean;
}

export interface DisciplineTeacherDB {
  id: string;
  disciplineId: string;
  teacherId: string;
}

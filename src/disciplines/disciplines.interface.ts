export interface DisciplinesDB {
  id: string;
  disciplineValue: string;
  semesterId: string;
}

export interface DisciplineTeacherDB {
  id: string;
  disciplineId: string;
  teacherId: string;
}

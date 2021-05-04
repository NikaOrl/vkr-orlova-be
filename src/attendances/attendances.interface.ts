import { OmitDeleted } from '../../common/types/omit-deleted';

export interface AttendancesDB {
  id: string;
  disciplineId: string;
  attendanceName: string;
  numberInList: number;
  deleted: boolean;
}

export type Attendances = OmitDeleted<AttendancesDB>;

export interface AttendanceMarksDB {
  id: string;
  studentId: string;
  attendanceId: string;
  attendanceMarkValue: boolean;
  deleted: boolean;
}

export type AttendanceMarks = OmitDeleted<AttendanceMarksDB>;

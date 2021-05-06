import { OmitDeleted } from '../../common/types/omit-deleted';

export interface AttendanceMarksDB {
  id: string;
  studentId: string;
  attendanceId: string;
  attendanceMarkValue: boolean;
  deleted: boolean;
}

export type AttendanceMarks = OmitDeleted<AttendanceMarksDB>;

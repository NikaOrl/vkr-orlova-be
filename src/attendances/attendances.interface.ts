import { OmitDeleted } from '../../common/types/omit-deleted';

export interface AttendancesDB {
  id: string;
  disciplineId: string;
  attendanceName: string;
  numberInList: number;
  deleted: boolean;
}

export type Attendances = OmitDeleted<AttendancesDB>;

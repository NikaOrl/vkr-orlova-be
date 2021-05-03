import { OmitDeleted } from '../../common/types/omit-deleted';

export interface MarkDB {
  id: string;
  studentId: string;
  jobId: string;
  markValue: string;
  deleted: boolean;
}

export type Mark = OmitDeleted<MarkDB>;

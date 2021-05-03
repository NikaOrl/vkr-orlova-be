import { OmitDeleted } from '../../common/types/omit-deleted';

export interface JobDB {
  id: string;
  disciplineId: string;
  moduleId: string;
  numberInList: number;
  jobValue: string;
  maxPoint: string;
  deleted: boolean;
}

export type Job = OmitDeleted<JobDB>;

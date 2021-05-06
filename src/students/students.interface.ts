import { OmitDeleted } from '../../common/types/omit-deleted';

export interface StudentDB {
  id: string;
  groupId: string;
  firstName: string;
  lastName: string;
  email: string;
  numberInList: number;
  headStudent: boolean;
  deleted: boolean;
}

export type Student = OmitDeleted<StudentDB>;

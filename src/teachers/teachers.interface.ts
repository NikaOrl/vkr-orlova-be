import { OmitDeleted } from '../../common/types/omit-deleted';

export interface TeacherDB {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  password: string;
  deleted: boolean;
}

export type Teacher = OmitDeleted<TeacherDB>;

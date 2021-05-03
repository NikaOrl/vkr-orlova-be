import { OmitDeleted } from '../../common/types/omit-deleted';

export interface ModuleDB {
  id: string;
  moduleName: string;
  numberInList: number;
  deleted: boolean;
}

export type Module = OmitDeleted<ModuleDB>;

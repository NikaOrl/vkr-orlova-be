import { ForcefullyOmit } from './forcefully-omit';

type WithDeleted = {
  deleted: boolean;
};

export type OmitDeleted<T extends WithDeleted> = ForcefullyOmit<T, 'deleted'>;

export type ForcefullyOmit<T, K extends keyof T> = Omit<T, K> &
  Partial<Record<K, never>>;

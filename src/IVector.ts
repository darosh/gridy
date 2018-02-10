export interface IVector<T> {
  v(): T[];
  toString(): string;
  equals(b: IVector<T>): boolean;
}

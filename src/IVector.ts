export interface IVector<T> {
  value: T[];
  toString(): string;
  equals(b: IVector<T>): boolean;
}

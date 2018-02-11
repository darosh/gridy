import { Directions } from "./Directions";
import { Integer } from "./Integer";

export interface ITile<T> {
  neighbors(direction?: Directions<T>): Directions<T>;
  map(): Map<number, T>;
  directions(): Directions<T>;
  sides?(): Directions<T>;
  shift(): T;
  cubeLength(): number;
  equals(h: T): boolean;
  add(h: T): T;
  scale(k: Integer): T;
  v(): any[];
}

export interface ITileConstructable<T> {
  new(...args: any[]): T;
}

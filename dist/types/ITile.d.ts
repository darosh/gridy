import { Directions } from "./Directions";
import { Integer } from "./Integer";
export interface ITile<T> {
    neighbors(): Directions<T>;
    map(): Map<number, T>;
    directions(): Directions<T>;
    shift(): T;
    cubeLength(): number;
    equals(h: T): boolean;
    add(h: T): T;
    scale(k: Integer): T;
    v(): any[];
}

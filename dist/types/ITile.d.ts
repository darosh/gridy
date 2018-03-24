import { Directions } from "./Directions";
import { Integer } from "./Integer";
export interface ITile<T> {
    key: string;
    value: any[];
    neighbors(): Directions<T>;
    multiNeighbors?(): Directions<T>;
    directions(): Directions<T>;
    sides?(): Directions<T>;
    sideNeighbors?(): Directions<T>;
    opposite?(n: number): number;
    shift(): T;
    cubeLength(): number;
    equals(h: T): boolean;
    add(h: T): T;
    scale(k: Integer): T;
}
export interface ITileConstructible<T> {
    new (...args: any[]): T;
}
export declare type AnyTile = ITile<any>;
export declare type TileMap = Map<string, AnyTile>;

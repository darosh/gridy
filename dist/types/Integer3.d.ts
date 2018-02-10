import { Integer } from "./Integer";
import { IVector } from "./IVector";
export declare class Integer3 implements IVector<Integer> {
    x: Integer;
    y: Integer;
    z: Integer;
    constructor(x?: Integer, y?: Integer, z?: Integer);
    distance(b: Integer3): Integer;
    add(b: Integer3): Integer3;
    scale(k: Integer): Integer3;
    toString(): string;
    v(): Integer[];
    equals(other: Integer3): boolean;
    round(): Integer3;
    cubeLength(): Integer;
}

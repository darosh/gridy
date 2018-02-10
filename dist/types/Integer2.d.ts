import { Integer } from "./Integer";
import { IVector } from "./IVector";
export declare class Integer2 implements IVector<Integer> {
    x: Integer;
    y: Integer;
    constructor(x?: Integer, y?: Integer);
    v(): Integer[];
    distance(b: Integer2): Integer;
    toString(): string;
    equals(p: Integer2): boolean;
    add(p: Integer2): Integer2;
    scale(d: Integer): Integer2;
    cubeLength(): Integer;
}

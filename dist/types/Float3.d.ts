import { Float } from "./Float";
import { Integer3 } from "./Integer3";
import { IVector } from "./IVector";
export declare class Float3 implements IVector<Float> {
    static round(h: Float3): Integer3;
    static lerp(a: Integer3, b: Integer3, t: Float): Float3;
    static line(a: Integer3, b: Integer3): Integer3[];
    x: Float;
    y: Float;
    z: Float;
    constructor(x: Float, y: Float, z: Float);
    equals(other: Float3): boolean;
    v(): Float[];
    toString(): string;
    round(): Integer3;
}

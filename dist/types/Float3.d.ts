import { Float } from './Float';
import { Integer3 } from './Integer3';
import { IVector } from './IVector';
export declare class Float3 implements IVector<Float> {
    x: Float;
    y: Float;
    z: Float;
    constructor(x: Float, y: Float, z: Float);
    static ROUND(h: Float3): Integer3;
    static LERP(a: Integer3, b: Integer3, t: Float): Float3;
    static LINE(a: Integer3, b: Integer3): Integer3[];
    equals(other: Float3): boolean;
    readonly value: Float[];
    toString(): string;
    round(): Integer3;
}

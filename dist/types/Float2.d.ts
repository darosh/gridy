import { Float } from './Float';
import { Integer2 } from './Integer2';
import { IVector } from './IVector';
export declare class Float2 implements IVector<Float> {
    x: Float;
    y: Float;
    constructor(x?: Float, y?: Float);
    static ROUND(h: Float2): Integer2;
    static LERP(a: Integer2, b: Integer2, t: Float): Float2;
    static LINE(a: Integer2, b: Integer2): Integer2[];
    equals(p: Float2): boolean;
    readonly value: Float[];
    scale(k: Float): Float2;
    toString(): string;
}

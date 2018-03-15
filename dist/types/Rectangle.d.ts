import { Float } from "./Float";
import { Float2 } from "./Float2";
export declare class Rectangle {
    static add(a: Rectangle, b: Rectangle): Rectangle;
    static points(a: Rectangle): Float2[];
    minX: Float;
    maxX: Float;
    minY: Float;
    maxY: Float;
    constructor(minX?: Float, maxX?: Float, minY?: Float, maxY?: Float);
}

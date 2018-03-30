import { Float } from './Float';
import { Float2 } from './Float2';
export declare class Rectangle {
    minX: Float;
    maxX: Float;
    minY: Float;
    maxY: Float;
    constructor(minX?: Float, maxX?: Float, minY?: Float, maxY?: Float);
    static ADD(a: Rectangle, b: Rectangle): Rectangle;
    static POINTS(a: Rectangle): Float2[];
}

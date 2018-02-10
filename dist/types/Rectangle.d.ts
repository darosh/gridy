import { Float } from "./Float";
export declare class Rectangle {
    static add(a: Rectangle, b: Rectangle): Rectangle;
    minX: Float;
    maxX: Float;
    minY: Float;
    maxY: Float;
    constructor(minX?: Float, maxX?: Float, minY?: Float, maxY?: Float);
}

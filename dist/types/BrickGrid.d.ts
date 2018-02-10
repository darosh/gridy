import { Float } from "./Float";
import { Float2 } from "./Float2";
import { GridShape } from "./GridShape";
import { HexagonalGrid } from "./HexagonalGrid";
import { HexagonalTile } from "./HexagonalTile";
import { Integer } from "./Integer";
/**
 * ![](../../examples/output/brick-grid.svg)
 */
export declare class BrickGrid extends HexagonalGrid {
    angle: Float;
    constructor(scale: Float, orientation: boolean, shape: GridShape, x: Integer, y?: Integer);
    vertices(orientation?: boolean, scale?: Float): Float2[];
    center(cube: HexagonalTile): Float2;
}

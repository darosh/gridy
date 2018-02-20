import { Float } from "./Float";
import { Float2 } from "./Float2";
import { HexagonalTile } from "./HexagonalTile";
import { IGrid } from "./IGrid";
import { Integer } from "./Integer";
import { Position } from "./Position";
import { Rectangle } from "./Rectangle";
import { Shape } from "./Shape";
import { TileType } from "./TileType";
/**
 * ![](../../examples/output/hexagonal-grid.svg)
 */
export declare class HexagonalGrid implements IGrid<HexagonalTile> {
    static shapes: Shape[];
    static twoAxisToCube(position: Position): HexagonalTile;
    static cubeToTwoAxis(tile: HexagonalTile): Position;
    static twoAxisToCubeXY(position: Position): HexagonalTile;
    static cubeToTwoAxisXY(tile: HexagonalTile): Position;
    static oddQToCube(position: Position): HexagonalTile;
    static cubeToOddQ(tile: HexagonalTile): Position;
    static evenQToCube(position: Position): HexagonalTile;
    static cubeToEvenQ(tile: HexagonalTile): Position;
    static oddRToCube(position: Position): HexagonalTile;
    static cubeToOddR(tile: HexagonalTile): Position;
    static evenRToCube(position: Position): HexagonalTile;
    static cubeToEvenR(tile: HexagonalTile): Position;
    static trapezoidalShape(minQ: Integer, maxQ: Integer, minR: Integer, maxR: Integer, toCube: (position: Position) => HexagonalTile): HexagonalTile[];
    static triangularShape(size: Integer): HexagonalTile[];
    static hexagonalShape(size: Integer): HexagonalTile[];
    static region(xmin: Integer, xmax: Integer, ymin: Integer, ymax: Integer, zmin: Integer, zmax: Integer): HexagonalTile[];
    tiles: HexagonalTile[];
    orientation: boolean;
    scale: Float;
    scaleY: Float;
    angle: Float;
    x: Integer;
    y: Integer;
    toTile: (position: Position) => HexagonalTile;
    toPoint: (tile: HexagonalTile) => Position;
    radius: Float;
    tileTypes: TileType;
    shape: Shape;
    constructor(scale: Float, orientation?: boolean, shape?: Shape, x?: Integer, y?: Integer);
    bounds(): Rectangle;
    vertices(orientation?: boolean, scale?: Float): Float2[];
    center(tile: HexagonalTile): Float2;
    position(p: Float2): HexagonalTile;
    tile(x: number, y: number): HexagonalTile | undefined;
}

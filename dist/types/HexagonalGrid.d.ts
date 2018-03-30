import { Float } from './Float';
import { Float2 } from './Float2';
import { HexagonalTile } from './HexagonalTile';
import { IGrid } from './IGrid';
import { Integer } from './Integer';
import { Position } from './Position';
import { Rectangle } from './Rectangle';
import { Shape } from './Shape';
import { TileType } from './TileType';
/**
 * ![](../../examples/output/hexagonal-grid.svg)
 */
export declare class HexagonalGrid implements IGrid<HexagonalTile> {
    static shapes: Shape[];
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
    static TWO_AXIS_TO_CUBE(position: Position): HexagonalTile;
    static CUBE_TO_TWO_AXIS(tile: HexagonalTile): Position;
    static TWO_AXIS_TO_CUBE_XY(position: Position): HexagonalTile;
    static CUBE_TO_TWO_AXIS_XY(tile: HexagonalTile): Position;
    static TWO_AXIS_TO_CUBE_YZ(position: Position): HexagonalTile;
    static CUBE_TO_TWO_AXIS_YZ(tile: HexagonalTile): Position;
    static ODD_Q_TO_CUBE(position: Position): HexagonalTile;
    static CUBE_TO_ODD_Q(tile: HexagonalTile): Position;
    static EVEN_Q_TO_CUBE(position: Position): HexagonalTile;
    static CUBE_TO_EVEN_Q(tile: HexagonalTile): Position;
    static ODD_R_TO_CUBE(position: Position): HexagonalTile;
    static CUBE_TO_ODD_R(tile: HexagonalTile): Position;
    static EVEN_R_TO_CUBE(position: Position): HexagonalTile;
    static CUBE_TO_EVEN_R(tile: HexagonalTile): Position;
    static TRAPEZOIDAL_SHAPE(minQ: Integer, maxQ: Integer, minR: Integer, maxR: Integer, toCube: (position: Position) => HexagonalTile): HexagonalTile[];
    static TRIANGULAR_SHAPE(size: Integer): HexagonalTile[];
    static HEXAGONAL_SHAPE(size: Integer): HexagonalTile[];
    static REGION(xmin: Integer, xmax: Integer, ymin: Integer, ymax: Integer, zmin: Integer, zmax: Integer): HexagonalTile[];
    bounds(): Rectangle;
    vertices(orientation?: boolean, scale?: Float): Float2[];
    center(tile: HexagonalTile): Float2;
    position(p: Float2): HexagonalTile;
    tile(x: number, y: number): HexagonalTile | undefined;
}

import { Float } from "./Float";
import { Float2 } from "./Float2";
import { IGrid } from "./IGrid";
import { Integer } from "./Integer";
import { Position } from "./Position";
import { Rectangle } from "./Rectangle";
import { Shape } from "./Shape";
import { TileType } from "./TileType";
import { TriangularTile } from "./TriangularTile";
/**
 * ![](../../examples/output/triangular-grid.svg)
 */
export declare class TriangularGrid implements IGrid<TriangularTile> {
    static shapes: Shape[];
    tiles: TriangularTile[];
    orientation: boolean;
    scale: Float;
    scaleY: Float;
    angle: Float;
    x: Integer;
    y: Integer;
    toTile: (position: Position) => TriangularTile;
    toPoint: (tile: TriangularTile) => Position;
    radius: Float;
    tileTypes: TileType;
    constructor(scale: Float, orientation?: boolean, shape?: Shape, x?: Integer, y?: Integer);
    bounds(): Rectangle;
    center(tile: TriangularTile): Float2;
    vertices(orientation?: boolean, scale?: Float, tileType?: Integer): Float2[];
    position(p: Float2): TriangularTile;
    getTileType(tile: TriangularTile): Integer;
    tile(x: number, y: number): undefined;
    private rhombus();
    private triangle();
    private hexagonalShape(size);
}

import { Float } from "./Float";
import { Float2 } from "./Float2";
import { GridShape } from "./GridShape";
import { IGrid } from "./IGrid";
import { Integer } from "./Integer";
import { Position } from "./Position";
import { Rectangle } from "./Rectangle";
import { TileType } from "./TileType";
import { TriangularTile } from "./TriangularTile";
export declare class TriangularGrid implements IGrid<TriangularTile> {
    tiles: TriangularTile[];
    orientation: boolean;
    scale: Float;
    angle: Float;
    x: Integer;
    y: Integer;
    toPoint: (tile: TriangularTile) => Position;
    radius: Float;
    tileTypes: TileType;
    constructor(scale: Float, orientation: boolean, shape: GridShape, x: Integer, y: Integer);
    bounds(): Rectangle;
    center(tile: TriangularTile): Float2;
    vertices(orientation?: boolean, scale?: Float, tileType?: Integer): Float2[];
    position(p: Float2): TriangularTile;
    getTileType(tile: TriangularTile): Integer;
    private rhombus();
    private triangle();
    private hexagonalShape(size);
}

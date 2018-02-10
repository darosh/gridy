import { Float } from "./Float";
import { Float2 } from "./Float2";
import { GridShape } from "./GridShape";
import { IGrid } from "./IGrid";
import { Integer } from "./Integer";
import { Position } from "./Position";
import { Rectangle } from "./Rectangle";
import { RectangularTile } from "./RectangularTile";
import { TileType } from "./TileType";
export declare class RectangularGrid implements IGrid<RectangularTile> {
    tiles: RectangularTile[];
    orientation: boolean;
    scale: Float;
    angle: Float;
    x: Integer;
    y: Integer;
    toTile: (point: Position) => RectangularTile;
    toPoint: (tile: RectangularTile) => Position;
    radius: Float;
    tileTypes: TileType;
    constructor(scale: Float, orientation: boolean, shape: GridShape, x: Integer, y: Integer);
    bounds(): Rectangle;
    center(tile: RectangularTile): Float2;
    vertices(orientation?: boolean, scale?: Float): Float2[];
    position(p: Float2): RectangularTile;
}

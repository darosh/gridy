import { Float } from "./Float";
import { Float2 } from "./Float2";
import { IGrid } from "./IGrid";
import { Integer } from "./Integer";
import { ITileConstructable } from "./ITile";
import { Position } from "./Position";
import { Rectangle } from "./Rectangle";
import { RectangularSimpleTile } from "./RectangularSimpleTile";
import { RectangularTile } from "./RectangularTile";
import { Shape } from "./Shape";
import { TileType } from "./TileType";
/**
 * ![](../../examples/output/rectangular-grid.svg)
 */
export declare class RectangularGrid implements IGrid<RectangularTile | RectangularSimpleTile> {
    tiles: RectangularTile[] | RectangularSimpleTile[];
    orientation: boolean;
    scale: Float;
    angle: Float;
    x: Integer;
    y: Integer;
    toTile: (point: Position) => RectangularTile | RectangularSimpleTile;
    toPoint: (tile: RectangularTile | RectangularSimpleTile) => Position;
    radius: Float;
    tileTypes: TileType;
    tile: ITileConstructable<RectangularTile | RectangularSimpleTile>;
    constructor(scale: Float, orientation?: boolean, shape?: Shape, x?: Integer, y?: Integer, sidesOnly?: boolean, tile?: ITileConstructable<RectangularTile | RectangularSimpleTile>);
    bounds(): Rectangle;
    center(tile: RectangularTile | RectangularSimpleTile): Float2;
    vertices(orientation?: boolean, scale?: Float): Float2[];
    position(p: Float2): RectangularTile | RectangularSimpleTile;
}

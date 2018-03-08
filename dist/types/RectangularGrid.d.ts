import { Float } from "./Float";
import { Float2 } from "./Float2";
import { IGrid } from "./IGrid";
import { Integer } from "./Integer";
import { ITileConstructible } from "./ITile";
import { Position } from "./Position";
import { Rectangle } from "./Rectangle";
import { Rectangular8Tile } from "./Rectangular8Tile";
import { RectangularTile } from "./RectangularTile";
import { Shape } from "./Shape";
import { TileType } from "./TileType";
/**
 * ![](../../examples/output/rectangular-grid.svg)
 */
export declare class RectangularGrid implements IGrid<RectangularTile | Rectangular8Tile> {
    tiles: RectangularTile[] | Rectangular8Tile[];
    orientation: boolean;
    scale: Float;
    scaleY: Float;
    angle: Float;
    x: Integer;
    y: Integer;
    toTile: (point: Position) => RectangularTile | Rectangular8Tile;
    toPoint: (tile: RectangularTile | Rectangular8Tile) => Position;
    radius: Float;
    tileTypes: TileType;
    tileCtor: ITileConstructible<RectangularTile | Rectangular8Tile>;
    constructor(scale: Float, orientation?: boolean, shape?: Shape, x?: Integer, y?: Integer, tile?: ITileConstructible<RectangularTile | Rectangular8Tile>);
    bounds(): Rectangle;
    center(tile: RectangularTile | Rectangular8Tile): Float2;
    vertices(orientation?: boolean, scale?: Float): Float2[];
    position(p: Float2): RectangularTile | Rectangular8Tile;
    tile(x: number, y: number): RectangularTile | Rectangular8Tile;
}

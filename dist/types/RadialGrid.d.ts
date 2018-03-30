import { Float } from './Float';
import { Float2 } from './Float2';
import { IGrid } from './IGrid';
import { Integer } from './Integer';
import { AnyTile, ITileConstructible } from './ITile';
import { Position } from './Position';
import { Radial8Tile } from './Radial8Tile';
import { RadialTile } from './RadialTile';
import { Rectangle } from './Rectangle';
import { Shape } from './Shape';
import { TileType } from './TileType';
/**
 * ![](../../examples/output/Radial-grid.svg)
 */
export declare class RadialGrid implements IGrid<RadialTile | Radial8Tile> {
    tiles: RadialTile[] | Radial8Tile[];
    orientation: boolean;
    scale: Float;
    scaleY: Float;
    angle: Float;
    x: Integer;
    y: Integer;
    startY: Integer;
    toTile: (point: Position) => RadialTile | Radial8Tile;
    toPoint: (tile: RadialTile | Radial8Tile) => Position;
    radius: Float;
    tileTypes: TileType;
    tileCtor: ITileConstructible<RadialTile | Radial8Tile>;
    irregular: boolean;
    constructor(scale: Float, orientation?: boolean, shape?: Shape, x?: Integer, y?: Integer, tile?: ITileConstructible<RadialTile | Radial8Tile>, startY?: Integer);
    bounds(): Rectangle;
    vertices(orientation?: boolean, scale?: Float, tileType?: Integer, tile?: AnyTile): Float2[];
    path(tile: RadialTile): string;
    position(p: Float2): RadialTile | Radial8Tile;
    tile(x: number, y: number): Radial8Tile | RadialTile;
    center(tile: RadialTile | Radial8Tile): Float2;
}

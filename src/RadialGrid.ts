import { bounds } from "./Bounds";
import { ANG, DEG_TO_RAD, SQRT_2 } from "./Constants";
import { Float } from "./Float";
import { Float2 } from "./Float2";
import { IGrid } from "./IGrid";
import { Integer } from "./Integer";
import { AnyTile, ITile, ITileConstructible } from "./ITile";
import { Position } from "./Position";
import { Radial8Tile } from "./Radial8Tile";
import { RadialTile } from "./RadialTile";
import { Rectangle } from "./Rectangle";
import { Shape } from "./Shape";
import { TileType } from "./TileType";

/**
 * ![](../../examples/output/Radial-grid.svg)
 */
export class RadialGrid implements IGrid<RadialTile | Radial8Tile> {
  public tiles: RadialTile[] | Radial8Tile[];
  public orientation: boolean;
  public scale: Float;
  public scaleY: Float = -1;
  public angle: Float = -45;
  public x: Integer;
  public y: Integer;
  public toTile: (point: Position) => RadialTile | Radial8Tile;
  public toPoint: (tile: RadialTile | Radial8Tile) => Position;
  public radius: Float;
  public tileTypes: TileType = TileType.Simple;
  public tileCtor: ITileConstructible<RadialTile | Radial8Tile>;

  constructor(scale: Float,
              orientation: boolean = false,
              shape: Shape = Shape.Even,
              x: Integer = 1,
              y: Integer = 1,
              tile: ITileConstructible<RadialTile | Radial8Tile> = RadialTile) {
    this.scale = scale;
    this.radius = scale / 2;
    this.orientation = orientation;
    this.x = x;
    this.y = y;
    this.tileCtor = tile;

    const results: RadialTile[] = [];

    for (let px: Integer = 0; px < x; px++) {
      for (let py: Integer = 0; py < y; py++) {
        results.push(new tile(px, py, y) as RadialTile);
      }
    }

    this.tiles = results;
    this.toTile = (p: Position): RadialTile | Radial8Tile => new this.tileCtor(p.x, p.y);
    this.toPoint = (p: RadialTile | Radial8Tile): Position => new Position(p.x, p.y);
  }

  public bounds(): Rectangle {
    return bounds(this);
  }

  public vertices(orientation?: boolean, scale?: Float, tileType?: Integer, tile?: AnyTile): Float2[] {
    const points: Float2[] = [];
    scale = (scale === undefined) ? this.scale : scale;
    orientation = (orientation === undefined) ? false : this.orientation;

    if (orientation) {
      scale *= SQRT_2;

      points.push(new Float2(-scale / 2, 0));
      points.push(new Float2(0, -scale / 2));
      points.push(new Float2(scale / 2, 0));
      points.push(new Float2(0, scale / 2));
    } else {
      points.push(new Float2(-scale / 2, -scale / 2));
      points.push(new Float2(-scale / 2, scale / 2));
      points.push(new Float2(scale / 2, scale / 2));
      points.push(new Float2(scale / 2, -scale / 2));
    }

    return points;
  }

  public position(p: Float2): RadialTile | Radial8Tile {
    return new this.tileCtor(Math.round(p.x / this.scale), Math.round(p.y / this.scale * this.scaleY));
  }

  public tile(x: number, y: number) {
    return this.toTile(new Position(x, y));
  }

  public center(tile: RadialTile | RadialTile | any): Float2 {
    let angle;

    if (this.orientation) {
      angle = tile.y + 0.5;
      angle = angle % tile.z;
      angle = (angle + tile.z) % tile.z;
      angle = (angle * DEG_TO_RAD) * (ANG / tile.z);
    } else {
      angle = (tile.y * DEG_TO_RAD) * (ANG / tile.z);
    }

    return new Float2(
      (tile.x + 0.5) * this.scale * Math.cos(angle),
      (tile.x + 0.5) * this.scale * Math.sin(angle),
    );
  }
}

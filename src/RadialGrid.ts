import { bounds } from "./Bounds";
import { ANG, DEG_TO_RAD, SQRT_2 } from "./Constants";
import { Float } from "./Float";
import { Float2 } from "./Float2";
import { Float3 } from "./Float3";
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
  public angle: Float = -0;
  public x: Integer;
  public y: Integer;
  public toTile: (point: Position) => RadialTile | Radial8Tile;
  public toPoint: (tile: RadialTile | Radial8Tile) => Position;
  public radius: Float;
  public tileTypes: TileType = TileType.Simple;
  public tileCtor: ITileConstructible<RadialTile | Radial8Tile>;
  public irregular: boolean = true;

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
    const r = this.scale * (this.x * 2 + 1) / 2;
    return new Rectangle(-r, r, -r, r);
    // return bounds(this);
  }

  public vertices(orientation?: boolean, scale?: Float, tileType?: Integer, tile?: AnyTile): Float2[] {
    const t: any = tile;
    const points: Float2[] = [];

    const c = this.center(t);

    points.push(this.center(new Float3(t.x - 0.5, t.y - 0.5, t.z) as any));
    points.push(this.center(new Float3(t.x - 0.5, t.y + 0.5, t.z) as any));
    points.push(this.center(new Float3(t.x + 0.5, t.y + 0.5, t.z) as any));
    points.push(this.center(new Float3(t.x + 0.5, t.y - 0.5, t.z) as any));

    return points.map((p) => new Float2(p.x - c.x, p.y - c.y));
  }

  public path(tile: RadialTile): string {
    const p = this.vertices(false, 0, 0, tile);
    const c = this.center(tile);
    const r1 = this.scale * (Math.max(0, tile.x - .5 + 1));
    const r2 = this.scale * (tile.x + .5 + 1);

    return `M ${p[0].x} ${p[0].y} A ${r1} ${r1} 0 0 1 ${p[1].x} ${p[1].y} `
      + `L ${p[2].x} ${p[2].y} A ${r2} ${r2} 0 0 0 ${p[3].x} ${p[3].y} Z`;
  }

  public position(p: Float2): RadialTile | Radial8Tile {
    return new this.tileCtor(Math.round(p.x / this.scale), Math.round(p.y / this.scale * this.scaleY));
  }

  public tile(x: number, y: number) {
    return this.toTile(new Position(x, y));
  }

  public center(tile: RadialTile | Radial8Tile): Float2 {
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

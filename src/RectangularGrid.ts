import { bounds } from "./Bounds";
import { SQRT_2 } from "./Constants";
import { Float } from "./Float";
import { Float2 } from "./Float2";
import { IGrid } from "./IGrid";
import { Integer } from "./Integer";
import { ITile, ITileConstructable } from "./ITile";
import { Position } from "./Position";
import { Rectangle } from "./Rectangle";
import { RectangularSimpleTile } from "./RectangularSimpleTile";
import { RectangularTile } from "./RectangularTile";
import { Shape } from "./Shape";
import { TileType } from "./TileType";

// TypeScript version of http://www.redblobgames.com/articles/grids/hexagons/
// Copyright 2013 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>

/**
 * ![](../../examples/output/rectangular-grid.svg)
 */
export class RectangularGrid implements IGrid<RectangularTile|RectangularSimpleTile> {
  public tiles: RectangularTile[]|RectangularSimpleTile[];
  public orientation: boolean;
  public scale: Float;
  public angle: Float = -45;
  public x: Integer;
  public y: Integer;
  public toTile: (point: Position) => RectangularTile|RectangularSimpleTile;
  public toPoint: (tile: RectangularTile|RectangularSimpleTile) => Position;
  public radius: Float;
  public tileTypes: TileType = TileType.Simple;
  public tile: ITileConstructable<RectangularTile|RectangularSimpleTile>;

  constructor(scale: Float,
              orientation: boolean = false,
              shape: Shape = Shape.TrapezoidalEven,
              x: Integer = 1,
              y: Integer = 1,
              sidesOnly: boolean = false,
              tile: ITileConstructable<RectangularTile|RectangularSimpleTile> = RectangularTile) {
    this.scale = scale;
    this.radius = scale / 2;
    this.orientation = orientation;
    this.x = x;
    this.y = y;
    this.tile = tile;

    const results: RectangularTile|RectangularSimpleTile[] = [];

    for (let px: Integer = 0; px < x; px++) {
      for (let py: Integer = 0; py < y; py++) {
        results.push(new tile(px, py));
      }
    }

    this.tiles = results;
    this.toTile = (p: Position): RectangularTile|RectangularSimpleTile => new this.tile(p.x, p.y);
    this.toPoint = (p: RectangularTile|RectangularSimpleTile): Position => new Position(p.x, p.y);
  }

  /*
   bounds():Rectangle {
   if (this.orientation) {
   return new Rectangle(
   -this.scale * RectangularGrid.SQRT_2 / 2,
   +this.scale * RectangularGrid.SQRT_2 / 2 + ((this.x + this.y - 2) / 2) * this.scale * RectangularGrid.SQRT_2,
   -this.scale * RectangularGrid.SQRT_2 / 2 - (this.x / 2) * this.scale * RectangularGrid.SQRT_2,
   +this.scale * RectangularGrid.SQRT_2 / 2 + (this.y / 2) * this.scale * RectangularGrid.SQRT_2
   );
   } else {
   return new Rectangle(-0.5 * this.scale, (this.x - 0.5) * this.scale, -0.5 * this.scale, (this.y - 0.5) * this.scale);
   }
   }
   */

  public bounds(): Rectangle {
    return bounds(this);
  }

  public center(tile: RectangularTile|RectangularSimpleTile): Float2 {
    if (this.orientation) {
      return new Float2(
        tile.x * this.scale / SQRT_2 + tile.y * this.scale / SQRT_2,
        tile.y * this.scale / SQRT_2 - tile.x * this.scale / SQRT_2,
      );
    } else {
      return new Float2(tile.x * this.scale, tile.y * this.scale);
    }
  }

  public vertices(orientation?: boolean, scale?: Float): Float2[] {
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

  public position(p: Float2): RectangularTile|RectangularSimpleTile {
    return new this.tile(Math.round(p.x), Math.round(p.y));
  }
}

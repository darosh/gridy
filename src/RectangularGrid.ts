import { bounds } from "./Bounds";
import { SQRT_2 } from "./Constants";
import { Float } from "./Float";
import { Float2 } from "./Float2";
import { IGrid } from "./IGrid";
import { Integer } from "./Integer";
import { Position } from "./Position";
import { Rectangle } from "./Rectangle";
import { RectangularTile } from "./RectangularTile";
import { Shape } from "./Shape";
import { TileType } from "./TileType";

// TypeScript version of http://www.redblobgames.com/articles/grids/hexagons/
// Copyright 2013 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>

/**
 * ![](../../examples/output/rectangular-grid.svg)
 */
export class RectangularGrid implements IGrid<RectangularTile> {
  public tiles: RectangularTile[];
  public orientation: boolean;
  public scale: Float;
  public angle: Float = -45;
  public x: Integer;
  public y: Integer;
  public toTile: (point: Position) => RectangularTile;
  public toPoint: (tile: RectangularTile) => Position;
  public radius: Float;
  public tileTypes: TileType = TileType.Simple;

  constructor(scale: Float,
              orientation: boolean = false,
              shape: Shape = Shape.TrapezoidalEven,
              x: Integer = 1,
              y: Integer = 1) {
    this.scale = scale;
    this.radius = scale / 2;
    this.orientation = orientation;
    this.x = x;
    this.y = y;

    const results: RectangularTile[] = [];

    for (let px: Integer = 0; px < x; px++) {
      for (let py: Integer = 0; py < y; py++) {
        results.push(new RectangularTile(px, py));
      }
    }

    this.tiles = results;
    this.toTile = (p: Position): RectangularTile => new RectangularTile(p.x, p.y);
    this.toPoint = (p: RectangularTile): Position => new Position(p.x, p.y);
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

  public center(tile: RectangularTile): Float2 {
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

  public position(p: Float2): RectangularTile {
    return new RectangularTile(Math.round(p.x), Math.round(p.y));
  }
}

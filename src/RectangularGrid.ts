import { bounds } from "./Bounds";
import { SQRT_2 } from "./Constants";
import { Float } from "./Float";
import { Float2 } from "./Float2";
import { IGrid } from "./IGrid";
import { Integer } from "./Integer";
import { AnyTile, ITile, ITileConstructible } from "./ITile";
import { Position } from "./Position";
import { Rectangle } from "./Rectangle";
import { Rectangular8Tile } from "./Rectangular8Tile";
import { RectangularTile } from "./RectangularTile";
import { Shape } from "./Shape";
import { TileType } from "./TileType";

// TypeScript version of http://www.redblobgames.com/articles/grids/hexagons/
// Copyright 2013 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>

/**
 * ![](../../examples/output/rectangular-grid.svg)
 */
export class RectangularGrid implements IGrid<RectangularTile | Rectangular8Tile> {
  public tiles: RectangularTile[] | Rectangular8Tile[];
  public orientation: boolean;
  public scale: Float;
  public scaleY: Float = -1;
  public angle: Float = -45;
  public x: Integer;
  public y: Integer;
  public startY: Integer;
  public toTile: (point: Position) => RectangularTile | Rectangular8Tile;
  public toPoint: (tile: RectangularTile | Rectangular8Tile) => Position;
  public radius: Float;
  public tileTypes: TileType = TileType.Simple;
  public tileCtor: ITileConstructible<RectangularTile | Rectangular8Tile>;

  constructor(scale: Float,
              orientation: boolean = false,
              shape: Shape = Shape.Even,
              x: Integer = 1,
              y: Integer = 1,
              tile: ITileConstructible<RectangularTile | Rectangular8Tile> = RectangularTile,
              startY: Integer = 0) {
    this.scale = scale;
    this.radius = scale / 2;
    this.orientation = orientation;
    this.x = x;
    this.y = y;
    this.startY = y;
    this.tileCtor = tile;

    const results: RectangularTile[] = [];

    for (let px: Integer = 0; px < x; px++) {
      for (let py: Integer = startY; py < y; py++) {
        results.push(new tile(px, py) as RectangularTile);
      }
    }

    this.tiles = results;
    this.toTile = (p: Position): RectangularTile | Rectangular8Tile => new this.tileCtor(p.x, p.y);
    this.toPoint = (p: RectangularTile | Rectangular8Tile): Position => new Position(p.x, p.y);
  }

  public bounds(): Rectangle {
    return bounds(this);
  }

  public center(tile: RectangularTile | Rectangular8Tile): Float2 {
    if (this.orientation) {
      return new Float2(
        tile.x * this.scale / SQRT_2 + tile.y * this.scale * this.scaleY / SQRT_2,
        tile.y * this.scale * this.scaleY / SQRT_2 - tile.x * this.scale / SQRT_2,
      );
    } else {
      return new Float2(tile.x * this.scale, tile.y * this.scale * this.scaleY);
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

  public position(p: Float2): RectangularTile | Rectangular8Tile {
    return new this.tileCtor(Math.round(p.x / this.scale), Math.round(p.y / this.scale * this.scaleY  ));
  }

  public tile(x: number, y: number) {
    return this.toTile(new Position(x, y));
  }
}

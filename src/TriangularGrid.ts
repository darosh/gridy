import { bounds } from "./Bounds";
import { SQRT_3_2, SQRT_3_3, SQRT_3_6 } from "./Constants";
import { Float } from "./Float";
import { Float2 } from "./Float2";
import { GridShape } from "./GridShape";
import { IGrid } from "./IGrid";
import { Integer } from "./Integer";
import { Position } from "./Position";
import { Rectangle } from "./Rectangle";
import { TileType } from "./TileType";
import { TriangularTile } from "./TriangularTile";

export class TriangularGrid implements IGrid<TriangularTile> {
  public tiles: TriangularTile[];
  public orientation: boolean;
  public scale: Float;
  public angle: Float = -60;
  public x: Integer;
  public y: Integer;
  // toTile?: (position: Position) => TriangularTile;
  public toPoint: (tile: TriangularTile) => Position;
  public radius: Float;
  public tileTypes: TileType = TileType.Variable;

  constructor(scale: Float, orientation: boolean, shape: GridShape, x: Integer, y: Integer) {
    this.scale = scale;
    this.radius = SQRT_3_6 * scale;
    this.orientation = orientation;
    this.x = x;
    this.y = y;

    if (shape === GridShape.Rhombus) {
      this.tiles = this.rhombus();
      this.orientation = false;
    } else if (shape === GridShape.Hexagonal) {
      this.tiles = this.hexagonalShape(x);
      this.orientation = false;
    } else {
      this.tiles = this.triangle();
      this.orientation = false;
    }

    this.toPoint = (tile: TriangularTile): Position => {
      return new Position(tile.x * 2 + (tile.s ? 1 : 0), tile.y);
    };
  }

  public bounds(): Rectangle {
    return bounds(this as any as IGrid<any>);
  }

  public center(tile: TriangularTile): Float2 {
    return new Float2(
      (tile.x * 2 + (tile.s ? 1 : 0) + tile.y) * this.scale / 2,
      this.scale * (tile.y * (SQRT_3_2) + (tile.s ? 0 : -(SQRT_3_6))),
    );
  }

  public vertices(orientation?: boolean, scale?: Float, tileType: Integer = 0): Float2[] {
    scale = (scale === undefined) ? this.scale : scale;

    if (tileType === 0) {
      return [
        new Float2(0, -scale * SQRT_3_3),
        new Float2(-scale / 2, scale * SQRT_3_6),
        new Float2(scale / 2, scale * SQRT_3_6),
      ];
    } else {
      return [
        new Float2(0, scale * (SQRT_3_6 + (SQRT_3_6))),
        new Float2(-scale / 2, -scale * (SQRT_3_3 - (SQRT_3_6))),
        new Float2(scale / 2, -scale * (SQRT_3_3 - (SQRT_3_6))),
      ];
    }
  }

  public position(p: Float2): TriangularTile {
    return new TriangularTile(Math.round(p.x), Math.round(p.y), false);
  }

  public getTileType(tile: TriangularTile): Integer {
    return tile.s ? 0 : 1;
  }

  private rhombus(): TriangularTile[] {
    const results: TriangularTile[] = [];

    for (let px: Integer = 0; px < this.x; px++) {
      for (let py: Integer = 0; py < this.y; py++) {
        results.push(new TriangularTile(px, py, false));
        results.push(new TriangularTile(px, py, true));
      }
    }

    return results;
  }

  private triangle(): TriangularTile[] {
    const results: TriangularTile[] = [];

    for (let py: Integer = 0; py < this.x; py++) {
      for (let px: Integer = 0; px < (this.x - py); px++) {
        results.push(new TriangularTile(px, py, false));

        if (px < (this.x - py - 1)) {
          results.push(new TriangularTile(px, py, true));
        }
      }
    }

    return results;
  }

  private hexagonalShape(size: Integer): TriangularTile[] {
    const results: TriangularTile[] = [];

    for (let x: Integer = -size; x < size; x++) {
      for (let y: Integer = -size; y < size; y++) {
        if (Math.abs(-x - y) <= size && (x + y) < size) {
          results.push(new TriangularTile(x, y, false));
        }

        if ((Math.abs(-x - y) - 1) <= size && (x + y + 1) < size) {
          results.push(new TriangularTile(x, y, true));
        }
      }
    }

    return results;
  }
}

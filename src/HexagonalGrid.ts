import { bounds } from './bounds';
import { SQRT_3, SQRT_3_2, SQRT_3_3 } from './Constants';
import { Float } from './Float';
import { Float2 } from './Float2';
import { HexagonalTile } from './HexagonalTile';
import { IGrid } from './IGrid';
import { Integer } from './Integer';
import { Position } from './Position';
import { Rectangle } from './Rectangle';
import { Shape } from './Shape';
import { TileType } from './TileType';

// From http://www.redblobgames.com/grids/hexagons/
// Copyright 2012 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
// Original source: http://www.redblobgames.com/grids/hexagons/Grid.hx

/**
 * ![](../../examples/output/hexagonal-grid.svg)
 */
export class HexagonalGrid implements IGrid<HexagonalTile> {
  public static shapes = [Shape.Hexagonal,
    Shape.Rhombus, Shape.Even, Shape.Odd, Shape.Triangular];

  public tiles: HexagonalTile[];
  public orientation: boolean;
  public scale: Float;
  public scaleY: Float = -1;
  public angle: Float = -30;
  public x: Integer;
  public y: Integer;
  public toTile: (position: Position) => HexagonalTile;
  public toPoint: (tile: HexagonalTile) => Position;
  public radius: Float;
  public tileTypes: TileType = TileType.Simple;

  public shape: Shape;

  constructor(scale: Float,
              orientation: boolean = false,
              shape: Shape = Shape.Hexagonal,
              x: Integer = 1,
              y?: Integer) {
    this.scale = scale;
    this.radius = SQRT_3_2 * scale / SQRT_3_2 / 2;
    this.orientation = orientation;
    const yy = y || x;
    this.x = x;
    this.y = yy;
    this.shape = shape;

    if (shape === Shape.Even && orientation === false) {
      this.toTile = HexagonalGrid.EVEN_Q_TO_CUBE;
      this.toPoint = HexagonalGrid.CUBE_TO_EVEN_Q;
      this.tiles = HexagonalGrid.TRAPEZOIDAL_SHAPE(0, x, 0, yy, this.toTile);
    } else if (shape === Shape.Even && orientation === true) {
      this.toTile = HexagonalGrid.EVEN_R_TO_CUBE;
      this.toPoint = HexagonalGrid.CUBE_TO_EVEN_R;
      this.tiles = HexagonalGrid.TRAPEZOIDAL_SHAPE(0, x, 0, yy, this.toTile);
    } else if (shape === Shape.Odd && orientation === false) {
      this.toTile = HexagonalGrid.ODD_Q_TO_CUBE;
      this.toPoint = HexagonalGrid.CUBE_TO_ODD_Q;
      this.tiles = HexagonalGrid.TRAPEZOIDAL_SHAPE(0, x, 0, yy, this.toTile);
    } else if (shape === Shape.Odd && orientation === true) {
      this.toTile = HexagonalGrid.ODD_R_TO_CUBE;
      this.toPoint = HexagonalGrid.CUBE_TO_ODD_R;
      this.tiles = HexagonalGrid.TRAPEZOIDAL_SHAPE(0, x, 0, yy, this.toTile);
    } else if (shape === Shape.Hexagonal) {
      // this.toTile = HexagonalGrid.EVEN_Q_TO_CUBE;
      // this.toPoint = HexagonalGrid.CUBE_TO_EVEN_Q;
      this.toTile = HexagonalGrid.TWO_AXIS_TO_CUBE;
      this.toPoint = HexagonalGrid.CUBE_TO_TWO_AXIS;
      this.tiles = HexagonalGrid.HEXAGONAL_SHAPE(x);
    } else if (shape === Shape.Triangular) {
      this.toTile = HexagonalGrid.EVEN_Q_TO_CUBE;
      this.toPoint = HexagonalGrid.CUBE_TO_EVEN_Q;
      this.tiles = HexagonalGrid.TRIANGULAR_SHAPE(x);
    } else { // if (shape === Shape.Rhombus)
      this.toTile = HexagonalGrid.TWO_AXIS_TO_CUBE;
      this.toPoint = HexagonalGrid.CUBE_TO_TWO_AXIS;
      this.tiles = HexagonalGrid.TRAPEZOIDAL_SHAPE(0, x, 0, yy, this.toTile);
    }
  }

  public static TWO_AXIS_TO_CUBE(position: Position): HexagonalTile {
    return new HexagonalTile(position.x, -position.y - position.x, position.y);
  }

  public static CUBE_TO_TWO_AXIS(tile: HexagonalTile): Position {
    return new Position(tile.x, tile.z);
  }

  public static TWO_AXIS_TO_CUBE_XY(position: Position): HexagonalTile {
    return new HexagonalTile(position.x, position.y, -position.x - position.y);
  }

  public static CUBE_TO_TWO_AXIS_XY(tile: HexagonalTile): Position {
    return new Position(tile.x, tile.y);
  }

  public static TWO_AXIS_TO_CUBE_YZ(position: Position): HexagonalTile {
    return new HexagonalTile(-position.x - position.y, position.x, position.y);
  }

  public static CUBE_TO_TWO_AXIS_YZ(tile: HexagonalTile): Position {
    return new Position(tile.y, tile.z);
  }

  public static ODD_Q_TO_CUBE(position: Position): HexagonalTile {
    /* tslint:disable:no-bitwise */
    const x: Integer = position.x;
    const z: Integer = position.y - ((position.x - (position.x & 1)) >> 1);
    /* tslint:enable:no-bitwise */

    return new HexagonalTile(x, -x - z, z);
  }

  public static CUBE_TO_ODD_Q(tile: HexagonalTile): Position {
    const x: Integer = tile.x;
    const z: Integer = tile.z;

    /* tslint:disable:no-bitwise */
    return new Position(x, z + ((x - (x & 1)) >> 1));
    /* tslint:enable:no-bitwise */
  }

  public static EVEN_Q_TO_CUBE(position: Position): HexagonalTile {
    /* tslint:disable:no-bitwise */
    const x: Integer = position.x;
    const z: Integer = position.y - ((position.x + (position.x & 1)) >> 1);
    /* tslint:enable:no-bitwise */

    return new HexagonalTile(x, -x - z, z);
  }

  public static CUBE_TO_EVEN_Q(tile: HexagonalTile): Position {
    const x: Integer = tile.x;
    const z: Integer = tile.z;

    /* tslint:disable:no-bitwise */
    return new Position(x, z + ((x + (x & 1)) >> 1));
    /* tslint:enable:no-bitwise */
  }

  public static ODD_R_TO_CUBE(position: Position): HexagonalTile {
    /* tslint:disable:no-bitwise */
    const z: Integer = position.y;
    const x: Integer = position.x - ((position.y - (position.y & 1)) >> 1);
    /* tslint:enable:no-bitwise */

    return new HexagonalTile(x, -x - z, z);
  }

  public static CUBE_TO_ODD_R(tile: HexagonalTile): Position {
    const x: Integer = tile.x;
    const z: Integer = tile.z;

    /* tslint:disable:no-bitwise */
    return new Position(x + ((z - (z & 1)) >> 1), z);
    /* tslint:enable:no-bitwise */
  }

  public static EVEN_R_TO_CUBE(position: Position): HexagonalTile {
    /* tslint:disable:no-bitwise */
    const z: Integer = position.y;
    const x: Integer = position.x - ((position.y + (position.y & 1)) >> 1);
    /* tslint:enable:no-bitwise */

    return new HexagonalTile(x, -x - z, z);
  }

  public static CUBE_TO_EVEN_R(tile: HexagonalTile): Position {
    const x: Integer = tile.x;
    const z: Integer = tile.z;

    /* tslint:disable:no-bitwise */
    return new Position(x + ((z + (z & 1)) >> 1), z);
    /* tslint:enable:no-bitwise */
  }

  public static TRAPEZOIDAL_SHAPE(minQ: Integer, maxQ: Integer,
                                  minR: Integer, maxR: Integer,
                                  toCube: (position: Position) => HexagonalTile): HexagonalTile[] {
    const hexes: HexagonalTile[] = [];

    for (let q: Integer = minQ; q < maxQ; q++) {
      for (let r: Integer = minR; r < maxR; r++) {
        hexes.push(toCube(new Position(q, r)));
      }
    }

    return hexes;
  }

  public static TRIANGULAR_SHAPE(size: Integer): HexagonalTile[] {
    const hexes: HexagonalTile[] = [];

    for (let k: Integer = 0; k < size; k++) {
      for (let i: Integer = 0; i < (k + 1); i++) {
        hexes.push(new HexagonalTile(i, -k, k - i));
      }
    }

    return hexes;
  }

  public static HEXAGONAL_SHAPE(size: Integer): HexagonalTile[] {
    const hexes: HexagonalTile[] = [];

    for (let x: Integer = -size; x < size; x++) {
      for (let y: Integer = -size; y < size; y++) {
        const z: Integer = -x - y;

        if (Math.abs(x) < size && Math.abs(y) < size && Math.abs(z) < size) {
          hexes.push(new HexagonalTile(x, y, z));
        }
      }
    }

    return hexes;
  }

  public static REGION(
    xmin: Integer,
    xmax: Integer,
    ymin: Integer,
    ymax: Integer,
    zmin: Integer,
    zmax: Integer): HexagonalTile[] {
    const results: HexagonalTile[] = [];

    for (let x: Integer = xmin; x <= xmax; x++) {
      for (let y: Integer = Math.max(ymin, -x - zmax); y <= Math.min(ymax, -x - zmin); y++) {
        const z: Integer = -x - y;
        results.push(new HexagonalTile(x, y, z));
      }
    }

    return results;
  }

  public bounds(): Rectangle {
    return bounds(<IGrid<any>>this);
  }

  public vertices(orientation?: boolean, scale?: Float): Float2[] {
    const points: Float2[] = [];
    let s = (scale === undefined) ? this.scale : scale;
    s /= SQRT_3_2;
    const o = (orientation === undefined) ? false : this.orientation;

    for (let i: Integer = 0; i < 6; i++) {
      const angle: Float = Math.PI * (i * 2 - (o ? 1 : 0)) * 2 / 12;

      points.push(new Float2(s * Math.cos(angle) * 0.5, s * Math.sin(angle) * 0.5));
    }

    return points;
  }

  public center(tile: HexagonalTile): Float2 {
    let s: Float2;
    const size: Float = this.scale / SQRT_3_2 / 2;

    if (this.orientation) {
      s = new Float2(SQRT_3 * tile.x + SQRT_3_2 * tile.z, tile.z * this.scaleY * 1.5);
    } else {
      s = new Float2(tile.x * 1.5, (SQRT_3_2 * tile.x + SQRT_3 * tile.z) * this.scaleY);
    }

    return s.scale(size);
  }

  public position(p: Float2): HexagonalTile {
    const size: Float = this.scale / 2;
    const pp = p.scale(1 / size);
    pp.y *= this.scaleY;

    let q: Float;
    let r: Float;

    if (this.orientation) {
      q = SQRT_3_3 * pp.x + -1 / 3 * pp.y;
      r = 2 / 3 * pp.y;
    } else {
      q = 2 / 3 * pp.x;
      r = -1 / 3 * pp.x + SQRT_3_3 * pp.y;
    }

    return new HexagonalTile(Math.round(q), Math.round(-q - r), Math.round(r));
  }

  public tile(x: number, y: number): HexagonalTile | undefined {
    return this.toTile ? this.toTile(new Position(x, y)) : undefined;
  }
}

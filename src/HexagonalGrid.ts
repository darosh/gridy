import { bounds } from "./Bounds";
import { SQRT_3, SQRT_3_2, SQRT_3_3 } from "./Constants";
import { Float } from "./Float";
import { Float2 } from "./Float2";
import { HexagonalTile } from "./HexagonalTile";
import { IGrid } from "./IGrid";
import { Integer } from "./Integer";
import { Position } from "./Position";
import { Rectangle } from "./Rectangle";
import { Shape } from "./Shape";
import { TileType } from "./TileType";

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

  public static twoAxisToCube(position: Position): HexagonalTile {
    return new HexagonalTile(position.x, -position.y - position.x, position.y);
  }

  public static cubeToTwoAxis(tile: HexagonalTile): Position {
    return new Position(tile.x, tile.z);
  }

  public static twoAxisToCubeXY(position: Position): HexagonalTile {
    return new HexagonalTile(position.x, position.y, -position.x - position.y);
  }

  public static cubeToTwoAxisXY(tile: HexagonalTile): Position {
    return new Position(tile.x, tile.y);
  }

  public static twoAxisToCubeYZ(position: Position): HexagonalTile {
    return new HexagonalTile( -position.x - position.y, position.x, position.y);
  }

  public static cubeToTwoAxisYZ(tile: HexagonalTile): Position {
    return new Position(tile.y, tile.z);
  }

  public static oddQToCube(position: Position): HexagonalTile {
    /* tslint:disable:no-bitwise */
    const x: Integer = position.x;
    const z: Integer = position.y - ((position.x - (position.x & 1)) >> 1);
    /* tslint:enable:no-bitwise */

    return new HexagonalTile(x, -x - z, z);
  }

  public static cubeToOddQ(tile: HexagonalTile): Position {
    const x: Integer = tile.x;
    const z: Integer = tile.z;

    /* tslint:disable:no-bitwise */
    return new Position(x, z + ((x - (x & 1)) >> 1));
    /* tslint:enable:no-bitwise */
  }

  public static evenQToCube(position: Position): HexagonalTile {
    /* tslint:disable:no-bitwise */
    const x: Integer = position.x;
    const z: Integer = position.y - ((position.x + (position.x & 1)) >> 1);
    /* tslint:enable:no-bitwise */

    return new HexagonalTile(x, -x - z, z);
  }

  public static cubeToEvenQ(tile: HexagonalTile): Position {
    const x: Integer = tile.x;
    const z: Integer = tile.z;

    /* tslint:disable:no-bitwise */
    return new Position(x, z + ((x + (x & 1)) >> 1));
    /* tslint:enable:no-bitwise */
  }

  public static oddRToCube(position: Position): HexagonalTile {
    /* tslint:disable:no-bitwise */
    const z: Integer = position.y;
    const x: Integer = position.x - ((position.y - (position.y & 1)) >> 1);
    /* tslint:enable:no-bitwise */

    return new HexagonalTile(x, -x - z, z);
  }

  public static cubeToOddR(tile: HexagonalTile): Position {
    const x: Integer = tile.x;
    const z: Integer = tile.z;

    /* tslint:disable:no-bitwise */
    return new Position(x + ((z - (z & 1)) >> 1), z);
    /* tslint:enable:no-bitwise */
  }

  public static evenRToCube(position: Position): HexagonalTile {
    /* tslint:disable:no-bitwise */
    const z: Integer = position.y;
    const x: Integer = position.x - ((position.y + (position.y & 1)) >> 1);
    /* tslint:enable:no-bitwise */

    return new HexagonalTile(x, -x - z, z);
  }

  public static cubeToEvenR(tile: HexagonalTile): Position {
    const x: Integer = tile.x;
    const z: Integer = tile.z;

    /* tslint:disable:no-bitwise */
    return new Position(x + ((z + (z & 1)) >> 1), z);
    /* tslint:enable:no-bitwise */
  }

  public static trapezoidalShape(minQ: Integer, maxQ: Integer,
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

  public static triangularShape(size: Integer): HexagonalTile[] {
    const hexes: HexagonalTile[] = [];

    for (let k: Integer = 0; k < size; k++) {
      for (let i: Integer = 0; i < (k + 1); i++) {
        hexes.push(new HexagonalTile(i, -k, k - i));
      }
    }

    return hexes;
  }

  public static hexagonalShape(size: Integer): HexagonalTile[] {
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

  public static region(
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
    this.radius = SQRT_3_2 * scale / 2;
    this.orientation = orientation;
    y = y || x;
    this.x = x;
    this.y = y;
    this.shape = shape;

    if (shape === Shape.Even && orientation === false) {
      this.toTile = HexagonalGrid.evenQToCube;
      this.toPoint = HexagonalGrid.cubeToEvenQ;
      this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
    } else if (shape === Shape.Even && orientation === true) {
      this.toTile = HexagonalGrid.evenRToCube;
      this.toPoint = HexagonalGrid.cubeToEvenR;
      this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
    } else if (shape === Shape.Odd && orientation === false) {
      this.toTile = HexagonalGrid.oddQToCube;
      this.toPoint = HexagonalGrid.cubeToOddQ;
      this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
    } else if (shape === Shape.Odd && orientation === true) {
      this.toTile = HexagonalGrid.oddRToCube;
      this.toPoint = HexagonalGrid.cubeToOddR;
      this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
    } else if (shape === Shape.Hexagonal) {
      // this.toTile = HexagonalGrid.evenQToCube;
      // this.toPoint = HexagonalGrid.cubeToEvenQ;
      this.toTile = HexagonalGrid.twoAxisToCube;
      this.toPoint = HexagonalGrid.cubeToTwoAxis;
      this.tiles = HexagonalGrid.hexagonalShape(x);
    } else if (shape === Shape.Triangular) {
      this.toTile = HexagonalGrid.evenQToCube;
      this.toPoint = HexagonalGrid.cubeToEvenQ;
      this.tiles = HexagonalGrid.triangularShape(x);
    } else /*if (shape === Shape.Rhombus)*/ {
      this.toTile = HexagonalGrid.twoAxisToCube;
      this.toPoint = HexagonalGrid.cubeToTwoAxis;
      this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
    }
  }

  public bounds(): Rectangle {
    return bounds(this as IGrid<any>);
  }

  public vertices(orientation?: boolean, scale?: Float): Float2[] {
    const points: Float2[] = [];
    scale = (scale === undefined) ? this.scale : scale;
    orientation = (orientation === undefined) ? false : this.orientation;

    for (let i: Integer = 0; i < 6; i++) {
      const angle: Float = 2 * Math.PI * (2 * i - (orientation ? 1 : 0)) / 12;

      points.push(new Float2(0.5 * scale * Math.cos(angle), 0.5 * scale * Math.sin(angle)));
    }

    return points;
  }

  public center(tile: HexagonalTile): Float2 {
    let s: Float2;
    const size: Float = this.scale / 2;

    if (this.orientation) {
      s = new Float2(SQRT_3 * tile.x + SQRT_3_2 * tile.z, 1.5 * tile.z * this.scaleY);
    } else {
      s = new Float2(1.5 * tile.x, (SQRT_3_2 * tile.x + SQRT_3 * tile.z) * this.scaleY);
    }

    return s.scale(size);
  }

  public position(p: Float2): HexagonalTile {
    const size: Float = this.scale / 2;
    p = p.scale(1 / size);
    p.y *= this.scaleY;

    let q: Float;
    let r: Float;

    if (this.orientation) {
      q = SQRT_3_3 * p.x + -1 / 3 * p.y;
      r = 2 / 3 * p.y;
    } else {
      q = 2 / 3 * p.x;
      r = -1 / 3 * p.x + SQRT_3_3 * p.y;
    }

    return new HexagonalTile(Math.round(q), Math.round(-q - r), Math.round(r));
  }

  public tile(x: number, y: number): HexagonalTile | undefined {
    return this.toTile ? this.toTile(new Position(x, y)) : undefined;
  }
}

import { bounds } from "./Bounds";
import { SQRT_3, SQRT_3_2, SQRT_3_3 } from "./Constants";
import { Float2 } from "./Float2";
import { GridShape } from "./GridShape";
import { HexagonalTile } from "./HexagonalTile";
import { Position } from "./Position";
import { TileType } from "./TileType";
// From http://www.redblobgames.com/grids/hexagons/
// Copyright 2012 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
// Original source: http://www.redblobgames.com/grids/hexagons/Grid.hx
/**
 * ![](../../examples/output/hexagonal-grid.svg)
 */
export class HexagonalGrid {
    constructor(scale, orientation = false, shape = GridShape.Hexagonal, x = 1, y) {
        this.angle = -30;
        this.tileTypes = TileType.Simple;
        this.scale = scale;
        this.radius = SQRT_3_2 * scale / 2;
        this.orientation = orientation;
        y = y || x;
        this.x = x;
        this.y = y;
        this.shape = shape;
        if (shape === GridShape.TrapezoidalEven && orientation === false) {
            this.toTile = HexagonalGrid.evenQToCube;
            this.toPoint = HexagonalGrid.cubeToEvenQ;
            this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
        }
        else if (shape === GridShape.TrapezoidalEven && orientation === true) {
            this.toTile = HexagonalGrid.evenRToCube;
            this.toPoint = HexagonalGrid.cubeToEvenR;
            this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
        }
        else if (shape === GridShape.TrapezoidalOdd && orientation === false) {
            this.toTile = HexagonalGrid.oddQToCube;
            this.toPoint = HexagonalGrid.cubeToOddQ;
            this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
        }
        else if (shape === GridShape.TrapezoidalOdd && orientation === true) {
            this.toTile = HexagonalGrid.oddRToCube;
            this.toPoint = HexagonalGrid.cubeToOddR;
            this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
        }
        else if (shape === GridShape.Hexagonal) {
            this.toTile = HexagonalGrid.evenQToCube;
            this.toPoint = HexagonalGrid.cubeToEvenQ;
            this.tiles = HexagonalGrid.hexagonalShape(x);
        }
        else if (shape === GridShape.Triangular) {
            this.toTile = HexagonalGrid.evenQToCube;
            this.toPoint = HexagonalGrid.cubeToEvenQ;
            this.tiles = HexagonalGrid.triangularShape(x);
        }
        else if (shape === GridShape.Rhombus) {
            this.toTile = HexagonalGrid.twoAxisToCube;
            this.toPoint = HexagonalGrid.cubeToTwoAxis;
            this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
            // } else if (shape === GridShape.RhombusEven) {
            //   this.toTile = HexagonalGrid.twoAxisToCubeEven;
            //   this.toPoint = HexagonalGrid.cubeToTwoAxisEven;
            //   this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
            // } else if (shape === GridShape.RhombusOdd) {
            //   this.toTile = HexagonalGrid.twoAxisToCubeOdd;
            //   this.toPoint = HexagonalGrid.cubeToTwoAxisOdd;
            //   this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
        }
        else {
            this.tiles = [];
            this.toPoint = () => new Position();
        }
    }
    static twoAxisToCube(position) {
        return new HexagonalTile(position.x, -position.y - position.x, position.y);
    }
    // public static twoAxisToCubeEven(position: Position): HexagonalTile {
    //   return new HexagonalTile(position.x + position.y, -position.y + position.x, -position.x);
    // }
    // public static twoAxisToCubeOdd(position: Position): HexagonalTile {
    //   return new HexagonalTile(-position.y, -position.y - position.x, position.x + position.y);
    // }
    static cubeToTwoAxis(tile) {
        return new Position(Math.floor(tile.x), Math.floor(tile.z));
    }
    // public static cubeToTwoAxisEven(tile: HexagonalTile): Position {
    //   return new Position(Math.floor(-tile.z), Math.floor(tile.x + tile.z));
    // }
    // public static cubeToTwoAxisOdd(tile: HexagonalTile): Position {
    //   return new Position(Math.floor(tile.x + tile.z), Math.floor(-tile.x));
    // }
    static oddQToCube(position) {
        /* tslint:disable:no-bitwise */
        const x = position.x;
        const z = position.y - ((position.x - (position.x & 1)) >> 1);
        /* tslint:enable:no-bitwise */
        return new HexagonalTile(x, -x - z, z);
    }
    static cubeToOddQ(tile) {
        const x = Math.floor(tile.x);
        const z = Math.floor(tile.z);
        /* tslint:disable:no-bitwise */
        return new Position(x, z + ((x - (x & 1)) >> 1));
        /* tslint:enable:no-bitwise */
    }
    static evenQToCube(position) {
        /* tslint:disable:no-bitwise */
        const x = position.x;
        const z = position.y - ((position.x + (position.x & 1)) >> 1);
        /* tslint:enable:no-bitwise */
        return new HexagonalTile(x, -x - z, z);
    }
    static cubeToEvenQ(tile) {
        const x = Math.floor(tile.x);
        const z = Math.floor(tile.z);
        /* tslint:disable:no-bitwise */
        return new Position(x, z + ((x + (x & 1)) >> 1));
        /* tslint:enable:no-bitwise */
    }
    static oddRToCube(position) {
        /* tslint:disable:no-bitwise */
        const z = position.y;
        const x = position.x - ((position.y - (position.y & 1)) >> 1);
        /* tslint:enable:no-bitwise */
        return new HexagonalTile(x, -x - z, z);
    }
    static cubeToOddR(tile) {
        const x = Math.floor(tile.x);
        const z = Math.floor(tile.z);
        /* tslint:disable:no-bitwise */
        return new Position(x + ((z - (z & 1)) >> 1), z);
        /* tslint:enable:no-bitwise */
    }
    static evenRToCube(position) {
        /* tslint:disable:no-bitwise */
        const z = position.y;
        const x = position.x - ((position.y + (position.y & 1)) >> 1);
        /* tslint:enable:no-bitwise */
        return new HexagonalTile(x, -x - z, z);
    }
    static cubeToEvenR(tile) {
        const x = Math.floor(tile.x);
        const z = Math.floor(tile.z);
        /* tslint:disable:no-bitwise */
        return new Position(x + ((z + (z & 1)) >> 1), z);
        /* tslint:enable:no-bitwise */
    }
    static trapezoidalShape(minQ, maxQ, minR, maxR, toCube) {
        const hexes = [];
        for (let q = minQ; q < maxQ; q++) {
            for (let r = minR; r < maxR; r++) {
                hexes.push(toCube(new Position(q, r)));
            }
        }
        return hexes;
    }
    // static trapezoidalShapeOdd(minQ: Integer, maxQ: Integer,
    //   minR: Integer, maxR: Integer,
    //   toCube: (position: Position) => HexagonalTile): Array<HexagonalTile> {
    //   var hexes: Array<HexagonalTile> = [];
    //   for (var q: Integer = maxQ - 1; q >= minQ; q--) {
    //     const shift = maxQ - q - 1
    //     for (var r: Integer = minR; r < maxR; r++) {
    //       hexes.push(toCube(new Position(q, r + shift)));
    //     }
    //   }
    //   return hexes;
    // }
    // static trapezoidalShapeEven(minQ: Integer, maxQ: Integer,
    //   minR: Integer, maxR: Integer,
    //   toCube: (position: Position) => HexagonalTile): Array<HexagonalTile> {
    //   var hexes: Array<HexagonalTile> = [];
    //   for (var q: Integer = maxQ - 1; q >= minQ; q--) {
    //     const shift = maxQ - q - 1
    //     for (var r: Integer = minR; r < maxR; r++) {
    //       hexes.push(toCube(new Position(r + shift, q)));
    //     }
    //   }
    //   return hexes;
    // }
    static triangularShape(size) {
        const hexes = [];
        for (let k = 0; k < size; k++) {
            for (let i = 0; i < (k + 1); i++) {
                hexes.push(new HexagonalTile(i, -k, k - i));
            }
        }
        return hexes;
    }
    static hexagonalShape(size) {
        const hexes = [];
        for (let x = -size; x < size; x++) {
            for (let y = -size; y < size; y++) {
                const z = -x - y;
                if (Math.abs(x) < size && Math.abs(y) < size && Math.abs(z) < size) {
                    hexes.push(new HexagonalTile(x, y, z));
                }
            }
        }
        return hexes;
    }
    static region(xmin, xmax, ymin, ymax, zmin, zmax) {
        const results = [];
        for (let x = xmin; x <= xmax; x++) {
            for (let y = Math.max(ymin, -x - zmax); y <= Math.min(ymax, -x - zmin); y++) {
                const z = -x - y;
                results.push(new HexagonalTile(x, y, z));
            }
        }
        return results;
    }
    bounds() {
        return bounds(this);
    }
    vertices(orientation, scale) {
        const points = [];
        scale = (scale === undefined) ? this.scale : scale;
        orientation = (orientation === undefined) ? false : this.orientation;
        for (let i = 0; i < 6; i++) {
            const angle = 2 * Math.PI * (2 * i - (orientation ? 1 : 0)) / 12;
            points.push(new Float2(0.5 * scale * Math.cos(angle), 0.5 * scale * Math.sin(angle)));
        }
        return points;
    }
    center(tile) {
        let s;
        const size = this.scale / 2;
        if (this.orientation) {
            s = new Float2(SQRT_3 * tile.x + SQRT_3_2 * tile.z, 1.5 * tile.z);
        }
        else {
            s = new Float2(1.5 * tile.x, SQRT_3_2 * tile.x + SQRT_3 * tile.z);
        }
        return s.scale(size);
    }
    position(p) {
        const size = this.scale / 2;
        p = p.scale(1 / size);
        let q;
        let r;
        if (this.orientation) {
            q = SQRT_3_3 * p.x + -1 / 3 * p.y;
            r = 2 / 3 * p.y;
        }
        else {
            q = 2 / 3 * p.x;
            r = -1 / 3 * p.x + SQRT_3_3 * p.y;
        }
        return new HexagonalTile(Math.round(q), Math.round(-q - r), Math.round(r));
    }
}

import { bounds } from './bounds';
import { SQRT_3, SQRT_3_2, SQRT_3_3 } from './Constants';
import { Float2 } from './Float2';
import { HexagonalTile } from './HexagonalTile';
import { Position } from './Position';
import { Shape } from './Shape';
import { TileType } from './TileType';
// From http://www.redblobgames.com/grids/hexagons/
// Copyright 2012 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
// Original source: http://www.redblobgames.com/grids/hexagons/Grid.hx
/**
 * ![](../../examples/output/hexagonal-grid.svg)
 */
export class HexagonalGrid {
    constructor(scale, orientation = false, shape = Shape.Hexagonal, x = 1, y) {
        this.scaleY = -1;
        this.angle = -30;
        this.tileTypes = TileType.Simple;
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
        }
        else if (shape === Shape.Even && orientation === true) {
            this.toTile = HexagonalGrid.EVEN_R_TO_CUBE;
            this.toPoint = HexagonalGrid.CUBE_TO_EVEN_R;
            this.tiles = HexagonalGrid.TRAPEZOIDAL_SHAPE(0, x, 0, yy, this.toTile);
        }
        else if (shape === Shape.Odd && orientation === false) {
            this.toTile = HexagonalGrid.ODD_Q_TO_CUBE;
            this.toPoint = HexagonalGrid.CUBE_TO_ODD_Q;
            this.tiles = HexagonalGrid.TRAPEZOIDAL_SHAPE(0, x, 0, yy, this.toTile);
        }
        else if (shape === Shape.Odd && orientation === true) {
            this.toTile = HexagonalGrid.ODD_R_TO_CUBE;
            this.toPoint = HexagonalGrid.CUBE_TO_ODD_R;
            this.tiles = HexagonalGrid.TRAPEZOIDAL_SHAPE(0, x, 0, yy, this.toTile);
        }
        else if (shape === Shape.Hexagonal) {
            // this.toTile = HexagonalGrid.EVEN_Q_TO_CUBE;
            // this.toPoint = HexagonalGrid.CUBE_TO_EVEN_Q;
            this.toTile = HexagonalGrid.TWO_AXIS_TO_CUBE;
            this.toPoint = HexagonalGrid.CUBE_TO_TWO_AXIS;
            this.tiles = HexagonalGrid.HEXAGONAL_SHAPE(x);
        }
        else if (shape === Shape.Triangular) {
            this.toTile = HexagonalGrid.EVEN_Q_TO_CUBE;
            this.toPoint = HexagonalGrid.CUBE_TO_EVEN_Q;
            this.tiles = HexagonalGrid.TRIANGULAR_SHAPE(x);
        }
        else { // if (shape === Shape.Rhombus)
            this.toTile = HexagonalGrid.TWO_AXIS_TO_CUBE;
            this.toPoint = HexagonalGrid.CUBE_TO_TWO_AXIS;
            this.tiles = HexagonalGrid.TRAPEZOIDAL_SHAPE(0, x, 0, yy, this.toTile);
        }
    }
    static TWO_AXIS_TO_CUBE(position) {
        return new HexagonalTile(position.x, -position.y - position.x, position.y);
    }
    static CUBE_TO_TWO_AXIS(tile) {
        return new Position(tile.x, tile.z);
    }
    static TWO_AXIS_TO_CUBE_XY(position) {
        return new HexagonalTile(position.x, position.y, -position.x - position.y);
    }
    static CUBE_TO_TWO_AXIS_XY(tile) {
        return new Position(tile.x, tile.y);
    }
    static TWO_AXIS_TO_CUBE_YZ(position) {
        return new HexagonalTile(-position.x - position.y, position.x, position.y);
    }
    static CUBE_TO_TWO_AXIS_YZ(tile) {
        return new Position(tile.y, tile.z);
    }
    static ODD_Q_TO_CUBE(position) {
        /* tslint:disable:no-bitwise */
        const x = position.x;
        const z = position.y - ((position.x - (position.x & 1)) >> 1);
        /* tslint:enable:no-bitwise */
        return new HexagonalTile(x, -x - z, z);
    }
    static CUBE_TO_ODD_Q(tile) {
        const x = tile.x;
        const z = tile.z;
        /* tslint:disable:no-bitwise */
        return new Position(x, z + ((x - (x & 1)) >> 1));
        /* tslint:enable:no-bitwise */
    }
    static EVEN_Q_TO_CUBE(position) {
        /* tslint:disable:no-bitwise */
        const x = position.x;
        const z = position.y - ((position.x + (position.x & 1)) >> 1);
        /* tslint:enable:no-bitwise */
        return new HexagonalTile(x, -x - z, z);
    }
    static CUBE_TO_EVEN_Q(tile) {
        const x = tile.x;
        const z = tile.z;
        /* tslint:disable:no-bitwise */
        return new Position(x, z + ((x + (x & 1)) >> 1));
        /* tslint:enable:no-bitwise */
    }
    static ODD_R_TO_CUBE(position) {
        /* tslint:disable:no-bitwise */
        const z = position.y;
        const x = position.x - ((position.y - (position.y & 1)) >> 1);
        /* tslint:enable:no-bitwise */
        return new HexagonalTile(x, -x - z, z);
    }
    static CUBE_TO_ODD_R(tile) {
        const x = tile.x;
        const z = tile.z;
        /* tslint:disable:no-bitwise */
        return new Position(x + ((z - (z & 1)) >> 1), z);
        /* tslint:enable:no-bitwise */
    }
    static EVEN_R_TO_CUBE(position) {
        /* tslint:disable:no-bitwise */
        const z = position.y;
        const x = position.x - ((position.y + (position.y & 1)) >> 1);
        /* tslint:enable:no-bitwise */
        return new HexagonalTile(x, -x - z, z);
    }
    static CUBE_TO_EVEN_R(tile) {
        const x = tile.x;
        const z = tile.z;
        /* tslint:disable:no-bitwise */
        return new Position(x + ((z + (z & 1)) >> 1), z);
        /* tslint:enable:no-bitwise */
    }
    static TRAPEZOIDAL_SHAPE(minQ, maxQ, minR, maxR, toCube) {
        const hexes = [];
        for (let q = minQ; q < maxQ; q++) {
            for (let r = minR; r < maxR; r++) {
                hexes.push(toCube(new Position(q, r)));
            }
        }
        return hexes;
    }
    static TRIANGULAR_SHAPE(size) {
        const hexes = [];
        for (let k = 0; k < size; k++) {
            for (let i = 0; i < (k + 1); i++) {
                hexes.push(new HexagonalTile(i, -k, k - i));
            }
        }
        return hexes;
    }
    static HEXAGONAL_SHAPE(size) {
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
    static REGION(xmin, xmax, ymin, ymax, zmin, zmax) {
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
        let s = (scale === undefined) ? this.scale : scale;
        s /= SQRT_3_2;
        const o = (orientation === undefined) ? false : this.orientation;
        for (let i = 0; i < 6; i++) {
            const angle = Math.PI * (i * 2 - (o ? 1 : 0)) * 2 / 12;
            points.push(new Float2(s * Math.cos(angle) * 0.5, s * Math.sin(angle) * 0.5));
        }
        return points;
    }
    center(tile) {
        let s;
        const size = this.scale / SQRT_3_2 / 2;
        if (this.orientation) {
            s = new Float2(SQRT_3 * tile.x + SQRT_3_2 * tile.z, tile.z * this.scaleY * 1.5);
        }
        else {
            s = new Float2(tile.x * 1.5, (SQRT_3_2 * tile.x + SQRT_3 * tile.z) * this.scaleY);
        }
        return s.scale(size);
    }
    position(p) {
        const size = this.scale / 2;
        const pp = p.scale(1 / size);
        pp.y *= this.scaleY;
        let q;
        let r;
        if (this.orientation) {
            q = SQRT_3_3 * pp.x + -1 / 3 * pp.y;
            r = 2 / 3 * pp.y;
        }
        else {
            q = 2 / 3 * pp.x;
            r = -1 / 3 * pp.x + SQRT_3_3 * pp.y;
        }
        return new HexagonalTile(Math.round(q), Math.round(-q - r), Math.round(r));
    }
    tile(x, y) {
        return this.toTile ? this.toTile(new Position(x, y)) : undefined;
    }
}
HexagonalGrid.shapes = [Shape.Hexagonal,
    Shape.Rhombus, Shape.Even, Shape.Odd, Shape.Triangular];
//# sourceMappingURL=HexagonalGrid.js.map
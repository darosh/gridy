import { bounds } from "./Bounds";
import { SQRT_3_2, SQRT_3_3, SQRT_3_6 } from "./Constants";
import { Float2 } from "./Float2";
import { Position } from "./Position";
import { Shape } from "./Shape";
import { TileType } from "./TileType";
import { TriangularTile } from "./TriangularTile";
/**
 * ![](../../examples/output/triangular-grid.svg)
 */
export class TriangularGrid {
    constructor(scale, orientation = false, shape = Shape.Triangular, x = 1, y = 1) {
        this.scaleY = -1;
        this.angle = -60;
        this.tileTypes = TileType.Variable;
        this.scale = scale;
        this.radius = SQRT_3_6 * scale / SQRT_3_2;
        this.orientation = orientation;
        this.x = x;
        this.y = y;
        if (shape === Shape.Rhombus) {
            this.tiles = this.rhombus();
            this.orientation = false;
        }
        else if (shape === Shape.Hexagonal) {
            this.tiles = this.hexagonalShape(x);
            this.orientation = false;
        }
        else {
            this.tiles = this.triangle();
            this.orientation = false;
        }
        this.toPoint = (tile) => {
            return new Position(tile.x * 2 + (tile.s ? 1 : 0), tile.y);
        };
        this.toTile = (position) => {
            return new TriangularTile(position.x / 2 - (position.x % 2), position.y);
        };
    }
    bounds() {
        return bounds(this);
    }
    center(tile) {
        const scale = this.scale / SQRT_3_2;
        return new Float2((tile.x * 2 + (tile.s ? 1 : 0) + tile.y) * scale / 2, scale * (tile.y * (SQRT_3_2) + (tile.s ? 0 : -(SQRT_3_6))) * this.scaleY);
    }
    vertices(orientation, scale, tileType = 0) {
        scale = (scale === undefined) ? this.scale : scale;
        scale /= SQRT_3_2;
        if (this.scaleY > 0 ? tileType === 0 : tileType !== 0) {
            return [
                new Float2(0, -scale * SQRT_3_3),
                new Float2(-scale / 2, scale * SQRT_3_6),
                new Float2(scale / 2, scale * SQRT_3_6),
            ];
        }
        else {
            return [
                new Float2(0, scale * (SQRT_3_6 + (SQRT_3_6))),
                new Float2(-scale / 2, -scale * (SQRT_3_3 - (SQRT_3_6))),
                new Float2(scale / 2, -scale * (SQRT_3_3 - (SQRT_3_6))),
            ];
        }
    }
    position(p) {
        return new TriangularTile(Math.round(p.x), Math.round(p.y), false);
    }
    getTileType(tile) {
        return tile.s ? 0 : 1;
    }
    tile(x, y) {
        return new TriangularTile(Math.floor(x / 2), y, !!(x % 2));
    }
    rhombus() {
        const results = [];
        for (let px = 0; px < this.x; px++) {
            for (let py = 0; py < this.y; py++) {
                results.push(new TriangularTile(px, py, false));
                results.push(new TriangularTile(px, py, true));
            }
        }
        return results;
    }
    triangle() {
        const results = [];
        for (let py = 0; py < this.x; py++) {
            for (let px = 0; px < (this.x - py); px++) {
                results.push(new TriangularTile(px, py, false));
                if (px < (this.x - py - 1)) {
                    results.push(new TriangularTile(px, py, true));
                }
            }
        }
        return results;
    }
    hexagonalShape(size) {
        const results = [];
        for (let x = -size; x < size; x++) {
            for (let y = -size; y < size; y++) {
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
TriangularGrid.shapes = [Shape.Hexagonal, Shape.Rhombus, Shape.Triangular];

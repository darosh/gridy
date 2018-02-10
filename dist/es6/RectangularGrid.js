import { bounds } from "./Bounds";
import { SQRT_2 } from "./Constants";
import { Float2 } from "./Float2";
import { GridShape } from "./GridShape";
import { Position } from "./Position";
import { RectangularTile } from "./RectangularTile";
import { TileType } from "./TileType";
// TypeScript version of http://www.redblobgames.com/articles/grids/hexagons/
// Copyright 2013 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
/**
 * ![](../../examples/output/rectangular-grid.svg)
 */
export class RectangularGrid {
    constructor(scale, orientation = false, shape = GridShape.TrapezoidalEven, x = 1, y = 1) {
        this.angle = -45;
        this.tileTypes = TileType.Simple;
        this.scale = scale;
        this.radius = scale / 2;
        this.orientation = orientation;
        this.x = x;
        this.y = y;
        const results = [];
        for (let px = 0; px < x; px++) {
            for (let py = 0; py < y; py++) {
                results.push(new RectangularTile(px, py));
            }
        }
        this.tiles = results;
        this.toTile = (p) => new RectangularTile(p.x, p.y);
        this.toPoint = (p) => new Position(p.x, p.y);
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
    bounds() {
        return bounds(this);
    }
    center(tile) {
        if (this.orientation) {
            return new Float2(tile.x * this.scale / SQRT_2 + tile.y * this.scale / SQRT_2, tile.y * this.scale / SQRT_2 - tile.x * this.scale / SQRT_2);
        }
        else {
            return new Float2(tile.x * this.scale, tile.y * this.scale);
        }
    }
    vertices(orientation, scale) {
        const points = [];
        scale = (scale === undefined) ? this.scale : scale;
        orientation = (orientation === undefined) ? false : this.orientation;
        if (orientation) {
            scale *= SQRT_2;
            points.push(new Float2(-scale / 2, 0));
            points.push(new Float2(0, -scale / 2));
            points.push(new Float2(scale / 2, 0));
            points.push(new Float2(0, scale / 2));
        }
        else {
            points.push(new Float2(-scale / 2, -scale / 2));
            points.push(new Float2(-scale / 2, scale / 2));
            points.push(new Float2(scale / 2, scale / 2));
            points.push(new Float2(scale / 2, -scale / 2));
        }
        return points;
    }
    position(p) {
        return new RectangularTile(Math.round(p.x), Math.round(p.y));
    }
}

import { ANG, DEG_TO_RAD } from "./Constants";
import { Float2 } from "./Float2";
import { Float3 } from "./Float3";
import { Position } from "./Position";
import { RadialTile } from "./RadialTile";
import { Rectangle } from "./Rectangle";
import { Shape } from "./Shape";
import { TileType } from "./TileType";
/**
 * ![](../../examples/output/Radial-grid.svg)
 */
export class RadialGrid {
    constructor(scale, orientation = false, shape = Shape.Even, x = 1, y = 1, tile = RadialTile) {
        this.scaleY = -1;
        this.angle = -0;
        this.tileTypes = TileType.Simple;
        this.irregular = true;
        this.scale = scale;
        this.radius = scale / 2;
        this.orientation = orientation;
        this.x = x;
        this.y = y;
        this.tileCtor = tile;
        const results = [];
        for (let px = 0; px < x; px++) {
            for (let py = 0; py < y; py++) {
                results.push(new tile(px, py, y));
            }
        }
        this.tiles = results;
        this.toTile = (p) => new this.tileCtor(p.x, p.y);
        this.toPoint = (p) => new Position(p.x, p.y);
    }
    bounds() {
        const r = this.scale * (this.x * 2 + 1) / 2;
        return new Rectangle(-r, r, -r, r);
        // return bounds(this);
    }
    vertices(orientation, scale, tileType, tile) {
        const t = tile;
        const points = [];
        const c = this.center(t);
        points.push(this.center(new Float3(t.x - 0.5, t.y - 0.5, t.z)));
        points.push(this.center(new Float3(t.x - 0.5, t.y + 0.5, t.z)));
        points.push(this.center(new Float3(t.x + 0.5, t.y + 0.5, t.z)));
        points.push(this.center(new Float3(t.x + 0.5, t.y - 0.5, t.z)));
        return points.map((p) => new Float2(p.x - c.x, p.y - c.y));
    }
    path(tile) {
        const p = this.vertices(false, 0, 0, tile);
        const c = this.center(tile);
        const r1 = this.scale * (Math.max(0, tile.x - .5 + 1));
        const r2 = this.scale * (tile.x + .5 + 1);
        return `M ${p[0].x} ${p[0].y} A ${r1} ${r1} 0 0 1 ${p[1].x} ${p[1].y} `
            + `L ${p[2].x} ${p[2].y} A ${r2} ${r2} 0 0 0 ${p[3].x} ${p[3].y} Z`;
    }
    position(p) {
        return new this.tileCtor(Math.round(p.x / this.scale), Math.round(p.y / this.scale * this.scaleY));
    }
    tile(x, y) {
        return this.toTile(new Position(x, y));
    }
    center(tile) {
        let angle;
        if (this.orientation) {
            angle = tile.y + 0.5;
            angle = angle % tile.z;
            angle = (angle + tile.z) % tile.z;
            angle = (angle * DEG_TO_RAD) * (ANG / tile.z);
        }
        else {
            angle = (tile.y * DEG_TO_RAD) * (ANG / tile.z);
        }
        return new Float2((tile.x + 0.5) * this.scale * Math.cos(angle), (tile.x + 0.5) * this.scale * Math.sin(angle));
    }
}

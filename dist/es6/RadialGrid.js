import { bounds } from "./Bounds";
import { ANG, DEG_TO_RAD, SQRT_2 } from "./Constants";
import { Float2 } from "./Float2";
import { Position } from "./Position";
import { RadialTile } from "./RadialTile";
import { Shape } from "./Shape";
import { TileType } from "./TileType";
/**
 * ![](../../examples/output/Radial-grid.svg)
 */
export class RadialGrid {
    constructor(scale, orientation = false, shape = Shape.Even, x = 1, y = 1, tile = RadialTile) {
        this.scaleY = -1;
        this.angle = -45;
        this.tileTypes = TileType.Simple;
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
        return bounds(this);
    }
    vertices(orientation, scale, tileType, tile) {
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

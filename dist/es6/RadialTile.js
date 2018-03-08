import { Axes4 } from "./Axes";
import { Integer3 } from "./Integer3";
/**
 * ![](../../examples/output/radial-tile.svg)
 * x: radius position
 * y: angle position
 * z: radius width
 * w: angular length
 */
export class RadialTile extends Integer3 {
    constructor() {
        super(...arguments);
        this.tiles = [];
    }
    get key() {
        return this.toString();
    }
    shift() {
        return new RadialTile(-1, 1, 0);
    }
    directions() {
        return RadialTile.directions;
    }
    add(a) {
        const length = this.z || a.z;
        let angle = this.y + a.y;
        angle = angle % length;
        angle = (angle + length) % length;
        return new RadialTile(this.x + a.x, angle, length);
    }
    scale(a) {
        return new RadialTile(this.x * a, this.y, this.z);
    }
    cubeLength() {
        return Math.floor(Math.abs(this.x));
    }
    neighbors() {
        const results = [];
        for (const a of RadialTile.directions) {
            results.push([a[0], this.add(a[1])]);
        }
        return results;
    }
}
RadialTile.directions = [
    [Axes4.N, new RadialTile(0, -1, 0)],
    [Axes4.S, new RadialTile(0, 1, 0)],
    [Axes4.E, new RadialTile(1, 0, 0)],
    [Axes4.W, new RadialTile(-1, 0, 0)],
];

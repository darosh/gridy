import { Axes8 } from "./Axes";
import { Integer3 } from "./Integer3";
/**
 * ![](../../examples/output/radial-tile.svg)
 * x: angle position
 * y: radius position
 * z: angular length
 */
export class Radial8Tile extends Integer3 {
    constructor() {
        super(...arguments);
        this.tiles = [];
    }
    get value() {
        return [this.x, this.y];
    }
    get key() {
        return this.toString();
    }
    shift() {
        return new Radial8Tile(-1, 1, 0);
    }
    directions() {
        return Radial8Tile.directions;
    }
    add(a) {
        const length = this.z || a.z;
        let angle = this.x + a.x;
        angle = angle % length;
        angle = (angle + length) % length;
        return new Radial8Tile(angle, this.y + a.y, length);
    }
    scale(a) {
        return new Radial8Tile(this.x, this.y * a, this.z);
    }
    cubeLength() {
        return Math.floor(Math.abs(this.y));
    }
    neighbors() {
        const results = [];
        for (const a of Radial8Tile.directions) {
            results.push([a[0], this.add(a[1])]);
        }
        return results;
    }
}
Radial8Tile.directions = [
    [Axes8.N, new Radial8Tile(0, -1, 0)],
    [Axes8.E, new Radial8Tile(1, 0, 0)],
    [Axes8.NW, new Radial8Tile(-1, -1, 0)],
    [Axes8.SW, new Radial8Tile(1, -1, 0)],
    [Axes8.S, new Radial8Tile(0, 1, 0)],
    [Axes8.W, new Radial8Tile(-1, 0, 0)],
    [Axes8.SE, new Radial8Tile(1, 1, 0)],
    [Axes8.NE, new Radial8Tile(-1, 1, 0)],
];
//# sourceMappingURL=Radial8Tile.js.map
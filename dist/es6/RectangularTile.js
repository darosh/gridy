import { Axes4 } from "./Axes";
import { Integer2 } from "./Integer2";
/**
 * ![](../../examples/output/rectangular-tile.svg)
 */
export class RectangularTile extends Integer2 {
    get key() {
        return this.toString();
    }
    shift() {
        return new RectangularTile(-1, 1);
    }
    directions() {
        return RectangularTile.directions;
    }
    add(a) {
        const r = super.add(a);
        return new RectangularTile(r.x, r.y);
    }
    scale(a) {
        const r = super.scale(a);
        return new RectangularTile(r.x, r.y);
    }
    neighbors() {
        const results = [];
        for (const dir of RectangularTile.directions) {
            results.push([dir[0], this.add(dir[1])]);
        }
        return results;
    }
}
RectangularTile.directions = [
    [Axes4.N, new RectangularTile(0, -1)],
    [Axes4.E, new RectangularTile(1, 0)],
    [Axes4.S, new RectangularTile(0, 1)],
    [Axes4.W, new RectangularTile(-1, 0)],
];

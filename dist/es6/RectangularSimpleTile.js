import { Integer2 } from "./Integer2";
/**
 * ![](../../examples/output/rectangular-tile.svg)
 */
export class RectangularSimpleTile extends Integer2 {
    shift() {
        return new RectangularSimpleTile(-1, 1);
    }
    directions() {
        return RectangularSimpleTile.directions;
    }
    add(a) {
        const r = super.add(a);
        return new RectangularSimpleTile(r.x, r.y);
    }
    scale(a) {
        const r = super.scale(a);
        return new RectangularSimpleTile(r.x, r.y);
    }
    neighbors(directions = RectangularSimpleTile.directions) {
        const results = [];
        for (const dir of directions) {
            results.push([dir[0], this.add(dir[1])]);
        }
        return results;
    }
    map() {
        return new Map(this.neighbors());
    }
}
RectangularSimpleTile.directions = [
    [1, new RectangularSimpleTile(0, -1)],
    [2, new RectangularSimpleTile(1, 0)],
    [-1, new RectangularSimpleTile(0, 1)],
    [-2, new RectangularSimpleTile(-1, 0)],
];

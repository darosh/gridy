import { Integer2 } from "./Integer2";
/**
 * ![](../../examples/output/rectangular-tile.svg)
 */
export class RectangularTile extends Integer2 {
    shift() {
        return new RectangularTile(-1, 1);
    }
    directions() {
        return RectangularTile.directions;
    }
    sides() {
        return RectangularTile.sides;
    }
    add(a) {
        const r = super.add(a);
        return new RectangularTile(r.x, r.y);
    }
    scale(a) {
        const r = super.scale(a);
        return new RectangularTile(r.x, r.y);
    }
    neighbors(directions = RectangularTile.directions) {
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
RectangularTile.directions = [
    [1, new RectangularTile(0, -1)],
    [2, new RectangularTile(1, 0)],
    [3, new RectangularTile(-1, -1)],
    [4, new RectangularTile(1, -1)],
    [-1, new RectangularTile(0, 1)],
    [-2, new RectangularTile(-1, 0)],
    [-3, new RectangularTile(1, 1)],
    [-4, new RectangularTile(-1, 1)],
];
RectangularTile.sides = [
    RectangularTile.directions[0],
    RectangularTile.directions[1],
    RectangularTile.directions[4],
    RectangularTile.directions[5],
];

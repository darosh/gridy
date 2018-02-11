import { Integer2 } from "./Integer2";
/**
 * ![](../../examples/output/triangular-tile.svg)
 */
export class TriangularTile extends Integer2 {
    constructor(x = 0, y = 0, s = false) {
        super(x, y);
        this.s = s;
    }
    v() {
        return [this.x, this.y, this.s];
    }
    toString() {
        return this.v().join(",");
    }
    equals(p) {
        return (this.s === p.s) && super.equals(p);
    }
    shift() {
        return TriangularTile.directions1[0][1];
    }
    directions() {
        return TriangularTile.directions1;
    }
    oposite(n) {
        return TriangularTile.oposites[this.s.toString()][n];
    }
    add(a) {
        const r = super.add(a);
        return new TriangularTile(r.x, r.y, a.s);
    }
    scale(a) {
        const r = super.scale(a);
        return new TriangularTile(r.x, r.y);
    }
    neighbors() {
        const results = [];
        for (let dir = 0; dir < 3; dir++) {
            results.push([TriangularTile.directions1[dir][0],
                this.add(this.s ? TriangularTile.directions2[dir][1] : TriangularTile.directions1[dir][1])]);
        }
        return results;
    }
    map() {
        return new Map(this.neighbors());
    }
}
TriangularTile.directions1 = [
    [1, new TriangularTile(0, 0, true)],
    [2, new TriangularTile(-1, 0, true)],
    [3, new TriangularTile(0, -1, true)],
];
TriangularTile.directions2 = [
    [1, new TriangularTile(0, 1, false)],
    [2, new TriangularTile(0, 0, false)],
    [3, new TriangularTile(1, 0, false)],
];
TriangularTile.oposites = {
    false: {
        1: 3,
        2: 1,
        3: 2,
    },
    true: {
        1: 2,
        2: 3,
        3: 1,
    },
};

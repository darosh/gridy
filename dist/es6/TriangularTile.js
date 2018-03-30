import { Integer2 } from "./Integer2";
/**
 * ![](../../examples/output/triangular-tile.svg)
 */
export class TriangularTile extends Integer2 {
    constructor(x = 0, y = 0, s = false) {
        super(x, y);
        this.s = s;
    }
    get key() {
        return this.toString();
    }
    get value() {
        return [this.x, this.y, this.s];
    }
    toString() {
        return this.value.toString();
    }
    equals(p) {
        return (this.s === p.s) && super.equals(p);
    }
    shift() {
        return TriangularTile.directions1[0][1];
    }
    directions() {
        return this.s ? TriangularTile.directions2 : TriangularTile.directions1;
    }
    opposite(n) {
        return TriangularTile.opposites[this.s.toString()][n];
    }
    add(a) {
        const r = super.add(a);
        return new TriangularTile(r.x, r.y, a.s);
    }
    scale(a) {
        const r = super.scale(a);
        return new TriangularTile(r.x, r.y);
    }
    multiNeighbors() {
        const results = [];
        for (let dir = 1; dir < 4; dir++) {
            const d = TriangularTile.multiDirections[this.s.toString()][dir];
            const t = this.s ? TriangularTile.directions2[d][1] : TriangularTile.directions1[d][1];
            results.push([dir, this.add(t)]);
            results.push([TriangularTile.multiOpposites[this.s.toString()][dir], this.add(t)]);
        }
        return results;
    }
    neighbors() {
        const results = [];
        for (let dir = 0; dir < 3; dir++) {
            results.push([TriangularTile.directions1[dir][0],
                this.add(this.s ? TriangularTile.directions2[dir][1] : TriangularTile.directions1[dir][1])]);
        }
        return results;
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
TriangularTile.opposites = {
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
TriangularTile.multiOpposites = {
    false: {
        "-1": 2,
        "-2": 3,
        "-3": 1,
        "1": -3,
        "2": -1,
        "3": -2,
    },
    true: {
        "-1": 3,
        "-2": 1,
        "-3": 2,
        "1": -2,
        "2": -3,
        "3": -1,
    },
};
TriangularTile.multiDirections = {
    false: {
        1: 0,
        2: 2,
        3: 1,
    },
    true: {
        1: 0,
        2: 2,
        3: 1,
    },
};
//# sourceMappingURL=TriangularTile.js.map
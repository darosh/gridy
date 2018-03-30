import { Axes8 } from "./Axes";
import { Integer2 } from "./Integer2";
import { RectangularTile } from "./RectangularTile";
/**
 * ![](../../examples/output/rectangular-tile.svg)
 */
export class Rectangular8Tile extends Integer2 {
    get key() {
        return this.toString();
    }
    shift() {
        return new Rectangular8Tile(-1, 1);
    }
    directions() {
        return Rectangular8Tile.directions;
    }
    sides() {
        return Rectangular8Tile.sides;
    }
    add(a) {
        const r = super.add(a);
        return new Rectangular8Tile(r.x, r.y);
    }
    scale(a) {
        const r = super.scale(a);
        return new Rectangular8Tile(r.x, r.y);
    }
    neighbors() {
        const results = [];
        for (const dir of Rectangular8Tile.directions) {
            results.push([dir[0], this.add(dir[1])]);
        }
        return results;
    }
    sideNeighbors() {
        const results = [];
        for (const dir of RectangularTile.directions) {
            results.push([dir[0], this.add(dir[1])]);
        }
        return results;
    }
}
Rectangular8Tile.directions = [
    [Axes8.N, new Rectangular8Tile(0, -1)],
    [Axes8.E, new Rectangular8Tile(1, 0)],
    [Axes8.NW, new Rectangular8Tile(-1, -1)],
    [Axes8.SW, new Rectangular8Tile(1, -1)],
    [Axes8.S, new Rectangular8Tile(0, 1)],
    [Axes8.W, new Rectangular8Tile(-1, 0)],
    [Axes8.SE, new Rectangular8Tile(1, 1)],
    [Axes8.NE, new Rectangular8Tile(-1, 1)],
];
Rectangular8Tile.sides = [
    Rectangular8Tile.directions[0],
    Rectangular8Tile.directions[1],
    Rectangular8Tile.directions[4],
    Rectangular8Tile.directions[5],
];
//# sourceMappingURL=Rectangular8Tile.js.map
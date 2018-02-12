import { Axes6 } from "./Axes";
import { Integer3 } from "./Integer3";
// From http://www.redblobgames.com/grids/hexagons/
// Copyright 2013 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
// Original source: http://www.redblobgames.com/grids/hexagons/Cube.hx
/**
 * ![](../../examples/output/hexagonal-tile.svg)
 */
export class HexagonalTile extends Integer3 {
    constructor() {
        super(...arguments);
        this.tiles = [];
    }
    get key() {
        return this.toString();
    }
    shift() {
        return HexagonalTile.directions[4][1];
    }
    directions() {
        return HexagonalTile.directions;
    }
    add(a) {
        const r = super.add(a);
        return new HexagonalTile(r.x, r.y, r.z);
    }
    scale(a) {
        const r = super.scale(a);
        return new HexagonalTile(r.x, r.y, r.z);
    }
    neighbors() {
        const results = [];
        for (const a of HexagonalTile.directions) {
            results.push([a[0], this.add(a[1])]);
        }
        return results;
    }
    right() {
        const x = this.x;
        this.x = -this.z;
        this.z = -this.y;
        this.y = -x;
        return this;
    }
    left() {
        const z = this.z;
        this.z = -this.x;
        this.x = -this.y;
        this.y = -z;
        return this;
    }
}
HexagonalTile.directions = [
    [Axes6.NW, new HexagonalTile(1, -1, 0)],
    [Axes6.NE, new HexagonalTile(1, 0, -1)],
    [Axes6.N, new HexagonalTile(0, 1, -1)],
    [Axes6.SE, new HexagonalTile(-1, 1, 0)],
    [Axes6.SW, new HexagonalTile(-1, 0, 1)],
    [Axes6.S, new HexagonalTile(0, -1, 1)],
];

import { Directions } from "./Directions";
import { Integer } from "./Integer";
import { Integer3 } from "./Integer3";
import { ITile } from "./ITile";

// From http://www.redblobgames.com/grids/hexagons/
// Copyright 2013 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
// Original source: http://www.redblobgames.com/grids/hexagons/Cube.hx

/**
 * ![](../../examples/output/hexagonal-tile.svg)
 */
export class HexagonalTile extends Integer3 implements ITile<Integer3> {
  public static directions: Directions<HexagonalTile> = [
    [1, new HexagonalTile(1, -1, 0)],
    [2, new HexagonalTile(1, 0, -1)],
    [3, new HexagonalTile(0, 1, -1)],

    [-1, new HexagonalTile(-1, 1, 0)],
    [-2, new HexagonalTile(-1, 0, 1)],
    [-3, new HexagonalTile(0, -1, 1)],
  ];

  public shift(): HexagonalTile {
    return HexagonalTile.directions[4][1];
  }

  public directions(): Directions<HexagonalTile> {
    return HexagonalTile.directions;
  }

  public add(a: HexagonalTile): HexagonalTile {
    const r: Integer3 = super.add(a);
    return new HexagonalTile(r.x, r.y, r.z);
  }

  public scale(a: Integer): HexagonalTile {
    const r: Integer3 = super.scale(a);
    return new HexagonalTile(r.x, r.y, r.z);
  }

  // neighbors(): Array<HexagonalTile> {
  //   var results: Array<any> = [];

  //   for (var dir: Integer = 0; dir < 6; dir++) {
  //     results.push(this.add(HexagonalTile.directions[dir]));
  //   }

  //   return results;
  // }

  public neighbors(): Directions<HexagonalTile> {
    const results: Directions<HexagonalTile> = [];

    for (const a of HexagonalTile.directions) {
      results.push([a[0], this.add(a[1])]);
    }

    return results;
  }
}

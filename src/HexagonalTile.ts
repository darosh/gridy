import { Axes6 } from './Axes';
import { Directions } from './Directions';
import { Integer } from './Integer';
import { Integer3 } from './Integer3';
import { AnyTile, ITile } from './ITile';
import { toMap } from './Utils';

// From http://www.redblobgames.com/grids/hexagons/
// Copyright 2013 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
// Original source: http://www.redblobgames.com/grids/hexagons/Cube.hx

/**
 * ![](../../examples/output/hexagonal-tile.svg)
 */
export class HexagonalTile extends Integer3 implements ITile<Integer3> {
  public static directions: Directions<HexagonalTile> = [
    [Axes6.NW, new HexagonalTile(1, -1, 0)],
    [Axes6.NE, new HexagonalTile(1, 0, -1)],
    [Axes6.N, new HexagonalTile(0, 1, -1)],
    [Axes6.SE, new HexagonalTile(-1, 1, 0)],
    [Axes6.SW, new HexagonalTile(-1, 0, 1)],
    [Axes6.S, new HexagonalTile(0, -1, 1)]
  ];

  private tiles: AnyTile[] = [];

  public get key() {
    return this.toString();
  }

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

  public neighbors(): Directions<HexagonalTile> {
    const results: Directions<HexagonalTile> = [];

    for (const a of HexagonalTile.directions) {
      results.push([a[0], this.add(a[1])]);
    }

    return results;
  }

  public right() {
    const x = this.x;
    this.x = -this.z;
    this.z = -this.y;
    this.y = -x;

    return this;
  }

  public left() {
    const z = this.z;
    this.z = -this.x;
    this.x = -this.y;
    this.y = -z;

    return this;
  }
}

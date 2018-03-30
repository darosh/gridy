import { Axes8 } from './Axes';
import { ANG, ANG_2, ANG_4, DEG_TO_RAD } from './Constants';
import { Directions } from './Directions';
import { Integer } from './Integer';
import { Integer3 } from './Integer3';
import { AnyTile, ITile } from './ITile';
import { toMap } from './Utils';

/**
 * ![](../../examples/output/radial-tile.svg)
 * x: angle position
 * y: radius position
 * z: angular length
 */
export class Radial8Tile extends Integer3 implements ITile<Integer3> {
  public static directions: Directions<Radial8Tile> = [
    [Axes8.N, new Radial8Tile(0, -1, 0)],
    [Axes8.E, new Radial8Tile(1, 0, 0)],
    [Axes8.NW, new Radial8Tile(-1, -1, 0)],
    [Axes8.SW, new Radial8Tile(1, -1, 0)],
    [Axes8.S, new Radial8Tile(0, 1, 0)],
    [Axes8.W, new Radial8Tile(-1, 0, 0)],
    [Axes8.SE, new Radial8Tile(1, 1, 0)],
    [Axes8.NE, new Radial8Tile(-1, 1, 0)]
  ];

  private tiles: AnyTile[] = [];

  public get value(): Integer[] {
    return [this.x, this.y];
  }

  public get key() {
    return this.toString();
  }

  public shift(): Radial8Tile {
    return new Radial8Tile(-1, 1, 0);
  }

  public directions(): Directions<Radial8Tile> {
    return Radial8Tile.directions;
  }

  public add(a: Radial8Tile): Radial8Tile {
    const length = this.z || a.z;

    let angle = this.x + a.x;

    angle = angle % length;
    angle = (angle + length) % length;

    return new Radial8Tile(angle, this.y + a.y, length);
  }

  public scale(a: Integer): Radial8Tile {
    return new Radial8Tile(this.x, this.y * a, this.z);
  }

  public cubeLength(): Integer {
    return Math.floor(Math.abs(this.y));
  }

  public neighbors(): Directions<Radial8Tile> {
    const results: Directions<Radial8Tile> = [];

    for (const a of Radial8Tile.directions) {
      results.push([a[0], this.add(a[1])]);
    }

    return results;
  }
}

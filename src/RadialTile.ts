import { Axes4 } from "./Axes";
import { ANG, ANG_2, ANG_4, DEG_TO_RAD } from "./Constants";
import { Directions } from "./Directions";
import { Integer } from "./Integer";
import { Integer3 } from "./Integer3";
import { AnyTile, ITile } from "./ITile";
import { toMap } from "./Utils";

/**
 * ![](../../examples/output/radial-tile.svg)
 * x: radius position
 * y: angle position
 * z: radius width
 * w: angular length
 */
export class RadialTile extends Integer3 implements ITile<Integer3> {
  public static directions: Directions<RadialTile> = [
    [Axes4.N, new RadialTile(0, -1, 0)],
    [Axes4.S, new RadialTile(0, 1, 0)],
    [Axes4.E, new RadialTile(1, 0, 0)],
    [Axes4.W, new RadialTile(-1, 0, 0)],
  ];

  private tiles: AnyTile[] = [];

  public get value(): Integer[] {
    return [this.x, this.y];
  }

  public get key() {
    return this.toString();
  }

  public shift(): RadialTile {
    return new RadialTile(-1, 1, 0);
  }

  public directions(): Directions<RadialTile> {
    return RadialTile.directions;
  }

  public add(a: RadialTile): RadialTile {
    const length = this.z || a.z;

    let angle = this.y + a.y;

    angle = angle % length;
    angle = (angle + length) % length;

    return new RadialTile(this.x + a.x, angle, length);
  }

  public scale(a: Integer): RadialTile {
    return new RadialTile(this.x * a, this.y, this.z);
  }

  public cubeLength(): Integer {
    return Math.floor(Math.abs(this.x));
  }

  public neighbors(): Directions<RadialTile> {
    const results: Directions<RadialTile> = [];

    for (const a of RadialTile.directions) {
      results.push([a[0], this.add(a[1])]);
    }

    return results;
  }
}

import { Directions } from "./Directions";
import { Integer } from "./Integer";
import { Integer2 } from "./Integer2";
import { ITile } from "./ITile";

/**
 * ![](../../examples/output/rectangular-tile.svg)
 */
export class RectangularSimpleTile extends Integer2 implements ITile<Integer2> {
  public static directions: Directions<RectangularSimpleTile> = [
    [1, new RectangularSimpleTile(0, -1)],
    [2, new RectangularSimpleTile(1, 0)],
    [-1, new RectangularSimpleTile(0, 1)],
    [-2, new RectangularSimpleTile(-1, 0)],
  ];

  public shift(): RectangularSimpleTile {
    return new RectangularSimpleTile(-1, 1);
  }

  public directions(): Directions<RectangularSimpleTile> {
    return RectangularSimpleTile.directions;
  }

  public add(a: RectangularSimpleTile): RectangularSimpleTile {
    const r: Integer2 = super.add(a);
    return new RectangularSimpleTile(r.x, r.y);
  }

  public scale(a: Integer): RectangularSimpleTile {
    const r: Integer2 = super.scale(a);
    return new RectangularSimpleTile(r.x, r.y);
  }

  public neighbors(directions: Directions<RectangularSimpleTile> = RectangularSimpleTile.directions):
    Directions<RectangularSimpleTile> {
    const results: Directions<RectangularSimpleTile> = [];

    for (const dir of directions) {
      results.push([dir[0], this.add(dir[1])]);
    }

    return results;
  }

  public map(): Map<number, RectangularSimpleTile> {
    return new Map(this.neighbors());
  }
}

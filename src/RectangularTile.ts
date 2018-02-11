import { Directions } from "./Directions";
import { Integer } from "./Integer";
import { Integer2 } from "./Integer2";
import { ITile } from "./ITile";

/**
 * ![](../../examples/output/rectangular-tile.svg)
 */
export class RectangularTile extends Integer2 implements ITile<Integer2> {
  public static directions: Directions<RectangularTile> = [
    [1, new RectangularTile(0, -1)],
    [2, new RectangularTile(1, 0)],
    [3, new RectangularTile(-1, -1)],
    [4, new RectangularTile(1, -1)],
    [-1, new RectangularTile(0, 1)],
    [-2, new RectangularTile(-1, 0)],
    [-3, new RectangularTile(1, 1)],
    [-4, new RectangularTile(-1, 1)],
  ];

  public static sides: Directions<RectangularTile> = [
    RectangularTile.directions[0],
    RectangularTile.directions[1],
    RectangularTile.directions[4],
    RectangularTile.directions[5],
  ];

  public shift(): RectangularTile {
    return new RectangularTile(-1, 1);
  }

  public directions(): Directions<RectangularTile> {
    return RectangularTile.directions;
  }

  public sides(): Directions<RectangularTile> {
    return RectangularTile.sides;
  }

  public add(a: RectangularTile): RectangularTile {
    const r: Integer2 = super.add(a);
    return new RectangularTile(r.x, r.y);
  }

  public scale(a: Integer): RectangularTile {
    const r: Integer2 = super.scale(a);
    return new RectangularTile(r.x, r.y);
  }

  public neighbors(directions: Directions<RectangularTile> = RectangularTile.directions): Directions<RectangularTile> {
    const results: Directions<RectangularTile> = [];

    for (const dir of directions) {
      results.push([dir[0], this.add(dir[1])]);
    }

    return results;
  }

  public map(): Map<number, RectangularTile> {
    return new Map(this.neighbors());
  }
}

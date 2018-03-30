import { Axes4 } from './Axes';
import { Directions } from './Directions';
import { Integer } from './Integer';
import { Integer2 } from './Integer2';
import { ITile } from './ITile';

/**
 * ![](../../examples/output/rectangular-tile.svg)
 */
export class RectangularTile extends Integer2 implements ITile<Integer2> {
  public static directions: Directions<RectangularTile> = [
    [Axes4.N, new RectangularTile(0, -1)],
    [Axes4.E, new RectangularTile(1, 0)],
    [Axes4.S, new RectangularTile(0, 1)],
    [Axes4.W, new RectangularTile(-1, 0)]
  ];

  public get key() {
    return this.toString();
  }

  public shift(): RectangularTile {
    return new RectangularTile(-1, 1);
  }

  public directions(): Directions<RectangularTile> {
    return RectangularTile.directions;
  }

  public add(a: RectangularTile): RectangularTile {
    const r: Integer2 = super.add(a);

    return new RectangularTile(r.x, r.y);
  }

  public scale(a: Integer): RectangularTile {
    const r: Integer2 = super.scale(a);

    return new RectangularTile(r.x, r.y);
  }

  public neighbors():
    Directions<RectangularTile> {

    const results: Directions<RectangularTile> = [];

    for (const dir of RectangularTile.directions) {
      results.push([dir[0], this.add(dir[1])]);
    }

    return results;
  }
}

import { Axes8 } from './Axes';
import { Directions } from './Directions';
import { Integer } from './Integer';
import { Integer2 } from './Integer2';
import { ITile } from './ITile';
import { RectangularTile } from './RectangularTile';

/**
 * ![](../../examples/output/rectangular-tile.svg)
 */
export class Rectangular8Tile extends Integer2 implements ITile<Integer2> {
  public static directions: Directions<Rectangular8Tile> = [
    [Axes8.N, new Rectangular8Tile(0, -1)],
    [Axes8.E, new Rectangular8Tile(1, 0)],
    [Axes8.NW, new Rectangular8Tile(-1, -1)],
    [Axes8.SW, new Rectangular8Tile(1, -1)],
    [Axes8.S, new Rectangular8Tile(0, 1)],
    [Axes8.W, new Rectangular8Tile(-1, 0)],
    [Axes8.SE, new Rectangular8Tile(1, 1)],
    [Axes8.NE, new Rectangular8Tile(-1, 1)]
  ];

  public static sides: Directions<Rectangular8Tile> = [
    Rectangular8Tile.directions[0],
    Rectangular8Tile.directions[1],
    Rectangular8Tile.directions[4],
    Rectangular8Tile.directions[5]
  ];

  public get key() {
    return this.toString();
  }

  public shift(): RectangularTile {
    return new Rectangular8Tile(-1, 1);
  }

  public directions(): Directions<RectangularTile> {
    return Rectangular8Tile.directions;
  }

  public sides(): Directions<RectangularTile> {
    return Rectangular8Tile.sides;
  }

  public add(a: RectangularTile): RectangularTile {
    const r: Integer2 = super.add(a);

    return new Rectangular8Tile(r.x, r.y);
  }

  public scale(a: Integer): RectangularTile {
    const r: Integer2 = super.scale(a);

    return new Rectangular8Tile(r.x, r.y);
  }

  public neighbors(): Directions<RectangularTile> {
    const results: Directions<RectangularTile> = [];

    for (const dir of Rectangular8Tile.directions) {
      results.push([dir[0], this.add(dir[1])]);
    }

    return results;
  }

  public sideNeighbors(): Directions<Rectangular8Tile> {
    const results: Directions<Rectangular8Tile> = [];

    for (const dir of RectangularTile.directions) {
      results.push([dir[0], <Rectangular8Tile>this.add(dir[1])]);
    }

    return results;
  }
}

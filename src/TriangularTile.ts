import { Directions } from "./Directions";
import { Integer } from "./Integer";
import { Integer2 } from "./Integer2";
import { ITile } from "./ITile";

/**
 * ![](../../examples/output/triangular-tile.svg)
 */
export class TriangularTile extends Integer2 implements ITile<Integer2> {
  public static directions1: Directions<TriangularTile> = [
    [1, new TriangularTile(0, 0, true)],
    [2, new TriangularTile(-1, 0, true)],
    [3, new TriangularTile(0, -1, true)],
  ];

  public static directions2: Directions<TriangularTile> = [
    [1, new TriangularTile(0, 0, false)],
    [2, new TriangularTile(1, 0, false)],
    [3, new TriangularTile(0, 1, false)],
  ];

  public s: boolean;

  constructor(x: Integer = 0, y: Integer = 0, s: boolean = false) {
    super(x, y);
    this.s = s;
  }

  public v(): any[] {
    return [this.x, this.y, this.s];
  }

  public toString(): string {
    return this.v().join(",");
  }

  public shift(): TriangularTile {
    return TriangularTile.directions1[0][1];
  }

  public directions(): Directions<TriangularTile> {
    return TriangularTile.directions1;
  }

  public add(a: TriangularTile): TriangularTile {
    const r: Integer2 = super.add(a);
    return new TriangularTile(r.x, r.y, a.s);
  }

  public scale(a: Integer): TriangularTile {
    const r: Integer2 = super.scale(a);
    return new TriangularTile(r.x, r.y);
  }

  public neighbors(): Directions<TriangularTile> {
    const results: Directions<any> = [];

    for (let dir: Integer = 0; dir < 3; dir++) {
      results.push([TriangularTile.directions1[dir][0],
        this.add(this.s ? TriangularTile.directions2[dir][1] : TriangularTile.directions1[dir][1])]);
    }

    return results;
  }

  public map(): Map<number, TriangularTile> {
    return new Map(this.neighbors());
  }
}

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
    [1, new TriangularTile(0, 1, false)],
    [2, new TriangularTile(0, 0, false)],
    [3, new TriangularTile(1, 0, false)],
  ];

  public static oposites: any = {
    false: {
      1: 3,
      2: 1,
      3: 2,
    },
    true: {
      1: 2,
      2: 3,
      3: 1,
    },
  };

  public s: boolean;

  public get key() {
    return this.toString();
  }

  constructor(x: Integer = 0, y: Integer = 0, s: boolean = false) {
    super(x, y);
    this.s = s;
  }

  public get value(): any[] {
    return [this.x, this.y, this.s];
  }

  public toString(): string {
    return this.value.toString();
  }

  public equals(p: TriangularTile): boolean {
    return (this.s === p.s) && super.equals(p);
  }

  public shift(): TriangularTile {
    return TriangularTile.directions1[0][1];
  }

  public directions(): Directions<TriangularTile> {
    return this.s ? TriangularTile.directions2 : TriangularTile.directions1;
  }

  public oposite(n: number): number {
    return TriangularTile.oposites[this.s.toString()][n];
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
}

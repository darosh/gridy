import { Integer } from './Integer';
import { IVector } from './IVector';

export class Integer2 implements IVector<Integer> {
  public x: Integer;
  public y: Integer;

  constructor(x: Integer = 0, y: Integer = 0) {
    this.x = x;
    this.y = y;
  }

  public get value(): Integer[] {
    return [this.x, this.y];
  }

  public distance(b: Integer2): Integer {
    return Math.floor((Math.abs(this.x - b.x) + Math.abs(this.y - b.y)) / 2);
  }

  public toString(): string {
    return this.value.toString();
  }

  public equals(p: Integer2): boolean {
    return (this.x === p.x) && (this.y === p.y);
  }

  public add(p: Integer2): Integer2 {
    return new Integer2(this.x + p.x, this.y + p.y);
  }

  public scale(d: Integer): Integer2 {
    return new Integer2(this.x * d, this.y * d);
  }

  public cubeLength(): Integer {
    return Math.floor((Math.abs(this.x) + Math.abs(this.y)) / 2);
  }
}

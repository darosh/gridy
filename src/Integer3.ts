import { Integer } from './Integer';
import { IVector } from './IVector';

export class Integer3 implements IVector<Integer> {
  public x: Integer;
  public y: Integer;
  public z: Integer;

  constructor(x: Integer = 0, y: Integer = 0, z: Integer = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public distance(b: Integer3): Integer {
    return Math.floor((Math.abs(this.x - b.x) + Math.abs(this.y - b.y) + Math.abs(this.z - b.z)) / 2);
  }

  public add(b: Integer3): Integer3 {
    return new Integer3(this.x + b.x, this.y + b.y, this.z + b.z);
  }

  public scale(k: Integer): Integer3 {
    return new Integer3(this.x * k, this.y * k, this.z * k);
  }

  public toString(): string {
    return this.value.toString();
  }

  public get value(): Integer[] {
    return [this.x, this.y, this.z];
  }

  public equals(other: Integer3): boolean {
    return (this.x === other.x) && (this.y === other.y) && (this.z === other.z);
  }

  public round(): Integer3 {
    return new Integer3(Math.round(this.x), Math.round(this.y), Math.round(this.z));
  }

  public cubeLength(): Integer {
    return Math.floor((Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)) / 2);
  }
}

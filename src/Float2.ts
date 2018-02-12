import { Float } from "./Float";
import { Integer } from "./Integer";
import { Integer2 } from "./Integer2";
import { IVector } from "./IVector";

export class Float2 implements IVector<Float> {
  public static round(h: Float2): Integer2 {
    const rx: Integer = Math.round(h.x);
    const ry: Integer = Math.round(h.y);

    return new Integer2(rx, ry);
  }

  public static lerp(a: Integer2, b: Integer2, t: Float): Float2 {
    return new Float2(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
  }

  public static line(a: Integer2, b: Integer2): Integer2[] {
    const N: Integer = a.distance(b);
    const results: Integer2[] = [];

    for (let i: Integer = 0; i < (N + 1); i++) {
      results.push(Float2.round(Float2.lerp(a, b, 1.0 / Math.max(1, N) * i)));
    }

    return results;
  }

  public x: Float;
  public y: Float;

  constructor(x: Float = 0, y: Float = 0) {
    this.x = x;
    this.y = y;
  }

  public equals(p: Float2): boolean {
    return (this.x === p.x) && (this.y === p.y);
  }

  public get value(): Float[] {
    return [this.x, this.y];
  }

  public scale(k: Float): Float2 {
    return new Float2(this.x * k, this.y * k);
  }

  public toString(): string {
    return this.value.toString();
  }
}

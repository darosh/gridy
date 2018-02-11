import { Directions } from "./Directions";
import { Integer } from "./Integer";
import { ITile } from "./ITile";
import { instance } from "./Utils";

export function spiral(start: ITile<any>, N: Integer, isSpiral: boolean): ITile<any>[] {
  const results: ITile<any>[] = [];

  if (isSpiral) {
    results.push(start.add(instance(start)));
  }

  const neighbors: Directions<any> = start.neighbors();
  const c: Integer = (neighbors.length === 6) ? 1 : 2;

  for (let k: Integer = isSpiral ? 1 : N; k <= N; k++) {
    let H: ITile<any> = start.shift().scale(k);

    for (let i: Integer = 0; i < neighbors.length; i++) {
      for (let j: Integer = 0; j < k * c; j++) {
        results.push(H.add(start));
        H = H.neighbors()[i][1];
      }
    }
  }

  return results;
}

export function intersect(a: ITile<any>[], b: ITile<any>[]): ITile<any>[] {
  const results: ITile<any>[] = [];

  for (const i of a) {
    for (const j of b) {
      if (i.equals(j)) {
        results.push(i);
      }
    }
  }

  return results;
}

export function axes(a: ITile<any>[], axe: Integer, odd: boolean = false): ITile<any>[] {
  const results: ITile<any>[] = [];

  for (const i of a) {
    const v: any[] = i.v();
    const l: boolean = (Math.abs(v[axe % v.length]) % 2) === 1;

    if (l === odd) {
      results.push(i);
    }
  }

  return results;
}

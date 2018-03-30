import { Directions } from './Directions';
import { Integer } from './Integer';
import { AnyTile, ITile } from './ITile';
import { instance, mapped, toMap } from './Utils';

export function circle(start: AnyTile, N: Integer): AnyTile[] {
  return spiral(start, N, false);
}

export function spiral(start: AnyTile, N: Integer, isSpiral: boolean = true): AnyTile[] {
  const results: AnyTile[] = [];

  if (isSpiral) {
    results.push(start.add(instance(start)));
  }

  const neighbors: Directions<any> = start.sideNeighbors ? start.sideNeighbors() : start.neighbors();
  const c: Integer = (neighbors.length === 6) ? 1 : 2;

  for (let k: Integer = isSpiral ? 1 : N; k <= N; k++) {
    let H: AnyTile = start.shift().scale(k);

    for (let i: Integer = 0; i < neighbors.length; i++) {
      for (let j: Integer = 0; j < k * c; j++) {
        results.push(H.add(start));
        H = (H.sideNeighbors ? H.sideNeighbors() : H.neighbors())[i][1];
      }
    }
  }

  return results;
}

export function intersect(a: AnyTile[], b: AnyTile[]): AnyTile[] {
  const results: AnyTile[] = [];

  for (const i of a) {
    for (const j of b) {
      if (i.equals(j)) {
        results.push(i);
      }
    }
  }

  return results;
}

export function axes(a: AnyTile[], axe: Integer, odd: boolean = false): AnyTile[] {
  const results: AnyTile[] = [];

  for (const i of a) {
    const v: any[] = i.value;
    const l: boolean = (Math.abs(v[axe % v.length]) % 2) === 1;

    if (l === odd) {
      results.push(i);
    }
  }

  return results;
}

export function border(tiles: AnyTile[]): AnyTile[] {
  const tileMap = toMap(tiles);

  return tiles.filter((t) => mapped(tileMap, t.neighbors()).length < t.directions().length);
}

export function outline(tiles: AnyTile[], available?: AnyTile[]): AnyTile[] {
  const map = new Map<string, AnyTile>();
  const tileMap = toMap(tiles);
  const availableMap = available ? toMap(available) : undefined;

  tiles.forEach((t) => {
    const n = new Map(mapped(tileMap, t.neighbors()));
    const d = new Map(t.directions());

    if (n.size < d.size) {
      for (const [k, v] of d) {
        if (!n.has(k)) {
          const w = t.add(v);

          if (availableMap) {
            map.set(w.key, (<any>availableMap).get(w.key));
          } else {
            map.set(w.key, w);
          }

        }
      }
    }
  });

  return Array.from(map.values());
}

export function connections(tiles: AnyTile[]): AnyTile[][] {
  const c: AnyTile[][] = [];
  const available = toMap(tiles);

  for (const t of tiles) {
    const m = new Map(mapped(available, t.neighbors()));
    const s = Array.from(m.keys()).filter((k) => (k > 0) && !m.has(t.opposite ? t.opposite(k) : -k));

    for (const k of s) {
      const l = [];
      let i: AnyTile | undefined = t;

      while (i) {
        l.push(i);
        i = new Map(mapped(available, i.neighbors())).get(k);
      }

      c.push(l);
    }
  }

  return c;
}

import { Directions } from "./Directions";
import { Integer } from "./Integer";
import { AnyTile, ITile, TileMap } from "./ITile";
import { Position } from "./Position";

export function instance<T>(obj: T): T {
  return new (obj.constructor as any)();
}

export function enumerate(obj: any): any {
  const result: any = {};

  const keys: string[] = Object.keys(obj);

  for (const i of keys) {
    const value: number = parseInt(i, 10);

    if (value >= 0) {
      result[obj[i]] = value;
    }
  }

  return result;
}

export function maped(available: TileMap, selection: Directions<AnyTile>) {
  return selection.filter((t) => available.has(t[1].key))
    .map((t) => [t[0], available.get(t[1].key)]) as Directions<AnyTile>;
}

export function toMap(tiles: AnyTile[]): Map<string, AnyTile> {
  return new Map(tiles.map<[any, AnyTile]>((t) => ([t.key, t])));
}

export function toArray(m: Map<any, AnyTile>): AnyTile[] {
  return Array.from(m.values());
}

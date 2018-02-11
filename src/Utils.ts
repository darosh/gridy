import { ITile } from "./ITile";

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

export function look(items: any[], values: boolean = false): { [key: string]: any } {
  const result: { [key: string]: any } = {};

  items.forEach((v: any): void => {
    result[v.toString()] = values ? v : true;
  });

  return result;
}

export function neighbors(tiles: ITile<any>[]): void {
  function _neighbors(this: any) {
    return this._neighbors_data;
  }

  const values = look(tiles, true);

  tiles.forEach((t) => {
    (t as any)._neighbors_data = t.neighbors().map((n) => values[n[1]]).filter((n) => n !== undefined);
    (t as any)._neighbors = _neighbors;
    t.neighbors = _neighbors;
  });
}

export function map(tiles: ITile<any>[]): void {
  function _map(this: any) {
    return this._map_data || (this._map_data = this._map());
  }

  tiles.forEach((t) => {
    (t as any)._map = t.map;
    t.map = _map;
  });
}

export function connections(tiles: ITile<any>[]): ITile<any>[][] {
  const c: ITile<any>[][] = [];

  for (const t of tiles) {
    const m = t.map();
    const s = Array.from(m.keys()).filter((k) => (k > 0) && !m.has(-k));

    for (const k of s) {
      const l = [];
      let i = t;

      while (i) {
        l.push(i);
        i = i.map().get(k);
      }

      c.push(l);
    }
  }

  return c;
}

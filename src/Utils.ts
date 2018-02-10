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

export function neighbors(tiles: Array<ITile<any>>): void {
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

export function connections(tiles: Array<ITile<any>>): Array<Array<ITile<any>>> {
  const c: Array<Array<ITile<any>>> = [];

  return c;
}

import { ANG_4, DEG_TO_RAD } from './Constants';
import { Directions } from './Directions';
import { Integer } from './Integer';
import { AnyTile, ITile, TileMap } from './ITile';
import { Position } from './Position';

export function instance<T>(obj: T): T {
  return new (<any>obj.constructor)();
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

export function mapped(available: TileMap, selection: Directions<AnyTile>) {
  return <Directions<AnyTile>>selection.filter((t) => available.has(t[1].key))
    .map((t) => [t[0], available.get(t[1].key)]);
}

export function toMap(tiles: AnyTile[]): Map<string, AnyTile> {
  return new Map(tiles.map<[any, AnyTile]>((t) => ([t.key, t])));
}

export function toArray(m: Map<any, AnyTile>): AnyTile[] {
  return Array.from(m.values());
}

export function link(tilesMap: Map<any, AnyTile>): void {
  for (const tile of tilesMap.values()) {
    (<any>tile).links = new Map<number, AnyTile>();
    for (const n of tile.multiNeighbors ? tile.multiNeighbors() : tile.neighbors()) {
      if (tilesMap.has(n[1].key)) {
        (<any>tile).links.set(n[0], tilesMap.get(n[1].key));
      }
    }
  }
}

export function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees - ANG_4) * DEG_TO_RAD;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

export function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {

  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(' ');
}

import { Directions } from "./Directions";
import { Integer } from "./Integer";
import { AnyTile, ITile } from "./ITile";
import { toMap } from "./Utils";

// From http://www.redblobgames.com/grids/hexagons/
// Copyright 2013 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
// Original source: http://www.redblobgames.com/grids/hexagons/ui.js

export class Search {
  public cost: { [key: string]: Integer } = {};
  public previous: { [key: string]: AnyTile | null } = {};
  public start: AnyTile;
  public max: Integer = 0;

  constructor(start: AnyTile | AnyTile[], maxMovement: number, maxMagnitude: number,
              blocked?: AnyTile[], available?: AnyTile[]) {

    const starts: AnyTile[] = (start as AnyTile).value ? [start as AnyTile] : (start as AnyTile[]);

    this.start = starts[0];

    const blockedMap = blocked ? toMap(blocked) : undefined;
    const availableMap = available ? toMap(available) : undefined;

    for (const s of starts) {
      this.cost[s.key] = 0;
      this.previous[s.key] = null;
    }

    const fringes: AnyTile[][] = [starts];

    for (let k: Integer = 0; k < maxMovement && fringes[k].length > 0; k++) {
      fringes[k + 1] = [];

      for (const tile of fringes[k]) {
        const neighbors: Directions<AnyTile> = tile.neighbors();

        for (const dir of neighbors) {
          const neighbor: AnyTile = dir[1];

          if (availableMap && !availableMap.has(neighbor.key)) {
            continue;
          }

          if ((this.cost[neighbor.toString()] === undefined)
            && ((blockedMap && !blockedMap.has(neighbor.key)) || (!blocked))
            && neighbor.cubeLength() <= maxMagnitude) {
            this.cost[neighbor.key] = k + 1;
            this.max = Math.max(this.max, k + 1);
            this.previous[neighbor.key] = tile;
            fringes[k + 1].push(neighbor);
          }
        }
      }
    }
  }

  public path(end: AnyTile | AnyTile[], max: boolean = false): AnyTile[] {
    const ends: AnyTile[] = (end as AnyTile).value ? [end as AnyTile] : (end as AnyTile[]);
    const min = (max ? Math.max : Math.min)
      .apply(null, ends.map((e) => this.cost[e.toString()]).filter((e) => e !== undefined));
    const path: AnyTile[] = [];
    let node: AnyTile | null = ends.find((e: AnyTile) => this.cost[e.toString()] === min) || null;

    while (node) {
      path.push(node);
      node = node.equals(this.start) ? null : this.previous[node.toString()];
    }

    return path;
  }
}

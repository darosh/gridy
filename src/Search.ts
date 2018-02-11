import { Directions } from "./Directions";
import { Integer } from "./Integer";
import { ITile } from "./ITile";

// From http://www.redblobgames.com/grids/hexagons/
// Copyright 2013 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
// Original source: http://www.redblobgames.com/grids/hexagons/ui.js

export class Search {
  public cost: { [key: string]: Integer } = {};
  public previous: { [key: string]: ITile<any> | null } = {};
  public start: ITile<any>;
  public max: Integer = 0;

  constructor(start: ITile<any> | ITile<any>[], maxMovement: number, maxMagnitude: number,
              blocked: { [key: string]: boolean }, available?: { [key: string]: boolean }) {

    const starts: ITile<any>[] = (start as ITile<any>).v ? [start as ITile<any>] : (start as ITile<any>[]);

    this.start = starts[0];

    starts.forEach((s) => {
      this.cost[s.toString()] = 0;
      this.previous[s.toString()] = null;
    });

    const fringes: ITile<any>[][] = [starts];

    for (let k: Integer = 0; k < maxMovement && fringes[k].length > 0; k++) {
      fringes[k + 1] = [];
      fringes[k].forEach((tile: ITile<any>) => {
        const neighbors: Directions<ITile<any>> = tile.neighbors();

        for (const dir of neighbors) {
          const neighbor: ITile<any> = dir[1];

          if (available && !available[neighbor.toString()]) {
            continue;
          }

          if ((this.cost[neighbor.toString()] === undefined)
            && ((blocked && !blocked[neighbor.toString()]) || (!blocked))
            && neighbor.cubeLength() <= maxMagnitude) {
            this.cost[neighbor.toString()] = k + 1;
            this.max = Math.max(this.max, k + 1);
            this.previous[neighbor.toString()] = tile;
            fringes[k + 1].push(neighbor);
          }
        }
      });
    }
  }

  public path(end: ITile<any> | ITile<any>[], max: boolean = false): ITile<any>[] {
    const ends: ITile<any>[] = (end as ITile<any>).v ? [end as ITile<any>] : (end as ITile<any>[]);
    const min = (max ? Math.max : Math.min)
      .apply(null, ends.map((e) => this.cost[e.toString()]).filter((e) => e !== undefined));
    const path: ITile<any>[] = [];
    let node: ITile<any> | null = ends.find((e: ITile<any>) => this.cost[e.toString()] === min) || null;

    while (node) {
      path.push(node);
      node = node.equals(this.start) ? null : this.previous[node.toString()];
    }

    return path;
  }
}

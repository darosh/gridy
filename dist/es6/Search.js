// From http://www.redblobgames.com/grids/hexagons/
// Copyright 2013 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
// Original source: http://www.redblobgames.com/grids/hexagons/ui.js
export class Search {
    constructor(start, maxMovement, maxMagnitude, blocked, available) {
        this.cost = {};
        this.previous = {};
        this.max = 0;
        const starts = start.v ? [start] : start;
        this.start = starts[0];
        starts.forEach((s) => {
            this.cost[s.toString()] = 0;
            this.previous[s.toString()] = null;
        });
        const fringes = [starts];
        for (let k = 0; k < maxMovement && fringes[k].length > 0; k++) {
            fringes[k + 1] = [];
            fringes[k].forEach((tile) => {
                const neighbors = tile.neighbors();
                for (const dir of neighbors) {
                    const neighbor = dir[1];
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
    path(end, max = false) {
        const ends = end.v ? [end] : end;
        const min = (max ? Math.max : Math.min)
            .apply(null, ends.map((e) => this.cost[e.toString()]).filter((e) => e !== undefined));
        const path = [];
        let node = ends.find((e) => this.cost[e.toString()] === min) || null;
        while (node) {
            path.push(node);
            node = node.equals(this.start) ? null : this.previous[node.toString()];
        }
        return path;
    }
}

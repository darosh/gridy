// From http://www.redblobgames.com/grids/hexagons/
// Copyright 2013 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
// Original source: http://www.redblobgames.com/grids/hexagons/ui.js

/// <reference path="ITile.ts" />

module Gridy {
    'use strict';

    export class Search {
        cost:{[key:string]:Integer} = {};
        previous:{[key:string]:ITile<any>} = {};
        start:ITile<any>;
        max:Integer = 0;

        constructor(start:ITile<any>, maxMovement:number, maxMagnitude:number,
                    blocked:{[key:string]:boolean}, available:{[key:string]:boolean} = null) {
            this.start = start;
            this.cost[start.toString()] = 0;
            this.previous[start.toString()] = null;

            var fringes:Array<Array<ITile<any>>> = [[start]];

            for (var k:Integer = 0; k < maxMovement && fringes[k].length > 0; k++) {
                fringes[k + 1] = [];
                fringes[k].forEach((tile:ITile<any>) => {
                    var neighbors:Array<ITile<any>> = tile.neighbors();

                    for (var dir:Integer = 0; dir < neighbors.length; dir++) {
                        var neighbor:ITile<any> = neighbors[dir];

                        if (available && !available[neighbor.toString()]) {
                            continue;
                        }

                        if ((this.cost[neighbor.toString()] === undefined)
                            && !blocked[neighbor.toString()]
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

        path(end:ITile<any>):Array<ITile<any>> {
            var path:Array<ITile<any>> = [];
            var node:ITile<any> = end;

            while (node) {
                path.push(node);
                node = node.equals(this.start) ? null : this.previous[node.toString()];
            }

            return path;
        }
    }
}

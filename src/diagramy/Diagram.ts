// From http://www.redblobgames.com/grids/hexagons/
// Copyright 2013 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
// Original source: http://www.redblobgames.com/grids/hexagons/ui.js

/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/d3/d3.d.ts" />

/// <reference path="../gridy/ITile.ts" />
/// <reference path="../gridy/Float2.ts" />
/// <reference path="../gridy/IGrid.ts" />
/// <reference path="../gridy/Search.ts" />

module Diagramy {
    'use strict';

    interface IBrowserGlobal extends NodeJS.Global {
        d3:D3.Base;
    }

    /* tslint:disable:no-var-requires */
    var d3:D3.Base = (<IBrowserGlobal>global).d3 || require('d3');
    /* tslint:enable:no-var-requires */

    interface INode {
        tileKey:string;
        key:string;
        tile:Gridy.ITile<any>;
    }

    export class Diagram {
        grid:Gridy.IGrid<any>;

        private nodes:Array<string>;
        private translate:Gridy.Float2;

        private root:D3._Selection<any>;
        private svg:D3._Selection<any>;
        private tiles:D3._UpdateSelection<any>;
        private paths:D3._Selection<any>;
        private pointElement:D3._Selection<any>;

        private fontSize:number = 14;
        private animation:boolean;

        private duration:number = 0;
        private data:{[key:string]:INode} = {};

        private _polygons:boolean = true;
        private _centers:boolean = false;
        private _circles:boolean = false;
        private _coordinates:boolean = false;
        private _tileCoordinates:boolean = false;

        constructor(svg:D3._Selection<any>, grid:Gridy.IGrid<any>, animation:boolean = true) {
            this.svg = svg;
            this.grid = grid;
            this.animation = animation;
            this.root = svg.append('g');
            this.paths = svg.append('g');

            this.init();
        }

        init():Diagram {
            if (this.nodes) {
                this.duration = 800;
            }

            this.initRoot();
            var tilesEnter:D3._Selection<any> = this.initTiles();

            if (this._polygons) {
                this.polygons(tilesEnter);
            }

            if (this._centers) {
                this.centers(tilesEnter);
            }

            if (this._circles) {
                this.circles(tilesEnter);
            }

            if (this._coordinates) {
                this.coordinates(tilesEnter);
            }

            if (this._tileCoordinates) {
                this.tileCoordinates(tilesEnter);
            }

            return this;
        }

        polygons(show:boolean|any = true):Diagram {
            var tiles:D3._Selection<any>;

            if (show === false) {
                this.tiles.selectAll('g.polygon').selectAll('polygon').remove();
                this._polygons = false;
                return this;
            } else if (show === true && !this._polygons) {
                tiles = this.tiles.selectAll('g.polygon');
                tiles.append('polygon');
                this._polygons = true;
            } else if (show !== true) {
                tiles = show.selectAll('g.polygon');
                tiles.append('polygon');
            }

            var polygons:D3._Selection<any> = this.tiles.selectAll('g.polygon').selectAll('polygon');

            var paths:Array<string> = [];

            for (var i:number = 0; i < this.grid.tileTypes; i++) {
                paths.push(this.shapePath(i));
            }

            if (this.grid.tileTypes === 1) {
                polygons.attr('points', paths[0]);
            } else {
                polygons.attr(
                    'points',
                    (node:string):string => {
                        return paths[this.grid.getTileType(this.data[node].tile)];
                    }
                );
            }

            this.transition(polygons)
                .attr('transform', 'rotate(' + (this.grid.orientation * this.grid.angle) + ')');

            return this;
        }

        /**
         * Show/hide tile center points
         * @param show
         * @returns {Diagramy.Diagram}
         */
        centers(show:boolean|any = true):Diagram {
            var tiles:D3._Selection<any>;

            if (show === false) {
                this.tiles.selectAll('g.center').selectAll('circle').remove();
                this._centers = false;
                return this;
            } else if (show === true && !this._centers) {
                tiles = this.tiles.selectAll('g.center');
                tiles.append('circle').attr('class', 'center').attr('r', 5);
                this._centers = true;
            } else if (show !== true) {
                tiles = show.selectAll('g.center');
                tiles.append('circle').attr('class', 'center').attr('r', 5);
            }

            return this;
        }

        circles(show:boolean|any = true):Diagram {
            var tiles:D3._Selection<any>;

            if (show === false) {
                this.tiles.selectAll('g.circle').selectAll('circle').remove();
                this._circles = false;
                return this;
            } else if (show === true && !this._circles) {
                tiles = this.tiles.selectAll('g.circle');
                tiles.append('circle').attr('class', 'circle');
                this._circles = true;
            } else if (show !== true) {
                tiles = show.selectAll('g.circle');
                tiles.append('circle').attr('class', 'circle');
            }

            this.transition(this.tiles.selectAll('g.circle').selectAll('circle')).attr('r', this.grid.radius);

            return this;
        }

        coordinates(show:boolean|any = true):Diagram {
            var tiles:D3._Selection<any>;

            if (show === false) {
                this.tiles.selectAll('g.coordinates').selectAll('text').remove();
                this._coordinates = false;
                return this;
            } else if (show === true && !this._coordinates) {
                tiles = this.tiles.selectAll('g.coordinates');
                this._coordinates = true;
            } else if (show !== true) {
                tiles = show.selectAll('g.coordinates');
            }

            if (tiles) {
                var _this:Diagram = this;
                tiles.append('text')
                    .attr('y', '0.4em')
                    .each(function (node:string):void {
                        var p:Gridy.Position = _this.grid.toPoint(_this.data[node].tile);
                        var selection:D3._Selection<any> = d3.select(<any>this);
                        selection.append('tspan').attr('class', 'x').text(p.x);
                        selection.append('tspan').text(', ');
                        selection.append('tspan').attr('class', 'y').text(p.y);
                    });
            }

            return this;
        }

        tileCoordinates(show:boolean|any = true):Diagram {
            var tiles:D3._Selection<any>;

            if (show === false) {
                this.tiles.selectAll('g.tile-coordinates').selectAll('text').remove();
                this._tileCoordinates = false;
                return this;
            } else if (show === true && !this._tileCoordinates) {
                tiles = this.tiles.selectAll('g.tile-coordinates');
                this._tileCoordinates = true;
            } else if (show !== true) {
                this.tiles.selectAll('g.tile-coordinates').selectAll('text').remove();
                // tiles = show.selectAll('g.tile-coordinates');
                tiles = this.tiles.selectAll('g.tile-coordinates');
            }

            if (tiles) {
                var _this:Diagram = this;
                tiles.append('text')
                    .attr('y', '0.4em')
                    .each(function (node:string):void {
                        var selection:D3._Selection<any> = d3.select(<any>this);
                        var labels:Array<any> = _this.data[node].tile.v();

                        if (labels[0] === 0 && labels[1] === 0 && labels[2] === 0) {
                            labels = ['x', 'y', 'z'];
                        }

                        if (labels[2] === true) {
                            labels[2] = 'T';
                        } else if (labels[2] === false) {
                            labels[2] = 'F';
                        }

                        selection.append('tspan').attr('class', 'q').text(labels[0]);
                        selection.append('tspan').attr('class', 's').text(labels[1]);
                        selection.append('tspan').attr('class', 'r').text(labels[2]);
                    });

                var o:Array<Gridy.Float2> = this.grid.vertices(this.grid.orientation, this.grid.scale - this.fontSize * 1.5);

                this.tiles.select('.q').attr('x', o[0].x).attr('y', o[0].y + this.fontSize * 0.4);
                this.tiles.select('.s').attr('x', o[2].x).attr('y', o[2].y + this.fontSize * 0.4);

                if (o.length > 4) {
                    this.tiles.select('.r').attr('x', o[4].x).attr('y', o[4].y + this.fontSize * 0.4);
                } else if (o.length >= 3) {
                    this.tiles.select('.r').attr('x', o[1].x).attr('y', o[1].y + this.fontSize * 0.4);
                }
            }

            return this;
        }

        /**
         * Highlight selected tiles
         * @param tiles Array of selected tiles
         * @param classed Optional highlight class
         * @returns {Diagramy.Diagram} For chain call
         */
        highlight(tiles:Array<Gridy.ITile<any>>, classed:string = 'highlight'):Diagram {
            var tileSet:D3.Set<Gridy.ITile<any>> = d3.set(tiles);

            this.tiles.classed(classed, (node:string):boolean => {
                return tileSet.has(this.data[node].tile);
            });

            return this;
        }

        path(tiles:Array<Gridy.ITile<any>>):Diagram {
            this.paths.selectAll('*').remove();

            if (!tiles || !tiles.length) {
                return this;
            }

            var path:D3._Selection<any> = this.paths.append('path')
                .attr('d', 'M 0 0')
                .attr('class', 'path');

            var d:Array<string> = [];

            for (var i:number = 0; i < tiles.length; i++) {
                d.push(i === 0 ? 'M' : 'L');
                d.push(this.grid.center(tiles[i]).toString());
            }

            path.attr('d', d.join(' '));

            return this;
        }

        search(search?:Gridy.Search, from:string = 'hsl(90, 80%, 80%)', to:string = 'hsl(200, 80%, 80%)'):Diagram {
            if (!search) {
                this.tiles.selectAll('g.polygon').selectAll('polygon').style('fill', null);

                return this;
            }

            var color:D3.Transition.BaseInterpolate = d3.interpolate(from, to);

            this.tiles.selectAll('g.polygon').selectAll('polygon').style('fill', (node:string):string => {
                var v:number = search.cost[this.data[node].key];
                return (v >= 0) ? color(v / (search.max || 1)) : null;
            });

            return this;
        }

        point(xy:number[]):Diagram {
            if (!this.pointElement) {
                this.pointElement = this.svg.append('circle');
                this.pointElement.attr('class', 'marker').attr('r', 5);
            }

            var tile:Gridy.ITile<any> = this.grid.position(new Gridy.Float2(xy[0], xy[1]));

            this.pointElement.attr(
                'transform',
                'translate(' + (xy[0] + this.translate.x) + ',' + (xy[1] + this.translate.y) + ')'
            );

            this.tiles.classed('highlight', (node:string):boolean => {
                return this.data[node].tile.equals(tile);
            });

            return this;
        }

        mousePoint():Diagram {
            this.svg.on('mousemove', ():void => {
                var xy:number[] = d3.mouse(this.root.node());
                this.point(xy);
            });

            return this;
        }

        private initRoot():void {
            var bounds:Gridy.Rectangle = this.grid.bounds();

            this.translate = new Gridy.Float2(
                (parseFloat(this.svg.attr('width')) - bounds.minX - bounds.maxX) / 2,
                (parseFloat(this.svg.attr('height')) - bounds.minY - bounds.maxY) / 2
            );

            this.transition(this.root).attr('transform', 'translate(' + this.translate + ')');
            this.transition(this.paths).attr('transform', 'translate(' + this.translate + ')');
        }

        private initTiles():D3._Selection<any> {
            this.nodes = this.grid.tiles.map((n:Gridy.ITile<any>):string => {
                var d:INode = {tile: n, key: n.toString(), tileKey: this.grid.toPoint(n).toString()};
                this.data[d.tileKey] = d;
                return d.tileKey;
            });

            this.tiles = this.root.selectAll('g.tile').data(this.nodes, function (d:string):string {
                return d;
            });

            this.transition(this.tiles.exit(), 0.5).style('opacity', 0).remove();

            var tilesEnter:D3._Selection<any> = this.tiles.enter().append('g')
                .attr('class', 'tile')
                .style('opacity', this.animation ? 0 : 1)
                .attr('transform', (node:string):string => {
                    var center:Gridy.Float2 = this.grid.center(this.data[node].tile);
                    return 'translate(' + center.x + ',' + center.y + ')';
                });

            tilesEnter.append('g').attr('class', 'polygon').empty();
            tilesEnter.append('g').attr('class', 'center').empty();
            tilesEnter.append('g').attr('class', 'circle').empty();
            tilesEnter.append('g').attr('class', 'coordinates').empty();
            tilesEnter.append('g').attr('class', 'tile-coordinates').empty();

            this.transition(this.tiles).attr('transform', (node:string):string => {
                var center:Gridy.Float2 = this.grid.center(this.data[node].tile);
                return 'translate(' + center.x + ',' + center.y + ')';
            }).style('opacity', 1);

            return tilesEnter;
        }

        private shapePath(tileType:number):string {
            return this.grid.vertices(null, null, tileType).map(function (p:Gridy.Float2):string {
                return p.x.toFixed(3) + ',' + p.y.toFixed(3);
            }).join(' ');
        }

        private transition(selection:D3._Selection<any>, delta:number = 1):D3._Selection<any> {
            return <D3._Selection<any>>((this.animation && (this.duration * delta))
                ? selection.transition().duration(this.duration * delta)
                : selection);
        }
    }
}

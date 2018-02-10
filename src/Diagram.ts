import { Float2 } from "./Float2";
import { IGrid } from "./IGrid";
import { ITile } from "./ITile";
import { Position } from "./Position";
import { Rectangle } from "./Rectangle";
import { Search } from "./Search";

// From http://www.redblobgames.com/grids/hexagons/
// Copyright 2013 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
// Original source: http://www.redblobgames.com/grids/hexagons/ui.js

declare const d3: any;

interface INode {
  tileKey: string;
  key: string;
  tile: ITile<any>;
}

export default class Diagram {
  public grid: IGrid<any>;

  private nodes?: string[];
  private translate: Float2 = new Float2();

  private root: any;
  private svg: any;
  private tiles: any;
  private tilesEnter: any;
  private all: any;
  private paths: any;
  private pointElement: any;

  private fontSize: number = 14;
  private animation: boolean;

  private duration: number = 0;
  private data: { [key: string]: INode } = {};

  private showPolygons: boolean = true;
  private showCenters: boolean = false;
  private showCircles: boolean = false;
  private showAxes: boolean = false;
  private showCoordinates: boolean = false;
  private showTiles: boolean = false;

  constructor(svg: any, grid: IGrid<any>, animation: boolean = true) {
    this.svg = svg;
    this.grid = grid;
    this.animation = animation;
    this.root = svg.append("g");
    this.paths = svg.append("g");

    this.init();
  }

  public init(): Diagram {
    if (this.nodes) {
      this.duration = 800;
    }

    this.initRoot();
    this.initTiles();

    if (this.showPolygons) {
      this.polygons(null);
    }

    if (this.showCenters) {
      this.centers(null);
    }

    if (this.showCircles) {
      this.circles(null);
    }

    if (this.showCoordinates) {
      this.coordinates(null);
    }

    if (this.showTiles) {
      this.tileCoordinates(null);
    }

    if (this.showAxes) {
      this.axes(null);
    }

    return this;
  }

  public polygons(show: boolean | any = true): Diagram {
    let polygons: any;

    if (show === false) {
      this.all.selectAll("g.polygon").selectAll("polygon").remove();
      this.showPolygons = false;
      return this;
    } else if (show === true && !this.showPolygons) {
      polygons = this.all.selectAll("g.polygon").append("polygon");
      this.showPolygons = true;
    } else if (show !== true) {
      this.tilesEnter.selectAll("g.polygon").append("polygon");
      polygons = this.all.selectAll("g.polygon").selectAll("polygon");
      this.showPolygons = true;
    } else {
      return this;
    }

    const paths: string[] = [];

    for (let i: number = 0; i < (this.grid.tileTypes || 0); i++) {
      paths.push(this.shapePath(i));
    }

    if (this.grid.tileTypes === 1) {
      polygons.attr("points", paths[0]);
    } else {
      polygons.attr(
        "points",
        (node: string): string => {
          return this.grid.getTileType ? paths[this.grid.getTileType(this.data[node].tile)] : "";
        },
      );
    }

    this.transition(polygons)
      .attr("transform", "rotate(" + (this.grid.orientation * this.grid.angle) + ")");

    return this;
  }

  /**
   * Show/hide tile center points
   * @param show
   * @returns {Diagramy.Diagram}
   */
  public centers(show: boolean | any = true): Diagram {
    if (show === false) {
      this.all.selectAll("g.center").selectAll("circle").remove();
      this.showCenters = false;
      return this;
    } else if (show === true && !this.showCenters) {
      this.all.selectAll("g.center").append("circle").attr("class", "center").attr("r", 5);
      this.showCenters = true;
    } else if (show !== true) {
      this.tilesEnter.selectAll("g.center").append("circle").attr("class", "center").attr("r", 5);
    }

    return this;
  }

  public circles(show: boolean | any = true): Diagram {
    let circles: any;

    if (show === false) {
      this.all.selectAll("g.circle").selectAll("circle").remove();
      this.showCircles = false;
      return this;
    } else if (show === true && !this.showCircles) {
      circles = this.all.selectAll("g.circle").append("circle").attr("class", "circle");
      this.showCircles = true;
    } else if (show !== true) {
      this.tilesEnter.selectAll("g.circle").append("circle").attr("class", "circle");
      circles = this.all.selectAll("g.circle").selectAll("circle");
      this.showCircles = true;
    } else {
      return this;
    }

    this.transition(circles).attr("r", this.grid.radius);

    return this;
  }

  public coordinates(show: boolean | any = true): Diagram {
    let tiles: any | undefined;

    if (show === false) {
      this.all.selectAll("g.coordinates").selectAll("text").remove();
      this.showCoordinates = false;
      return this;
    } else if (show === true && !this.showCoordinates) {
      tiles = this.all.selectAll("g.coordinates").append("text");
      this.showCoordinates = true;
    } else if (show !== true) {
      this.tilesEnter.selectAll("g.coordinates").append("text");
      tiles = this.all.selectAll("g.coordinates").selectAll("text");
      this.showCoordinates = true;
    } else {
      return this;
    }

    const that: Diagram = this;

    tiles.attr("y", "0.4em")
      .each(function(this: any, node: string): void {
        const p: Position = that.grid.toPoint(that.data[node].tile);
        const selection: any = d3.select(this);
        selection.selectAll("*").remove();
        selection.append("tspan").attr("class", "x").text(p.x);
        selection.append("tspan").text(", ");
        selection.append("tspan").attr("class", "y").text(p.y);
      });

    return this;
  }

  public axes(show: boolean | any = true): Diagram {
    let tiles: any | undefined;

    if (show === false) {
      this.all.selectAll("g.axes").selectAll("text").remove();
      this.showAxes = false;
      return this;
    } else if (show === true && !this.showAxes) {
      tiles = this.all.selectAll("g.axes").append("text");
      this.showAxes = true;
    } else if (show !== true) {
      this.tilesEnter.selectAll("g.axes").append("text");
      tiles = this.all.selectAll("g.axes").selectAll("text");
      this.showAxes = true;
    } else {
      return this;
    }

    const that: Diagram = this;

    tiles.attr("y", "0.4em")
      .each(function(this: any, node: string): void {
        const p: Position = that.grid.toPoint(that.data[node].tile);
        const selection: any = d3.select(this);
        selection.selectAll("*").remove();
        selection.append("tspan").attr("class", "q").text(p.x.toString(25)
          .replace(/./g, (t) => t === "-"
            ? "-"
            : String.fromCharCode(t.charCodeAt(0) + (t.charCodeAt(0) >= 97 ? 10 : 49))));
        selection.append("tspan").attr("class", "s").text(p.y + 1);
      });

    return this;
  }

  public values(data: { [index: string]: any }): Diagram {
    const that: Diagram = this;

    this.all.selectAll("g.values").append("text")
      .attr("y", "0.4em")
      .text(function(this: any, node: string) {
        const p: Position = that.grid.toPoint(that.data[node].tile);
        return data[that.data[node].tile.toString()];
      });

    return this;
  }

  public tileCoordinates(show: boolean | any = true): Diagram {
    let tiles: any | undefined;

    if (show === false) {
      this.all.selectAll("g.tile-coordinates").selectAll("text").remove();
      this.showTiles = false;
      return this;
    } else if (show === true && !this.showTiles) {
      tiles = this.all.selectAll("g.tile-coordinates").append("text");
      this.showTiles = true;
    } else if (show !== true) {
      this.tilesEnter.selectAll("g.tile-coordinates").append("text");
      tiles = this.all.selectAll("g.tile-coordinates").selectAll("text");
      this.showTiles = true;
    } else {
      return this;
    }

    const that: Diagram = this;

    tiles.attr("y", "0.4em")
      .each(function(this: any, node: string): void {
        const selection: any = d3.select(this);
        let labels: any[] = that.data[node].tile.v();

        if (labels[0] === 0 && labels[1] === 0 && labels[2] === 0) {
          labels = ["x", "y", "z"];
        }

        if (labels[2] === true) {
          labels[2] = "T";
        } else if (labels[2] === false) {
          labels[2] = "F";
        }

        selection.selectAll("*").remove();
        selection.append("tspan").attr("class", "q").text(labels[0]);
        selection.append("tspan").attr("class", "s").text(labels[1]);
        selection.append("tspan").attr("class", "r").text(labels[2]);
      });

    if (this.grid.tileTypes === 1) {
      const o: Float2[] = this.grid.vertices(this.grid.orientation, this.grid.scale - this.fontSize * 1.5);

      this.all.select(".q").attr("x", o[0].x).attr("y", o[0].y + this.fontSize * 0.4);
      this.all.select(".s").attr("x", o[2].x).attr("y", o[2].y + this.fontSize * 0.4);

      if (o.length > 4) {
        this.all.select(".r").attr("x", o[4].x).attr("y", o[4].y + this.fontSize * 0.4);
      } else if (o.length >= 3) {
        this.all.select(".r").attr("x", o[1].x).attr("y", o[1].y + this.fontSize * 0.4);
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
  public highlight(tiles: Array<ITile<any>>, classed: string = "highlight"): Diagram {
    const tileSet: any = d3.set(tiles);

    this.all.classed(classed, (node: string): boolean => {
      return tileSet.has(this.data[node].tile);
    });

    return this;
  }

  public path(tiles: Array<ITile<any>>, color?: string, width: number = 5): Diagram {
    this.paths.selectAll("*").remove();

    if (!tiles || !tiles.length) {
      return this;
    }

    const path: any = this.paths.append("path")
      .attr("d", "M 0 0")
      .attr("class", "path")
      .attr("style", `stroke: ${color}; stroke-width: ${width}px;`);

    const d: string[] = [];

    for (let i: number = 0; i < tiles.length; i++) {
      d.push(i === 0 ? "M" : "L");
      d.push(this.grid.center(tiles[i]).toString());
    }

    path.attr("d", d.join(" "));

    return this;
  }

  public search(search?: Search, from: string = "hsl(90, 80%, 80%)", to: string = "hsl(200, 80%, 80%)"): Diagram {
    if (!search) {
      this.all.selectAll("g.polygon").selectAll("polygon").style("fill", null);

      return this;
    }

    const color: any = d3.interpolate(from, to);

    this.all.selectAll("g.polygon").selectAll("polygon").style("fill", (node: string): string => {
      const v: number = search.cost[this.data[node].key];
      return (v >= 0) ? color(v / (search.max || 1)) : null;
    });

    return this;
  }

  public point(xy: number[]): Diagram {
    if (!this.pointElement) {
      this.pointElement = this.svg.append("circle");
      this.pointElement.attr("class", "marker").attr("r", 5);
    }

    const tile: ITile<any> = this.grid.position(new Float2(xy[0], xy[1]));

    this.pointElement.attr(
      "transform",
      "translate(" + (xy[0] + this.translate.x) + "," + (xy[1] + this.translate.y) + ")",
    );

    // console.log(xy, tile)

    this.all.classed("highlight", (node: string): boolean => {
      return this.data[node].tile.equals(tile);
    });

    return this;
  }

  public mousePoint(): Diagram {
    this.svg.on("mousemove", (): void => {
      const xy: number[] = d3.mouse(this.root.node());
      this.point(xy);
    });

    return this;
  }

  private initRoot(): void {
    const bounds: Rectangle = this.grid.bounds();

    this.translate = new Float2(
      (parseFloat(this.svg.attr("width")) - bounds.minX - bounds.maxX) / 2,
      (parseFloat(this.svg.attr("height")) - bounds.minY - bounds.maxY) / 2,
    );

    this.transition(this.root).attr("transform", "translate(" + this.translate + ")");
    this.transition(this.paths).attr("transform", "translate(" + this.translate + ")");
  }

  private initTiles(): any {
    this.nodes = this.grid.tiles.map((n: ITile<any>): string => {
      const d: INode = { tile: n, key: n.toString(), tileKey: this.grid.toPoint(n).toString() };
      this.data[d.tileKey] = d;
      return d.tileKey;
    });

    this.tiles = this.root.selectAll("g.tile").data(this.nodes, (d: string): string => d);

    this.transition(this.tiles.exit(), 0.5).style("opacity", 0).remove();

    const tilesEnter: any = this.tiles.enter().append("g")
      .attr("class", "tile")
      .style("opacity", this.animation ? 0 : 1)
      .attr("transform", (node: string): string => {
        const center: Float2 = this.grid.center(this.data[node].tile);
        return "translate(" + center.x + "," + center.y + ")";
      });

    tilesEnter.append("g").attr("class", "polygon");
    tilesEnter.append("g").attr("class", "center");
    tilesEnter.append("g").attr("class", "circle");
    tilesEnter.append("g").attr("class", "axes");
    tilesEnter.append("g").attr("class", "coordinates");
    tilesEnter.append("g").attr("class", "tile-coordinates");
    tilesEnter.append("g").attr("class", "values");

    this.transition(this.tiles.merge(tilesEnter)).attr("transform", (node: string): string => {
      const center: Float2 = this.grid.center(this.data[node].tile);
      return "translate(" + center.x + "," + center.y + ")";
    }).style("opacity", 1);

    this.tilesEnter = tilesEnter;
    this.all = this.tilesEnter.merge(this.tiles);
  }

  private shapePath(tileType: number): string {
    return this.grid.vertices(undefined, undefined, tileType).map((p: Float2): string =>
      p.x.toFixed(3) + "," + p.y.toFixed(3))
      .join(" ");
  }

  private transition(selection: any, delta: number = 1): any {
    return ((this.animation && (this.duration * delta))
      ? selection.transition().duration(this.duration * delta)
      : selection) as any;
  }
}

import { IGrid } from "./IGrid";
import { AnyTile } from "./ITile";
import { Search } from "./Search";
/** @external */
export default class Diagram {
    grid: IGrid<any>;
    private nodes?;
    private translate;
    private root;
    private svg;
    private tilesElements;
    private tilesEnter;
    private all;
    private paths;
    private pointElement;
    private fontSize;
    private animation;
    private duration;
    private data;
    private showPolygons;
    private showPolygonPaths;
    private showCenters;
    private showCircles;
    private showAxes;
    private showCoordinates;
    private showTiles;
    constructor(svg: any, grid: IGrid<any>, animation?: boolean);
    init(): Diagram;
    polygons(show?: boolean | any): Diagram;
    polygonPaths(show?: boolean | any): void;
    /**
     * Show/hide tile center points
     * @param show
     * @returns {Diagramy.Diagram}
     */
    centers(show?: boolean | any): Diagram;
    circles(show?: boolean | any): Diagram;
    coordinates(show?: boolean | any): Diagram;
    axes(show?: boolean | any): Diagram;
    values(data: {
        [index: string]: any;
    }): Diagram;
    tiles(show?: boolean | any): Diagram;
    /**
     * Highlight selected tiles
     * @param tiles Array of selected tiles
     * @param classed Optional highlight class
     * @returns {Diagramy.Diagram} For chain call
     */
    highlight(tiles: AnyTile[], classed?: string): Diagram;
    path(tiles: AnyTile[], color?: string, width?: number): Diagram;
    lines(tiles: AnyTile[][], color?: string, width?: number): Diagram;
    search(search?: Search, from?: string, to?: string): Diagram;
    point(xy: number[]): Diagram;
    mousePoint(): Diagram;
    private initRoot();
    private initTiles();
    private shapePath(tileType);
    private transition(selection, delta?);
}

import { IGrid } from "./IGrid";
import { ITile } from "./ITile";
import { Search } from "./Search";
export default class Diagram {
    grid: IGrid<any>;
    private nodes?;
    private translate;
    private root;
    private svg;
    private tiles;
    private tilesEnter;
    private all;
    private paths;
    private pointElement;
    private fontSize;
    private animation;
    private duration;
    private data;
    private showPolygons;
    private showCenters;
    private showCircles;
    private showAxes;
    private showCoordinates;
    private showTiles;
    constructor(svg: any, grid: IGrid<any>, animation?: boolean);
    init(): Diagram;
    polygons(show?: boolean | any): Diagram;
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
    tileCoordinates(show?: boolean | any): Diagram;
    /**
     * Highlight selected tiles
     * @param tiles Array of selected tiles
     * @param classed Optional highlight class
     * @returns {Diagramy.Diagram} For chain call
     */
    highlight(tiles: Array<ITile<any>>, classed?: string): Diagram;
    path(tiles: Array<ITile<any>>, color?: string, width?: number): Diagram;
    search(search?: Search, from?: string, to?: string): Diagram;
    point(xy: number[]): Diagram;
    mousePoint(): Diagram;
    private initRoot();
    private initTiles();
    private shapePath(tileType);
    private transition(selection, delta?);
}

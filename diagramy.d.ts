/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/d3/d3.d.ts" />
declare module Gridy {
    type Integer = number;
}
declare module Gridy {
    interface ITile<T> {
        neighbors(): Array<T>;
        directions(): Array<T>;
        shift(): T;
        cubeLength(): number;
        equals(h: T): boolean;
        add(h: T): T;
        scale(k: Integer): T;
        v(): Array<any>;
    }
}
declare module Gridy {
    interface IVector<T> {
        v(): Array<T>;
        toString(): string;
        equals(b: IVector<T>): boolean;
    }
}
declare module Gridy {
    class Integer2 implements IVector<Integer> {
        x: Integer;
        y: Integer;
        constructor(x?: Integer, y?: Integer);
        v(): Array<Integer>;
        distance(b: Integer2): Integer;
        toString(): string;
        equals(p: Integer2): boolean;
        add(p: Integer2): Integer2;
        scale(d: Integer): Integer2;
        cubeLength(): Integer;
    }
}
declare module Gridy {
    type Float = number;
}
declare module Gridy {
    class Float2 implements IVector<Float> {
        x: Float;
        y: Float;
        constructor(x?: Float, y?: Float);
        static round(h: Float2): Integer2;
        static lerp(a: Integer2, b: Integer2, t: Float): Float2;
        static line(a: Integer2, b: Integer2): Array<Integer2>;
        equals(p: Float2): boolean;
        v(): Array<Float>;
        scale(k: Float): Float2;
        toString(): string;
    }
}
declare module Gridy {
    class Position extends Integer2 {
    }
}
declare module Gridy {
    class Rectangle {
        minX: Float;
        maxX: Float;
        minY: Float;
        maxY: Float;
        constructor(minX?: Float, maxX?: Float, minY?: Float, maxY?: Float);
        static add(a: Rectangle, b: Rectangle): Rectangle;
    }
}
declare module Gridy {
    interface IGrid<T> {
        tiles: Array<T>;
        orientation: any;
        scale: Float;
        angle: Float;
        x: Integer;
        y: Integer;
        toTile: (position: Position) => T;
        toPoint: (tile: T) => Position;
        tileTypes: Integer;
        radius: Float;
        bounds(): Rectangle;
        center(tile: T): Float2;
        vertices(orientation?: boolean, scale?: Float, tileType?: Integer): Array<Float2>;
        position(position: Float2): T;
        getTileType?(tile: T): Integer;
    }
}
declare module Gridy {
    class Search {
        cost: {
            [key: string]: Integer;
        };
        previous: {
            [key: string]: ITile<any>;
        };
        start: ITile<any>;
        max: Integer;
        constructor(start: ITile<any>, maxMovement: number, maxMagnitude: number, blocked: {
            [key: string]: boolean;
        }, available?: {
            [key: string]: boolean;
        });
        path(end: ITile<any>): Array<ITile<any>>;
    }
}
declare module Diagramy {
    class Diagram {
        grid: Gridy.IGrid<any>;
        private nodes;
        private translate;
        private root;
        private svg;
        private tiles;
        private paths;
        private pointElement;
        private fontSize;
        private animation;
        private duration;
        private data;
        private _polygons;
        private _centers;
        private _circles;
        private _coordinates;
        private _tileCoordinates;
        constructor(svg: D3._Selection<any>, grid: Gridy.IGrid<any>, animation?: boolean);
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
        tileCoordinates(show?: boolean | any): Diagram;
        /**
         * Highlight selected tiles
         * @param tiles Array of selected tiles
         * @param classed Optional highlight class
         * @returns {Diagramy.Diagram} For chain call
         */
        highlight(tiles: Array<Gridy.ITile<any>>, classed?: string): Diagram;
        path(tiles: Array<Gridy.ITile<any>>): Diagram;
        search(search?: Gridy.Search, from?: string, to?: string): Diagram;
        point(xy: number[]): Diagram;
        mousePoint(): Diagram;
        private initRoot();
        private initTiles();
        private shapePath(tileType);
        private transition(selection, delta?);
    }
}

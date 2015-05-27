/// <reference path="typings/node/node.d.ts" />
declare module Gridy {
    type Integer = number;
}
declare module Gridy {
    type Float = number;
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
    module Bounds {
        function bounds(grid: IGrid<any>): Rectangle;
    }
}
declare module Gridy {
    class Integer3 implements IVector<Integer> {
        x: Integer;
        y: Integer;
        z: Integer;
        constructor(x?: Integer, y?: Integer, z?: Integer);
        distance(b: Integer3): Integer;
        add(b: Integer3): Integer3;
        scale(k: Integer): Integer3;
        toString(): string;
        v(): Array<Integer>;
        equals(other: Integer3): boolean;
        round(): Integer3;
        cubeLength(): Integer;
    }
}
declare module Gridy {
    class HexagonalTile extends Integer3 implements ITile<Integer3> {
        static directions: Array<HexagonalTile>;
        shift(): HexagonalTile;
        directions(): Array<HexagonalTile>;
        add(a: HexagonalTile): HexagonalTile;
        scale(a: Integer): HexagonalTile;
        neighbors(): Array<HexagonalTile>;
    }
}
declare module Gridy {
    enum GridShape {
        TrapezoidalEven = 0,
        TrapezoidalOdd = 1,
        Hexagonal = 2,
        Triangular = 3,
        Rhombus = 4,
    }
}
declare module Gridy {
    class HexagonalGrid implements IGrid<HexagonalTile> {
        static SQRT_3: Float;
        static SQRT_3_2: Float;
        static SQRT_3_3: Float;
        tiles: Array<HexagonalTile>;
        orientation: boolean;
        scale: Float;
        angle: Float;
        x: Integer;
        y: Integer;
        toTile: (position: Position) => HexagonalTile;
        toPoint: (tile: HexagonalTile) => Position;
        tileTypes: Integer;
        radius: Float;
        shape: GridShape;
        constructor(scale: Float, orientation: boolean, shape: GridShape, x: Integer, y?: Integer);
        static twoAxisToCube(position: Position): HexagonalTile;
        static cubeToTwoAxis(tile: HexagonalTile): Position;
        static oddQToCube(position: Position): HexagonalTile;
        static cubeToOddQ(tile: HexagonalTile): Position;
        static evenQToCube(position: Position): HexagonalTile;
        static cubeToEvenQ(tile: HexagonalTile): Position;
        static oddRToCube(position: Position): HexagonalTile;
        static cubeToOddR(tile: HexagonalTile): Position;
        static evenRToCube(position: Position): HexagonalTile;
        static cubeToEvenR(tile: HexagonalTile): Position;
        static trapezoidalShape(minQ: Integer, maxQ: Integer, minR: Integer, maxR: Integer, toCube: (position: Position) => HexagonalTile): Array<HexagonalTile>;
        static triangularShape(size: Integer): Array<HexagonalTile>;
        static hexagonalShape(size: Integer): Array<HexagonalTile>;
        static region(xmin: Integer, xmax: Integer, ymin: Integer, ymax: Integer, zmin: Integer, zmax: Integer): Array<HexagonalTile>;
        bounds(): Rectangle;
        vertices(orientation?: boolean, scale?: Float): Array<Float2>;
        center(tile: HexagonalTile): Float2;
        position(p: Float2): HexagonalTile;
    }
}
declare module Gridy {
    class BrickGrid extends HexagonalGrid {
        angle: Float;
        constructor(scale: Float, orientation: boolean, shape: GridShape, x: Integer, y?: Integer);
        vertices(orientation?: boolean, scale?: Float): Array<Float2>;
        center(cube: HexagonalTile): Float2;
    }
}
declare module Gridy {
    module Constants {
        var SQRT_3: Float;
        var SQRT_3_2: Float;
        var SQRT_3_3: Float;
    }
}
declare module Gridy {
    class Float3 implements IVector<Float> {
        x: Float;
        y: Float;
        z: Float;
        constructor(x: Float, y: Float, z: Float);
        static round(h: Float3): Integer3;
        static lerp(a: Integer3, b: Integer3, t: Float): Float3;
        static line(a: Integer3, b: Integer3): Array<Integer3>;
        equals(other: Float3): boolean;
        v(): Array<Float>;
        toString(): string;
        round(): Integer3;
    }
}
declare module Gridy {
    interface IGridConstructable {
        new (scale: Float, orientation: boolean, shape: GridShape, x: Integer, y: Integer): IGrid<any>;
    }
    module Grids {
        var HexagonalGrid: IGridConstructable;
        var RectangularGrid: IGridConstructable;
        var BrickGrid: IGridConstructable;
        var TriangularGrid: IGridConstructable;
    }
}
declare module Gridy {
    module Utils {
        function newInstance<T>(obj: T): T;
        function enumerate(obj: any): any;
        function look(items: Array<any>): {
            [key: string]: any;
        };
    }
}
declare module Gridy {
    module Path {
        function spiral(start: ITile<any>, N: Integer, spiral: boolean): Array<ITile<any>>;
        function intersect(a: Array<ITile<any>>, b: Array<ITile<any>>): Array<ITile<any>>;
        function axes(a: Array<ITile<any>>, axe: Integer, odd?: boolean): Array<ITile<any>>;
    }
}
declare module Gridy {
    class RectangularTile extends Integer2 implements ITile<Integer2> {
        static directions: Array<RectangularTile>;
        shift(): RectangularTile;
        directions(): Array<RectangularTile>;
        add(a: RectangularTile): RectangularTile;
        scale(a: Integer): RectangularTile;
        neighbors(): Array<RectangularTile>;
    }
}
declare module Gridy {
    class RectangularGrid implements IGrid<RectangularTile> {
        static SQRT_2: Float;
        tiles: Array<RectangularTile>;
        orientation: boolean;
        scale: Float;
        angle: Float;
        x: Integer;
        y: Integer;
        toTile: (point: Position) => RectangularTile;
        toPoint: (tile: RectangularTile) => Position;
        tileTypes: Integer;
        radius: Float;
        constructor(scale: Float, orientation: boolean, shape: GridShape, x: Integer, y?: Integer);
        bounds(): Rectangle;
        center(tile: RectangularTile): Float2;
        vertices(orientation?: boolean, scale?: Float): Array<Float2>;
        position(p: Float2): RectangularTile;
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
declare module Gridy {
    class TriangularTile extends Integer2 implements ITile<Integer2> {
        static directions: Array<TriangularTile>;
        s: boolean;
        constructor(x?: Integer, y?: Integer, s?: boolean);
        v(): Array<any>;
        toString(): string;
        shift(): TriangularTile;
        directions(): Array<TriangularTile>;
        add(a: TriangularTile): TriangularTile;
        scale(a: Integer): TriangularTile;
        neighbors(): Array<TriangularTile>;
    }
}
declare module Gridy {
    class TriangularGrid implements IGrid<TriangularTile> {
        tiles: Array<TriangularTile>;
        orientation: boolean;
        scale: Float;
        angle: Float;
        x: Integer;
        y: Integer;
        toTile: (position: Position) => TriangularTile;
        toPoint: (tile: TriangularTile) => Position;
        tileTypes: Integer;
        radius: Float;
        constructor(scale: Float, orientation: boolean, shape: GridShape, x: Integer, y?: Integer);
        bounds(): Rectangle;
        center(tile: TriangularTile): Float2;
        vertices(orientation: boolean, scale: Float, tileType?: Integer): Array<Float2>;
        position(p: Float2): TriangularTile;
        getTileType(tile: TriangularTile): Integer;
        private rhombus();
        private triangle();
        private hexagonalShape(size);
    }
}

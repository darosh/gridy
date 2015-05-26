/// <reference path="IGrid.ts" />
/// <reference path="GridShape.ts" />

module Gridy {
    'use strict';

    interface IGridConstructable {
        new(scale:Float, orientation:boolean, shape:GridShape, x:Integer, y:Integer):IGrid<any>;
    }

    export module Grids {
        export var HexagonalGrid:IGridConstructable = HexagonalGrid;
        export var RectangularGrid:IGridConstructable = RectangularGrid;
        export var BrickGrid:IGridConstructable = BrickGrid;
        export var TriangularGrid:IGridConstructable = TriangularGrid;
    }
}

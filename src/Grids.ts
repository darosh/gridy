import { Float } from "./Float";
import { GridShape } from "./GridShape";
import { IGrid } from "./IGrid";
import { Integer } from "./Integer";

export interface IGridConstructable {
  new(scale: Float, orientation: boolean, shape: GridShape, x: Integer, y: Integer): IGrid<any>;
}

import { Float } from './Float';
import { IGrid } from './IGrid';
import { Integer } from './Integer';
import { Shape } from './Shape';

export interface IGridConstructable {
  new(scale: Float, orientation: boolean, shape: Shape, x: Integer, y: Integer): IGrid<any>;
}

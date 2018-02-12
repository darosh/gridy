import { Float } from "./Float";
import { Float2 } from "./Float2";
import { Integer } from "./Integer";
import { Position } from "./Position";
import { Rectangle } from "./Rectangle";
import { Shape } from "./Shape";
import { TileType } from "./TileType";

export interface IGrid<T> {
  tiles: T[];
  orientation: any;
  scale: Float;
  angle: Float;
  x: Integer;
  y: Integer;
  toTile?: (position: Position) => T;
  toPoint: (tile: T) => Position;
  radius: Float;
  tileTypes?: TileType;
  getTileType?: (tile: T) => Integer;

  tile(x: number, y: number): T | undefined;
  bounds(): Rectangle;
  center(tile: T): Float2;
  vertices(orientation?: boolean, scale?: Float, tileType?: Integer): Float2[];
  position(position: Float2): T;
}

export interface IGridConstructable {
  new(scale: Float, orientation: boolean, shape: Shape, x: Integer, y: Integer): IGrid<any>;
}

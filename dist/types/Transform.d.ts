import { IGrid } from './IGrid';
import { Integer } from './Integer';
import { Position } from './Position';
export declare function rotate(grid: IGrid<any>, direction?: Integer): void;
export declare function translate(grid: IGrid<any>, position: Position): void;
export declare function min(grid: IGrid<any>): Position;
export declare function normalize(grid: IGrid<any>): void;

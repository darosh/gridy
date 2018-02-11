import { ITile } from "./ITile";
export declare function instance<T>(obj: T): T;
export declare function enumerate(obj: any): any;
export declare function look(items: any[], values?: boolean): {
    [key: string]: any;
};
export declare function neighbors(tiles: ITile<any>[]): void;
export declare function map(tiles: ITile<any>[]): void;
export declare function connections(tiles: ITile<any>[]): ITile<any>[][];

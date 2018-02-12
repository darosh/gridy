import { ITile } from "./ITile";
export declare function instance<T>(obj: T): T;
export declare function enumerate(obj: any): any;
export declare function look(items: any[], values?: boolean): {
    [key: string]: any;
};
export declare function neighbors(tiles: ITile<any>[]): void;
export declare function map(tiles: ITile<any>[]): void;
export declare function connections(tiles: ITile<any>[]): ITile<any>[][];
export declare function toMap(tiles: ITile<any>[]): Map<any, ITile<any>>;
export declare function toArray(m: Map<any, ITile<any>>): ITile<any>[];

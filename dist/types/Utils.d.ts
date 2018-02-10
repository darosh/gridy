import { ITile } from "./ITile";
export declare function instance<T>(obj: T): T;
export declare function enumerate(obj: any): any;
export declare function look(items: any[], values?: boolean): {
    [key: string]: any;
};
export declare function neighbors(tiles: Array<ITile<any>>): void;
export declare function connections(tiles: Array<ITile<any>>): Array<Array<ITile<any>>>;

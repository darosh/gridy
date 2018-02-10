import { Integer } from "./Integer";
import { ITile } from "./ITile";
export declare class Search {
    cost: {
        [key: string]: Integer;
    };
    previous: {
        [key: string]: ITile<any> | null;
    };
    start: ITile<any>;
    max: Integer;
    constructor(start: ITile<any> | Array<ITile<any>>, maxMovement: number, maxMagnitude: number, blocked: {
        [key: string]: boolean;
    }, available?: {
        [key: string]: boolean;
    });
    path(end: ITile<any> | Array<ITile<any>>, max?: boolean): Array<ITile<any>>;
}

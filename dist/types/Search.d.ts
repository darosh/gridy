import { Integer } from "./Integer";
import { AnyTile } from "./ITile";
export declare class Search {
    cost: {
        [key: string]: Integer;
    };
    previous: {
        [key: string]: AnyTile | null;
    };
    start: AnyTile;
    max: Integer;
    constructor(start: AnyTile | AnyTile[], maxMovement: number, maxMagnitude: number, blocked?: AnyTile[], available?: AnyTile[]);
    path(end: AnyTile | AnyTile[], max?: boolean): AnyTile[];
}

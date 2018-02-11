import { Directions } from "./Directions";
import { Integer } from "./Integer";
import { Integer3 } from "./Integer3";
import { ITile } from "./ITile";
/**
 * ![](../../examples/output/hexagonal-tile.svg)
 */
export declare class HexagonalTile extends Integer3 implements ITile<Integer3> {
    static directions: Directions<HexagonalTile>;
    shift(): HexagonalTile;
    directions(): Directions<HexagonalTile>;
    add(a: HexagonalTile): HexagonalTile;
    scale(a: Integer): HexagonalTile;
    neighbors(): Directions<HexagonalTile>;
    map(): Map<number, HexagonalTile>;
}

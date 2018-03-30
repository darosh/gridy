import { Directions } from './Directions';
import { Integer } from './Integer';
import { Integer3 } from './Integer3';
import { ITile } from './ITile';
/**
 * ![](../../examples/output/hexagonal-tile.svg)
 */
export declare class HexagonalTile extends Integer3 implements ITile<Integer3> {
    static directions: Directions<HexagonalTile>;
    private tiles;
    readonly key: string;
    shift(): HexagonalTile;
    directions(): Directions<HexagonalTile>;
    add(a: HexagonalTile): HexagonalTile;
    scale(a: Integer): HexagonalTile;
    neighbors(): Directions<HexagonalTile>;
    right(): this;
    left(): this;
}

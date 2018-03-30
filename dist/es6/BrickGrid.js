import { SQRT_2, SQRT_2_2, SQRT_2_4 } from './Constants';
import { Float2 } from './Float2';
import { HexagonalGrid } from './HexagonalGrid';
import { Shape } from './Shape';
/**
 * ![](../../examples/output/brick-grid.svg)
 */
export class BrickGrid extends HexagonalGrid {
    constructor(scale, orientation = false, shape = Shape.Hexagonal, x = 1, y) {
        super(scale, orientation, shape, x, y);
        this.angle = 0;
        this.radius = SQRT_2_4 * scale;
    }
    vertices(orientation, scale) {
        const s = (scale === undefined) ? this.scale : scale;
        const points = [];
        for (let i = 0; i < 4; i++) {
            const angle = Math.PI * (i * 2 - 1) * 2 / 8;
            points.push(new Float2(s * Math.cos(angle) * 0.5, s * Math.sin(angle) * 0.5));
        }
        return points;
    }
    center(cube) {
        let s;
        const size = this.scale / 2;
        if (this.orientation) {
            s = new Float2(SQRT_2 * cube.x + SQRT_2_2 * cube.z, SQRT_2 * cube.z * this.scaleY);
        }
        else {
            s = new Float2(SQRT_2 * cube.x, (SQRT_2_2 * cube.x + SQRT_2 * cube.z) * this.scaleY);
        }
        return s.scale(size);
    }
}
//# sourceMappingURL=BrickGrid.js.map
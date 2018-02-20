import { SQRT_2, SQRT_2_2, SQRT_2_4 } from "./Constants";
import { Float2 } from "./Float2";
import { HexagonalGrid } from "./HexagonalGrid";
/**
 * ![](../../examples/output/brick-grid.svg)
 */
export class BrickGrid extends HexagonalGrid {
    constructor(scale, orientation, shape, x, y) {
        super(scale, orientation, shape, x, y);
        this.angle = 0;
        this.radius = SQRT_2_4 * scale;
    }
    vertices(orientation, scale) {
        scale = (scale === undefined) ? this.scale : scale;
        const points = [];
        for (let i = 0; i < 4; i++) {
            const angle = 2 * Math.PI * (2 * i - 1) / 8;
            points.push(new Float2(0.5 * scale * Math.cos(angle), 0.5 * scale * Math.sin(angle)));
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

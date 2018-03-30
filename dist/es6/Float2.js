import { Integer2 } from './Integer2';
export class Float2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    static ROUND(h) {
        const rx = Math.round(h.x);
        const ry = Math.round(h.y);
        return new Integer2(rx, ry);
    }
    static LERP(a, b, t) {
        return new Float2(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
    }
    static LINE(a, b) {
        const N = a.distance(b);
        const results = [];
        for (let i = 0; i < (N + 1); i++) {
            results.push(Float2.ROUND(Float2.LERP(a, b, 1 / Math.max(1, N) * i)));
        }
        return results;
    }
    equals(p) {
        return (this.x === p.x) && (this.y === p.y);
    }
    get value() {
        return [this.x, this.y];
    }
    scale(k) {
        return new Float2(this.x * k, this.y * k);
    }
    toString() {
        return this.value.toString();
    }
}
//# sourceMappingURL=Float2.js.map
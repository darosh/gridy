import { Integer2 } from "./Integer2";
export class Float2 {
    static round(h) {
        const rx = Math.round(h.x);
        const ry = Math.round(h.y);
        return new Integer2(rx, ry);
    }
    static lerp(a, b, t) {
        return new Float2(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
    }
    static line(a, b) {
        const N = a.distance(b);
        const results = [];
        for (let i = 0; i < (N + 1); i++) {
            results.push(Float2.round(Float2.lerp(a, b, 1.0 / Math.max(1, N) * i)));
        }
        return results;
    }
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    equals(p) {
        return (this.x === p.x) && (this.y === p.y);
    }
    v() {
        return [this.x, this.y];
    }
    scale(k) {
        return new Float2(this.x * k, this.y * k);
    }
    toString() {
        return this.v().join(",");
    }
}

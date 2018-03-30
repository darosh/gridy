import { Integer3 } from "./Integer3";
export class Float3 {
    static round(h) {
        let rx = Math.round(h.x);
        let ry = Math.round(h.y);
        let rz = Math.round(h.z);
        const xDiff = Math.abs(rx - h.x);
        const yDiff = Math.abs(ry - h.y);
        const zDiff = Math.abs(rz - h.z);
        if (xDiff > yDiff && xDiff > zDiff) {
            rx = -ry - rz;
        }
        else if (yDiff > zDiff) {
            ry = -rx - rz;
        }
        else {
            rz = -rx - ry;
        }
        return new Integer3(rx, ry, rz);
    }
    static lerp(a, b, t) {
        return new Float3(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, a.z + (b.z - a.z) * t);
    }
    static line(a, b) {
        const N = a.distance(b);
        const results = [];
        for (let i = 0; i < (N + 1); i++) {
            results.push(Float3.round(Float3.lerp(a, b, 1.0 / Math.max(1, N) * i)));
        }
        return results;
    }
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    equals(other) {
        return (this.x === other.x) && (this.y === other.y) && (this.z === other.z);
    }
    get value() {
        return [this.x, this.y, this.z];
    }
    toString() {
        return this.value.toString();
    }
    round() {
        return Float3.round(this);
    }
}
//# sourceMappingURL=Float3.js.map
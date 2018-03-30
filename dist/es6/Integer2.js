export class Integer2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    get value() {
        return [this.x, this.y];
    }
    distance(b) {
        return Math.floor((Math.abs(this.x - b.x) + Math.abs(this.y - b.y)) / 2);
    }
    toString() {
        return this.value.toString();
    }
    equals(p) {
        return (this.x === p.x) && (this.y === p.y);
    }
    add(p) {
        return new Integer2(this.x + p.x, this.y + p.y);
    }
    scale(d) {
        return new Integer2(this.x * d, this.y * d);
    }
    cubeLength() {
        return Math.floor((Math.abs(this.x) + Math.abs(this.y)) / 2);
    }
}
//# sourceMappingURL=Integer2.js.map
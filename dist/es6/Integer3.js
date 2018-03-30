export class Integer3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    distance(b) {
        return Math.floor((Math.abs(this.x - b.x) + Math.abs(this.y - b.y) + Math.abs(this.z - b.z)) / 2);
    }
    add(b) {
        return new Integer3(this.x + b.x, this.y + b.y, this.z + b.z);
    }
    scale(k) {
        return new Integer3(this.x * k, this.y * k, this.z * k);
    }
    toString() {
        return this.value.toString();
    }
    get value() {
        return [this.x, this.y, this.z];
    }
    equals(other) {
        return (this.x === other.x) && (this.y === other.y) && (this.z === other.z);
    }
    round() {
        return new Integer3(Math.round(this.x), Math.round(this.y), Math.round(this.z));
    }
    cubeLength() {
        return Math.floor((Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)) / 2);
    }
}
//# sourceMappingURL=Integer3.js.map
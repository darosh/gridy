export class Rectangle {
    constructor(minX = 0, maxX = 0, minY = 0, maxY = 0) {
        this.minX = 0;
        this.maxX = 0;
        this.minY = 0;
        this.maxY = 0;
        this.minX = minX;
        this.maxX = maxX;
        this.minY = minY;
        this.maxY = maxY;
    }
    static add(a, b) {
        return new Rectangle(a.minX + b.minX, a.maxX + b.maxX, a.minY + b.minY, a.maxY + b.maxY);
    }
}

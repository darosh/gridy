import { Float2 } from './Float2';
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
    static ADD(a, b) {
        return new Rectangle(a.minX + b.minX, a.maxX + b.maxX, a.minY + b.minY, a.maxY + b.maxY);
    }
    static POINTS(a) {
        return [
            new Float2(a.minX, a.minY),
            new Float2(a.maxX, a.minY),
            new Float2(a.minX, a.maxY),
            new Float2(a.maxX, a.maxY)
        ];
    }
}
//# sourceMappingURL=Rectangle.js.map
import {RectangularGrid} from '../src/RectangularGrid';

describe('HexagonalGrid', () => {
  it('should construct', () => {
    const grid = new RectangularGrid(1);
    expect(grid).toBeDefined();
  });
});

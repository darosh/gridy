import {TriangularGrid} from '../src/TriangularGrid';

describe('HexagonalGrid', () => {
  it('should construct', () => {
    const grid = new TriangularGrid(1);
    expect(grid).toBeDefined();
  });
});

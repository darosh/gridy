import {HexagonalGrid} from '../src/HexagonalGrid';

describe('HexagonalGrid', () => {
  it('should construct', () => {
    const grid = new HexagonalGrid(1);
    expect(grid).toBeDefined();
  });
});

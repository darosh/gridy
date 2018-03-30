import {BrickGrid} from '../src/BrickGrid';

describe('BrickGrid', () => {
  it('should construct', () => {
    const grid = new BrickGrid(1);
    expect(grid).toBeDefined();
  });
});

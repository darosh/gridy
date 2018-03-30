import {RadialGrid} from '../src/RadialGrid';

describe('RadialGrid', () => {
  it('should construct', () => {
    const grid = new RadialGrid(1);
    expect(grid).toBeDefined();
  });
});

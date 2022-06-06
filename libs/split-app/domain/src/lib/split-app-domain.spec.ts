import { splitAppDomain } from './split-app-domain';

describe('splitAppDomain', () => {
  it('should work', () => {
    expect(splitAppDomain()).toEqual('split-app-domain');
  });
});

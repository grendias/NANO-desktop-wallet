import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Transform | timestamp', () => {
  setupTest('transform:timestamp', {
    // Specify the other units that are required for this test.
    // needs: ['transform:foo']
  });

  // Replace this with your real tests.
  it('exists', function() {
    const transform = this.subject();
    expect(transform).to.be.ok;
  });
});

const assert = require('assert');

const operations = require('../src/operations');

describe('Operations tests', () => {
  it('Correct card number 4532015112830366', () => {
    const expectedResultN = 4532015112830366;
    const expectedResultS = `Card number: ${expectedResultN} is valid `;
    const [rShowingResult, rNumber] = operations.parseAndCheckInput('A=4532015112830366');
    const a = parseInt(rNumber, 10);
    /*
    if (rShowingResult !== expectedResultS) {
      throw new Error(`Expected: ${expectedResultS}, but got: ${rShowingResult}`);
    }
    */
    assert.strictEqual(rShowingResult, expectedResultS);
    assert.strictEqual(a, expectedResultN);
    assert.strictEqual(rNumber, expectedResultN);
  });

  it('InCorrect card number 4532015112830361', () => {
    const expectedResultN = 4532015112830361;
    const expectedResultS = `Card number: ${expectedResultN} is NOT valid `;
    const [rShowingResult, rNumber] = operations.parseAndCheckInput('A=4532015112830361');
    if (rShowingResult !== expectedResultS) {
      throw new Error(`Expected: ${expectedResultS}, but got: ${rShowingResult}`);
    }
    assert.strictEqual(rNumber, expectedResultN);
  });

  it('InCorrect card number random digits and chars', () => {
    const expectedResultN = 0;
    const expectedResultS = `Card number: ${expectedResultN} is NOT valid `;
    const [rShowingResult, rNumber] = operations.parseAndCheckInput('A=4532aotr1283op61');
    if (rShowingResult !== expectedResultS) {
      throw new Error(`Expected: ${expectedResultS}, but got: ${rShowingResult}`);
    }
    assert.strictEqual(rNumber, expectedResultN);
  });

  it('InCorrect card number empty field', () => {
    const expectedResultN = 0;
    const expectedResultS = '';
    const [rShowingResult, rNumber] = operations.parseAndCheckInput('');
    if (rShowingResult !== expectedResultS) {
      throw new Error(`Expected: ${expectedResultS}, but got: ${rShowingResult}`);
    }
    assert.strictEqual(rNumber, expectedResultN);
  });
});

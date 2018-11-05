const operations = require('./operations');

it('Correct card number 4532015112830366', function() {
  const expectedResultN = 4532015112830366;
  let expectedResultS = `Card number: ${expectedResultN} is valid `;
  let [rShowingResult, rNumber] = operations.parseAndCheckInput('A=4532015112830366');
  let a = parseInt(rNumber);
     if (rShowingResult!==expectedResultS && expectedResultN!==a) {
    throw new Error(`Expected: ${rShowingResult}, but got: ${expectedResultS}`);
 } });

it('InCorrect card number 4532015112830361', function(){
  const expectedResultN = 4532015112830361;
  let expectedResultS = `Card number: ${expectedResultN} is NOT valid `;
  let [rShowingResult, rNumber] = operations.parseAndCheckInput('A=4532015112830361');
     if (rShowingResult!==expectedResultS) {
    throw new Error(`Expected: ${rShowingResult}, but got: ${expectedResultS}`);
 } });

it('InCorrect card number random digits and chars', function(){
  const expectedResultN = 0;
  let expectedResultS = `Card number: ${expectedResultN} is NOT valid `;
  let [rShowingResult, rNumber] = operations.parseAndCheckInput('A=4532aotr1283op61');
     if (rShowingResult!==expectedResultS) {
    throw new Error(`Expected: ${rShowingResult}, but got: ${expectedResultS}`);
 } });

it('InCorrect card number empty field', function(){
  const expectedResultN = 0;
  let expectedResultS = ``;
  let [rShowingResult, rNumber] = operations.parseAndCheckInput('');
     if (rShowingResult!==expectedResultS) {
    throw new Error(`Expected: ${rShowingResult}, but got: ${expectedResultS}`);
 } });
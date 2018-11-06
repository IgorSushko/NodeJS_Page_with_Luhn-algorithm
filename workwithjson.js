const fs = require('fs');

module.exports.saveToLogFile = (showingResult, number) => {
  let currentTime = Date.now();
  let jsonObj = {
    cardNumber: `${number}`,
    verificationResult: `${showingResult}`,
    verificationTime: `${currentTime}`
  };
  let jsonObjstring = JSON.stringify(jsonObj);
  fs.appendFileSync('./TestTask/cardValidatorLog.json', jsonObjstring);
};

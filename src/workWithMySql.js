const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  database: 'testmysql',
  user: 'igor',
  password: 'nicecti1!',
});

connection.connect(function(err){
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
    }
  console.log('Connected as id ' + connection.threadId);
});
/**
 * @param {void} 
 * @returns {string} results
 */
module.exports.readFromDb = () => {
  connection.query('SELECT * FROM tblLuhnResult1', function (error, results, fields) {
    if (error) throw error;
    results.forEach(result => {
      console.log(result); });
      return results;
  });
};

/**
 * @param {int} Rcardnumber, {string} Rresult, {string} Rcomments
 * @returns {void}
 */
module.exports.writeToDb = (Rcardnumber, Rresult, Rcomments = '') => {
  const RtimeStamp = Date.now();
  connection.query('INSERT INTO tblLuhnResult1 (cardnumber, result,timeStamp,comments) VALUES (?,?,?,?)', [Rcardnumber, Rresult, RtimeStamp, Rcomments], function (error, results, fields) {
    if (error) throw error;});
   };

//connection.end();

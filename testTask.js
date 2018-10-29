const http = require('http');
const fs = require('fs');
const fastluhn = require('fast-luhn');

const PORT = 8080;


http.createServer((request, response) => {
  console.log(`Request was made :${request.url}`);
  console.log(`Request method :${request.method}`);

  if (request.method === 'GET') {
    if (request.url === '/') {
      response.writeHeader(200, { 'Content-Type': 'text/html' });
      fs.readFile('./TestTask/index.html', 'utf8', (error, data) => {
        const answerValue = 'Your result will be shown here';
        const replaced = data.toString().replace('{answerValue}', answerValue);
        response.end(replaced);
      });
    } else if (request.url === '/Style.css') {
      response.writeHeader(200, { 'Content-Type': 'text/css' });
      fs.createReadStream('./TestTask/Style.css', 'utf8').pipe(response);
    } else if (request.url === '/favicon.png' || '/favicon.ico') {
      console.log('Request method for favicon');
      response.writeHeader(200, { 'Content-Type': 'image/png' });
      fs.createReadStream('./TestTask/favicon.png').pipe(response);
    }
  } else if (request.method === 'POST') {
    console.log(`Request method :${request.method}`);
    request.on('data', (chunk) => {
      const formdata = chunk.toString();
      const number = eval(formdata.split('&')[0]);
      console.log(number);

      const result = fastluhn(number.toString());
      let showingResult = '';
      if (result === true) {
        showingResult = `Card number: ${number.toString()} is valid `;
      } else {
        showingResult = `Card number: ${number.toString()} is NOT valid `;
      }

      response.setHeader('Content-Type', 'text/html');
      fs.readFile('./TestTask/index.html', 'utf8', (error, data) => {
        const replaced = data.toString().replace('{answerValue}', showingResult);
        response.end(replaced);
      });
      // response.writeHead(200);
    }); // response.end(form);
  } else {
    response.writeHead(200);
    response.end();
  }
}).listen(PORT);


// http://localhost:8080/


// example card number  == 4532015112830366
// https://www.npmjs.com/package/fast-luhn

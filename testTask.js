const http = require('http');
const fs = require('fs');
const fastluhn = require('fast-luhn');

const PORT = 8080;
const TEMPLATE_PATH = './index.html';
const TEMPLATE_FILES = {
  '/Style.css': {
    type: 'text/css',
    path: './Style.css',
  },
  '/favicon.png': {
    type: 'image/png',
    path: './favicon.png',
  },
  '/favicon.ico': {
    type: 'image/png',
    path: './favicon.png',
  },
};
function showHtml(response, answerValue, enteredValue) {
  response.writeHeader(200, { 'Content-Type': 'text/html' });
  fs.readFile(TEMPLATE_PATH, 'utf8', (error, data) => {
    const replaced = data.toString()
      .replace('{answerValue}', answerValue)
      .replace('{enteredValue}', enteredValue);
    response.end(replaced);
  });
}
http.createServer((request, response) => {
  console.log(`Request was made :${request.url}`);
  console.log(`Request method :${request.method}`);

  if (request.method === 'GET') {
    if (TEMPLATE_FILES[request.url]) {
      response.writeHeader(200, { 'Content-Type': TEMPLATE_FILES[request.url].type });
      fs.createReadStream(TEMPLATE_FILES[request.url].path).pipe(response);
    } else {
      showHtml(response, 'Your result will be shown here', ' ');
    }
  } else if (request.method === 'POST') {
    console.log(`Request method :${request.method}`);
    request.on('data', (chunk) => {
      const formdata = chunk.toString();
      console.log('chunk', formdata);
      const tmp = formdata.split('&')[0];
      console.log('chunk splitted &', tmp);

      let showingResult = '';
      let number = 0;
      if (tmp) {
        const tmp2 = tmp.split('=')[1];
        console.log('chunk splitted &=', tmp2);
        if (tmp2) {
          number = tmp2 * 1;
          console.log('chunk splitted &= and transformed to number', number);
          if (fastluhn(number.toString()) === true) {
            showingResult = `Card number: ${number.toString()} is valid `;
          } else {
            showingResult = `Card number: ${number.toString()} is NOT valid `;
          }
        }
      }
      showHtml(response, showingResult, number);
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

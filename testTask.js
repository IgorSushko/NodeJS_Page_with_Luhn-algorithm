const http = require('http');
const fs = require('fs');
const fastluhn = require('fast-luhn');
const extnote = require('./funcfile.js');


const TEMPLATE_PATH = './TestTask/index.html';
const TEMPLATE_FILES = {
  '/Style.css': {
    type: 'text/css',
    path: './TestTask/Style.css',
  },
  '/favicon.png': {
    type: 'image/png',
    path: './TestTask/favicon.png',
  },
  '/favicon.ico': {
    type: 'image/png',
    path: './TestTask/favicon.png',
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
      const [showingResult, number] = extnote.parseAndCheckInput(chunk.toString());
      showHtml(response, showingResult, number);
      // response.writeHead(200);
    }); // response.end(form);
  } else {
    response.writeHead(200);
    response.end();
  }
}).listen(extnote.PORT);


// http://localhost:8080/


// example card number  == 4532015112830366
// https://www.npmjs.com/package/fast-luhn

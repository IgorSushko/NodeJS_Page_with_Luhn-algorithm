const http = require('http')
const fs = require('fs')
const fastluhn=require('fast-luhn')

const PORT=8080;


const server =http.createServer(function(request,response){

        console.log ('Request was made :' + request.url);
        console.log ('Request method :' + request.method);

     if (request.method == "GET") {
            if (request.url==='/') {
                    response.writeHeader(200, {"Content-Type": "text/html"}); 
                    
                    var myHtml=fs.readFile('./TestTask/index.html','utf8',function(error, data){
                 
                        const answerValue = "Your result will be shown here"; 
                        data = data.toString().replace('{answerValue}', answerValue);
                        response.end(data);}); 
                } 

            else if (request.url==='/Style.css') {
                    response.writeHeader(200, {"Content-Type": "text/css"});  
                    const myHtml=fs.createReadStream('./TestTask/Style.css','utf8');
                    myHtml.pipe(response);
                }
            else if (request.url==='/favicon.png' ||'/favicon.ico' ) {
                        console.log('Request method for favicon');
                        response.writeHeader(200, {"Content-Type": "image/png"});  
                        const myHtml=fs.createReadStream('./TestTask/favicon.png');
                        myHtml.pipe(response);
                } } 
      else if (request.method == 'POST') {

            console.log('Request method :' + request.method); 
            request.on('data', function(chunk) {

                let formdata = chunk.toString();      
                let number = eval(formdata.split("&")[0]);
                console.log(number);

                let result = fastluhn(number.toString());
                var showingResult=''; 
                    if (result==true) {
                            showingResult='Card number: '+number.toString()+' is valid ';
                                       }  
                         else {
                            showingResult='Card number: '+number.toString()+' is NOT valid ';
                                       }   
                           
                       response.setHeader('Content-Type', 'text/html');
                       var myHtmlresp=fs.readFile('./TestTask/index.html','utf8',function(error, data) {
                            const answerValue = showingResult; 
                            data = data.toString().replace('{answerValue}', answerValue);
                            response.end(data);});
                       //response.writeHead(200);
                        }) //response.end(form);

        } else {
             response.writeHead(200);
             response.end();
              };

}).listen(PORT);

  
//http://localhost:8080/


// example card number  == 4532015112830366
//https://www.npmjs.com/package/fast-luhn
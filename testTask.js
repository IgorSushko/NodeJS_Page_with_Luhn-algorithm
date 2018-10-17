var http = require('http');
var fs = require('fs');
var fastluhn=require('fast-luhn');

const PORT=8080; 


var server =http.createServer(function(request,response){
        console.log('Request was made :' + request.url);
        console.log('Request method :' + request.method);
     if(request.method == "GET"){
            if(request.url==='/'){
                     response.writeHeader(200, {"Content-Type": "text/html"});  
                    var myHtml=fs.createReadStream('./TestTask/index.html','utf8');
                    myHtml.pipe(response);}
            else if(request.url==='/Style.css'){
                    response.writeHeader(200, {"Content-Type": "text/css"});  
                    var myHtml=fs.createReadStream('./TestTask/Style.css','utf8');
                    myHtml.pipe(response);
                    }
        } else if(request.method == 'POST'){
            console.log('Request method :' + request.method); 
            request.on('data', function(chunk) {

                //grab form data as string
                var formdata = chunk.toString();
                var number = eval(formdata.split("&")[0]);
                console.log(number);

                var result = fastluhn(number.toString());
                var showingResult=''; 
                    if(result==true){
                            showingResult='Card number: '+number.toString()+' is valid ';
                         }  else{
                            showingResult='Card number: '+number.toString()+' is NOT valid ';
                         }   
                     

                
                form ='<!DOCTYPE html> \
                <html> \
                    <head> \
                    <H1>This page verify Is your Banks card valid</H1> \
                    <title>Banks card validator</title> \
                    <meta charset="UTF-8"> \
                    <link rel="stylesheet" type="text/css" href="Style.css"> \
                    </head> \
                <body> \
                <hr> \
                <br/> \
                <br/> \
                <br/> \
                <h1 class="headTitle">Input your card number</h1> \
                    <form action="/" method="post"> \
                          <table class="inputPart"> \
                                <tr> \
                                    <td ></td> \
                                    <td > \
                                        Card: <input style="font-size:20px;" type="text" id="cardValue" value="'+number.toString()+'" size="32"> \
                                        <br/> \
                                        <br/> \
                                        <br/> \
                                        <button onclick="information()" >Try it</button>  <!--<button onclick="myFunction()">Try it</button>--></td> \
                                    <td ></td> \
                                </tr> \
                                <tr> \
                                    <td></td> \
                                    <td><h1>Your result is:</h1></td> \
                                    <td></td>   \
                                </tr> \
                                 <tr> \
                                     <td></td> \
                                     <td><input style="font-size:20px;" type="text" id="cardValueRes" value="'+showingResult+'" size="47"></td> \
                                     <td></td> \
                                 </tr> \
                          </table> \
                    </form> \
                            </body> \
                       </html>' ;

                       response.setHeader('Content-Type', 'text/html');
                       response.writeHead(200);
                       response.end(form);
            })





        } else {
            response.writeHead(200);
            response.end();
          };

}).listen(PORT);

  
//http://localhost:8080/


// example card number  == 4532015112830366
//https://www.npmjs.com/package/fast-luhn
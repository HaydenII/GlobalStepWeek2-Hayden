class httpserver {
    /*
        The following code starts an HTTP server on the locahost
    using the http library.

        I've attached a listen callback for the server which prints
    a string to the console when the server activates.

        If you want to add handling for other HTTP commands (GET, POST, DELETE)
    then you could use a webframework to make it easier. Express is a common 
    webframework.

        Express has handlers for various HTTP commands at different URL paths
    It can insert data into templte HTML files. It also has the ability to
    involve middleware at any point of his handling pipeline, which expands
    its capabilities massively.

        Common Express middleware packages are Cookies, Sessinos, User Logins,
    URL parameters, POST data, Security Headers, and many more.
    Here is a list of middleware packages for Express: https://expressjs.com/en/resources/middleware.html
    */
    example () {
        // Load HTTP module
        const http = require("http");

        const hostname = "127.0.0.1";
        const port = 8000;

        // Create HTTP server
        // Express should make this a lot easier
        const server = http.createServer((req, res) => {
            if(req.url === "/"){
                res.write("This is the homepage")
            }
            else if (req.url === "/second"){
                res.write("this is the second page")
            }
            else if (req.url === "/secret"){
                res.write("this is the secret page")
            }else{
                res.write("No man's land")
            }

            res.end();
        });

        // Prints a log once the server starts listening
        server.listen(port, hostname, () => {
            console.log(`Server running at http://${hostname}:${port}/`);
        })

        .close();
    }   
}


class asyncexample{
    /*
    ASYNC
        Async is a function that you declare with the async keyword:
    e.g. async function functionname() {  }
    Async enables promised based behaviour

        The following code calls asyncCall(), which creates a promise object.
    The promise object has an onsuccess callback which resolves the promise 
    after 3 seconds. The await keyword before the call to resolveAfter2Seconds()
    tells the program to wait for the promise to resolve before continuing.
    
    The async keyword for asyncCall() commanded the function to run on a separate 
    thread it also enabled the use of the await keyword, which paused the thread 
    and waited for the promise to resolve before continuing. 
        You can prove that it ran on a separate thread by observing that the 
    console.log() command written after the asyncCall() function call printed before
    the result of the promise. Therefore the system did not wait for the async function
    to complete before executing the code following it.
*/
    example (){
        function resolveAfter2Seconds() {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve('resolved');
              }, 2000);
            });
          }
          
          async function asyncCall() {
            console.log('calling');
            const result = await resolveAfter2Seconds();
            console.log("res " + result);
            // expected output: "resolved"
          }
          
          asyncCall();
        
          console.log("This prints before the result")
    }
}


// --- END OF EXAMPLES --- 




// ---

const sqlConnection = require('./dbConnection')
const port = 3000;

const express = require('express')
const app = express()




app.get('/DB_ID/:id', (req, res, next) =>{
    console.log("Request URL " + req.url);
    console.log("Request Params" + JSON.stringify(req.params));

    sqlConnection.query(`select * from flowers where id = "${req.params.id}"`, (err, result) =>{
        if (err){
            throw error;
        }else{
            //console.log("RESULT: " + result[0].variety)
            //console.log(JSON.stringify(result)) // Print the json as a string
            res.json(result)
        }
    });
})

app.get('/variety/:id/', (req, res, next) =>{
    console.log("Request URL " + req.url);
    console.log("Request Params" + JSON.stringify(req.params));

    sqlConnection.query(`select * from flowers where variety = "${req.params.id}"`, (err, result) =>{
        if (err){
            throw error;
        }else{
            //console.log("RESULT: " + result[0].variety)
            //console.log(JSON.stringify(result)) // Print the json as a string
            res.json(result)
        }
    });
})

app.listen(port, () => {
    console.log("Server started on port 3000")
})

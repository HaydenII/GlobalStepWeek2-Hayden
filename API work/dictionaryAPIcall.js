/// <reference types="node-fetch" />
const fetch = require("node-fetch");

/*
Fetch API

Fetch provides a generaic definition of Request and Response objects

*** fetch() ***
    Use WindowOrWorkerGlobalScope.fetch()  to request and fetch a resource.
    Fetch() Takes one mandatory arguement, the path to the resource, and it 
        returns a promise object which resolves to a Request object.

    e.g.
    var img = fetch(http:://www.exampleapi.com/blah/blah)
    .then(response => response.blob())
    .then(function(blob){
        // do something with the blob
    })
    

*** RESPONSE ***
    A response object holds the data retrieved by the fetch request
    Call the blob() method to convert it to a blob object. A blob object represents
        the data inside the response object as immutable raw data tha can be read
        like text or binary data
    Blobs can represent data that isn't even in JavaScript-native format.


*** PROMISE ***
    A promise object is an IOU for a value that isn't necessarily known when 
        the promise is created.
    Promise objects are returned by fetch(). Because fetch involves retreiving
        resources over a network, it takes time to retreieve the request.
        The promise it returns is an IOU for the object and it has 3 states:
            - Pending (Initial state)
            - Fulfilled (Sucessfull completion)
            - Rejected (Failed to fetch)
    If a promise fails it should contain an error to explain why it failed.
    If a promise succeeds it should contain the fetched resource.
    Whether the Promise fails or succeeds, the callbacks queued up by
        the Promises then() method are called 

    Example of then() method call
    .then(onFulfillment)
    .then(onRejection)

    A promise object will resolve into a response object upon completion

*/

class DynURL{
    constructor(inBASEURL){
        this.BASEURL = inBASEURL;
        this.compositeURL = inBASEURL;
    }
    
    and(addition){
        this.compositeURL += '/' + addition
        return this
    }

    get(){
        let retURL = this.compositeURL;
        this.compositeURL = this.BASEURL
        return retURL
    }
}

class wordLookUp{
    constructor(inBASEURL){
        this.URL = new DynURL(inBASEURL)
        this.word = ""
    }

    setWord(inWord){
        this.word = inWord;
    }

    lookup(inFunction){
        if (!this.word) { console.log("You have not set a word in wordLookUp object. Returning."); return; }

        dictionaryURL = new DynURL("https://api.dictionaryapi.dev").and("api").and("v2").and("entries").and("en_GB").and(this.word).get()

        // Promise returned from fetch request
        const ret_prom = fetch(dictionaryURL)

        ret_prom.then(
        (res) => { // Callback for success - Could still be a 404
            console.log("Successful request")
            console.log("Response code is " + res.status)
            if(res.status === 200){
                res.json().then(function(data) {
                    // using my own callback implementation just because I can
                    inFunction(data);
                });
            }else{
                console.log("unable to handle response from API")
            }
        }, 
        (res) => { // Callback for rejected (i.e network error)
            console.log("Failed request")
        })


    }
}

var word = "unique";
dictionaryURL = new DynURL("https://api.dictionaryapi.dev").and("api").and("v2").and("entries").and("en_GB").and(word).get()


var a = new wordLookUp();

a.setWord("unique")

a.lookup((data) =>{
    //console.log(JSON.stringify(data)) // Print the json as a string

    if (data[0].hasOwnProperty("word")) { console.log("Word: " + data[0].word); }

    //TODO FIGURE OUT HOW TO ITERATE JSON ARRAY FOR ALL DEFINITIONS AND EXAMPLES

    console.log("Definition: " + data[0].meanings[0].definitions[0].definition);
    console.log("Example: " + data[0].meanings[0].definitions[0].example)
    let wordPronounceURL = data[0].phonetics[0].audio

    // ONLY WORKS IN BROWSERS
    // NODE JS DOESN'T SUPPORT AUDIO API
    //var audio = new Audio(wordPronounceURL);
    //audio.play();
})

/*
// Promise returned from fetch request
const ret_prom = fetch(dictionaryURL)

ret_prom.then(
(res) => { // Callback for success - Could still be a 404
    console.log("Successful request")
    console.log("Response code is " + res.status)
    if(res.status === 200){
        res.json().then(function(data) {
            //console.log(JSON.stringify(data)) // Print the json as a string

            if (data[0].hasOwnProperty("word")) { console.log("Word: " + data[0].word); }

            //TODO FIGURE OUT HOW TO ITERATE JSON ARRAY FOR ALL DEFINITIONS AND EXAMPLES

            console.log("Definition: " + data[0].meanings[0].definitions[0].definition);
            console.log("Example: " + data[0].meanings[0].definitions[0].example)
            let wordPronounceURL = data[0].phonetics[0].audio

            // ONLY WORKS IN BROWSERS
            // NODE JS DOESN'T SUPPORT AUDIO API
            var audio = new Audio(wordPronounceURL);
            audio.play();

        });
    }else{
        console.log("unable to handle response from API")
    }
}, 
(res) => { // Callback for rejected (i.e network error)
    console.log("Failed request")
})
*/


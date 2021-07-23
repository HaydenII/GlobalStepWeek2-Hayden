/*
    CONNECTING TO MONGODB

    --- HOW MONGODB STORES DATA ---
        - MongoDB stores data in BSON documents. BSONs are binary representation of JSON 
        - In MongoDB documents are key/value pairs, similar to javscript objects.
        - Groups of documents are stored in collections. Collections are simply tables.
        - Every document is required to have an _id field and it must be unique for each
            document in a collection. The _id field can be of any type other than an array.




*/

publicKEY = "rkvdmvet"
privateKEY = "a9f08a4c-91da-41e2-8b04-f19308eb8791"

// import 
const { MongoClient } = require('mongodb');

// URI
const uname = "haydenadmin";
const pass = "haydenadmin";
const clusterURL = "cluster0.eqehs.mongodb.net";
const uri = `mongodb+srv://${uname}:${pass}@${clusterURL}/myFirstDatabase?retryWrites=true&w=majority`;

async function listDB(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

// This is where I'll connect to the db, make requests and disconnect
async function main() {
    // The second argument key value pair remove depreciation warnings by using newer methods
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Await pauses execution until this promise is resolved.
    await client.connect();

    try {
        await client.connect();
    
        await listDB(client);
     
    } catch (e) {
        console.error(e);
    }

    finally {
        console.log("Closing")
        await client.close();
    }

}



main().catch(console.error);
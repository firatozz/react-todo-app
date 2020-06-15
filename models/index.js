const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://firat_oz:frt01+-*@todocase-c13kv.mongodb.net/todo-app?connectTimeoutMS=300000", {
    //mongodb://localhost:27017/todo-app?connectTimeoutMS=300000
    // connecting to the mongodb database name: "todo-app" locally
    keepAlive: true, // keeping the connection alive
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
mongoose.set("debug", true) // enabling debugging information to be printed to the console for debugging purposes
mongoose.Promise = Promise // setting mongoose's Promise to use Node's Promise


module.exports.Todo = require("./todo") // requiring the todo model that we just created in mongodb



// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://firat_oz:<password>@todocase-c13kv.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

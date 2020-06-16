const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://firat_oz:frt01+-*@todocase-c13kv.mongodb.net/todo-app?connectTimeoutMS=300000", { // connecting to the mongodb database name: "todo-app"
    keepAlive: true, // keeping the connection alive
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
mongoose.set("debug", true) // enabling debugging information to be printed to the console for debugging purposes
mongoose.Promise = Promise // setting mongoose's Promise to use Node's Promise

module.exports.Todo = require("./todo") // requiring the todo model that we just created in mongodb

const express = require("express") //our express server
const path = require('path');
const app = express() // generate an app object
const bodyParser = require("body-parser") // requiring the body-parser
const PORT = process.env.PORT || 8080 // port that the server is running on => localhost:8080
const db = require("./models")
const cors = require("cors") // allows cross domain http request.
const Limiter = require('express-rate-limiter'); // limiter repeated requests to public APIs and/or endpoints.
var MemoryStore = require('express-rate-limiter/lib/memoryStore');
const limiter = new Limiter({ db: new MemoryStore(), outerLimit: 260, innerLimit: 23 }); 
const helmet = require('helmet'); // secure app by setting various HTTP headers.
const morgan = require('morgan'); // HTTP request logger middleware
var validator = require('validator'); // provide to defend unexpected request

app.use(cors())
app.use(helmet());
app.use(limiter.middleware());
app.use(morgan('dev'));
app.use(express.urlencoded()) // telling the app that we are going to use json to handle incoming payload


//The success function accepts the res object and the payload and send a 200 status code with the payload in the response
function success(res, payload) { 
    return res.status(200).json(payload);
}


/*
getting all the todos. app.get() tells express that the route "/todos" is a get route. 
The second paramater async (req,res,next)=>{ codes... } is the function that gets called when the server receives this request.
*/
app.get("/api/todos", async (req, res, next) => {
    try {
        const todos = await db.Todo.find({})
        return success(res, todos)
    } catch (err) {
        next({
            status: 400,
            message: "failed to get todos"
        })
    }
});


// accepts an id and getting specific todo.
app.get("/api/todos/:id", async (req, res, next) => {
    if(validator.isMongoId(req.params.id)){
    try {
        const todos = await db.Todo.find({"_id": req.params.id})
        return success(res, todos)
    } catch (err) {
        next({
            status: 400,
            message: "failed to get todos"
        })
    }
}
else {
    next({
        status: 403,
        message: "Unprocessible entry, please try to send a decent MongoID"
    })
}
});


/*
updating a todo with the given id we update the todo by calling await db.Todo.findByIdAndUpdate(req.params.id, req.body, {new:true}). 
req.params contains all the route parameters that we specified.
req.body contains the new information that we want to update the task with. 
The last parameter {new:true} tells mongoose that we want the updated task to be returned.
*/
app.put("/api/todos/:id",async (req, res, next) => {
    if(validator.isMongoId(req.params.id)){
    try {
        console.log("Body: " + req.body.completed);
        console.log("Body: " + req.body.task);

        const todo = await db.Todo.findByIdAndUpdate(req.params.id, req.body , {
            new: true,
        })

        return success(res, todo)
    } catch (err) {
        next({
            status: 400,
            message: "failed to update todo"
        });
    }
}
else {
    next({
        status: 403,
        message: "Unprocessible entry, please try to send a decent MongoID"
    })
}
});


/*creating a new todo we called await db.Todo.create(req.body) to create a new todo. 
req.body contains the request payload that will contain the task to be created.
*/
app.post("/api/todos/",async (req, res, next) => {
    if( validator.isLength(req.body.task,{min:1, max: 80}) && validator.isBoolean(req.body.completed) ){
    try {
        console.log("Body: " + req.body.completed);
        console.log("Body: " + req.body.task);

        const todo = await db.Todo.create(req.body)

        return success(res, todo)
    } catch (err) {
        next({
            status: 400,
            message: "failed to update todo"
        });
    }
}
else {
    next({
        status: 403,
        message: "Unprocessible entry, please send task data up to 250 characters and status as boolean"
    })
}
});


// deleting a todo with the given id we call await db.Todo.findByIdAndRemove(req.params.id)
app.delete("/api/todos/:id", async (req, res, next) => {
    if(validator.isMongoId(req.params.id)){
    try {
        await db.Todo.findByIdAndDelete(req.params.id)
        return success(res, "todo deleted!")
    } catch (err) {
        next({
            status: 400,
            message: "failed to delete todo"
        });
    }
}
    else {
        next({
            status: 403,
            message: "Unprocessible entry, please try to send a decent MongoID"
        })
    }
});


//This is our error handler. Whenever we call next({status: 400, message: "failed to do something"}), we are passing the error object to the error handler.
app.use((err, req, res, next) => {
    return res.status(err.status || 400).json({
        status: err.status || 400,
        message: err.message || "there was an error processing request"
    });
});



app.use(express.static(path.join(__dirname, 'build'))); // serves all our static files from the build directory.


app.get('/*', (req, res) => { // this is to keep our client side routing functional. This code essentially serves the index.html file on any unknown routes.
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(PORT, () => {
    // listening on port 8080
    console.log(`listening on port ${PORT}`) // print this when the server starts
})



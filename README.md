# Todo-app with React, NodeJS, MongoDB

  - ExpressJS - is the server framework with Node JS under the hood.</h6>
  - body-parser - allows express to parse the request payload into the req.body object. More about this later.</h6>
  - mongoose - high level API for interacting with our MongoDB database.</h6>
  - Nodemon - This handy tools allows you to edit your server files and see the change propagate in real time without starting the server each time with node index.js</h6>
  - Axios - allows us to send http request from out react frontend to our todo API.
  - Cors - allows cross domain http request. In other words, without enabling cors on the backend, even Axios will not able to send our request to the API.


#### Created the Todo Model (models/todo.js)
A model is just a blue print for an object that we want to store in our database. It describes the structure and fields that pertains to a specific kinds of data.


#### Establishing API Endpoints
API endpoints are just URL’s that can be used to make request to a service or a system.

#### How should we structure our API Endpoints?
establish what kinds of functionality we want to expose. In our case, we need to be able to add a new todo, delete a todo, update a todo, and retrieve all the todos
formulate the routes. 

#### Our todo API will have the following endpoints:
<li>GET  api/todos =>getting all todos </li>
<li>POST  api/todos =>adding a new todo </li>
<li>PUT  api/todos/:id =>updating a todo with the matching id </li>
<li>DELETE  api/todos/:id =>deleting a todo with matching id </li>





import axios from "axios"
const qs = require('qs')
const API_URL = "/api/todos/"

// createTodo => accepts a task and sends a post via axios.post to our API_URL and returns the newTodo. Axios stores the response of our requests in a field called data:
async function createTodo(todo) {
    const { data: newTodo } = await axios.post(API_URL, qs.stringify(todo))
    return newTodo
}

// deleteTodo(id) => accepts an id and sends a delete request to our API.
async function deleteTodo(id) {
    const message = await axios.delete(`${API_URL}${id}`)
    return message
}

// updateTodo => accepts an id and a payload object contain fields that we want to update => payload= {task} .It sends a PUT request to update the todo.
async function updateTodo(id, payload) {
    const { data: newTodo } = await axios.put(`${API_URL}${id}`, qs.stringify(payload))
    return newTodo
}

// updateTodo => accepts an id and a payload object contain fields that we want to update => payload= {completed: true or false} .It sends a PUT request to update the todo.
async function toggleTodo(id, payload) {
    const { data: newTodo } = await axios.put(`${API_URL}${id}`, qs.stringify(payload))
    return newTodo
}

// getAllTodos => fetching all the todos from our API via axios.get
async function getAllTodos() {
    const { data: todos } = await axios.get(API_URL)
    return todos
}

// getAllTodos => accepts an id and sends a get request to our API. fetching todo from our API via axios.get
async function getTodo(id) {
    const { data: todos } = await axios.get(`${API_URL}${id}`)
    return todos
}

// all these functions accessible in other files using an export function
export default { createTodo, deleteTodo, updateTodo, toggleTodo, getAllTodos , getTodo }
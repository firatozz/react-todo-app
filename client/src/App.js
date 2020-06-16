import React, { Component } from 'react';
import Todos from './Todos'
import AddTodo from './AddTodo'
import APIHelper from './APIHelper';

class App extends Component {

  state = {
      todos: []
  } 
  
// delete task func get id
  deleteTodo = (id) => {
    const todos = this.state.todos.filter(todo => {
      return todo._id !== id
    });
    APIHelper.deleteTodo(id);
    this.setState({
      todos
    });
  }

  // update task func get todo
  updateTodo = (todo) => {
    const todos = this.state.todos.filter(todoelm => {
      return todo._id !== todoelm._id
    });
    APIHelper.updateTodo(todo._id,{task: todo.task});
    let todos_upd = [...todos,todo]
    this.setState({
      todos_upd
    });
  }

  handleUpdateInput = (e,todo) => {
    const todos = this.state.todos.filter(todoelm => {
      return todo._id !== todoelm._id
    });
    todo.task = e.target.value;
    let todos_upd = [...todos,todo]
    this.setState({
      todos_upd
    });
  }


  handleCancelUpdate = (todo) => {
    const todos = this.state.todos.filter(todoelm => {
      return todo._id !== todoelm._id
    });
    APIHelper.getTodo(todo._id).then((result)  => {    
      todo.task=result[0].task
      let todos_upd = [...todos,todo]
      this.setState({
        todos_upd
      });
  });
   
  }

 // completed task func 
  toggleTodo = (todo) => {
    const todos =  this.state.todos.filter(todoelm => {
      return todo._id !== todoelm._id
    });
    todo.completed = todo.completed === true ? false : true
    APIHelper.toggleTodo(todo._id,{completed: todo.completed});
    let todos_upd = [...todos,todo]
    this.setState({
      todos_upd
    })
  }

// add task func 
  addTodo = (todo) => {    
    APIHelper.createTodo(todo).then((result)  => {
      todo._id=result._id
    let todos = [...this.state.todos,todo]
    this.setState({
      todos
    })
  })
  }

  
  render() {
   
    return (
      <div className="todo-app container">
        <h1 className="center blue-text">Todo's</h1>
        <Todos todos={this.state.todos} deleteTodo={this.deleteTodo} updateTodo={this.updateTodo}  toggleTodo={this.toggleTodo} handleUpdateInput={this.handleUpdateInput} handleCancelUpdate={this.handleCancelUpdate} />
        <AddTodo addTodo={this.addTodo}></AddTodo>
      </div>
    );
  }

  componentDidMount () {
    APIHelper.getAllTodos().then((result)  => {
            this.setState({
                todos: result
            });
            console.log(result);
        });
    }

}

export default App;

import React from 'react';


const Todos =  ({todos, deleteTodo, updateTodo, toggleTodo, handleUpdateInput, handleCancelUpdate}) => {


  const todoList = todos.length ? ( // api response check
    //callback
    todos.map(todo => { 
      
      return (
       
        <div className="collection-item row" key={todo._id}>
          <div className="col s8">
            <span onClick={() => {toggleTodo(todo)}} className={todo.completed === true ? "completed" : ""}>{todo.task}</span>
            <form onSubmit={(e) => {e.preventDefault();}} style={{display: todo.visibility ? 'block' : 'none' }}>
                  <input type="text" onChange={(e) => {  handleUpdateInput(e, todo)}} value={todo.task}></input>
                  <button className="waves-effect waves-light btn btn-small" onClick={() => {todo.visibility = false;updateTodo(todo)}}>ACCEPT</button>
                  <button className="waves-effect waves-light btn btn-small materialize-red" onClick={() => {todo.visibility = false;handleCancelUpdate(todo);}}>CANCEL</button>
            </form>
          </div>
          <div className="col s4">
              <span className="col right"><button className="waves-effect waves-light btn btn-small materialize-red" onClick={() => {deleteTodo(todo._id)}}>DELETE</button></span>
              <span className="col right"><button className="waves-effect waves-light btn btn-small" onClick={() => {todo.visibility = true;updateTodo(todo)}}>UPDATE</button></span>
            </div>
        </div>
      )
    })
  ) : (
    <p className="center">You have no todo's left!</p>
  );

  return (
    <div className="todos collection">
      {todoList}
    </div>
  )
}

export default Todos;

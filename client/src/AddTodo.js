import React, { Component } from 'react'

class AddTodo extends Component {
    state = {
        task: '',
        completed: false
    }

    // capture state change
    handleChange = (e) => {
        this.setState({
            task: e.target.value
            
        })
    }


    handleSubmit = (e) => {
        e.preventDefault(); //prevent refresh page
        this.props.addTodo(this.state)  // submit state which is set state
        this.setState({
            task: ''
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h6>Add new todo:</h6>
                    <input type="text" onChange={this.handleChange} value={this.state.task}></input>
                </form>
            </div>
        )
    }
}

export default AddTodo
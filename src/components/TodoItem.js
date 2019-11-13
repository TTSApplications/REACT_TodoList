import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class TodoItem extends Component{

    getStyle = () => {

        return{
            background: '#f4f4f4',
            padding: '10px',
            borderBottom:'1px #ccc dotted',
            //Checking if Task is completed
            textDecoration: this.props.todo.completed ? 'line-through' : 'none'
        }
    }

    render(){

        //Pull out id and title from this.props.todo
        const{ id, title } = this.props.todo;

        return(
            <div style ={this.getStyle()}>
                <p>
                    <input type="checkbox" 
                    onChange={this.props.markComplete.bind(this, id)}
                    /> {' '}
                    { title }
                    <button onClick={this.props.delTodo.bind(this, id)} style={btnStyle}>x</button>
                </p>
            </div>
        )

    }

}

//PropTypes
TodoItem.propTypes = {

    todo: PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired

}

//Creating a rounded delete button style
const btnStyle = {

    background: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'

}

//Creating style constant you can put in div style
//const itemStyle = {

//    backgroundColor: '#f4f4f4'

//}

export default TodoItem
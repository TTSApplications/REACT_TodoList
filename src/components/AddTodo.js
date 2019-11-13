import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class AddTodo extends Component {

    //Fields as a piece of State for Submit
    state = {

        title: ''

    }

    //Setting title to whatever value. This works for multiple fields whatever name it is
    onChange = (e) => this.setState({ [e.target.name] : e.target.value});

    onSubmit = (e) => {

        //Preventing it from submitting to the actual file
        e.preventDefault();

        this.props.addTodo(this.state.title); //We gotta pass this up to App.js

        //Clearing the fields after submitting
        this.setState({ title: '' });

    }
    

    render() {
        return (
            //Making it a flexbox
            <form onSubmit={this.onSubmit} style={{ display: 'flex'}}>
                <input 
                type="text" 
                name="title"
                style={{ flex: '10', padding: '5px'}}
                placeholder="Add Todo ..."
                value={this.state.title}
                onChange={this.onChange}
                />

                <input 
                type="submit"
                value="Submit"
                className="btn"
                style={{flex: '1'}}/>
            </form>
        )
    }
}

//PropTypes
AddTodo.propTypes = {

    addTodo: PropTypes.func.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired

}

export default AddTodo

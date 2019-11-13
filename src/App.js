import React, { Component } from 'react';

import { BrowserRouter as Router, Route} from 'react-router-dom';

import Header from './components/layout/Header';

import Todos from './components/Todos';
import AddTodo from './components/AddTodo';

import About from './components/pages/About';

import './App.css';

//For Random ID's. We downloaded this. (But don't need it for making requests to a server)
//import uuid from 'uuid'

import axios from 'axios';

class App extends Component{

  state = {

    //We are fetching the ToDos from the JSON place holder
    todos:[]

  }

  componentDidMount(){

    //Grabbing the Todos (10 of them)
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10').then(res => 
    this.setState({ todos : res.data}))

  }

//markComplete was put into App.js and not TodoItem
//or Todos because it has to climb a ladder to App.js.
//So this makes things easier.
markComplete = (id) => {

  //Changing the state of todo
  this.setState({todos: this.state.todos.map(todo => {
    //Checking if the id clicked matches the current
    //id it is running through in the list
    if(todo.id === id){

      //Setting it to the opposite of whatever it 
      //currently is so we can toggle the button
      // from whatever state it's in.
      todo.completed = !todo.completed;

    }

    return todo;

  })});

}

//Delete Todo (Again in App.js for same reason as markComplete)
delTodo = (id) => {

  //Backward quotes because we also need the ID
  axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res =>this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
  //So this would delete it on the server, and also update the UI

  //Using Filter method (loops through and returns
  // another array)

  //Three dots ... is the spread operator
  //this.setState({todos: [...this.state.todos.filter(
  //  todo => todo.id !== id)] });

}

//Adding todo (Again in App.js for same reason as markComplete)
addTodo = (title) => {

  //POST request doesn't actually make a change to the server, but it mimicks a real back-end
  //(Where we Make the Request from, {and object with the data we want to send, other info about it})
  axios.post('https://jsonplaceholder.typicode.com/todos', {title, completed: false})

  .then(res => this.setState({todos:[...this.state.todos, res.data] }));

}

//Creating display and what needs to be rendered to screen
render(){
  console.log(this.props.todos)
  return (
    <Router>
      <div className="App">

        <div className="container">

          <Header />

          <Route exact path="/" render={props => (

            <React.Fragment>
              <AddTodo addTodo={this.addTodo}/>
              <Todos todos ={this.state.todos} 
              markComplete={this.markComplete}
              delTodo={this.delTodo}/>
            </React.Fragment>

          )} />

          <Route path="/about" component={About}/>

        </div>

      </div>
    </Router>
  );
}
}

export default App;

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
       <div class="form">
	        <h1> consultar llave: </h1>
                <form action="http://192.168.130.180:5000/result" method="get">
                    Place: <input type="text" name="search"/>
                    <input type="submit" value="Submit"/>
                </form>
	    <h1> insertar valor </h1>
               <br></br>
               <br></br>
	        <form action="http://192.168.130.180:5000/insert" method="post">
	        LLave: <input type="text" name="key"/>
                Valor: <input type="text" name="value"/>
                <input type="submit" value="Submit"/>

	      </form>
       </div>
    );
  }
}

export default App;
ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

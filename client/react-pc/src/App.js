import React, {Component} from 'react';
import './App.css';
import Login from "./containers/Login";

class App extends Component {
    render() {
        return (
            <main className="App">
                <Login/>
            </main>
        );
    }
}

export default App;

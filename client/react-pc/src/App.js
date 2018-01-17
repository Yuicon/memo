import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.css';
import './common.css';
import {observer, Provider} from "mobx-react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from "./containers/Login/Login";
import SignUp from "./containers/SignUp/SignUp";
import Home from "./containers/Home/Home";

@observer
class App extends Component {
    render() {

        const rootStore = this.props.rootStore;

        return (
            <Provider
                rootStore={rootStore}
                userStore={rootStore.userStore}
            >
                <Router>
                    <main className="App">
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/signup" component={SignUp}/>
                    </main>
                </Router>
            </Provider>
        );
    }
}

App.propTypes = {
    rootStore: PropTypes.object,
};

export default App;

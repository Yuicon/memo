import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.css';
import {observer, Provider} from "mobx-react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from "./containers/Login/Login";

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
                        <Route exact path="/" component={Login}/>
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

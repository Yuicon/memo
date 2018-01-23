/**
 * @author Yuicon
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Home.css';
import {inject, observer} from "mobx-react/index";
import TextButton from "../../components/Common/TextButton";
import Card from "../../components/Card/Card";
import RecordFrom from "../../components/Record/RecordFrom";

@inject("userStore")
@observer
class Home extends Component {

    static propTypes = {
        userStore: PropTypes.object,
        history: PropTypes.object,
    };

    componentDidMount() {
        // this.props.userStore.rxCheck().subscribe(
        //     data => {
        //         console.log(data);
        //     },
        //     err => {
        //         console.log(err);
        //         this.props.history.push("/login");
        //     }
        // );
    }

    render() {

        return (
            <div className="home">
                <header className="header">
                    <h1 className="title">备忘录</h1>
                    <TextButton value={"退出"}/>
                </header>
                <a href="#" target="_blank" className="banner-href"/>
                <nav className="flex">
                    <div className="menu-list flex">
                        <TextButton value="增加"/>
                        <TextButton value="标签2"/>
                    </div>
                </nav>
                <main>
                    <div className="card-list">
                        {
                            Array.from({length: 12}).map((val, index) => {
                                return (
                                    <Card key={index} />
                                );
                            })
                        }
                    </div>
                </main>
                <RecordFrom/>
            </div>
        );

    }

}

export default Home;
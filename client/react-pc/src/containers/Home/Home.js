/**
 * @author Yuicon
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Home.css';
import {inject, observer} from "mobx-react/index";
import TextButton from "../../components/common/TextButton";
import Card from "../../components/Card/Card";

@inject("userStore")
@observer
class Home extends Component {

    static propTypes = {
        userStore: PropTypes.object,
        history: PropTypes.object,
    };

    componentDidMount() {
        this.props.userStore.check().then(() => {
            /**
             * 判断是否登陆或者token过期 Todo
              */
        });
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
                    <div className="menu flex">
                        <p>标签1</p>
                        <p>标签2</p>
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
            </div>
        );

    }

}

export default Home;
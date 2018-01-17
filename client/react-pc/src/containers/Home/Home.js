/**
 * @author Yuicon
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Home.css';
import {inject, observer} from "mobx-react/index";
import TextButton from "../../components/common/TextButton";

import banner from '../../assets/banner/ac-16-04.jpg';

@inject("userStore")
@observer
class Home extends Component {

    componentDidMount() {
        // this.props.userStore.check().then(() => {
        //     /**
        //      * 判断是否登陆或者token过期 Todo
        //       */
        // });
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

                </main>
            </div>
        );

    }

}

Home.propTypes = {
    userStore: PropTypes.object,
    history: PropTypes.object,
};

export default Home;
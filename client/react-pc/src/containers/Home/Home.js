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
import {Record} from "../../store/RecordStore";

@inject("userStore")
@observer
class Home extends Component {

    static propTypes = {
        userStore: PropTypes.object,
        history: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            record: Record.build(),
        };
    }

    componentDidMount() {
        this.props.userStore.rxCheck().subscribe(
            response => {
                console.log(response);
            },
            err => {
                console.log(err);
                this.props.history.push("/login");
            }
        );
    }

    handleClick = (record) => {
        this.setState({record, visible: true});
    };

    render() {

        const {visible, record} = this.state;

        const currentUser = this.props.userStore.currentUser;

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
                            currentUser.records.map(record => {
                                return (
                                    <Card key={record.id} onClick={this.handleClick.bind(this, record)}/>
                                );
                            })
                        }
                    </div>
                </main>
                <RecordFrom visible={visible} record={record}/>
            </div>
        );

    }

}

export default Home;
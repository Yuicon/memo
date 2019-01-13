/**
 * @author Yuicon
 */

import React, {Component} from 'react';
import Input from "../../components/Common/Input";
import Button from "../../components/Common/Button";
import TextButton from "../../components/Common/TextButton";
import {observer, inject} from "mobx-react";
import PropTypes from "prop-types";

@inject("userStore")
@observer
class Login extends Component {

    static propTypes = {
        userStore: PropTypes.object,
        history: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            loginParameters: {},
        };
    }

    handleChange = (field, value) => {
        const loginParameters = Object.assign({}, this.state.loginParameters);
        loginParameters[field] = value;
        this.setState({loginParameters}, () => console.log(this.state.loginParameters));
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.userStore.rxLogin(this.state.loginParameters)
            .subscribe(
                () => this.props.history.push("/"),
                err => console.log(err)
            );
    };

    handleClick = () => {
        this.props.history.push('/signup');
    };

    render() {
        return (
            <div className="flex full-screen">
                <form className="flex login" onSubmit={this.handleSubmit}>
                    <h3>登陆</h3>
                    <label htmlFor="email">邮箱</label>
                    <Input type="email" name="email" id="email" required={true}
                           onChange={this.handleChange.bind(this, 'email')}/>
                    <label htmlFor="password">主密码</label>
                    <Input type="password" name="password" id="password" required={true}
                           other={{
                               autoComplete: 'off'
                           }}
                           onChange={this.handleChange.bind(this, 'password')}/>
                    <Button type='submit' value='登陆'/>
                    <TextButton value='注册' onClick={this.handleClick}/>
                </form>
            </div>
        );
    }

}

export default Login;
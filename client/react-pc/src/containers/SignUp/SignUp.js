/**
 * @author Yuicon
 */

import React, {Component} from 'react';
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import TextButton from "../../components/common/TextButton";
import {observer, inject} from "mobx-react";
import PropTypes from "prop-types";

@inject("userStore")
@observer
class SignUp extends Component {

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
        this.props.userStore.signUpAction(this.state.loginParameters).then(() => {
            console.log(this.props.userStore.currentUser);
        })
    };

    handleClick = () => {
        this.props.history.push('/login');
    };

    render() {
        return (
            <div className="flex full-screen">
                <form className="flex login" onSubmit={this.handleSubmit}>
                    <h3>注册</h3>
                    <label htmlFor="email">邮箱</label>
                    <Input type="email" name="email" id="email" required={true}
                           onChange={this.handleChange.bind(this, 'email')}/>
                    <label htmlFor="name">昵称</label>
                    <Input type="text" name="name" id="name" required={true}
                           onChange={this.handleChange.bind(this, 'name')}/>
                    <label htmlFor="masterPassword">主密码</label>
                    <Input type="password" name="masterPassword" id="masterPassword" required={true}
                           other={{
                               autoComplete: 'off',
                               minLength: 6
                           }}
                           onChange={this.handleChange.bind(this, 'masterPassword')}/>
                    <Button type='submit' value='注册'/>
                    <TextButton value='登陆' onClick={this.handleClick}/>
                </form>
            </div>
        );
    }

}

export default SignUp;
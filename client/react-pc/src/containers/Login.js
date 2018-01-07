import React, {Component} from 'react';
import Input from "../components/common/Input";
import Button from "../components/common/Button";

class Login extends Component {

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
        console.log('handleSubmit');
    };

    render() {
        return (
            <div className="flex full-screen">
                <form className="flex login" onSubmit={this.handleSubmit}>
                    <h3>登陆</h3>
                    <label htmlFor="email">邮箱</label>
                    <Input type="email" name="email" id="email" required={true}
                           onChange={this.handleChange.bind(this, 'email')}/>
                    <label htmlFor="secretKey">密匙</label>
                    <Input type="text" name="secretKey" id="secretKey" required={true}
                           other={{
                               autoComplete: 'off'
                           }}
                           onChange={this.handleChange.bind(this, 'secretKey')}/>
                    <label htmlFor="masterPassword">主密码</label>
                    <Input type="password" name="masterPassword" id="masterPassword" required={true}
                           other={{
                               autoComplete: 'off'
                           }}
                           onChange={this.handleChange.bind(this, 'masterPassword')}/>
                    <Button type='submit' value='登陆'/>
                </form>
            </div>
        );
    }

}

export default Login;
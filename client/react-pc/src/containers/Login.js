import React, {Component} from 'react';

export default class Login extends Component {

    render() {
        return(
            <div className="flex full-screen">
                <main className="flex login">
                    <h3>登陆</h3>
                    <label htmlFor="email">邮箱</label>
                    <input type="email" name="email" id="email"/>
                    <label htmlFor="secretKey">密匙</label>
                    <input type="text" name="secretKey" id="secretKey"/>
                    <label htmlFor="masterPassword">主密码</label>
                    <input type="password" name="masterPassword" id="masterPassword"/>
                </main>
            </div>
        );
    }


}
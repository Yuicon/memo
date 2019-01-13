/**
 * @author Yuicon
 */

const loginParam = {};
const BrowserWindow = require('electron').remote.BrowserWindow;

const input = (value, col) => {
    loginParam[col] = value;
    console.log(loginParam);
};

const login = () => {
    fetch('https://api.bilibili.com/x/web-interface/search/default')
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            console.log(json);
        });
    const login =  BrowserWindow.getAllWindows().find(win => win.getTitle() === "登录");
    // login.close();
};
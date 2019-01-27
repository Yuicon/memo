/**
 * @author Yuicon
 */

const loginParam = {};
const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const requestX = require('../common/constant');

const input = (value, col) => {
    loginParam[col] = value;
    console.log(loginParam);
};

const register = () => {
    console.log(localStorage.getItem("token"));
    const main =  BrowserWindow.getAllWindows().find(win => win.getTitle() === "密码管理");
    const modalPath = path.resolve("src/register/register.html");
    let win = new BrowserWindow({
        width: 400,
        height: 320,
        frame: false,
        title: "login",
        parent: main,
        modal: true,
        show: false
    });
    win.webContents.openDevTools();
    win.on('close', (e) => {
        e.preventDefault();
        win = null;
    });

    win.loadURL(modalPath);
    win.show();
    const login =  BrowserWindow.getAllWindows().find(win => win.getTitle() === "登录");
    login.hide();
};

const login = () => {
    requestX.post("user-service/public/login", loginParam).then(body => {
        localStorage.setItem("accessToken", body.data.accessToken);
        localStorage.setItem("refreshToken", body.data.refreshToken);
        const login =  BrowserWindow.getAllWindows().find(win => win.getTitle() === "登录");
        login.close();
    }).catch((err) => console.log(err));
};
/**
 * @author Yuicon
 */

const loginParam = {};
const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');

const input = (value, col) => {
    loginParam[col] = value;
    console.log(loginParam);
};

const register = () => {
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
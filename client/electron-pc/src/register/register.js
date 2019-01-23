const registerParam = {};
const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');

const input = (value, col) => {
    registerParam[col] = value;
    console.log(registerParam);
};

const login = () => {
    const register =  BrowserWindow.getAllWindows().find(win => win.getTitle() === "注册");
    register.hide();

    const main =  BrowserWindow.getAllWindows().find(win => win.getTitle() === "密码管理");
    const modalPath = path.resolve('src/login/login.html');
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
    win.show()
};

const register = () => {
    fetch('https://api.bilibili.com/x/web-interface/search/default')
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            console.log(json);
        });
    const register =  BrowserWindow.getAllWindows().find(win => win.getTitle() === "注册");
    // register.close();
};
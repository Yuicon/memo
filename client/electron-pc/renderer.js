// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

localStorage.clear();

let token = localStorage.getItem("token");
const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
if (!token) {
    const main =  BrowserWindow.getAllWindows().find(win => win.getTitle() === "密码管理");
    const modalPath = path.join('file://', __dirname, 'src/login/login.html');
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
}

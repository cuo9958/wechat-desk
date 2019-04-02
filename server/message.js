const { ipcMain } = require('electron');

module.exports = class {

    constructor(win) {
        this.name = "msg";
        this.win = win;
        this.bot = win.bot;
        this.webContents = win.webContents;
        this.ready();
    }


    ready() {
        ipcMain.on('test', this.test.bind(this));
        this.webContents.send('ready');
    }

    test(event, args) {
        console.log("点击", args)
        // event.sender.send('asynchronous-reply', 'pong')
        // event.returnValue = 'pong'
        this.win.bot.test();
    }

    send(key, args) {
        this.webContents.send(key, args);
    }
}
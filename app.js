const { app, BrowserWindow } = require('electron');
const Bot = require('./server/wechat');
const Message = require('./server/message');

let win;

function createWindow() {
    // 创建浏览器窗口。
    win = new BrowserWindow({
        width: 800,
        height: 622,
        show: false,    //不显示
        center: true,   //居中
        minWidth: 300,   //最小宽度
        resizable: false,    //是否可以改变尺寸
        // maximizable: false,  //是否可以最大化
        skipTaskbar: true,   //是否在任务栏中显示
        title: 'loading',    //标题
        // icon:'',        //icon
        // backgroundColor:'#fff', //背景色
        transparent: false,  //窗口透明
    })

    // 然后加载应用的 index.html。
    if (process.env.NODE_ENV === 'dev') {
        win.loadURL('http://127.0.0.1:3000')
        // 打开开发者工具
        win.webContents.openDevTools()
    } else {
        win.loadFile('build/index.html')
    }
    //加载完成
    win.once('ready-to-show', () => {
        win.show()
        win.msg = new Message(win);
        win.bot = new Bot(win);
    })

    // 当 window 被关闭，这个事件会被触发。
    win.on('closed', () => {
        win = null;
        app.quit();
    })
}

/**
 * ready event
 */
app.on('ready', createWindow)

/**
 * 当全部窗口关闭时退出。
 */
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

/**
 * 不存在的时候创建一次
 */
app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});

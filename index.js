const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    event.sender.send('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    event.returnValue = 'pong'
})
// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let win

function createWindow() {
    // 创建浏览器窗口。
    win = new BrowserWindow({
        width: 800,
        height: 600,
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
    } else {
        win.loadFile('build/index.html')
    }


    // 打开开发者工具
    win.webContents.openDevTools()

    win.once('ready-to-show', () => {
        win.show()
        win.webContents.send('window.ready', 'whoooooooh!')
    })
    // 当 window 被关闭，这个事件会被触发。
    win.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        win = null;
        app.quit();
    })
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (win === null) {
        createWindow()
    }
})

// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。
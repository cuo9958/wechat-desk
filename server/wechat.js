const Wechaty = require('wechaty').Wechaty;
const { ipcMain } = require('electron');
// import { FileBox } from 'file-box'


// const fileBox = FileBox.fromFile('/tmp/text.jpg')
// await bot.say(fileBox)

module.exports = class {
    constructor(win) {
        this.win = win;
        this.msg = win.msg;
        this.bot = null;
        this.ready();
    }

    async ready() {
        this.bot = new Wechaty({
            name: 'wechat',
            profile: 'wechat',
            // puppet: 'wechaty-puppet-wechat4u'
        });
        this.bot.on('scan', this.scan.bind(this));
        this.bot.on('login', this.login.bind(this));
        this.bot.on('message', this.message.bind(this));
        this.bot.on('logout', this.logout.bind(this));

        ipcMain.on('rooms', this.rooms.bind(this));

        await this.bot.start();

        this.rooms();
        console.log("初始化", this.msg.name);
        // this.msg.test("adw", "adw222")

        // setInterval(()=>{
        //     await this.bot.Room.sync();
        // },1000)
    }

    test(args) {
        console.log("消息", args)
    }
    //扫一扫
    scan(qrcode, status) {
        console.log(qrcode, status);
        this.msg.send("scan", qrcode)
    }
    //登录成功
    login() {
        this.msg.send("login")
    }
    logout(){
        this.msg.send("logout")
    }

    //消息
    message(message) {
        const room = message.room();
        console.log(room)
        this.msg.send("message", message);
    }

    //获取房间列表
    async rooms() {
        console.log(this)
        const roomList = await this.bot.Room.findAll();
        console.log(roomList)
        this.msg.send("rooms", roomList)
    }
}
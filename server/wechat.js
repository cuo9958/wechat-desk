const Wechaty = require('wechaty').Wechaty;
const { ipcMain } = require('electron');
const Filter = require('./filter');
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
        this.bot.on('ready', this.onready.bind(this));
        this.bot.on('error', this.error.bind(this));

        ipcMain.on('rooms', this.rooms.bind(this));
        ipcMain.on('msg', this.onmsg.bind(this));

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
    logout() {
        this.msg.send("logout")
    }

    //消息
    message(message) {

        const concat = message.from();
        const text = message.text();
        const self = message.self();


        console.log(concat)

        let obj = {
            from: {
                id: concat.id,
                avatar: concat.payload.avatar,
                friend: concat.payload.friend,
                gender: concat.payload.gender,
                name: concat.payload.name,
            },
            text,
            self
        }
        const room = message.room();
        if (room) {
            obj.room = {
                id: room.id,
                memberIdList: room.payload.memberIdList,
                topic: room.payload.topic
            }
        }
        const to = message.to();
        if (to) {
            obj.to = {
                id: to.id,
                avatar: to.payload.avatar,
                friend: to.payload.friend,
                gender: to.payload.gender,
                name: to.payload.name,
            }
        }
        Filter.check(this.bot, obj);
        this.msg.send("message", obj);
    }

    //获取房间列表
    async rooms() {
        const roomList = await this.bot.Room.findAll();
        // console.log(roomList)
        this.msg.send("rooms", roomList)
    }
    //发送消息
    onmsg(e, id, txt) {
        const room = this.bot.Room.load(id);
        room.say(txt);
    }

    onready(){
        console.log("wechat.ready");
        this.msg.send("wechat.ready")
    }
    error(e){
        console.log(e)
        this.msg.send("wechat.error", e.message,e)
    }
    heartbeat(data){
        console.log(data)
        this.msg.send("heartbeat", data)
    }
}
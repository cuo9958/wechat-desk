const Wechaty = require('wechaty').Wechaty;
// import { FileBox } from 'file-box'


// const fileBox = FileBox.fromFile('/tmp/text.jpg')
// await bot.say(fileBox)
// const bot = new Wechaty({
//     name: '微信机器人',
//     profile: 'wechat',
//     puppet: 'wechaty-puppet-wechat4u'
// });

// bot // Global Instance
//     .on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcode)}`))
//     .on('login', user => console.log(`User ${user} logined`))
//     .on('message', message => console.log(`Message: ${message}`))
//     .start()

module.exports = class {
    constructor(win) {
        this.win = win;
        this.msg = win.msg;
        this.bot = null;
        this.ready();
    }

    ready() {
        this.bot = new Wechaty({
            name: '微信机器人',
            profile: 'wechat',
            puppet: 'wechaty-puppet-wechat4u'
        });
        this.bot.on('scan', this.scan.bind(this));
        this.bot.on('login', this.login.bind(this));

        this.bot.start();
        console.log("初始化", this.msg.name);
        // this.msg.test("adw", "adw222")
    }

    test(args) {
        console.log("消息", args)
    }
    //扫一扫
    scan(qrcode, status) {
        console.log(`Scan QR Code to login: ${status}\nhttps://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcode)}`);
        this.msg.send("scan", qrcode)
    }
    //登录成功
    login() {
        this.msg.send("login")
    }
}
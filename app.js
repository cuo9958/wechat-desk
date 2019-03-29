/**
 * https://github.com/Chatie/wechaty
 */
const Wechaty = require('wechaty').Wechaty;
// import { FileBox } from 'file-box'


// const fileBox = FileBox.fromFile('/tmp/text.jpg')
// await bot.say(fileBox)

const bot = new Wechaty({
    name: '微信机器人',
    profile: 'wechat',
    puppet: 'wechaty-puppet-wechat4u'
});

bot // Global Instance
    .on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcode)}`))
    .on('login', user => console.log(`User ${user} logined`))
    .on('message', message => console.log(`Message: ${message}`))
    .start()
const Wechaty = require('wechaty').Wechaty;
const bot = new Wechaty({
    name: 'wechat',
    profile: 'wechat',
    // puppet: 'wechaty-puppet-wechat4u'
});
bot.on('scan', () => { });
bot.on('login', () => { });
bot.on('message', () => { });

bot.start();
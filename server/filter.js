const { app } = require('electron');
const fs = require('fs');

let configDir = app.getPath('userData');
let configs = [];

if (!fs.existsSync(configDir + '/config.json')) {
    fs.writeFileSync(configDir + '/config.json', JSON.stringify(configs));
} else {
    try {
        configs = JSON.parse(fs.readFileSync(configDir + '/config.json'));
    } catch (error) {
        console.log("文件读取失败", error.message);
    }
}

/**
 * 消息筛选
 * from
 * to
 * room
 * text
 * self
 */
module.exports = {
    check(bot, obj) {
        if (obj.self) return;
        if (!obj.room) return;
        if (!obj.text) return;
        let dot = configs.filter(item => item.key === obj.text);
        if (!dot || dot.length === 0) return;

        const room = bot.Room.load(obj.room.id);
        room.say(dot.txt);
    },
    set(key, txt) {
        configs.push({
            key, txt
        });
        fs.writeFileSync(configDir + '/config.json', JSON.stringify(configs));
    }
}
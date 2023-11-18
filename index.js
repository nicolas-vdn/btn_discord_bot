const Discord = require("discord.js")
const moment = require("moment")
const bot = new Discord.Client({
    intents: ["GuildMembers", "MessageContent", "Guilds"]
})

bot.on("ready", () => {
    bot.user.setPresence({
        status: "online",
        activities: [{
            name: `Rafraîchi à ${(new moment().add(1, 'hours').format("HH:mm")).replace(':','h')}`
        }]
    })
})

bot.login(process.env.BOT_TOKEN)
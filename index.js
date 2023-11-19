const { Client } = require("discord.js")
const moment = require("moment")
const { createAndSendWelcomerImage } = require('./res/welcomer.js')
const bot = new Client({
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

bot.on("guildMemberAdd", (member) => {
    createAndSendWelcomerImage(member)
})

bot.login(process.env.BOT_TOKEN)
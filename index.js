const Discord = require("discord.js")
const bot = new Discord.Client({
    intents: ["GuildMembers", "MessageContent", "Guilds"]
})

bot.login(process.env.BOT_TOKEN)
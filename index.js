const Discord = require("discord.js")
const bot = new Discord.Client({
    intents: ["GuildMembers", "MessageContent", "Guilds"]
})

bot.on("ready", () => {
    bot.user.setPresence({
        status: "online",
        activities: [{
            name: `Rafraîchi à ${Date.now().toISOString().slice(11,16)}`
        }]
    })
})

bot.login(process.env.BOT_TOKEN)
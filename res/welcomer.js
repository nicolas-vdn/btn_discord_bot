const Jimp =  require("jimp");
const axios = require("axios");
const fs = require("fs").promises;
const sharp = require("sharp");
const { Client } = require("discord.js")

async function createAndSendWelcomerImage(member){
    const response = await axios.get(member.displayAvatarURL(), {responseType: 'arraybuffer'});
    
    const img = await sharp(response.data).toFormat('png').toBuffer()

    await fs.writeFile('./assets/temp/profilePic.png', img, (err) => {
        if (err) throw err;
    })

    Promise.all([
        Jimp.read('./assets/welcomer/welcomer_banner.png'),
        Jimp.read('./assets/welcomer/mask.png'),
        Jimp.read('./assets/temp/profilePic.png'),
        Jimp.loadFont('./assets/fonts/RubikOne.fnt'),
        Jimp.loadFont('./assets/fonts/Impact.fnt')
        ]).then(async function(data){
            data[2].resize(145, 145)
            data[5] = data[2].mask(data[1], 0, 0)
            data[0].print(data[3], 200, 115, "BIENVENUE")
            data[0].print(data[4], 310-(Jimp.measureText(data[4], member.user.globalName)/2), 200, member.user.globalName)
            data[0].blit(data[5], 25, 110).writeAsync('./assets/temp/welcomer.png').then(() => {
                member.guild.systemChannel.send({files:[{attachment: './assets/temp/welcomer.png'}]})
            })
    })

    return true;
}

module.exports = {
    createAndSendWelcomerImage
}
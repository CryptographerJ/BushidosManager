const {SlashCommandBuilder} = require("@discordjs/builders")
const fs = require('fs')
const path = require('path')
const { isMessageComponentInteraction } = require("discord-api-types/utils/v9")
const { Interaction, MessageAttachment } = require("discord.js")
const Canvas = require('canvas')
const puppeteer = require('puppeteer')

module.exports ={
    data: new SlashCommandBuilder()
        .setName("roninrarity")
        .setDescription("Returns the Rarity.Tools Information for a Ronin")
        .addStringOption((option) =>
            option
                .setName("number")
                .setDescription("Ronin ID Number")
                .setRequired(true)),

    async execute(Interaction) {

        ronin = Interaction.options.getString("number");
        const image = fs.readFileSync(path.join(__dirname, `../rarityToolsImages/rarityRonin${ronin}.png`))

        const attachment = new MessageAttachment(image)

        Interaction.reply({

            content: `https://opensea.io/assets/0x5763127d8d7e1870a9bc5f7677c0739f5f90d859/${ronin}`,
            files: [attachment]
            //ephemeral: true
        })
        

    }
}
const {SlashCommandBuilder} = require("@discordjs/builders")
const fs = require('fs')
const path = require('path')
const { isMessageComponentInteraction } = require("discord-api-types/utils/v9")
const { Interaction, MessageAttachment } = require("discord.js")
const Canvas = require('canvas')
const puppeteer = require('puppeteer')
const jsonfile = require('jsonfile')
const file = 'roninDB.json'

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

        roninList = jsonfile.readFileSync(file)

        roninID = roninList[ronin].roninID
        rarityRank = roninList[ronin].rarityRank
        requestor = Interaction.user.username

        console.log(`${requestor} checked rarity of Ronin # ${roninID} it is rank ${rarityRank}`)

        Interaction.reply({

            content: `Ronin #${roninID} is rank ${rarityRank}!\n You can see it here: https://opensea.io/assets/0x5763127d8d7e1870a9bc5f7677c0739f5f90d859/${ronin}`
            //files: [attachment]
            //ephemeral: true
        })
        

    }
}
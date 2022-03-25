const {SlashCommandBuilder} = require("@discordjs/builders")
const fs = require('fs')
const path = require('path')
const { isMessageComponentInteraction } = require("discord-api-types/utils/v9")
const { Interaction, MessageAttachment, DiscordAPIError } = require("discord.js")
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

            //content: `Ronin #${roninID} is rank ${rarityRank}!\nYou can see it here: https://opensea.io/assets/0x5763127d8d7e1870a9bc5f7677c0739f5f90d859/${ronin}`,
            embeds: [
                {
                  "type": "rich",
                  "title": `Ronin Rarity`,
                  "description": "",
                  "color": 0xa30a0a,
                  "fields": [
                    {
                      "name": `Ronin ID:`,
                      "value": `${roninID}`,
                      "inline": true
                    },
                    {
                      "name": `Ronin Rarity Rank:`,
                      "value": `#${rarityRank}`,
                      "inline": true
                    },
                    {
                      "name": `Rarity.Tools Link:`,
                      "value": `[Rarity.Tools](https://rarity.tools/ronin-by-bushidos/view/${roninID})`
                    },
                    {
                      "name": `OpenSea Link:`,
                      "value": `[OpenSea](https://opensea.io/assets/0x5763127d8d7e1870a9bc5f7677c0739f5f90d859/${roninID})`,
                      "inline": true
                    },
                    {
                      "name": `LooksRare Link:`,
                      "value": `[LooksRare](https://looksrare.org/collections/0x5763127d8d7E1870A9BC5F7677c0739f5F90D859/${roninID})`,
                      "inline": true
                    }
                  ],
                  "image": {
                    "url": `https://nft.bushidos.io/ronin/${roninID}.png`,
                    "height": 0,
                    "width": 0
                  },
                  "footer": {
                    "text": `Rarity Rank provided by Rarity.Tools`,
                    "icon_url": `https://uploads-ssl.webflow.com/61394b749e1fdc5c0ebae0ba/613a6d86e957f27ded2e0f4f_raritylogo.png`
                  },
                  "url": `https://rarity.tools/ronin-by-bushidos/view/${roninID}`
                }
              ]
            //files: [attachment]
            //ephemeral: true
        })
        

    }
}
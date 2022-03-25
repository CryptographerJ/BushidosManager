const {SlashCommandBuilder} = require("@discordjs/builders")
const { isMessageComponentInteraction } = require("discord-api-types/utils/v9")
const { Interaction, MessageAttachment } = require("discord.js")
const Canvas = require('canvas')

module.exports ={
    data: new SlashCommandBuilder()
        .setName("bushidoheader")
        .setDescription("Generates a Twitter Header of the bushido Provided")
        .addStringOption((option) =>
            option
                .setName("number")
                .setDescription("Bushido ID Number")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('position')
                .setDescription('Where do you want the Bushido')
                .setRequired(true)
                .addChoice('Left', '0')
                .addChoice('Middle', '500')
                .addChoice('Right', '1000')),

    async execute(Interaction) {
        ronin = Interaction.options.getString("number")
        const imageurl = "https://nft.bushidos.io/bushidos/"

        const canvas = Canvas.createCanvas(1500, 500)
		const context = canvas.getContext('2d')

        const background = await Canvas.loadImage(`${imageurl}${ronin}.png`)

        context.drawImage(background, 0, 0, 500, 500)

        bgcolor = context.getImageData(0, 0, 1, 1).data

        context.globalCompositeOperation = 'destination-under'

        context.fillStyle = `rgba(${bgcolor[0]},${bgcolor[1]},${bgcolor[2]},${bgcolor[3]})`

        context.fillRect(0, 0, canvas.width, canvas.height)

        context.drawImage(background, Interaction.options.getString("position"), 0, 500, 500)

        const attachment = new MessageAttachment(canvas.toBuffer(), 'BushidoTwitterHeader.png')

        requestor = Interaction.user.username

        console.log(`${requestor} generated a Bushido Header from Bushido #: ${ronin}`)

        Interaction.reply({

            content: `Bushido #: ${ronin}`,
            files: [attachment]
            //ephemeral: true
        })

    }
}
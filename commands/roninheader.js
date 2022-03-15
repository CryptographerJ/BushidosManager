const {SlashCommandBuilder} = require("@discordjs/builders")
const { isMessageComponentInteraction } = require("discord-api-types/utils/v9")
const { Interaction, MessageAttachment } = require("discord.js")
const Canvas = require('canvas')

module.exports ={
    data: new SlashCommandBuilder()
        .setName("roninheader")
        .setDescription("Generates a Twitter Header of the Ronin Provided")
        .addStringOption((option) =>
            option
                .setName("number")
                .setDescription("Ronin ID Number")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('position')
                .setDescription('Where do you want the Ronin')
                .setRequired(true)
                .addChoice('Left', '0')
                .addChoice('Middle', '500')
                .addChoice('Right', '1000')),

    async execute(Interaction) {
        ronin = Interaction.options.getString("number")
        const imageurl = "https://nft.bushidos.io/ronin/"

        const canvas = Canvas.createCanvas(1500, 500)
		const context = canvas.getContext('2d')

        const background = await Canvas.loadImage(`${imageurl}${ronin}.png`)

        context.drawImage(background, 0, 0, 500, 500)

        bgcolor = context.getImageData(0, 0, 1, 1).data

        console.log(`${bgcolor[0]},${bgcolor[1]},${bgcolor[2]},${bgcolor[3]}`)

        context.globalCompositeOperation = 'destination-under'

        context.fillStyle = `rgba(${bgcolor[0]},${bgcolor[1]},${bgcolor[2]},${bgcolor[3]})`

        context.fillRect(0, 0, canvas.width, canvas.height)

        context.drawImage(background, Interaction.options.getString("position"), 0, 500, 500)

        const attachment = new MessageAttachment(canvas.toBuffer(), 'RoninTwitterHeader.png')



        Interaction.reply({

            content: `Ronin #: ${ronin}`,
            files: [attachment]
            //ephemeral: true
        })

    }
}
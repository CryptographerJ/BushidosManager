const {SlashCommandBuilder} = require("@discordjs/builders")
const { isMessageComponentInteraction } = require("discord-api-types/utils/v9")
const { Interaction, MessageAttachment } = require("discord.js")
const Canvas = require('canvas')

module.exports ={
    data: new SlashCommandBuilder()
        .setName("roninlockscreen")
        .setDescription("Generates a phone background of the Ronin provided")
        .addStringOption((option) =>
            option
                .setName("number")
                .setDescription("Ronin ID Number")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('ratio')
                .setDescription('What Aspect Ratio Do You Want?')
                .setRequired(true)
                .addChoice('16:9', "16/9")
                .addChoice('18:9', "18/9")
                .addChoice('19:9', "19/9")
                .addChoice('20:9', "20/9")),

    async execute(Interaction) {
        ronin = Interaction.options.getString("number")
        const imageurl = "https://nft.bushidos.io/ronin/"

        ratioMod = Interaction.options.getString("ratio")

        const canvas = Canvas.createCanvas(1500, 1500*eval(ratioMod))
		const context = canvas.getContext('2d')

        const background = await Canvas.loadImage(`${imageurl}${ronin}.png`)

        context.drawImage(background, 0, 0, 500, 500)

        bgcolor = context.getImageData(0, 0, 1, 1).data

        console.log(`${bgcolor[0]},${bgcolor[1]},${bgcolor[2]},${bgcolor[3]}`)

        context.globalCompositeOperation = 'destination-under'

        context.fillStyle = `rgba(${bgcolor[0]},${bgcolor[1]},${bgcolor[2]},${bgcolor[3]})`

        context.fillRect(0, 0, canvas.width, canvas.height)

        context.drawImage(background, 0, canvas.height-1500, 1500, 1500)

        const attachment = new MessageAttachment(canvas.toBuffer(), 'RoninLockscreen.png')



        Interaction.reply({

            content: `Ronin #: ${ronin}`,
            files: [attachment]
            //ephemeral: true
        })

    }
}
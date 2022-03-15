const {SlashCommandBuilder} = require("@discordjs/builders")
const { isMessageComponentInteraction } = require("discord-api-types/utils/v9")
const { Interaction, MessageAttachment } = require("discord.js")
const Canvas = require('canvas')

module.exports ={
    data: new SlashCommandBuilder()
        .setName("bushidolockscreen")
        .setDescription("Generates a phone background of the Bushido provided")
        .addStringOption((option) =>
            option
                .setName("number")
                .setDescription("Bushido ID Number")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('ratio')
                .setDescription('What Aspect Ratio Do You Want?')
                .setRequired(true)
                .addChoice('16:9', "16/9")
                .addChoice('18:9', "18/9")
                .addChoice('19:9', "19/9")
                .addChoice('20:9', "20/9"))
        .addStringOption(option =>
            option.setName('principle')
                .setDescription('Add a Sashimono (Optional)')
                .setRequired(false)
                .addChoice('Honor', "4")
                .addChoice('Courage', "1")
                .addChoice('Sincerity', "6")
                .addChoice('Compassion', "2")),

    async execute(Interaction) {
        const warriorid = Interaction.options.getString("number")
        //sashi = Interaction.options.getString("principle")
        const imageurlbush = "https://nft.bushidos.io/bushidos/"
        //const imageurlsash = "https://nft.bushidos.io/sashimono/"

        ratioMod = Interaction.options.getString("ratio")

        const canvas = Canvas.createCanvas(1500, 1500*eval(ratioMod))
		const context = canvas.getContext('2d')

        const warrior = await Canvas.loadImage(`${imageurlbush}${warriorid}.png`)

        context.drawImage(warrior, 0, 0, 500, 500)

        bgcolor = context.getImageData(0, 0, 1, 1).data

        context.fillStyle = `rgba(${bgcolor[0]},${bgcolor[1]},${bgcolor[2]},${bgcolor[3]})`

        context.fillRect(0, 0, canvas.width, canvas.height)

        context.drawImage(warrior, 0, canvas.height-1500+133, 1500, 1500)

        if (Interaction.options.getString("principle") === null){
        } else {
            sashi = Interaction.options.getString("principle")
            const imageurlsash = "https://nft.bushidos.io/sashimono/"
            const flag = await Canvas.loadImage(`${imageurlsash}${sashi}.png`)
            context.drawImage(flag, 400, 365, 600, 800, 300, 100, 900, 1200)
            ////ctx.drawImage(imae,  sx,  sy, sWi, sHt,  dx,  dy, dWi, dHt);
        }

        



        const attachment = new MessageAttachment(canvas.toBuffer(), 'BushidosLockscreen.png')



        Interaction.reply({

            content: `Bushido #: ${warriorid}`,
            files: [attachment]
            //ephemeral: true
        })

    }
}
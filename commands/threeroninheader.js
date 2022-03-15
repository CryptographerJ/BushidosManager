const {SlashCommandBuilder} = require("@discordjs/builders")
const { isMessageComponentInteraction } = require("discord-api-types/utils/v9")
const { Interaction, MessageAttachment } = require("discord.js")
const Canvas = require('canvas')

module.exports ={
    data: new SlashCommandBuilder()
        .setName("threeroninheader")
        .setDescription("Generates a Twitter Header of the Ronin Provided")
        .addStringOption((option) =>
            option
                .setName("1st_ronin")
                .setDescription("1st Ronin ID Number")
                .setRequired(true))
        .addStringOption((option) =>
            option
                .setName("2nd_ronin")
                .setDescription("2nd Ronin ID Number")
                .setRequired(true))
        .addStringOption((option) =>
            option
                .setName("3rd_ronin")
                .setDescription("3rd Ronin ID Number")
                .setRequired(true)),
        

    async execute(Interaction) {
        roninone = Interaction.options.getString("1st_ronin")
        ronintwo = Interaction.options.getString("2nd_ronin")
        roninthree = Interaction.options.getString("3rd_ronin")

        const imageurl = "https://nft.bushidos.io/ronin/"

        const canvas = Canvas.createCanvas(1500, 500)
		const context = canvas.getContext('2d')

        const first = await Canvas.loadImage(`${imageurl}${roninone}.png`)
        const second = await Canvas.loadImage(`${imageurl}${ronintwo}.png`)
        const third = await Canvas.loadImage(`${imageurl}${roninthree}.png`)

        context.drawImage(first, 0, 0, 500, 500)
        context.drawImage(second, 500, 0, 500, 500)
        context.drawImage(third, 1000, 0, 500, 500)


        const attachment = new MessageAttachment(canvas.toBuffer(), '3RoninTwitterHeader.png')



        Interaction.reply({

            content: `Ronin's ${roninone}, ${ronintwo}, and ${roninthree}`,
            files: [attachment]
            //ephemeral: true
        })

    }
}
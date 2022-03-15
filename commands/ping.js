const {SlashCommandBuilder} = require("@discordjs/builders")
const { Interaction } = require("discord.js")

module.exports ={
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Pong!"),
    async execute(Interaction) {
        Interaction.reply({
            content:"Pong!",
            ephemeral: true
        })

    }
}
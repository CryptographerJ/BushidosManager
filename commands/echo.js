const {SlashCommandBuilder} = require("@discordjs/builders")
const { isMessageComponentInteraction } = require("discord-api-types/utils/v9")
const { Interaction } = require("discord.js")

module.exports ={
    data: new SlashCommandBuilder()
        .setName("echo")
        .setDescription("Echos your input")
        .addStringOption((option) =>
            option
                .setName("message")
                .setDescription("Message to Echo")
                .setRequired(true)
        ),

    async execute(Interaction) {
        Interaction.reply({
            content: Interaction.options.getString("message"),
            ephemeral: true
        })

    }
}
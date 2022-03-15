const {SlashCommandBuilder} = require("@discordjs/builders")
const { isMessageComponentInteraction } = require("discord-api-types/utils/v9")
const { Interaction, MessageAttachment } = require("discord.js")
const https = require('https');

module.exports ={
    data: new SlashCommandBuilder()
        .setName("floor")
        .setDescription("Returns the Floor Price of the collection chosen")
        .addStringOption(option =>
            option.setName('collection')
                .setDescription('Which Collection?')
                .setRequired(true)
                .addChoice('Sashimono', 'sashimono-bushidos')
                .addChoice('Bushidos', 'bushidos')
                .addChoice('Daitos', 'daitos')
                .addChoice('Ronin','ronin-by-bushidos')),

    async execute(Interaction) {

        collection = Interaction.options.getString("collection")

        if (collection == "sashimono-bushidos") {colName = 'Sashimono'; picURL = "https://lh3.googleusercontent.com/3NgBFKzf1b_yd97AZyrsHDVUFBfTtugDfMCC_CAGRVbk7Q0ZcJGBCeDU3i_wL7wQpUz07m4lW_aDiikofFg10k35VBUlDaqb_NYsKQ=s130"}
        if (collection == "bushidos") {colName = 'Bushidos'; picURL = "https://lh3.googleusercontent.com/aWUIbPuwV-XdHhp50HNHT7Oxc3XMEUSHG1uqmAZyiwYirT6rG304wrP_8nsKjA5aZJj1ty189xym4t5_W0MScbJbDNvclO4M9ltM=s130"}
        if (collection == "daitos") {colName = 'Daitos'; picURL = "https://lh3.googleusercontent.com/4G5gMba5i0mBCGjKEim2SQRUpQBQsIcjHtNG_aNpj6JcKbhy0mZ9AkI99h3u8VA3fD1BWpGniuEVrLYrOpeu8M0e-WdV6xNTjzG4=s130"}
        if (collection == "ronin-by-bushidos") {colName = 'Ronin'; picURL = 'https://lh3.googleusercontent.com/N9yO_Ylfe0J2GnfoKQRvBwEfZDE1SR4ix8_WG5BpxBWvsFoItzgVZcWLMFSF-LjcCySyessQA05xTJe-IhPoj05Py1gLFNOTL-DB=s130'}


        https.get(`https://api.opensea.io/api/v1/collection/${collection}/stats/`, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {

            fp = JSON.parse(data).stats.floor_price

            console.log(fp)


            const exampleEmbed = {
                color: 0x228b22,
                title: `The floor price of ${colName} is ${fp} ETH`,
                thumbnail: {url: picURL}
                
            };

            Interaction.reply({

                //content: `The floor price of ${colName} is ${fp} ETH`,
                embeds: [exampleEmbed],
                ephemeral: true
            })


        });

        }).on("error", (err) => {
        console.log("Error: " + err.message);
        });


        

        

    }
}
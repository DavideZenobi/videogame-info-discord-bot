const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName("game")
        .setDescription("Provides information about the game")
        .addStringOption(option => 
            option.setName('option-name')
                .setDescription('option-name input needed')
        ),
    async execute(interaction) {
        await interaction.reply("That game is awesome!");
    },
}
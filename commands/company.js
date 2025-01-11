const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName("company")
        .setDescription("Provides information about the company"),
    async execute(interaction) {
        await interaction.reply("That companyyy is awesome!");
    },
}
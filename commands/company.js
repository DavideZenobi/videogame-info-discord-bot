import { SlashCommandBuilder } from 'discord.js';


export const data = new SlashCommandBuilder()
    .setName("company")
    .setDescription("Provides information about the company");
export async function execute(interaction) {
    await interaction.reply("That companyyy is awesome!");
}
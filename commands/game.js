import { SlashCommandBuilder } from 'discord.js';
//import { getGame, getGamesByString } from '../rawg-api.js';
import { getGame } from '../igdb-api.js';
import { createEmbedForGame } from '../embedFactory.js';


export const data = new SlashCommandBuilder()
    .setName("game")
    .setDescription("Provides information about the game")
    .addStringOption(option => option.setName('game-name')
        .setDescription('Input for game search autocomplete')
        .setRequired(true)
        .setAutocomplete(true)
    );
export async function autocomplete(interaction) {
    /*const focusedValue = interaction.options.getFocused();
    if (focusedValue.length < 3) {
        return interaction.respond([]);
    }

    const games = await getGamesByString(focusedValue);
    await interaction.respond(
        games.map(game => {     
            return {
                name: game.name,
                value: game.id.toString()
            }; 
        })
    );*/
}
export async function execute(interaction) {
    const gameName = interaction.options.getString("game-name");
    console.log(gameName);
    const game = await getGame(gameName);
    const embed = createEmbedForGame(game);

    await interaction.reply({ embeds: [embed] });
}
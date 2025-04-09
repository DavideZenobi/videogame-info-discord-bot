import { SlashCommandBuilder } from 'discord.js';
import { getGame, getGameById, getGameByName, getGamesForAutocomplete } from '../igdb-api.js';
import { createEmbedForGame } from '../embedFactory.js';
import { isID } from '../util/util.js';


export const data = new SlashCommandBuilder()
    .setName("game")
    .setDescription("Provides information about the game")
    .addStringOption(option => option.setName('game-name')
        .setDescription('Input for game search autocomplete')
        .setRequired(true)
        .setAutocomplete(true)
    );
export async function autocomplete(interaction) {
    const input = interaction.options.getFocused();
    if (input.length < 3) {
        return interaction.respond([]);
    }

    const games = await getGamesForAutocomplete(input);
    await interaction.respond(
        games.map(game => {     
            return {
                name: game.name,
                value: game.id.toString()
            }; 
        })
    );
}
export async function execute(interaction) {
    const input = interaction.options.getString("game-name");
    let game;
    if (isID(input)) {
        game = await getGameById(input);
    } else {
        game = await getGameByName(input);
    }

    const embed = createEmbedForGame(game);

    await interaction.reply({ embeds: [embed] });
}
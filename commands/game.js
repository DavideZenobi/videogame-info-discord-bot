import { SlashCommandBuilder } from 'discord.js';
import { getGameById, getGameByName, getGamesForAutocomplete } from '../igdb-api.js';
import { createEmbedForGame } from '../embedFactory.js';
import { isId } from '../util/util.js';


export const data = new SlashCommandBuilder()
    .setName("game")
    .setDescription("Provides information about the game")
    .addStringOption(option => option.setName('game-name')
        .setDescription('Input for game search autocomplete')
        .setRequired(true)
        .setAutocomplete(true)
    );
export async function autocomplete(interaction) {
    const debounceMap = new Map();

    const input = interaction.options.getFocused();

    if (input.length < 3) {
        return interaction.respond([]);
    }

    const userId = interaction.user.id;

    if (debounceMap.has(userId)) {
        clearTimeout(debounceMap.get(userId));
    }

    const timer = setTimeout(async () => {
        let games = [];
        try {
            games = await getGamesForAutocomplete(input);
        } catch (error) {
            console.error("[AUTOCOMPLETE ERROR]", error);
            return interaction.respond([]);
        }

        return interaction.respond(
            games.map(game => {     
                return {
                    name: game.name,
                    value: game.id.toString()
                }; 
            })
        );

    }, 300);

    debounceMap.set(userId, timer)
}
export async function execute(interaction) {

    const input = interaction.options.getString("game-name");

    let game;
    if (isId(input)) {
        game = await getGameById(input);
    } else {
        game = await getGameByName(input);
    }

    const embed = createEmbedForGame(game);

    await interaction.reply({ embeds: [embed] });
}
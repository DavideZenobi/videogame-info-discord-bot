import { EmbedBuilder } from "discord.js";

export function createEmbedForGame(data) {
    
    /*const newEmbed = new EmbedBuilder()
        .setColor("Green")
        .setTitle(params.name)
        .setDescription(params.description)
        .setImage(params.image)
        .setThumbnail(params.thumbnail)
        .setTimestamp()
        .addFields(
            { name: "Release date", value: `:calendar_spiral: ${params.release_date}` },
            { name: "Developer", value: params.developers},
        )*/
    
    const igdbLink = `https://www.igdb.com/games/${data.slug}`;

    const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle(data.name)
        .setDescription(
            data.summary.length > 400
                ? `${data.summary.slice(0, 400)}...\n:link: [Read more on IGDB](${igdbLink})`
                : data.summary
        )
        .setTimestamp()
        
    return embed;
}

export function createEmbedForDeveloper() {
    const newEmbed = new EmbedBuilder()

    return newEmbed;
}
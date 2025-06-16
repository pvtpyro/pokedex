import { State } from "../state.js";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
    if (args.length === 0) {
        console.log('Please provide a Pokemon name');
        return;
    }

    const pokemonName = args[0].toLowerCase();
    const pokemon = state.pokedex[pokemonName];

    if (!pokemon) {
        console.log("you have not caught that pokemon")
    } 

    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log(`Stats:`);
    pokemon.stats.forEach(stat => {
        console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
    });console.log(`Types:`);
    pokemon.types.forEach(type => {
        console.log(`  -${type.type.name}`);
    });
}

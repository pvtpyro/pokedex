import { State } from "../state.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    if (args.length === 0) {
        console.log('Please provide a name of a Pokemon to catch');
        return;
    }

    const pokemonName = args[0].toLowerCase();
    console.log(`Throwing a Pokeball at ${pokemonName}...`)

    const pokemon = await state.pokeapi.fetchPokemon(pokemonName);

    // Give the user a chance to catch the Pokemon using the Math.random() static method.
    // You can use the pokemon's "base experience" to determine the chance of catching it. 
    // The higher the base experience, the harder it should be to catch.
    const caught = Math.random() > 0.5;

    if (caught) {
        console.log(`${pokemonName} was caught!`);
        // console.log('You may now inspect it with the inspect command.');
        state.pokedex[pokemonName] = pokemon;
    } else {
        console.log(`${pokemonName} escaped!`);
    }


}
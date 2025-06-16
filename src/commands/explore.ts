import { State } from '../state.js';

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    if (args.length === 0) {
        console.log('Please provide a location name to explore');
        return;
    }

    const locationName = args[0];
    const location = await state.pokeapi.fetchLocation(locationName)
    
    console.log(`Exploring ${locationName}...`)
    console.log("Found Pokemon:")
    location.pokemon_encounters.forEach(encounter => {
        console.log(` - ${encounter.pokemon.name}`)
    })

}
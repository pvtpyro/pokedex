import { State } from '../state.js';

export async function commandMapb(state: State): Promise<void> {
    const locations = await state.pokeapi.fetchLocations(state.prevLocationsURL);

    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
    
    locations.results.forEach(location => {
        console.log(location.name);
    });
}
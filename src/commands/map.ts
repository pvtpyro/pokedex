import { State } from '../state.js';

export async function commandMap(state: State): Promise<void> {
    const locations = await state.pokeapi.fetchLocations(state.nextLocationsURL);

    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
    
    locations.results.forEach(location => {
        console.log(location.name);
    });
}
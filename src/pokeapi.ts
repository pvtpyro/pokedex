export class PokeAPI {
    // https://pokeapi.co/docs/v2#location-areas
    private static readonly baseURL = "https://pokeapi.co/api/v2/";

    constructor() {}

    async fetchLocations(pageURL: string | null): Promise<ShallowLocations> {
        const url = pageURL || `${PokeAPI.baseURL}location-area/`;
        const resp = await fetch(url);

        const data = await resp.json();
        return data;
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}location-area/${locationName}`;
        const resp = await fetch(url);

        const data = await resp.json();
        return data;
    }
}

// list of locations from api
export type ShallowLocations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: [{
        name: string, 
        url:string
    }];
};

export type Location = {
    id: number;
    name: string;
    location: {
        name: string;
        url: string;
    };
    pokemon_encounters: [
        pokemon: {
            name: string;
            url: string;
        },
        version_details: [
            encounter_details: [
                chance: number,
                method: {
                    name: string;
                    url: string;
                }
            ]
        ]
    ];
};
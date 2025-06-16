import { Cache } from "./pokecache.js";

export class PokeAPI {
    // https://pokeapi.co/docs/v2#location-areas
    private static readonly baseURL = "https://pokeapi.co/api/v2/";
    private cache: Cache;

    constructor() {
        // 10 minutes
        this.cache = new Cache(1000 * 60 * 10);
    }

    async fetchLocations(pageURL: string | null): Promise<ShallowLocations> {
        const url = pageURL || `${PokeAPI.baseURL}location-area/`;
        const cached = this.cache.get<ShallowLocations>(url);

        if (cached != undefined) {
            console.log("i am cached");
            return cached;
        }

        const resp = await fetch(url);
        const data = await resp.json();
        this.cache.add(url, data);
        return data;
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}location-area/${locationName}`;
        const cached = this.cache.get<Location>(url);
        if (cached) {
            console.log("i am cached");
            return cached;
        }

        const resp = await fetch(url);

        const data = await resp.json();
        this.cache.add(url, data);
        return data;
    }

    async fetchPokemon(name: string): Promise<Pokemon> {
        const url = `${PokeAPI.baseURL}/pokemon/${name}`;

        const cached = this.cache.get<Pokemon>(url);
        if (cached) {
            return cached;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Pokemon ${name} not found!`);
        }

        const data = await response.json();
        this.cache.add(url, data);
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
    pokemon_encounters: [{
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
    }];
};

export type Pokemon = {
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    stats: [{
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string
        }
    }];
    types: [{
        slot: number;
        type: {
            name: string;
            url: string;
        }
    }]
}
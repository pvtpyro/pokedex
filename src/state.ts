import { createInterface, type Interface } from "readline";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { commandExit } from "./commands/exit.js";
import { commandHelp } from "./commands/help.js";
import { commandMap } from "./commands/map.js";
import { commandMapb } from "./commands/mapb.js";
import { commandExplore } from "./commands/explore.js";
import { commandCatch } from "./commands/catch.js";

export type CLICommand = {
	name: string;
	description: string;
	callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
	rl: Interface;
	commands: Record<string, CLICommand>;
	pokeapi: PokeAPI;
	nextLocationsURL: string | null;
	prevLocationsURL: string | null;
	pokedex: Record<string, Pokemon>;
};

export function initState(): State {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: 'Pokedex > '
	});

	const commands: Record<string, CLICommand> = {
		exit: {
			name: "exit",
			description: "Exits the pokedex",
			callback: commandExit,
		},
		help: {
			name: "help",
			description: "Displays a help message",
			callback: commandHelp
		},
		map: {
			name: "map",
			description: "Display locations 20 at a time",
			callback: commandMap
		},
		mapb: {
			name: "mapb",
			description: "Display previous locations 20 at a time",
			callback: commandMapb
		},
		explore: {
			name: "explore",
			description: "Explore a map area",
			callback: commandExplore
		},
		catch: {
			name: "catch",
			description: "Catch a pokemon",
			callback: commandCatch
		}
	}

	return {
		rl,
		commands,
		pokeapi: new PokeAPI(),
		nextLocationsURL: null,
		prevLocationsURL: null,
		pokedex: {}
	};
}
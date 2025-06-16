import { State } from "../state.js";

export async function commandHelp(state: State): Promise<void> {
    console.log("Welcome to the Pokedex!");
    console.log('Usage:\n');

    console.log('help: Displays a help message');
    console.log('Closing the Pokedex... Goodbye!');
    process.exit(0);
}

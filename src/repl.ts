import { State } from './state.js';

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/);
}

export function startREPL(state: State) {
  state.rl.prompt();
  
  state.rl.on('line', async (input:string) => {
    const cleaned = cleanInput(input);

    if (cleaned.length === 0) {
      state.rl.prompt();
      return;
    } 

    const commandName = cleaned[0];
    const command = state.commands[commandName]
    const args = cleaned.slice(1)

    if (command) {
      try {
        await command.callback(state, ...args)
      } catch (err) {
        console.log("error with callback")
      }
    } else {
      console.log(`Unknown command`);
    }

    // console.log(`Your command was: ${cleaned[0]}`);
    state.rl.prompt();
    
  });
}

import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';
import { CLICommand } from './commands';
import { commandExit } from './commands/exit.js';
import { commandHelp } from './commands/help.js';


export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/);
}

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Pokedex > '
});

export function startREPL() {
  rl.prompt();
  
  rl.on('line', (input:string) => {
    const cleaned = cleanInput(input);

    if (cleaned.length === 0) {
      rl.prompt();
      return;
    } 

    const commandName = cleaned[0];
    const command = getCommands()[commandName];

    if (command) {
      command.callback(getCommands());
    } else {
      console.log(`Unknown command`);
    }

    // console.log(`Your command was: ${cleaned[0]}`);
    rl.prompt();
    
  });
}

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp
    }
  };
}
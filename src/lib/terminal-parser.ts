export type CommandName = 
  | 'help'
  | 'whoami'
  | 'projects'
  | 'skills'
  | 'status'
  | 'contact'
  | 'clear'
  | 'about'

export interface CommandOutput {
  type: 'text' | 'error' | 'help' | 'data'
  content: string | string[]
}

export interface Command {
  name: CommandName
  description: string
  execute: () => CommandOutput
}

export const parseCommand = (input: string): { command: string; args: string[] } => {
  const trimmed = input.trim()
  if (!trimmed) {
    return { command: '', args: [] }
  }
  
  const parts = trimmed.split(/\s+/)
  return {
    command: parts[0].toLowerCase(),
    args: parts.slice(1)
  }
}

export const getHumorousResponse = (command: string): string => {
  const responses: Record<string, string> = {
    'sudo': 'Nice try. You have no power here.',
    'rm': 'I\'m not falling for that one.',
    'hack': 'This is a portfolio, not The Matrix.',
    'exit': 'You can\'t escape that easily. Try closing the tab.',
    'quit': 'No quitting! Use your browser\'s back button like a normal person.',
    'ls': 'This isn\'t a real terminal. Try "help" instead.',
    'cd': 'You\'re already in the only directory that matters: my workshop.',
    'pwd': '/home/moe/workshop — satisfied?',
    'mkdir': 'No file system access for you. This is read-only.',
    'cat': '🐱 Meow? Wrong kind of cat. Try "help".',
    'vim': 'Ah, a person of culture. But there\'s nothing to edit here.',
    'emacs': 'Let\'s not start that debate. Try "help" instead.',
    'nano': 'Even nano won\'t help you here. Try "help".',
    'ping': 'Pong! 🏓',
    'echo': 'Echo... echo... echo... Try "help" for actual commands.',
    'whoami': 'You\'re you. I\'m Moe. Try "about" to learn about me.',
  }
  
  if (responses[command]) {
    return responses[command]
  }
  
  const genericResponses = [
    `Command not found: ${command}. Type "help" for available commands.`,
    `"${command}"? Never heard of it. Try "help".`,
    `Error 404: Command "${command}" not found. Did you mean "help"?`,
    `Unrecognized command: ${command}. I only know a few things. Try "help".`,
  ]
  
  return genericResponses[Math.floor(Math.random() * genericResponses.length)]
}

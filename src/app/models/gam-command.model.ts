export interface GamCommand {
  id: number;
  title: string;
  command: string;
  description: string;
  category: string;
  example: CommandExample;
  tags: string[];
}

export interface CommandExample {
  output: string;
  headers: string[];
}


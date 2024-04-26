declare function parseLevels(filename: string): 
    Promise<Array<{name: string, width: number, height: number, background: string, foreground: string}>>;
export = parseLevels;

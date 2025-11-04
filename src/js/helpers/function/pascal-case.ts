export const pascalCase = (string: string) =>
    string.replace(/(\w)(\w*)/g, function (g0: string, g1: string, g2: string): string {
        return g1.toUpperCase() + g2.toLowerCase();
    });

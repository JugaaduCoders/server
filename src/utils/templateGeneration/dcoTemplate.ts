export function dcoTemplate(capitalized: string) {
  return `
    export type Get${capitalized}DCO = {
        id: number;
        updatedAt: Date;
        createdAt: Date;
        deletedAt: Date | null;
    };`;
}

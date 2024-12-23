export function routerTemplate(folderName: string, capitalized: string) {
  return `
import express from 'express';
import * as ${folderName}Controller from './${folderName}Controller';

const ${folderName}Routes = express();

${folderName}Routes.get('/:id', ${folderName}Controller.get${capitalized}ById);

export default ${folderName}Routes;
`;
}

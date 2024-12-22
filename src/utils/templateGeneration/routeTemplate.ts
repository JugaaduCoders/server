export function routeTemplate(folderName: string, capitalized: void) {
  return `
import express from 'express';
import * as ${folderName}Controller from './${folderName}Controller';

const ${folderName}Routes = express();

${folderName}Routes.get('/:id', ${folderName}Controller.get${capitalized});

${folderName}Routes.get('/', ${folderName}Controller.get${capitalized}s);

${folderName}Routes.post('/', ${folderName}Controller.create${capitalized}s);

${folderName}Routes.put('/:id', ${folderName}Controller.update${capitalized});

${folderName}Routes.put('/', ${folderName}Controller.update${capitalized}s);

${folderName}Routes.delete('/', ${folderName}Controller.delete${capitalized}s);

${folderName}Routes.delete('/:id', ${folderName}Controller.delete${capitalized});

export default ${folderName}Routes;
`;
}

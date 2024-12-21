import fs from 'fs';
import path from 'path';
import { capitalizedString } from './string';

function createStructure(folderName: string) {
  if (!folderName) {
    console.error('Please provide a folder name.');
    return;
  }

  const basePath = path.join(__dirname, '../modules', folderName);

  const files = [
    `${folderName}DCO.ts`,
    `${folderName}DTO.ts`,
    `${folderName}Routes.ts`,
    `${folderName}Controller.ts`,
    `${folderName}Repository.ts`,
    `${folderName}Service.ts`,
  ];

  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath);
    console.log(`Folder '${folderName}' created.`);
  } else {
    console.error(`Folder '${folderName}' already exists.`);
    return;
  }

  const capitalized = capitalizedString(folderName);

  const templates = {
    [`${folderName}DTO.ts`]: `import { z } from 'zod';`,
    [`${folderName}Routes.ts`]: `
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
`,
    // TODO: create template for them
    [`${folderName}Controller.ts`]: ``,
    [`${folderName}Repository.ts`]: ``,
    [`${folderName}Service.ts`]: ``,
  };

  files.forEach((file) => {
    const filePath = path.join(basePath, file);
    fs.writeFileSync(filePath, templates[file] ?? '');
    console.log(`File '${file}' created.`);
  });

  console.log(`Structure created under folder '${folderName}'.`);
}

const folderName = process.argv[2];
createStructure(folderName);

import fs from 'fs';
import path from 'path';
import { capitalizedString } from '../string';
import { dtoTemplate } from './dtoTemplate';
import { routeTemplate } from './routeTemplate';

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
    [`${folderName}DTO.ts`]: dtoTemplate(),
    [`${folderName}Routes.ts`]: routeTemplate(folderName, capitalized),
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

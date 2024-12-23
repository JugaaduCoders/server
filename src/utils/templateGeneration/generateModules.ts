import fs from 'fs';
import path from 'path';
import { capitalizedString } from '../string';
import { controllerTemplate } from './controllerTemplate';
import { dtoTemplate } from './dtoTemplate';
import { repositoryTemplate } from './repositoryTemplate';
import { routerTemplate } from './routerTemplate';
import { serviceTemplate } from './serviceTemplate';
import { dcoTemplate } from './dcoTemplate';

function createStructure(folderName: string) {
  if (!folderName) {
    console.error('Please provide a folder name.');
    return;
  }

  const basePath = path.join(__dirname, '../../modules', folderName);

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
    [`${folderName}DTO.ts`]: dtoTemplate(capitalized),
    [`${folderName}DCO.ts`]: dcoTemplate(capitalized),
    [`${folderName}Routes.ts`]: routerTemplate(folderName, capitalized),
    [`${folderName}Controller.ts`]: controllerTemplate(folderName, capitalized),
    [`${folderName}Repository.ts`]: repositoryTemplate(folderName, capitalized),
    [`${folderName}Service.ts`]: serviceTemplate(folderName, capitalized),
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

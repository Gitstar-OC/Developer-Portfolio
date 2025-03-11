// filepath: my-project/scripts/update-readme.ts
import fs from 'fs';
import path from 'path';

// Define the paths for the designers and README files
const designersFilePath = path.join(__dirname, '../app/designers.ts');
const readmeFilePath = path.join(__dirname, '../README.md');

// Function to read designer data from designers.ts
const getDesigners = (): string => {
  const designersData = fs.readFileSync(designersFilePath, 'utf-8');
  const designerRegex = /{([^}]+)}/g;
  const designers: string[] = [];
  let match;

  while ((match = designerRegex.exec(designersData)) !== null) {
    const designerInfo = match[1].split(',').map(line => line.trim());
    const name = designerInfo.find(line => line.startsWith('name:')).split(':')[1].trim().replace(/"/g, '');
    const twitter = designerInfo.find(line => line.startsWith('twitter:')).split(':')[1].trim().replace(/"/g, '');
    const portfolio = designerInfo.find(line => line.startsWith('portfolio:')).split(':')[1].trim().replace(/"/g, '');
    
    designers.push(`
<div style="display: flex; align-items: center; padding: 10px 0;">
    <img src="https://github.com/${twitter}.png" width="32" height="32" style="border-radius: 50%; margin-right: 10px;">
    <div>
        <a href="https://x.com/${twitter}"><b>${name}</b></a> - 
        <a href="${portfolio}">${portfolio}</a>
    </div>
</div>`);
  }

  return designers.join('\n');
};

// Function to update the README.md file
const updateReadme = (designersHtml: string): void => {
  const readmeContent = fs.readFileSync(readmeFilePath, 'utf-8');
  const updatedContent = readmeContent.replace(/<div style="display: flex; align-items: center; padding: 10px 0;">[\s\S]*?<\/div>/g, designersHtml);
  
  fs.writeFileSync(readmeFilePath, updatedContent, 'utf-8');
};

// Main function to execute the update
const main = () => {
  const designersHtml = getDesigners();
  updateReadme(designersHtml);
};

main();
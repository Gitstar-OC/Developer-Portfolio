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
    
    // Extract GitHub username if available
    const githubLine = designerInfo.find(line => line.startsWith('github:'));
    const github = githubLine ? githubLine.split(':')[1].trim().replace(/[",]/g, '') : null;
    
    // Create GitHub link with SVG icon if GitHub username is available
    const githubLink = github 
      ? ` <a href="https://github.com/${github}" title="${name}'s GitHub" style="display: inline-block; margin-left: 5px; vertical-align: middle;">
          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" style="vertical-align: middle;">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
        </a>`
      : '';
    
    designers.push(`
<div style="display: flex; align-items: center; padding: 10px 0;">
    <img src="https://github.com/${twitter}.png" width="32" height="32" style="border-radius: 50%; margin-right: 10px;">
    <div>
        <a href="https://x.com/${twitter}"><b>${name}</b></a>${githubLink} - 
        <a href="${portfolio}">${portfolio}</a>
    </div>
</div>`);
  }

  return designers.join('\n');
};

// Function to update the README.md file
const updateReadme = (designersHtml: string): void => {
  const readmeContent = fs.readFileSync(readmeFilePath, 'utf-8');
  
  // Check if there's an existing designers section to replace
  if (readmeContent.includes('<div style="display: flex; align-items: center; padding: 10px 0;">')) {
    const updatedContent = readmeContent.replace(
      /<div style="display: flex; align-items: center; padding: 10px 0;">[\s\S]*?<\/div><\/div>/g, 
      designersHtml
    );
    fs.writeFileSync(readmeFilePath, updatedContent, 'utf-8');
  } else {
    // If no existing section, append to the end or at a specific marker
    const startMarker = '# Great_Desfolio\n\nList of great engineers and their portfolio sites. \n\n';
    const updatedContent = readmeContent.includes(startMarker)
      ? readmeContent.replace(startMarker, startMarker + designersHtml)
      : readmeContent + '\n\n' + designersHtml;
    
    fs.writeFileSync(readmeFilePath, updatedContent, 'utf-8');
  }
};

// Main function to execute the update
const main = () => {
  const designersHtml = getDesigners();
  updateReadme(designersHtml);
};

main();

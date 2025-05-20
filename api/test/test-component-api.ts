import { createComponentAPI } from '../types/component-api';
import { validateComponentAPI, generateMarkdownDocs, generateTypeDefinitions } from '../utils/component-api-utils';
import * as fs from 'fs';
import * as path from 'path';

// Function to process a Vue component file
function processVueComponent(filePath: string): void {
  const content = fs.readFileSync(filePath, 'utf-8');
  const componentName = path.basename(filePath, '.vue');
  
  // Create component API
  const componentAPI = createComponentAPI(componentName, `API documentation for ${componentName} component`);

  // Extract props from Vue component
  const propsMatch = content.match(/props:\s*{([^}]*)}/s);
  if (propsMatch) {
    const propsContent = propsMatch[1];
    const propMatches = propsContent.matchAll(/(\w+):\s*{([^}]*)}/g);
    for (const match of propMatches) {
      const propName = match[1];
      const propContent = match[2];
      
      const typeMatch = propContent.match(/type:\s*([^,\n]*)/);
      const requiredMatch = propContent.match(/required:\s*([^,\n]*)/);
      const defaultMatch = propContent.match(/default:\s*([^,\n]*)/);
      const descriptionMatch = propContent.match(/description:\s*['"]([^'"]*)['"]/);

      componentAPI.props[propName] = {
        name: propName,
        type: typeMatch ? typeMatch[1].trim() : 'any',
        required: requiredMatch ? requiredMatch[1].trim() === 'true' : false,
        default: defaultMatch ? defaultMatch[1].trim() : undefined,
        description: descriptionMatch ? descriptionMatch[1] : `Prop ${propName}`
      };
    }
  }

  // Extract events from Vue component
  const emitsMatch = content.match(/emits:\s*\[([^\]]*)\]/);
  if (emitsMatch) {
    const events = emitsMatch[1].split(',').map((e: string) => e.trim().replace(/['"]/g, ''));
    events.forEach((eventName: string) => {
      componentAPI.events[eventName] = {
        name: eventName,
        description: `Event emitted by ${componentName}`,
        params: []
      };
    });
  }

  // Extract methods from Vue component
  const methodsMatch = content.match(/methods:\s*{([^}]*)}/s);
  if (methodsMatch) {
    const methodsContent = methodsMatch[1];
    const methodMatches = methodsContent.matchAll(/(\w+):\s*function\s*\(([^)]*)\)\s*{/g);
    for (const match of methodMatches) {
      const methodName = match[1];
      const params = match[2].split(',').map((p: string) => p.trim()).filter((p: string) => p);
      
      componentAPI.methods[methodName] = {
        name: methodName,
        description: `Method ${methodName} of ${componentName}`,
        params: params.map((param: string) => ({
          name: param,
          type: 'any',
          description: `Parameter ${param}`
        }))
      };
    }
  }

  // Validate the API
  const validation = validateComponentAPI(componentAPI);
  console.log(`\nValidation result for ${componentName}:`, validation);

  // Generate documentation
  const docs = generateMarkdownDocs(componentAPI);
  console.log(`\nGenerated Documentation for ${componentName}:`);
  console.log(docs);

  // Generate type definitions
  const types = generateTypeDefinitions(componentAPI);
  console.log(`\nGenerated Type Definitions for ${componentName}:`);
  console.log(types);

  // Create output directory if it doesn't exist
  const outputDir = path.join(process.cwd(), 'api/output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Save the complete API to a JSON file
  const outputPath = path.join(outputDir, `${componentName.toLowerCase()}-api.json`);
  fs.writeFileSync(outputPath, JSON.stringify(componentAPI, null, 2));
  console.log(`\nAPI JSON saved to: ${outputPath}`);
}

// Process all Vue components in the local-components directory
const componentsDir = path.join(process.cwd(), '../local-components');
const files = fs.readdirSync(componentsDir);

files.forEach((file: string) => {
  if (file.endsWith('.vue')) {
    const filePath = path.join(componentsDir, file);
    console.log(`\nProcessing component: ${file}`);
    processVueComponent(filePath);
  }
}); 
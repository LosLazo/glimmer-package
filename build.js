import { build } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Function to check if file exists
function fileExists(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}

// Create a simple index file that only includes components that exist
async function createTempIndex() {
  const componentsDir = path.join(__dirname, 'src/components');
  const folders = fs.readdirSync(componentsDir);
  
  let imports = [];
  let exports = [];
  let components = [];
  
  for (const folder of folders) {
    const componentFile = path.join(componentsDir, folder, `${folder}.vue`);
    if (fileExists(componentFile)) {
      const componentName = `G${folder}`;
      imports.push(`import ${componentName} from './components/${folder}/${folder}.vue';`);
      exports.push(componentName);
      components.push(`    app.component('${componentName}', ${componentName});`);
    }
  }
  
  const content = `// Auto-generated index.ts
${imports.join('\n')}

// Import global styles
import './styles/index.css';

// Export all components individually
export { ${exports.join(', ')} };

// Export the Vue plugin
export default {
  install: (app) => {
${components.join('\n')}
  }
};
`;
  
  fs.writeFileSync(path.join(__dirname, 'src/temp-index.ts'), content);
  return path.join(__dirname, 'src/temp-index.ts');
}

async function buildLibrary() {
  const entryPath = await createTempIndex();
  
  try {
    await build({
      configFile: path.join(__dirname, 'vite.config.ts'),
      build: {
        lib: {
          entry: entryPath,
          name: 'GlimmerPackage',
          formats: ['es'],
          fileName: format => `glimmer-package.${format === 'es' ? 'mjs' : 'js'}`,
        },
        emptyOutDir: true,
      },
    });
    console.log('Build completed successfully!');
  } catch (e) {
    console.error('Build failed:', e);
  } finally {
    // Clean up the temporary file
    fs.unlinkSync(entryPath);
  }
}

buildLibrary(); 
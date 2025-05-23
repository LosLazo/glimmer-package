// This script generates a JSON file with all the design tokens from the styles directory
// npm run generate-token-data

import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CSS_FILES = [
  'color.css',
  'dimension.css',
  'shadow.css',
  'string.css',
  'typography.css'
];

const STYLES_DIR = join(__dirname, '..', 'src', 'styles');
const THEME_DIRS = {
  base: join(STYLES_DIR, 'base'),
  light: join(STYLES_DIR, 'light-mode'),
  dark: join(STYLES_DIR, 'dark-mode')
};
const OUTPUT_FILE = join(__dirname, '..', 'docs', 'css-vars.json');

async function extractCSSVariables(content) {
  const variables = new Map();
  const regex = /--([^:]+):\s*([^;]+);/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const [, name, value] = match;
    variables.set(`--${name.trim()}`, value.trim());
  }

  return variables;
}

async function readThemeFile(filepath) {
  try {
    const content = await fs.readFile(filepath, 'utf-8');
    return content;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return '';
    }
    throw error;
  }
}

async function generateCSSVarsJSON() {
  try {
    const result = [];
    let currentId = 1;

    for (const cssFile of CSS_FILES) {
      const themeValues = {};
      
      // Read from each theme directory
      for (const [theme, dir] of Object.entries(THEME_DIRS)) {
        const content = await readThemeFile(join(dir, cssFile));
        const variables = await extractCSSVariables(content);
        themeValues[theme] = variables;
      }

      // Combine all unique variable names across themes
      const allVarNames = new Set();
      Object.values(themeValues).forEach(themeMap => {
        themeMap.forEach((_, name) => allVarNames.add(name));
      });

      // Create entries for each variable
      for (const varName of allVarNames) {
        result.push({
          id: currentId++,
          name: varName,
          value: {
            base: themeValues.base.get(varName) || null,
            light: themeValues.light.get(varName) || null,
            dark: themeValues.dark.get(varName) || null
          }
        });
      }
    }

    await fs.writeFile(OUTPUT_FILE, JSON.stringify({ variables: result }, null, 2));
    console.log(`Generated ${OUTPUT_FILE} with ${result.length} variables`);
  } catch (error) {
    console.error('Error generating CSS variables JSON:', error);
    process.exit(1);
  }
}

generateCSSVarsJSON(); 
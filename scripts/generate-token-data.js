// This script generates a JSON file with all the design tokens from the styles directory
// npm run generate-token-data

import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CSS_FILES = {
  'color.css': 'colors',
  'dimension.css': 'dimensions',
  'shadow.css': 'shadows',
  'string.css': 'strings',
  'typography.css': 'typography'
};

const STYLES_DIR = join(__dirname, '..', 'src', 'styles');
const THEME_DIRS = {
  base: join(STYLES_DIR, 'base'),
  light: join(STYLES_DIR, 'light-mode'),
  dark: join(STYLES_DIR, 'dark-mode')
};
const OUTPUT_FILE = join(__dirname, '..', 'docs', 'token-docs.json');

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

function resolveVariableValue(value, variableMap, visited = new Set()) {
  // If value doesn't reference a variable, return as-is
  if (!value || !value.includes('var(')) {
    return value;
  }

  // Extract variable references using regex
  const varRefRegex = /var\(\s*(--[^,)]+)(?:\s*,\s*([^)]+))?\s*\)/g;
  let resolvedValue = value;
  let match;

  while ((match = varRefRegex.exec(value)) !== null) {
    const [fullMatch, varName, fallback] = match;
    
    // Prevent circular references
    if (visited.has(varName)) {
      console.warn(`Circular reference detected for variable: ${varName}`);
      continue;
    }

    const referencedValue = variableMap.get(varName);
    
    if (referencedValue !== undefined) {
      // Add to visited set to prevent circular references
      const newVisited = new Set(visited);
      newVisited.add(varName);
      
      // Recursively resolve the referenced variable
      const resolved = resolveVariableValue(referencedValue, variableMap, newVisited);
      resolvedValue = resolvedValue.replace(fullMatch, resolved);
    } else if (fallback) {
      // Use fallback value if variable not found
      resolvedValue = resolvedValue.replace(fullMatch, fallback.trim());
    } else {
      // Keep original if no fallback and variable not found
      console.warn(`Variable ${varName} not found and no fallback provided`);
    }
  }

  return resolvedValue;
}

function createValueObject(rawValue, variableMap) {
  const resolvedValue = resolveVariableValue(rawValue, variableMap);
  
  // If the raw and resolved values are the same, just return the value
  if (rawValue === resolvedValue) {
    return rawValue;
  }
  
  // If they're different, return an object with both
  return {
    raw: rawValue,
    resolved: resolvedValue
  };
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
    const result = {
      variables: {}
    };
    let globalId = 1;

    for (const [cssFile, category] of Object.entries(CSS_FILES)) {
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

      // Create entries for each variable in this category
      const categoryVariables = [];
      for (const varName of allVarNames) {
        const baseValue = themeValues.base.get(varName) || null;
        const lightValue = themeValues.light.get(varName) || null;
        const darkValue = themeValues.dark.get(varName) || null;

        categoryVariables.push({
          id: globalId++,
          name: varName,
          value: {
            base: baseValue ? createValueObject(baseValue, themeValues.base) : null,
            light: lightValue ? createValueObject(lightValue, themeValues.light) : null,
            dark: darkValue ? createValueObject(darkValue, themeValues.dark) : null
          }
        });
      }

      result.variables[category] = categoryVariables;
    }

    await fs.writeFile(OUTPUT_FILE, JSON.stringify(result, null, 2));
    
    const totalVariables = Object.values(result.variables).reduce((sum, arr) => sum + arr.length, 0);
    console.log(`Generated ${OUTPUT_FILE} with ${totalVariables} variables across ${Object.keys(result.variables).length} categories`);
    
    // Log summary by category
    Object.entries(result.variables).forEach(([category, vars]) => {
      console.log(`  ${category}: ${vars.length} variables`);
    });
    
  } catch (error) {
    console.error('Error generating CSS variables JSON:', error);
    process.exit(1);
  }
}

generateCSSVarsJSON(); 
import { DocsGenerator } from '../src/utils/docs-generator.v2';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  // Parse command-line arguments
  const args = process.argv.slice(2);
  let componentsPath = path.resolve(__dirname, '../src/components');
  let outputPath = path.resolve(__dirname, '../docs');
  let outputFilename = 'component-docs.json';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--input' || args[i] === '-i') {
      if (i + 1 < args.length) {
        componentsPath = path.resolve(args[++i]);
      }
    } else if (args[i] === '--output' || args[i] === '-o') {
      if (i + 1 < args.length) {
        outputPath = path.resolve(args[++i]);
      }
    } else if (args[i] === '--filename' || args[i] === '-f') {
      if (i + 1 < args.length) {
        outputFilename = args[++i];
      }
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log(`
Component Documentation Generator

Usage:
  npm run generate-docs [options]

Options:
  -i, --input <path>     Path to components directory (default: src/components)
  -o, --output <path>    Output directory for generated docs (default: docs)
  -f, --filename <name>  Name of the output file (default: component-docs.json)
  -h, --help             Show this help message
      `);
      process.exit(0);
    }
  }

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  console.log('📊 Generating component documentation...');
  console.log(`📂 Components path: ${componentsPath}`);
  console.log(`📂 Output path: ${outputPath}/${outputFilename}`);

  const generator = new DocsGenerator(componentsPath, outputPath);
  
  try {
    await generator.generateDocs(outputFilename);
    console.log('✅ Documentation generated successfully!');
  } catch (error) {
    console.error('❌ Error generating documentation:', error);
    process.exit(1);
  }
}

main(); 
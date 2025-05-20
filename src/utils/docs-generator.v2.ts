import { parse } from '@vue/compiler-sfc';
import * as fs from 'fs';
import * as path from 'path';
import { ComponentAPI, createComponentAPI, ComponentProp, ComponentEvent, ComponentMethod, ComponentComputed } from '../../api/types/component-api';

interface ParsedComponent {
  props?: Record<string, any>;
  emits?: string[] | Record<string, any>;
  methods?: Record<string, any>;
  computed?: Record<string, any>;
}

interface JSDocResult {
  description: string;
  params?: Array<{
    name: string;
    type: string;
    description: string;
    required?: boolean;
  }>;
  returns?: {
    type: string;
    description: string;
  };
  examples?: string[];
}

export class DocsGenerator {
  private componentsPath: string;
  private outputPath: string;
  private validTypes = ['String', 'Number', 'Boolean', 'Array', 'Object', 'Function', 'Symbol', 'any'];

  constructor(componentsPath: string, outputPath: string) {
    this.componentsPath = componentsPath;
    this.outputPath = outputPath;
  }

  /**
   * Scan the components directory and generate documentation
   */
  public async generateDocs(outputFilename: string = 'component-docs.json'): Promise<void> {
    const componentFiles = this.findComponentFiles();
    const apis: ComponentAPI[] = [];

    for (const file of componentFiles) {
      const api = await this.processComponent(file);
      if (api) {
        apis.push(api);
      }
    }

    // Write the documentation to a JSON file
    const docsPath = path.join(this.outputPath, outputFilename);
    fs.writeFileSync(docsPath, JSON.stringify(apis, null, 2));
  }

  /**
   * Find all Vue component files in the components directory
   */
  private findComponentFiles(): string[] {
    const files: string[] = [];
    
    function scanDir(dir: string) {
      const entries = fs.readdirSync(dir);
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanDir(fullPath);
        } else if (entry.endsWith('.vue')) {
          files.push(fullPath);
        }
      }
    }

    scanDir(this.componentsPath);
    return files;
  }

  /**
   * Process a single component file and extract its API documentation
   */
  private async processComponent(filePath: string): Promise<ComponentAPI | null> {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { descriptor } = parse(content);
    
    if (!descriptor.script && !descriptor.scriptSetup) {
      return null;
    }

    const componentName = path.basename(filePath, '.vue');
    const scriptContent = descriptor.script?.content || '';
    const scriptSetupContent = descriptor.scriptSetup?.content || '';
    const combinedContent = `${scriptContent}\n${scriptSetupContent}`;

    const componentDocs = this.parseComponentJSDoc(combinedContent);
    const api = createComponentAPI(componentName, componentDocs.description);

    // Parse various component parts
    this.parseProps(api, scriptContent, scriptSetupContent);
    this.parseEvents(api, scriptContent, scriptSetupContent);
    this.parseMethods(api, scriptContent, scriptSetupContent);
    this.parseComputed(api, scriptContent, scriptSetupContent);
    this.extractTokens(api, content);

    return api;
  }

  /**
   * Parse component-level JSDoc comments
   */
  private parseComponentJSDoc(code: string): JSDocResult {
    const componentDoc = code.match(/@component\s+([^@]*?)(?=@|$)/);
    const descriptionDoc = code.match(/@description\s+([^@]*?)(?=@|$)/);
    const exampleDocs = [...code.matchAll(/@example\s+([^@]*?)(?=@|$)/g)];

    // Clean up description by removing the component name, newlines, and asterisks
    let description = '';
    if (componentDoc || descriptionDoc) {
      description = [
        componentDoc?.[1]?.trim(),
        descriptionDoc?.[1]?.trim()
      ]
        .filter(Boolean)
        .join(' ')
        .replace(/^\s*\*\s*/gm, '') // Remove asterisks at start of lines
        .replace(/\n\s*\*/g, ' ')    // Replace newlines with asterisks
        .replace(/\n/g, ' ')         // Replace newlines with spaces
        .replace(/\s+/g, ' ')        // Normalize whitespace
        .replace(/\*+$/, '')         // Remove trailing asterisks
        .trim();
    }

    return {
      description,
      examples: exampleDocs.map(match => match[1].trim())
    };
  }

  /**
   * Parse props from script content with improved type handling
   */
  private parseProps(api: ComponentAPI, scriptContent: string, scriptSetupContent: string): void {
    // Handle interface Props in script setup
    const propsInterfaceDefinition = scriptSetupContent.match(/interface\s+Props\s*\{([\s\S]*?)\}/);
    if (propsInterfaceDefinition) {
      const props = this.parsePropsInterfaceDefinition(propsInterfaceDefinition[1]);
      
      // Find default values in withDefaults call
      const defaultValues = scriptSetupContent.match(/withDefaults\(\s*defineProps<Props>\(\),\s*(\{[\s\S]*?\})\s*\)/);
      const defaults = defaultValues ? this.parseDefaultValues(defaultValues[1]) : {};
      
      Object.entries(props).forEach(([name, prop]) => {
        api.props[name] = {
          ...prop,
          default: defaults[name]
        };
      });
      return;
    }

    // Look for direct defineProps with object notation
    const definePropsObjectMatch = scriptSetupContent.match(/defineProps\(\s*(\{[\s\S]*?\})\s*\)/);
    if (definePropsObjectMatch) {
      const props = this.parsePropsObject(definePropsObjectMatch[1]);
      Object.assign(api.props, props);
      return;
    }

    // Handle withDefaults + defineProps with improved regex
    const withDefaultsMatch = scriptSetupContent.match(
      /withDefaults\(\s*defineProps<\s*([\s\S]*?)>\(\)\s*,\s*(\{[\s\S]*?\})\s*\)/
    );
    
    if (withDefaultsMatch) {
      const [_, propsInterface, defaultValues] = withDefaultsMatch;
      const props = this.parsePropsInterface(propsInterface);
      const defaults = this.parseDefaultValues(defaultValues);

      Object.entries(props).forEach(([name, prop]) => {
        api.props[name] = {
          ...prop,
          default: defaults[name]
        };
      });
      return;
    }

    // Handle regular defineProps with improved regex
    const propsInterfaceMatch = scriptSetupContent.match(/defineProps<\s*([\s\S]*?)>\s*\(/);
    if (propsInterfaceMatch) {
      const props = this.parsePropsInterface(propsInterfaceMatch[1]);
      Object.assign(api.props, props);
      return;
    }

    // Handle Options API props with improved regex
    const propsMatch = scriptContent.match(/props:\s*(\{[\s\S]*?\})\s*,/);
    if (propsMatch) {
      const props = this.parsePropsObject(propsMatch[1]);
      Object.assign(api.props, props);
    }
  }

  /**
   * Parse props from an interface definition
   */
  private parsePropsInterfaceDefinition(interfaceStr: string): Record<string, ComponentProp> {
    const props: Record<string, ComponentProp> = {};
    const propMatches = [...interfaceStr.matchAll(/\/\*\*([\s\S]*?)\*\/\s*(\w+)(\?)?:\s*([^;]*);/g)];

    for (const match of propMatches) {
      const [_, docBlock, name, optional, type] = match;
      const description = this.extractDescription(docBlock);
      const defaultMatch = docBlock.match(/@default\s+"?([^"\n]+)"?/);
      
      props[name] = {
        name,
        type: this.validateType(type.trim()),
        required: !optional,
        description: description || `The ${name} prop`,
        default: defaultMatch ? defaultMatch[1].trim() : undefined,
        values: this.extractPossibleValues(type.trim())
      };
    }

    return props;
  }

  /**
   * Parse props interface format
   */
  private parsePropsInterface(interfaceStr: string): Record<string, ComponentProp> {
    const props: Record<string, ComponentProp> = {};
    
    // Extract properties from an interface-like string, handling both inline and complex formats
    const propMatches = [...interfaceStr.matchAll(/(\w+)(\?)?:\s*([^;\n}]*)/g)];

    propMatches.forEach(match => {
      const [_, name, optional, type] = match;
      const jsdoc = this.extractJSDocForProp(interfaceStr, name);
      const cleanType = type.trim().replace(/^\{|\}$/g, '');
      
      props[name] = {
        name,
        type: this.validateType(cleanType),
        required: !optional,
        description: jsdoc?.description || `The ${name} prop`,
        default: undefined,
        values: this.extractPossibleValues(cleanType)
      };
    });

    return props;
  }

  /**
   * Parse default values object
   */
  private parseDefaultValues(defaultsStr: string): Record<string, any> {
    const defaults: Record<string, any> = {};
    const defaultMatches = [...defaultsStr.matchAll(/(\w+):\s*([^,\n}]*)/g)];

    defaultMatches.forEach(match => {
      const [_, name, value] = match;
      defaults[name] = this.parseDefaultValue(value.trim());
    });

    return defaults;
  }

  /**
   * Parse a single default value
   */
  private parseDefaultValue(value: string): any {
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (value === 'null') return null;
    if (value === 'undefined') return undefined;
    if (/^\d+$/.test(value)) return Number(value);
    if (value.startsWith('"') || value.startsWith("'")) {
      return value.slice(1, -1);
    }
    return value;
  }

  /**
   * Extract JSDoc for a specific prop
   */
  private extractJSDocForProp(code: string, propName: string): JSDocResult | undefined {
    const regex = new RegExp(`\\/\\*\\*([\\s\\S]*?)\\*\\/\\s*(?:export\\s+)?(?:readonly\\s+)?${propName}[?:]`, 'i');
    const match = code.match(regex);
    if (!match) return undefined;

    const docBlock = match[1];
    const description = this.extractDescription(docBlock);
    const params = this.extractParams(docBlock);
    const type = this.extractType(docBlock);

    return {
      description,
      params,
      returns: type ? { type, description: '' } : undefined
    };
  }

  /**
   * Extract description from JSDoc block
   */
  private extractDescription(docBlock: string): string {
    // Remove * from start of lines and normalize whitespace
    const cleaned = docBlock
      .replace(/^\s*\*\s?/gm, '')
      .replace(/\n\s*\*/g, ' ')
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/\*+$/, '')
      .trim();

    // Get everything up to the first @tag
    const description = cleaned.split(/\s*@[a-zA-Z]/)[0].trim();
    return description || 'No description provided';
  }

  /**
   * Extract parameters from JSDoc block
   */
  private extractParams(docBlock: string): Array<{name: string; type: string; description: string; required?: boolean}> {
    const params: Array<{name: string; type: string; description: string; required?: boolean}> = [];
    const paramMatches = [...docBlock.matchAll(/@param\s+(?:{([^}]+)})?\s*(\w+)\s*-?\s*([^@]*?)(?=\s*@|$)/g)];

    paramMatches.forEach(match => {
      const [_, type = 'any', name, description] = match;
      params.push({
        name,
        type: this.validateType(type),
        description: description.trim(),
        required: !type.includes('?')
      });
    });

    return params;
  }

  /**
   * Validate and normalize type information
   */
  private validateType(type: string): string {
    const baseType = type.replace(/[\[\]<>]/g, '').trim();
    const validType = this.validTypes.find(t => 
      baseType.toLowerCase() === t.toLowerCase()
    );
    return validType || 'any';
  }

  /**
   * Parse events from script content
   */
  private parseEvents(api: ComponentAPI, scriptContent: string, scriptSetupContent: string): void {
    // Handle defineEmits with TypeScript interfaces
    const emitsInterfaceMatch = scriptSetupContent.match(/const\s+emit\s*=\s*defineEmits<\s*\{([\s\S]*?)\}\s*>\(\)/);
    if (emitsInterfaceMatch) {
      const emitsBlock = emitsInterfaceMatch[1];
      // Find all event declarations with JSDoc comments
      const eventRegex = /\/\*\*([\s\S]*?)\*\/\s*'([^']+)':\s*\[(.*?)\]/g;
      const matches = [...emitsBlock.matchAll(eventRegex)];
      
      for (const match of matches) {
        const [_, docBlock, eventName, paramsDef] = match;
        const description = this.extractDescription(docBlock);
        const params = this.extractEventParamsFromDoc(docBlock);
        
        api.events[eventName] = {
          name: eventName,
          description: description || `The ${eventName} event`,
          params
        };
      }
      return;
    }

    // Handle defineEmits with improved regex for array syntax
    const emitsArrayMatch = scriptSetupContent.match(/defineEmits\(\s*\[(.*?)\]\s*\)/);
    if (emitsArrayMatch) {
      const emitsArray = emitsArrayMatch[1].split(',').map(e => e.trim().replace(/['"]/g, ''));
      emitsArray.forEach(eventName => {
        const jsdoc = this.extractJSDocForEvent(scriptSetupContent, eventName);
        api.events[eventName] = {
          name: eventName,
          description: jsdoc?.description || `The ${eventName} event`,
          params: jsdoc?.params || []
        };
      });
      return;
    }

    // Handle Options API events
    const optionsEmitsMatch = scriptContent.match(/emits:\s*(\[[\s\S]*?\]|\{[\s\S]*?\})/);
    if (optionsEmitsMatch) {
      const [_, emitsDeclaration] = optionsEmitsMatch;
      if (emitsDeclaration.startsWith('[')) {
        // Array syntax
        const events = emitsDeclaration.replace(/\[|\]/g, '').split(',')
          .map(e => e.trim().replace(/['"]/g, ''));
        
        events.forEach(eventName => {
          const jsdoc = this.extractJSDocForEvent(scriptContent, eventName);
          api.events[eventName] = {
            name: eventName,
            description: jsdoc?.description || `The ${eventName} event`,
            params: []
          };
        });
      } else {
        // Object syntax
        const eventMatches = [...emitsDeclaration.matchAll(/['"]([^'"]+)['"]\s*:/g)];
        eventMatches.forEach(match => {
          const eventName = match[1];
          const jsdoc = this.extractJSDocForEvent(scriptContent, eventName);
          api.events[eventName] = {
            name: eventName,
            description: jsdoc?.description || `The ${eventName} event`,
            params: jsdoc?.params || []
          };
        });
      }
    }
  }

  /**
   * Extract event parameters from JSDoc block
   */
  private extractEventParamsFromDoc(docBlock: string): Array<{name: string; type: string; description: string}> {
    const params: Array<{name: string; type: string; description: string}> = [];
    const paramMatches = [...docBlock.matchAll(/@param\s+\{([^}]+)\}\s+(\w+)\s*-\s*([^@]*?)(?=\s*@|$)/g)];

    paramMatches.forEach(match => {
      const [_, type, name, description] = match;
      params.push({
        name,
        type: this.validateType(type),
        description: description.trim()
      });
    });

    return params;
  }

  /**
   * Extract JSDoc for a specific event
   */
  private extractJSDocForEvent(code: string, eventName: string): JSDocResult | undefined {
    const regex = new RegExp(`\\/\\*\\*([\\s\\S]*?)\\*\\/\\s*(?:'${eventName}'|"${eventName}")`, 'i');
    const match = code.match(regex);
    if (!match) return undefined;

    const docBlock = match[1];
    return {
      description: this.extractDescription(docBlock),
      params: this.extractParams(docBlock)
    };
  }

  /**
   * Parse methods from script content
   */
  private parseMethods(api: ComponentAPI, scriptContent: string, scriptSetupContent: string): void {
    // First look for method declarations with JSDoc in script setup
    const methodDocs = [...scriptSetupContent.matchAll(/\/\*\*([\s\S]*?)\*\/\s*(?:async\s+)?function\s+(\w+)\s*\(([^)]*)\)/g)];
    
    for (const match of methodDocs) {
      const [_, docBlock, methodName, params] = match;
      if (methodName.startsWith('_')) continue; // Skip private methods
      
      const description = this.extractDescription(docBlock);
      const paramDocs = this.extractMethodParams(docBlock);
      const returns = this.extractReturns(docBlock);
      
      api.methods[methodName] = {
        name: methodName,
        description,
        params: paramDocs,
        returns
      };
    }

    // Handle function declarations and arrow functions
    const methodRegex = /(?:\/\*\*[\s\S]*?\*\/\s*)?(?:async\s+)?(?:function\s+)?(\w+)\s*\(([^)]*)\)\s*(?::\s*[^{]+)?\s*{|const\s+(\w+)\s*=\s*(?:async\s+)?\([^)]*\)\s*(?::\s*[^=]+)?\s*=>/g;
    const matches = [...scriptSetupContent.matchAll(methodRegex)];
    
    for (const match of matches) {
      const methodName = match[1] || match[3];
      if (!methodName || methodName.startsWith('_') || api.methods[methodName]) continue;
      
      const jsdoc = this.extractJSDocForMethod(scriptSetupContent, methodName);
      if (jsdoc) {
        api.methods[methodName] = {
          name: methodName,
          description: jsdoc.description,
          params: this.extractMethodParams(jsdoc.description),
          returns: jsdoc.returns
        };
      }
    }
  }

  /**
   * Extract parameters for methods with cleaner formatting
   */
  private extractMethodParams(docBlock: string): Array<{name: string; type: string; description: string; required?: boolean}> {
    const params: Array<{name: string; type: string; description: string; required?: boolean}> = [];
    // This regex carefully extracts just the parameter name and type, followed by its description
    const paramMatches = [...docBlock.matchAll(/@param\s+{([^}]+)}\s+(\w+)\s*-?\s*([^@\n]*)/g)];

    paramMatches.forEach(match => {
      const [_, type = 'any', name, description] = match;
      params.push({
        name,
        type: this.validateType(type),
        description: description.trim().replace(/\*+$/, ''),
        required: !type.includes('?')
      });
    });

    return params;
  }

  /**
   * Extract JSDoc for a specific method
   */
  private extractJSDocForMethod(code: string, methodName: string): JSDocResult | undefined {
    const regex = new RegExp(`\\/\\*\\*([\\s\\S]*?)\\*\\/\\s*(?:async\\s+)?(?:function\\s+)?${methodName}\\s*\\(`, 'i');
    const match = code.match(regex);
    if (!match) return undefined;

    const docBlock = match[1];
    return {
      description: this.extractDescription(docBlock),
      params: this.extractParams(docBlock),
      returns: this.extractReturns(docBlock)
    };
  }

  /**
   * Parse computed properties from script content
   */
  private parseComputed(api: ComponentAPI, scriptContent: string, scriptSetupContent: string): void {
    // Handle computed properties in script setup
    const computedRegex = /const\s+(\w+)\s*=\s*computed\s*\(\s*\(\)\s*=>\s*{/g;
    const matches = [...scriptSetupContent.matchAll(computedRegex)];
    
    for (const match of matches) {
      const computedName = match[1];
      const jsdoc = this.extractJSDocForComputed(scriptSetupContent, computedName);
      if (jsdoc) {
        api.computed[computedName] = {
          name: computedName,
          description: jsdoc.description,
          type: jsdoc.returns?.type || 'any'
        };
      }
    }

    // Handle Options API computed properties
    const optionsComputedMatch = scriptContent.match(/computed:\s*(\{[\s\S]*?\})/);
    if (optionsComputedMatch) {
      const computedBlock = optionsComputedMatch[1];
      const computedMatches = [...computedBlock.matchAll(/(\w+)\s*\([^)]*\)\s*{/g)];
      
      computedMatches.forEach(match => {
        const computedName = match[1];
        const jsdoc = this.extractJSDocForComputed(scriptContent, computedName);
        if (jsdoc) {
          api.computed[computedName] = {
            name: computedName,
            description: jsdoc.description,
            type: jsdoc.returns?.type || 'any'
          };
        }
      });
    }
  }

  /**
   * Extract JSDoc for a computed property
   */
  private extractJSDocForComputed(code: string, computedName: string): JSDocResult | undefined {
    const regex = new RegExp(`\\/\\*\\*([\\s\\S]*?)\\*\\/\\s*(?:const\\s+)?${computedName}\\s*[=:]`, 'i');
    const match = code.match(regex);
    if (!match) return undefined;

    const docBlock = match[1];
    return {
      description: this.extractDescription(docBlock),
      returns: this.extractReturns(docBlock)
    };
  }

  /**
   * Parse props in object format (used in Options API)
   */
  private parsePropsObject(propsObject: string): Record<string, ComponentProp> {
    const props: Record<string, ComponentProp> = {};
    const propMatches = [...propsObject.matchAll(/(\w+):\s*(?:\{([\s\S]*?)\}|(\w+))/g)];
    
    propMatches.forEach(match => {
      const [_, name, propObject, propType] = match;
      
      if (propObject) {
        // Object format: { type, required, default, etc. }
        const typeMatch = propObject.match(/type:\s*(\w+)/);
        const requiredMatch = propObject.match(/required:\s*(true|false)/);
        const defaultMatch = propObject.match(/default:\s*(?:["'`]([^"'`]*)["'`]|(\w+))/);
        const jsdoc = this.extractJSDocForProp(propObject, name);
        
        props[name] = {
          name,
          type: this.validateType(typeMatch ? typeMatch[1] : 'any'),
          required: requiredMatch ? requiredMatch[1] === 'true' : false,
          default: defaultMatch ? (defaultMatch[1] || defaultMatch[2]) : undefined,
          description: jsdoc?.description || `The ${name} prop`
        };
      } else if (propType) {
        // Shorthand: propName: String
        props[name] = {
          name,
          type: this.validateType(propType),
          required: false,
          description: `The ${name} prop`
        };
      }
    });
    
    return props;
  }

  /**
   * Extract design tokens from component
   */
  private extractTokens(api: ComponentAPI, content: string): void {
    // Extract color variables
    const colorTokens = [...content.matchAll(/var\(--[\w-]*(color|bg|border)[\w-]*\)/g)]
      .map(m => ({
        name: m[0],
        value: m[0],
        description: `Color token ${m[0]}`
      }));
    
    // Extract dimension variables
    const dimensionTokens = [...content.matchAll(/var\(--[\w-]*(width|height|size|spacing|gap|margin|padding)[\w-]*\)/g)]
      .map(m => ({
        name: m[0],
        value: m[0],
        description: `Dimension token ${m[0]}`
      }));
    
    // Extract string constants
    const stringTokens = [...content.matchAll(/['"`]([\w-]+)['"`]/g)]
      .map(m => ({
        name: m[1],
        value: m[1],
        description: `String token ${m[1]}`
      }))
      .filter(t => t.name.length > 2); // Filter out short strings

    api.tokens = {
      colors: [...new Set(colorTokens)],
      dimensions: [...new Set(dimensionTokens)],
      strings: [...new Set(stringTokens)]
    };
  }

  private extractPossibleValues(type: string): (string | number)[] | undefined {
    // Handle union types like 'small' | 'medium' | 'large'
    if (type.includes('|')) {
      return type.split('|')
        .map(t => t.trim().replace(/['"]/g, ''))
        .filter(t => !['null', 'undefined'].includes(t));
    }
    return undefined;
  }

  private extractReturns(docBlock: string): { type: string; description: string } | undefined {
    const returnMatch = docBlock.match(/@returns?\s+(?:{([^}]+)})?\s*([^@]*?)(?=\s*@|$)/);
    if (!returnMatch) return undefined;

    const [_, type = 'any', description] = returnMatch;
    return {
      type: this.validateType(type),
      description: description.trim()
    };
  }

  private extractType(docBlock: string): string | undefined {
    const typeMatch = docBlock.match(/@type\s+{([^}]+)}/);
    return typeMatch ? this.validateType(typeMatch[1]) : undefined;
  }
} 
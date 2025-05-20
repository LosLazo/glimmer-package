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

export class DocsGenerator {
  private componentsPath: string;
  private outputPath: string;

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
    const api = createComponentAPI(
      componentName,
      this.extractComponentDescription(descriptor.script?.content || descriptor.scriptSetup?.content || '')
    );

    // Extract script content (either from script or script setup)
    const scriptContent = descriptor.script?.content || '';
    const scriptSetupContent = descriptor.scriptSetup?.content || '';
    
    // Parse props
    this.parseProps(api, scriptContent, scriptSetupContent);
    
    // Parse events
    this.parseEvents(api, scriptContent, scriptSetupContent);
    
    // Parse methods
    this.parseMethods(api, scriptContent, scriptSetupContent);
    
    // Parse computed properties
    this.parseComputed(api, scriptContent, scriptSetupContent);

    return api;
  }

  /**
   * Extract component description from JSDoc comments
   */
  private extractComponentDescription(code: string): string {
    const docComment = code.match(/\/\*\*\s*([\s\S]*?)\s*\*\//);
    return docComment ? docComment[1].replace(/\s*\*\s*/g, ' ').trim() : 'No description provided';
  }

  /**
   * Parse props from script content
   */
  private parseProps(api: ComponentAPI, scriptContent: string, scriptSetupContent: string): void {
    // Case 1: defineProps in script setup
    if (scriptSetupContent) {
      // Parse defineProps<{ ... }>() - TypeScript interface style
      const propsInterfaceMatch = scriptSetupContent.match(/defineProps<(\{[\s\S]*?\})>/);
      if (propsInterfaceMatch) {
        const propsInterface = propsInterfaceMatch[1];
        // Parse interface properties
        const propMatches = [...propsInterface.matchAll(/(\w+)(\?)?:\s*([^;]*)/g)];
        
        propMatches.forEach(match => {
          const [_, name, optional, type] = match;
          const jsdocComment = this.extractJSDocForProp(scriptSetupContent, name);
          
          api.props[name] = {
            name,
            type: type.trim(),
            description: jsdocComment || `The ${name} prop`,
            required: !optional
          };
        });
        return;
      }
      
      // Parse defineProps({ ... }) - Object style
      const propsObjectMatch = scriptSetupContent.match(/defineProps\((\{[\s\S]*?\})\)/);
      if (propsObjectMatch) {
        this.parsePropsObject(api, propsObjectMatch[1]);
        return;
      }
    }
    
    // Case 2: props in options API
    if (scriptContent) {
      const propsMatch = scriptContent.match(/props:\s*(\{[\s\S]*?\}),/);
      if (propsMatch) {
        this.parsePropsObject(api, propsMatch[1]);
      }
    }
  }
  
  /**
   * Parse props object format (used in both Options API and defineProps)
   */
  private parsePropsObject(api: ComponentAPI, propsObject: string): void {
    // Handle multi-line prop definitions
    const propRegex = /(\w+):\s*(?:\{([\s\S]*?)\}|(\w+))/g;
    const propMatches = [...propsObject.matchAll(propRegex)];
    
    propMatches.forEach(match => {
      const [_, name, propObject, propType] = match;
      
      if (propObject) {
        // Object format: { type, required, default, etc. }
        const typeMatch = propObject.match(/type:\s*(\w+)/);
        const requiredMatch = propObject.match(/required:\s*(true|false)/);
        const defaultMatch = propObject.match(/default:\s*(?:["'`]([^"'`]*)["'`]|(\w+))/);
        const descriptionMatch = propObject.match(/\/\*\*\s*([\s\S]*?)\s*\*\//);
        
        api.props[name] = {
          name,
          type: typeMatch ? typeMatch[1] : 'any',
          required: requiredMatch ? requiredMatch[1] === 'true' : false,
          default: defaultMatch ? (defaultMatch[1] || defaultMatch[2]) : undefined,
          description: descriptionMatch ? descriptionMatch[1].replace(/\s*\*\s*/g, ' ').trim() : `The ${name} prop`
        };
      } else if (propType) {
        // Shorthand: propName: String
        api.props[name] = {
          name,
          type: propType,
          description: `The ${name} prop`
        };
      }
    });
  }
  
  /**
   * Extract JSDoc comment for a specific prop
   */
  private extractJSDocForProp(code: string, propName: string): string | undefined {
    // Look for JSDoc comment above the prop definition
    const regex = new RegExp(`\\/\\*\\*\\s*([\\s\\S]*?)\\s*\\*\\/\\s*${propName}[?:]`, 'i');
    const match = code.match(regex);
    return match ? match[1].replace(/\s*\*\s*/g, ' ').trim() : undefined;
  }

  /**
   * Parse events from script content
   */
  private parseEvents(api: ComponentAPI, scriptContent: string, scriptSetupContent: string): void {
    // Case 1: defineEmits in script setup
    if (scriptSetupContent) {
      // Parse defineEmits<{ ... }>() - TypeScript interface style
      const emitsInterfaceMatch = scriptSetupContent.match(/defineEmits<(\{[\s\S]*?\})>/);
      if (emitsInterfaceMatch) {
        const emitsInterface = emitsInterfaceMatch[1];
        // Parse interface properties
        const emitMatches = [...emitsInterface.matchAll(/\(e:\s*['"](\w+)['"](?:,\s*([^)]*))?\):\s*void/g)];
        
        emitMatches.forEach(match => {
          const [_, eventName, params] = match;
          const jsdocComment = this.extractJSDocForEvent(scriptSetupContent, eventName);
          
          api.events[eventName] = {
            name: eventName,
            description: jsdocComment || `Emitted when ${eventName} occurs`,
            params: params ? this.parseEventParams(params) : undefined
          };
        });
        return;
      }
      
      // Parse defineEmits(['event1', 'event2']) - Array style
      const emitsArrayMatch = scriptSetupContent.match(/defineEmits\(\s*\[([\s\S]*?)\]\s*\)/);
      if (emitsArrayMatch) {
        const emitsArray = emitsArrayMatch[1];
        const events = [...emitsArray.matchAll(/['"](\w+)['"]/g)].map(m => m[1]);
        
        events.forEach(eventName => {
          api.events[eventName] = {
            name: eventName,
            description: `Emitted when ${eventName} occurs`
          };
        });
        return;
      }
    }
    
    // Case 2: emits in options API
    if (scriptContent) {
      const emitsMatch = scriptContent.match(/emits:\s*\[([\s\S]*?)\]/);
      if (emitsMatch) {
        const emitsArray = emitsMatch[1];
        const events = [...emitsArray.matchAll(/['"](\w+)['"]/g)].map(m => m[1]);
        
        events.forEach(eventName => {
          api.events[eventName] = {
            name: eventName,
            description: `Emitted when ${eventName} occurs`
          };
        });
      }
    }
  }
  
  /**
   * Extract JSDoc comment for a specific event
   */
  private extractJSDocForEvent(code: string, eventName: string): string | undefined {
    const regex = new RegExp(`\\/\\*\\*\\s*([\\s\\S]*?)\\s*\\*\\/\\s*\\(e:\\s*['"]${eventName}['"]`, 'i');
    const match = code.match(regex);
    return match ? match[1].replace(/\s*\*\s*/g, ' ').trim() : undefined;
  }
  
  /**
   * Parse event parameters
   */
  private parseEventParams(paramsStr: string): { name: string; type: string; description: string }[] {
    const params = paramsStr.split(',').map(p => p.trim());
    return params.map(param => {
      const [name, type] = param.split(':').map(p => p.trim());
      return {
        name,
        type: type || 'any',
        description: `Parameter ${name} for the event`
      };
    });
  }

  /**
   * Parse methods from script content
   */
  private parseMethods(api: ComponentAPI, scriptContent: string, scriptSetupContent: string): void {
    // Parse function declarations in script setup
    if (scriptSetupContent) {
      const functionMatches = [...scriptSetupContent.matchAll(/function\s+(\w+)\s*\(([^)]*)\)(?:\s*:\s*([^{]*))?/g)];
      
      functionMatches.forEach(match => {
        const [_, methodName, params, returnType] = match;
        const jsdocComment = this.extractJSDocForMethod(scriptSetupContent, methodName);
        
        api.methods[methodName] = {
          name: methodName,
          description: jsdocComment || `Method ${methodName}`,
          params: params ? this.parseMethodParams(params) : undefined,
          returns: returnType ? {
            type: returnType.trim(),
            description: `Return value of ${methodName}`
          } : undefined
        };
      });
      
      // Parse const with arrow functions
      const arrowFunctionMatches = [...scriptSetupContent.matchAll(/const\s+(\w+)\s*=\s*(?:\([^)]*\)|[^=]*)\s*=>\s*[{]/g)];
      
      arrowFunctionMatches.forEach(match => {
        const [fullMatch, methodName] = match;
        const jsdocComment = this.extractJSDocForMethod(scriptSetupContent, methodName);
        
        // Extract parameters from the arrow function
        const paramsMatch = fullMatch.match(/\(([^)]*)\)/);
        const params = paramsMatch ? paramsMatch[1] : '';
        
        api.methods[methodName] = {
          name: methodName,
          description: jsdocComment || `Method ${methodName}`,
          params: params ? this.parseMethodParams(params) : undefined
        };
      });
    }
    
    // Parse methods in options API
    if (scriptContent) {
      const methodsMatch = scriptContent.match(/methods:\s*(\{[\s\S]*?\}),/);
      if (methodsMatch) {
        const methodsObject = methodsMatch[1];
        const methodMatches = [...methodsObject.matchAll(/(\w+)(?:\([^)]*\)|:)\s*(?:function\s*)?(?:\([^)]*\))?\s*\{/g)];
        
        methodMatches.forEach(match => {
          const [fullMatch, methodName] = match;
          const jsdocComment = this.extractJSDocForMethod(scriptContent, methodName);
          
          // Extract parameters from the method
          const paramsMatch = fullMatch.match(/\(([^)]*)\)/);
          const params = paramsMatch ? paramsMatch[1] : '';
          
          api.methods[methodName] = {
            name: methodName,
            description: jsdocComment || `Method ${methodName}`,
            params: params ? this.parseMethodParams(params) : undefined
          };
        });
      }
    }
  }
  
  /**
   * Extract JSDoc comment for a specific method
   */
  private extractJSDocForMethod(code: string, methodName: string): string | undefined {
    const regex = new RegExp(`\\/\\*\\*\\s*([\\s\\S]*?)\\s*\\*\\/\\s*(function\\s+${methodName}|const\\s+${methodName})`, 'i');
    const match = code.match(regex);
    return match ? match[1].replace(/\s*\*\s*/g, ' ').trim() : undefined;
  }
  
  /**
   * Parse method parameters
   */
  private parseMethodParams(paramsStr: string): { name: string; type: string; description: string; required?: boolean }[] {
    if (!paramsStr.trim()) return [];
    
    const params = paramsStr.split(',').map(p => p.trim());
    return params.map(param => {
      const [name, type] = param.split(':').map(p => p.trim());
      const isOptional = name.includes('?');
      const cleanName = name.replace('?', '');
      
      return {
        name: cleanName,
        type: type || 'any',
        description: `Parameter ${cleanName} for the method`,
        required: !isOptional
      };
    });
  }

  /**
   * Parse computed properties from script content
   */
  private parseComputed(api: ComponentAPI, scriptContent: string, scriptSetupContent: string): void {
    // Parse computed in Options API
    if (scriptContent) {
      const computedMatch = scriptContent.match(/computed:\s*(\{[\s\S]*?\}),/);
      if (computedMatch) {
        const computedObject = computedMatch[1];
        const computedMatches = [...computedObject.matchAll(/(\w+)(?::\s*\{|:\s*function|\(\))/g)];
        
        computedMatches.forEach(match => {
          const [_, computedName] = match;
          const jsdocComment = this.extractJSDocForComputed(scriptContent, computedName);
          
          api.computed[computedName] = {
            name: computedName,
            type: 'any', // Would need type inference to determine this
            description: jsdocComment || `Computed property ${computedName}`
          };
        });
      }
    }
    
    // Parse computed() in Composition API
    if (scriptSetupContent) {
      const computedMatches = [...scriptSetupContent.matchAll(/const\s+(\w+)\s*=\s*computed\(\s*\(\)\s*=>/g)];
      
      computedMatches.forEach(match => {
        const [_, computedName] = match;
        const jsdocComment = this.extractJSDocForComputed(scriptSetupContent, computedName);
        
        api.computed[computedName] = {
          name: computedName,
          type: 'any', // Would need type inference
          description: jsdocComment || `Computed property ${computedName}`
        };
      });
    }
  }
  
  /**
   * Extract JSDoc comment for a specific computed property
   */
  private extractJSDocForComputed(code: string, computedName: string): string | undefined {
    const regex = new RegExp(`\\/\\*\\*\\s*([\\s\\S]*?)\\s*\\*\\/\\s*(${computedName}:|const\\s+${computedName})`, 'i');
    const match = code.match(regex);
    return match ? match[1].replace(/\s*\*\s*/g, ' ').trim() : undefined;
  }

  /**
   * Convert raw prop configuration to ComponentProp type
   */
  private convertToPropAPI(name: string, config: any): ComponentProp {
    return {
      name,
      type: typeof config === 'string' ? config : config.type?.name || 'any',
      description: config.description || `The ${name} prop`,
      required: config.required || false,
      default: config.default,
    };
  }
} 
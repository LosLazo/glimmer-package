import type { ComponentAPI } from '../types/component-api';

/**
 * Validates a component API object
 */
export function validateComponentAPI(api: ComponentAPI): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate required fields
  if (!api.name) errors.push('Component name is required');
  if (!api.description) errors.push('Component description is required');

  // Validate props
  Object.entries(api.props).forEach(([name, prop]) => {
    if (!prop.type) errors.push(`Prop "${name}" is missing type`);
    if (!prop.description) errors.push(`Prop "${name}" is missing description`);
  });

  // Validate events
  Object.entries(api.events).forEach(([name, event]) => {
    if (!event.description) errors.push(`Event "${name}" is missing description`);
    event.params?.forEach(param => {
      if (!param.name) errors.push(`Event "${name}" has a parameter missing name`);
      if (!param.type) errors.push(`Event "${name}" has a parameter missing type`);
    });
  });

  // Validate methods
  Object.entries(api.methods).forEach(([name, method]) => {
    if (!method.description) errors.push(`Method "${name}" is missing description`);
    method.params?.forEach(param => {
      if (!param.name) errors.push(`Method "${name}" has a parameter missing name`);
      if (!param.type) errors.push(`Method "${name}" has a parameter missing type`);
    });
  });

  // Validate computed properties
  Object.entries(api.computed).forEach(([name, computed]) => {
    if (!computed.type) errors.push(`Computed property "${name}" is missing type`);
    if (!computed.description) errors.push(`Computed property "${name}" is missing description`);
  });

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Merges two component APIs, with the second one taking precedence
 */
export function mergeComponentAPIs(base: ComponentAPI, override: Partial<ComponentAPI>): ComponentAPI {
  return {
    ...base,
    ...override,
    props: { ...base.props, ...override.props },
    events: { ...base.events, ...override.events },
    methods: { ...base.methods, ...override.methods },
    computed: { ...base.computed, ...override.computed },
    tokens: {
      colors: [...(base.tokens.colors || []), ...(override.tokens?.colors || [])],
      dimensions: [...(base.tokens.dimensions || []), ...(override.tokens?.dimensions || [])],
      strings: [...(base.tokens.strings || []), ...(override.tokens?.strings || [])]
    }
  };
}

/**
 * Generates TypeScript type definitions from a component API
 */
export function generateTypeDefinitions(api: ComponentAPI): string {
  const lines: string[] = [];

  // Component interface
  lines.push(`interface ${api.name}Props {`);
  Object.entries(api.props).forEach(([name, prop]) => {
    const required = prop.required ? '' : '?';
    lines.push(`  ${name}${required}: ${prop.type};`);
  });
  lines.push('}');

  // Events interface
  if (Object.keys(api.events).length > 0) {
    lines.push(`\ninterface ${api.name}Events {`);
    Object.entries(api.events).forEach(([name, event]) => {
      const params = event.params?.map(p => `${p.name}: ${p.type}`).join(', ') || '';
      lines.push(`  ${name}: (${params}) => void;`);
    });
    lines.push('}');
  }

  return lines.join('\n');
}

/**
 * Extracts tokens used by a component from its CSS
 */
export function extractComponentTokens(css: string): ComponentAPI['tokens'] {
  const tokens: ComponentAPI['tokens'] = {
    colors: [],
    dimensions: [],
    strings: []
  };

  // Extract CSS variables
  const cssVarRegex = /var\(--([^)]+)\)/g;
  let match;

  while ((match = cssVarRegex.exec(css)) !== null) {
    const tokenName = match[1];
    if (tokenName.includes('color')) {
      tokens.colors?.push({
        name: tokenName,
        value: `var(--${tokenName})`,
        description: `Color token used in ${tokenName}`
      });
    } else if (tokenName.includes('dimension') || tokenName.includes('space')) {
      tokens.dimensions?.push({
        name: tokenName,
        value: `var(--${tokenName})`,
        description: `Dimension token used in ${tokenName}`
      });
    } else {
      tokens.strings?.push({
        name: tokenName,
        value: `var(--${tokenName})`,
        description: `String token used in ${tokenName}`
      });
    }
  }

  return tokens;
}

/**
 * Generates documentation in markdown format
 */
export function generateMarkdownDocs(api: ComponentAPI): string {
  const lines: string[] = [];

  // Title and description
  lines.push(`# ${api.name}`);
  lines.push(`\n${api.description}\n`);

  // Props
  if (Object.keys(api.props).length > 0) {
    lines.push('## Props');
    lines.push('\n| Name | Type | Default | Required | Description |');
    lines.push('|------|------|---------|----------|-------------|');
    Object.entries(api.props).forEach(([name, prop]) => {
      lines.push(`| ${name} | ${prop.type} | ${prop.default || '-'} | ${prop.required ? 'Yes' : 'No'} | ${prop.description} |`);
    });
  }

  // Events
  if (Object.keys(api.events).length > 0) {
    lines.push('\n## Events');
    lines.push('\n| Name | Parameters | Description |');
    lines.push('|------|------------|-------------|');
    Object.entries(api.events).forEach(([name, event]) => {
      const params = event.params?.map(p => `${p.name}: ${p.type}`).join(', ') || '-';
      lines.push(`| ${name} | ${params} | ${event.description} |`);
    });
  }

  // Methods
  if (Object.keys(api.methods).length > 0) {
    lines.push('\n## Methods');
    lines.push('\n| Name | Parameters | Returns | Description |');
    lines.push('|------|------------|---------|-------------|');
    Object.entries(api.methods).forEach(([name, method]) => {
      const params = method.params?.map(p => `${p.name}: ${p.type}`).join(', ') || '-';
      const returns = method.returns ? `${method.returns.type}` : 'void';
      lines.push(`| ${name} | ${params} | ${returns} | ${method.description} |`);
    });
  }

  // Computed
  if (Object.keys(api.computed).length > 0) {
    lines.push('\n## Computed Properties');
    lines.push('\n| Name | Type | Description |');
    lines.push('|------|------|-------------|');
    Object.entries(api.computed).forEach(([name, computed]) => {
      lines.push(`| ${name} | ${computed.type} | ${computed.description} |`);
    });
  }

  // Tokens
  if (Object.keys(api.tokens).some(key => (api.tokens as any)[key]?.length > 0)) {
    lines.push('\n## Design Tokens');
    
    if (api.tokens.colors?.length) {
      lines.push('\n### Colors');
      lines.push('\n| Name | Value | Description |');
      lines.push('|------|-------|-------------|');
      api.tokens.colors.forEach(token => {
        lines.push(`| ${token.name} | ${token.value} | ${token.description} |`);
      });
    }

    if (api.tokens.dimensions?.length) {
      lines.push('\n### Dimensions');
      lines.push('\n| Name | Value | Description |');
      lines.push('|------|-------|-------------|');
      api.tokens.dimensions.forEach(token => {
        lines.push(`| ${token.name} | ${token.value} | ${token.description} |`);
      });
    }

    if (api.tokens.strings?.length) {
      lines.push('\n### Strings');
      lines.push('\n| Name | Value | Description |');
      lines.push('|------|-------|-------------|');
      api.tokens.strings.forEach(token => {
        lines.push(`| ${token.name} | ${token.value} | ${token.description} |`);
      });
    }
  }

  return lines.join('\n');
} 
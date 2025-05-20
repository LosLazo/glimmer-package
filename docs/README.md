# Component Documentation Generator

This tool automatically generates documentation for Vue components by analyzing their source code and JSDoc comments. The generated documentation includes information about props, events, methods, computed properties, and design tokens used in the components.

## Usage

```bash
# Generate documentation for all components
npm run generate-docs

# Generate documentation with custom options
npm run generate-docs -- --input src/custom-components --output custom-docs --filename api.json
```

## Options

- `-i, --input <path>`: Path to components directory (default: src/components)
- `-o, --output <path>`: Output directory for generated docs (default: docs)
- `-f, --filename <name>`: Name of the output file (default: component-docs.json)
- `-h, --help`: Show help message

## Documentation Format

To ensure your components are properly documented, follow these JSDoc formatting guidelines:

### Component Documentation

```typescript
/**
 * @component ComponentName
 * @description A clear description of what the component does.
 * 
 * @example
 * <ComponentName 
 *   propName="value"
 *   @event-name="handler"
 * />
 */
```

### Props Documentation

```typescript
interface Props {
  /**
   * Description of what the prop does
   * @default "default value" (optional)
   */
  propName: string;

  /**
   * Props can be marked as optional
   */
  optionalProp?: number;
}
```

### Events Documentation

```typescript
const emit = defineEmits<{
  /**
   * Description of when the event is emitted
   * @param {string} paramName - Description of the parameter
   */
  'event-name': [paramName: string];
}>();
```

### Methods Documentation

```typescript
/**
 * Description of what the method does
 * @param {string} paramName - Description of the parameter
 * @returns {boolean} Description of the return value
 */
function methodName(paramName: string): boolean {
  // Implementation
}
```

### Computed Properties Documentation

```typescript
/**
 * Description of what the computed property represents
 * @returns {string} Description of the returned value
 */
const computedProp = computed(() => {
  // Implementation
});
```

## Example Component

See `src/components/examples/ExampleComponent.vue` for a complete example of properly documented component.

## Generated Documentation

The generator creates a JSON file containing:

- Component metadata (name, description)
- Props (name, type, description, default value)
- Events (name, description, parameters)
- Methods (name, description, parameters, return value)
- Computed properties (name, type, description)
- Design tokens used (colors, dimensions, strings)

Example output:

```json
{
  "name": "ExampleComponent",
  "description": "A demonstration component...",
  "props": {
    "title": {
      "name": "title",
      "type": "String",
      "required": false,
      "default": "Default Title",
      "description": "The main title of the component"
    }
  },
  "events": {
    "update:isActive": {
      "name": "update:isActive",
      "description": "Emitted when the button is clicked",
      "params": [
        {
          "name": "isActive",
          "type": "boolean",
          "description": "The new active state"
        }
      ]
    }
  }
}
```

## Best Practices

1. Always include a component description using `@component` and `@description` tags
2. Provide meaningful examples using `@example` tags
3. Document all props, events, methods, and computed properties
4. Use proper JSDoc tags for parameters (`@param`) and return values (`@returns`)
5. Include default values for props using `@default` tag
6. Keep descriptions clear and concise
7. Use TypeScript interfaces to define prop and event types

## Contributing

When adding new components or modifying existing ones:

1. Follow the documentation format shown above
2. Run the documentation generator to verify output
3. Review the generated documentation for accuracy
4. Update the example component if new patterns are introduced 
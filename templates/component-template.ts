import { ComponentAPI, createComponentAPI } from '../api/types/component-api';

/**
 * Example Component Template
 * This template shows how to structure a component with all required API information
 */
export const exampleComponentAPI: ComponentAPI = createComponentAPI(
  'ExampleComponent',
  'A template component that demonstrates the required API structure'
);

// Add props
exampleComponentAPI.props = {
  title: {
    name: 'title',
    description: 'The main title of the component',
    type: 'string',
    required: true,
    default: 'Default Title'
  },
  count: {
    name: 'count',
    description: 'Number of items to display',
    type: 'number',
    required: false,
    default: 0,
    values: [0, 1, 2, 3, 4, 5]
  }
};

// Add events
exampleComponentAPI.events = {
  onClick: {
    name: 'onClick',
    description: 'Triggered when the component is clicked',
    params: [
      {
        name: 'event',
        type: 'MouseEvent',
        description: 'The mouse event object'
      }
    ]
  }
};

// Add methods
exampleComponentAPI.methods = {
  reset: {
    name: 'reset',
    description: 'Resets the component to its initial state',
    params: [],
    returns: {
      type: 'void',
      description: 'No return value'
    }
  },
  getValue: {
    name: 'getValue',
    description: 'Gets the current value of the component',
    params: [],
    returns: {
      type: 'string',
      description: 'The current value'
    }
  }
};

// Add computed properties
exampleComponentAPI.computed = {
  isActive: {
    name: 'isActive',
    description: 'Whether the component is in an active state',
    type: 'boolean',
    default: false
  }
};

// Add tokens
exampleComponentAPI.tokens = {
  colors: [
    {
      name: 'primary',
      value: '#007AFF',
      description: 'Primary brand color'
    },
    {
      name: 'secondary',
      value: '#5856D6',
      description: 'Secondary brand color'
    }
  ],
  dimensions: [
    {
      name: 'spacing',
      value: '16px',
      description: 'Default spacing unit'
    },
    {
      name: 'borderRadius',
      value: '8px',
      description: 'Default border radius'
    }
  ],
  strings: [
    {
      name: 'loadingText',
      value: 'Loading...',
      description: 'Text shown during loading state'
    }
  ]
}; 
/**
 * Component API Type Definitions
 * This file defines the structure for the component API documentation
 */

// Base types for common properties
export interface BaseProperty {
  name: string;
  description: string;
}

// Props interface
export interface ComponentProp extends BaseProperty {
  type: string;
  value?: any;
  default?: any;
  required?: boolean;
  values?: (string | number)[];
}

// Events interface
export interface ComponentEvent extends BaseProperty {
  params?: {
    name: string;
    type: string;
    description: string;
  }[];
}

// Methods interface
export interface ComponentMethod extends BaseProperty {
  params?: {
    name: string;
    type: string;
    description: string;
    required?: boolean;
  }[];
  returns?: {
    type: string;
    description: string;
  };
}

// Computed interface
export interface ComponentComputed extends BaseProperty {
  type: string;
  value?: any;
  default?: any;
}

// Tokens interface
export interface ComponentTokens {
  colors?: {
    name: string;
    value: string;
    description: string;
  }[];
  dimensions?: {
    name: string;
    value: string;
    description: string;
  }[];
  strings?: {
    name: string;
    value: string;
    description: string;
  }[];
}

// Main Component API interface
export interface ComponentAPI {
  name: string;
  prefixedName: string;
  description: string;
  props: Record<string, ComponentProp>;
  events: Record<string, ComponentEvent>;
  methods: Record<string, ComponentMethod>;
  computed: Record<string, ComponentComputed>;
  tokens: ComponentTokens;
}

// Type guard functions
export function isComponentProp(value: any): value is ComponentProp {
  return value && typeof value === 'object' && 'type' in value;
}

export function isComponentEvent(value: any): value is ComponentEvent {
  return value && typeof value === 'object' && 'params' in value;
}

export function isComponentMethod(value: any): value is ComponentMethod {
  return value && typeof value === 'object' && 'params' in value;
}

export function isComponentComputed(value: any): value is ComponentComputed {
  return value && typeof value === 'object' && 'type' in value;
}

export function isComponentTokens(value: any): value is ComponentTokens {
  return value && typeof value === 'object' && 
    ('colors' in value || 'dimensions' in value || 'strings' in value);
}

// Helper function to create a new component API
export function createComponentAPI(name: string, description: string): ComponentAPI {
  // Remove 'Glim' prefix if it exists to get the base name
  const baseName = name.startsWith('Glim') ? name.substring(4) : name;
  const prefixedName = baseName.startsWith('Glim') ? baseName : `Glim${baseName}`;
  
  return {
    name: baseName,
    prefixedName,
    description,
    props: {},
    events: {},
    methods: {},
    computed: {},
    tokens: {
      colors: [],
      dimensions: [],
      strings: []
    }
  };
} 
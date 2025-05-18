declare module 'feather-icons' {
  interface FeatherIconAttributes {
    width?: number | string;
    height?: number | string;
    'stroke-width'?: number | string;
    'stroke-linecap'?: 'round' | 'butt' | 'square';
    'stroke-linejoin'?: 'round' | 'bevel' | 'miter';
    color?: string;
    [key: string]: any;
  }

  interface FeatherIcon {
    name: string;
    contents: string;
    tags: string[];
    attrs: {
      xmlns: string;
      width: number | string;
      height: number | string;
      viewBox: string;
      fill: string;
      stroke: string;
      'stroke-width': number;
      'stroke-linecap': string;
      'stroke-linejoin': string;
    };
    toSvg(attrs?: FeatherIconAttributes): string;
  }

  interface FeatherIcons {
    [key: string]: FeatherIcon;
  }

  interface FeatherStatic {
    icons: FeatherIcons;
    toSvg(name: string, attrs?: FeatherIconAttributes): string;
    replace(attrs?: FeatherIconAttributes): void;
  }

  const feather: FeatherStatic;
  export default feather;
} 
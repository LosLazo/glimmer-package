declare module 'feather-icons' {
  interface FeatherIcon {
    name: string;
    contents: string;
    tags: string[];
    attrs: Record<string, string>;
    toSvg(attrs?: Record<string, string>): string;
  }

  interface FeatherStatic {
    icons: Record<string, FeatherIcon>;
    [key: string]: any;
  }

  const feather: FeatherStatic;
  export default feather;
} 
declare module 'feather-icons' {
  interface FeatherIcon {
    toSvg(attrs?: { [key: string]: any }): string;
  }

  interface FeatherIcons {
    [key: string]: FeatherIcon;
  }

  const icons: FeatherIcons;

  export default {
    icons
  }
} 
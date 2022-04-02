import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;
    colors: {
      primary: string;
      secondary: string;
      background: string;
      backgroundContent: string;
      scrollBar: string;
      text: string;
      textBold: string;
      icons: string;
      label: string;
      placeholder: string;
    };
  }
}

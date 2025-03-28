import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    bgColor2: string;
    bgColor3: string;
    textColor: string;
    accentColor: string;
    btnColor: string;
    hoverColor: string;
    positive: string;
    negative: string;
  }
}

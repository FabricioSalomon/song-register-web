import "styled-components";

import { Colors, Fonts } from "./base";

declare module "styled-components" {
  export interface DefaultTheme {
    fonts: Fonts;
    colors: Colors;
    fontColor: string;
    backgroundColor: string;
  }
}

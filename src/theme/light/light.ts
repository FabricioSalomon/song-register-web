import { LightTheme } from "./types";
import { Color, ColorGroup, Colors, FontSize, Size } from "../base";

export const LightColors: Colors = {
  [ColorGroup.MONOCHROMATIC]: {
    [Color.PRIMARY]: "#993366",
    [Color.SECONDARY]: "#8B2C5F",
    [Color.TERTIARY]: "#77264D",
    [Color.QUATERNARY]: "#5F1D3E",
  },
  [ColorGroup.SHADOW]: {
    [Color.PRIMARY]: "#6B2240",
    [Color.SECONDARY]: "#8E3358",
    [Color.TERTIARY]: "#AD3D6F",
    [Color.QUATERNARY]: "#CC477F",
  },
  
};

export const light: LightTheme = {
  colors: LightColors,
  backgroundColor: "#FFFFFF",
  fonts: {
    [Size.SMALL]: FontSize[Size.SMALL],
    [Size.MEDIUM]: FontSize[Size.MEDIUM],
    [Size.LARGE]: FontSize[Size.LARGE],
  },
};

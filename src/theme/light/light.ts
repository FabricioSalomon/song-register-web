import { LightTheme } from "./types";
import { Color, ColorGroup, Colors, FontSize, Size } from "../base";

export const LightColors: Colors = {
  [ColorGroup.MONOCHROMATIC]: {
    [Color.PRIMARY]: "#cc3366",
    [Color.SECONDARY]: "#F1477F",
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
  fontColor: "#000000",
  backgroundColor: "#CC477F55",
  fonts: {
    [Size.SMALL]: FontSize[Size.SMALL],
    [Size.MEDIUM]: FontSize[Size.MEDIUM],
    [Size.LARGE]: FontSize[Size.LARGE],
  },
};

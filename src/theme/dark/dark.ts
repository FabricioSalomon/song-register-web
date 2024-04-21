import { DarkTheme } from "./types";
import { Color, ColorGroup, Colors, FontSize, Size } from "../base";

export const DarkColors: Colors = {
  [ColorGroup.MONOCHROMATIC]: {
    [Color.PRIMARY]: "#FFFFFF",
    [Color.SECONDARY]: "#D57BA8",
    [Color.TERTIARY]: "#AA7E94",
    [Color.QUATERNARY]: "#807178",
  },
  [ColorGroup.SHADOW]: {
    [Color.PRIMARY]: "#913B66",
    [Color.SECONDARY]: "#B3497E",
    [Color.TERTIARY]: "#D45796",
    [Color.QUATERNARY]: "#F665AE",
  },
};

export const dark: DarkTheme = {
  colors: DarkColors,
  backgroundColor: "#553D49",
  fonts: {
    [Size.SMALL]: FontSize[Size.SMALL],
    [Size.MEDIUM]: FontSize[Size.MEDIUM],
    [Size.LARGE]: FontSize[Size.LARGE],
  },
};

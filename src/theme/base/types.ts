import { DarkTheme } from "../dark";
import { Color, ColorGroup, Size, Theme } from "./enum";
import { LightTheme } from "../light";

export type Fonts = {
  [key in Size]: string;
};

export type ColorsGrouped = {
  [key in Color]: string;
};

export type Colors = {
  [key in ColorGroup]: ColorsGrouped;
};

export type Themes = {
  [Theme.DARK]: DarkTheme;
  [Theme.LIGHT]: LightTheme;
};

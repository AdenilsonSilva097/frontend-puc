import { atom } from "jotai";
import light from "./light";

export interface EmpatieseTheme {
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

export const themeAtom = atom<EmpatieseTheme>(light);

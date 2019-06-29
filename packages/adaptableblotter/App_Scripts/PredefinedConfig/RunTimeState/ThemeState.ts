import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
export interface ThemeState extends RunTimeState {
  CurrentTheme?: string;
  SystemThemes?: string[];
  UserThemes?: UserTheme[];
}

export interface UserTheme extends AdaptableBlotterObject {
  Name: string;
  Url: string;
}

/*
CurrentTheme

string

The name of the theme you want to use at startup (this will get overwritten if the theme is subsequently changed), If not set, the default - "Light Theme" - is used.

Note
If you don't set a theme, the Default - which is Light Theme is used.

UserThemes

IUserTheme array

Collection representing the themes that you create and ship (which should be Bootstrap compliant). An IUserTheme contains 2 properties: Name and Url.

SystemThemes

string array

Which of the system's themes are available. Provide an empty array if you want no system themes, or list the system themes you want. If this property is not provided then both the system themes (Light Theme and Dark Theme) which ship with the Blotter are available.

Note
If you have useDefaultVendorGridThemes set to true in IAdaptableBlotterOptions then setting (or changing to) either of the shipped System Themes will set the theme of the vendor grid too.  See BlotterOptions.
*/

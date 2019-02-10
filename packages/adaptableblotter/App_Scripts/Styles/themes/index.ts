import { LIGHT_THEME, DARK_THEME } from "../../Utilities/Constants/GeneralConstants";

export const StaticThemes: Array<string> = ['Light Theme', 'Dark Theme']
declare var require: any
export var ThemesContent = new Map<string, string>([
    // tslint:disable-next-line:no-var-requires
    [LIGHT_THEME, require('./default/bootstrap.min.css')],
      // tslint:disable-next-line:no-var-requires
    [DARK_THEME, require('./slate/bootstrap.min.css')],
    ])

    
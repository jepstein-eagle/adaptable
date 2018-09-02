export const StaticThemes: Array<string> = ['Light Theme', 'Dark Theme']
declare var require: any
export var ThemesContent = new Map<string, string>([
    // tslint:disable-next-line:no-var-requires
    ["Light Theme", require('./default/bootstrap.min.css')],
      // tslint:disable-next-line:no-var-requires
    ["Dark Theme", require('./slate/bootstrap.min.css')],
    ])

    
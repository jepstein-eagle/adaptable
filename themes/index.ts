export const StaticThemes: Array<string> = ['Default', 'None', 'Cerulean', 'Cosmo', 'Cyborg', 'Darkly', 'Flatly', 'Journal', 'Lumen', 'Paper', 'Readable', 'Sandstone', 'Simplex', 'Slate', 'Spacelab', 'Superhero', 'United', 'Yeti']
declare var require: any
export var ThemesContent = new Map<string, string>([
    // tslint:disable-next-line:no-var-requires
    ["Default", require('./default/bootstrap.min.css')],
    ["None", ""],
    // tslint:disable-next-line:no-var-requires
    ["Cerulean", require('./cerulean/bootstrap.min.css')],
    // tslint:disable-next-line:no-var-requires
    ["Cosmo", require('./cosmo/bootstrap.min.css')],
    // tslint:disable-next-line:no-var-requires
    ["Cyborg", require('./cyborg/bootstrap.min.css')],
    // tslint:disable-next-line:no-var-requires
    ["Darkly", require('./darkly/bootstrap.min.css')],
    // tslint:disable-next-line:no-var-requires
    ["Flatly", require('./flatly/bootstrap.min.css')],
    // tslint:disable-next-line:no-var-requires
    ["Journal", require('./journal/bootstrap.min.css')],
    // tslint:disable-next-line:no-var-requires
    ["Lumen", require('./lumen/bootstrap.min.css')],
    // tslint:disable-next-line:no-var-requires
    ["Paper", require('./paper/bootstrap.min.css')],
    // tslint:disable-next-line:no-var-requires
    ["Readable", require('./readable/bootstrap.min.css')],
    // tslint:disable-next-line:no-var-requires
    ["Sandstone", require('./sandstone/bootstrap.min.css')],
    // tslint:disable-next-line:no-var-requires
    ["Simplex", require('./simplex/bootstrap.min.css')],
    // tslint:disable-next-line:no-var-requires
    ["Slate", require('./slate/bootstrap.min.css')],
    // tslint:disable-next-line:no-var-requires
    ["Spacelab", require('./spacelab/bootstrap.min.css')],
    // tslint:disable-next-line:no-var-requires
    ["Superhero", require('./superhero/bootstrap.min.css')],
    // tslint:disable-next-line:no-var-requires
    ["United", require('./united/bootstrap.min.css')],
    // tslint:disable-next-line:no-var-requires
    ["Yeti", require('./yeti/bootstrap.min.css')]
])


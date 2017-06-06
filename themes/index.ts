export const StaticThemes: Array<string> = ['Default', 'None', 'Cerulean', 'Cosmo', 'Cyborg', 'Darkly', 'Flatly', 'Journal', 'Lumen', 'Paper', 'Readable', 'Sandstone', 'Simplex', 'Slate', 'Spacelab', 'Superhero', 'United', 'Yeti']
declare var require: any
export var ThemesContent = new Map<string, string>([
    ["Default", require('./default/bootstrap.min.css')],
    ["None", ""],
    ["Cerulean", require('./cerulean/bootstrap.min.css')],
    ["Cosmo", require('./cosmo/bootstrap.min.css')],
    ["Cyborg", require('./cyborg/bootstrap.min.css')],
    ["Darkly", require('./darkly/bootstrap.min.css')],
    ["Flatly", require('./flatly/bootstrap.min.css')],
    ["Journal", require('./journal/bootstrap.min.css')],
    ["Lumen", require('./lumen/bootstrap.min.css')],
    ["Paper", require('./paper/bootstrap.min.css')],
    ["Readable", require('./readable/bootstrap.min.css')],
    ["Sandstone", require('./sandstone/bootstrap.min.css')],
    ["Simplex", require('./simplex/bootstrap.min.css')],
    ["Slate", require('./slate/bootstrap.min.css')],
    ["Spacelab", require('./spacelab/bootstrap.min.css')],
    ["Superhero", require('./superhero/bootstrap.min.css')],
    ["United", require('./united/bootstrap.min.css')],
    ["Yeti", require('./yeti/bootstrap.min.css')]
])


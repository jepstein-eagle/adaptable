// putting in all the exports for aggrid in one file and trying to avoid needing to use BlotterFactory

// const AdaptableBlotterApp = require('./App_Scripts/View/AdaptableBlotterView').AdaptableBlotterApp;
const AdaptableBlotter = require('./App_Scripts/agGrid/AdaptableBlotter');
// const AdaptableBlotterThemes = require('./dist/App_Scripts/Styles/themes');
// const adaptableBlotteragGrid = require('./dist/adaptableblotteraggrid-bundle.min');

module.exports = AdaptableBlotter;

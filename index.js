var adaptableBlotterHypergrid = require('./dist/adaptableblotterhypergrid-bundle.min');
var adaptableBlotterKendo = require('./dist/adaptableblotterkendo-bundle.min');
var adaptableBlotteragGrid = require('./dist/adaptableblotteraggrid-bundle.min');

// interfaces
var IAdaptableBlotter = require('./dist/App_Scripts/Core/Interface/IAdaptableBlotter.d.ts');
var IAdaptableBlotterOptions = require('./dist/App_Scripts/Core/Api/Interface/IAdaptableBlotterOptions.d.ts');
var IBlotterApi = require('./dist/App_Scripts/Core/Api/Interface/IBlotterApi.d.ts');

module.exports.adaptableBlotterHypergrid = adaptableBlotterHypergrid;
module.exports.adaptableBlotterKendo = adaptableBlotterKendo;
module.exports.adaptableBlotteragGrid = adaptableBlotteragGrid;

// interfaces
module.exports.IAdaptableBlotter = IAdaptableBlotter;
module.exports.IAdaptableBlotterOptions = IAdaptableBlotterOptions;
module.exports.IBlotterApi = IBlotterApi;
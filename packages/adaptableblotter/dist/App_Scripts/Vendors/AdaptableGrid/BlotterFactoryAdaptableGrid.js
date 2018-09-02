"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableBlotter_1 = require("./AdaptableBlotter");
var BlotterFactoryAdaptableGrid;
(function (BlotterFactoryAdaptableGrid) {
    function CreateAdaptableBlotter(blotterOptions, renderGrid) {
        return new AdaptableBlotter_1.AdaptableBlotter(null, null, null);
    }
    BlotterFactoryAdaptableGrid.CreateAdaptableBlotter = CreateAdaptableBlotter;
})(BlotterFactoryAdaptableGrid = exports.BlotterFactoryAdaptableGrid || (exports.BlotterFactoryAdaptableGrid = {}));

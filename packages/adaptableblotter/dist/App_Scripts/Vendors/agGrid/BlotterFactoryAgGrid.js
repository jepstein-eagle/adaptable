"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableBlotter_1 = require("./AdaptableBlotter");
var BlotterFactoryAgGrid;
(function (BlotterFactoryAgGrid) {
    function CreateAdaptableBlotter(blotterOptions, renderGrid) {
        return new AdaptableBlotter_1.AdaptableBlotter(blotterOptions, renderGrid);
    }
    BlotterFactoryAgGrid.CreateAdaptableBlotter = CreateAdaptableBlotter;
})(BlotterFactoryAgGrid = exports.BlotterFactoryAgGrid || (exports.BlotterFactoryAgGrid = {}));

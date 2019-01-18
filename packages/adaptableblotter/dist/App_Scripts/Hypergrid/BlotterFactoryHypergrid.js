"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableBlotter_1 = require("./AdaptableBlotter");
var BlotterFactoryHypergrid;
(function (BlotterFactoryHypergrid) {
    function CreateAdaptableBlotter(blotterOptions, renderGrid) {
        return new AdaptableBlotter_1.AdaptableBlotter(blotterOptions, renderGrid);
    }
    BlotterFactoryHypergrid.CreateAdaptableBlotter = CreateAdaptableBlotter;
})(BlotterFactoryHypergrid = exports.BlotterFactoryHypergrid || (exports.BlotterFactoryHypergrid = {}));

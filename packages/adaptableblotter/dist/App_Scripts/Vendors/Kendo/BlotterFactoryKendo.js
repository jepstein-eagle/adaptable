"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableBlotter_1 = require("./AdaptableBlotter");
var BlotterFactoryKendo;
(function (BlotterFactoryKendo) {
    function CreateAdaptableBlotter(blotterOptions, renderGrid) {
        return new AdaptableBlotter_1.AdaptableBlotter(blotterOptions, renderGrid);
    }
    BlotterFactoryKendo.CreateAdaptableBlotter = CreateAdaptableBlotter;
})(BlotterFactoryKendo = exports.BlotterFactoryKendo || (exports.BlotterFactoryKendo = {}));

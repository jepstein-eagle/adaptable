"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlotterFactoryAgGrid_1 = require("../agGrid/BlotterFactoryAgGrid");
const BlotterFactoryHypergrid_1 = require("../Hypergrid/BlotterFactoryHypergrid");
/**
 * We would like to get rid of this annoying class.
 * Its ONLY being used by the React Wrapper as presently we use it to create either ag-Grid or Hypergrid instances.
 * This wil disappear when we move to React-aggrid only wrappers.
 */
var BlotterFactory;
(function (BlotterFactory) {
    function CreateAdaptableBlotter(adaptableBlotterOptions, vendorGridName) {
        switch (vendorGridName) {
            case 'agGrid':
                return BlotterFactoryAgGrid_1.BlotterFactoryAgGrid.CreateAdaptableBlotter(adaptableBlotterOptions, false);
            case 'Hypergrid':
                return BlotterFactoryHypergrid_1.BlotterFactoryHypergrid.CreateAdaptableBlotter(adaptableBlotterOptions, false);
        }
    }
    BlotterFactory.CreateAdaptableBlotter = CreateAdaptableBlotter;
})(BlotterFactory = exports.BlotterFactory || (exports.BlotterFactory = {}));

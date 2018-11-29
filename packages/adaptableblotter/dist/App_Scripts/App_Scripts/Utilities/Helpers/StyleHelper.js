"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StyleConstants_1 = require("../../Utilities/Constants/StyleConstants");
var StyleHelper;
(function (StyleHelper) {
    function CreateStyleName(strategyId, blotter) {
        return StyleConstants_1.AB_HEADER + strategyId + "-" + blotter.BlotterOptions.blotterId.trim().replace(/\s/g, "").replace('.', "");
    }
    StyleHelper.CreateStyleName = CreateStyleName;
    function CreateIndexedStyleName(strategyId, index, blotter) {
        return StyleConstants_1.AB_HEADER + strategyId + "-" + index + "-" + blotter.BlotterOptions.blotterId.trim().replace(/\s/g, "").replace('.', "");
    }
    StyleHelper.CreateIndexedStyleName = CreateIndexedStyleName;
})(StyleHelper = exports.StyleHelper || (exports.StyleHelper = {}));

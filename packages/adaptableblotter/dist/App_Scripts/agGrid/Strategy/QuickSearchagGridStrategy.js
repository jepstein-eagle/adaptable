"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QuickSearchStrategy_1 = require("../../Strategy/QuickSearchStrategy");
class QuickSearchagGridStrategy extends QuickSearchStrategy_1.QuickSearchStrategy {
    constructor(blotter) {
        super(blotter);
    }
    postSearch() {
        if (this.blotter.BlotterOptions.generalOptions.serverSearchOption == 'AllSearch' || 'AllSearchandSort') {
            //TODO : This is probably temporary and is used to reevaluate the quicksearch CellClassRules
            this.blotter.redraw();
        }
    }
}
exports.QuickSearchagGridStrategy = QuickSearchagGridStrategy;

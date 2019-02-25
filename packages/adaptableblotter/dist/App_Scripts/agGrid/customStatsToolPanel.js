"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function CustomStatsToolPanel() {
    // empty
}
exports.CustomStatsToolPanel = CustomStatsToolPanel;
CustomStatsToolPanel.prototype.init = function (params) {
    this.eGui = document.createElement('div');
    this.eGui.style.textAlign = "center";
    // calculate stats when new rows loaded, i.e. onModelUpdated
    var renderStats = () => this.eGui.innerHTML = calculateStats(params);
    params.api.addEventListener('modelUpdated', renderStats);
};
CustomStatsToolPanel.prototype.getGui = function () {
    return this.eGui;
};
function calculateStats(params) {
    return `<span>
               <h2><i class="fa fa-calculator"></i> Custom Stats</h2>
            <h4>Hello Samed! </h4>
            </span>`;
}

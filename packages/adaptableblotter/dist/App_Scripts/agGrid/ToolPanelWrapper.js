"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* At the moment this does NOT work and does NOT get called */
exports.ToolPanelWrapperFactory = (blotter) => {
    return class ToolPanelWrapper {
        // Can be left blank if no custom refresh logic is required.
        refresh() {
        }
        init(params) {
            console.log("hello world");
            this.toolPanelContainer = document.createElement("div");
            this.toolPanelContainer.id = "adaptableBlotterToolPanel";
            this.toolPanelContainer.innerHTML = "<span>HelloWorld</span>";
        }
        getGui() {
            return this.toolPanelContainer;
        }
    };
};

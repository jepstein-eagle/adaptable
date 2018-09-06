"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const themes_1 = require("../Styles/themes");
class ThemeStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.ThemeStrategyId, blotter);
        // Create the <style> tag for shipped themes
        this.style = document.createElement("style");
        this.style.appendChild(document.createTextNode("")); // WebKit hack :(
        document.head.appendChild(this.style); // Adds the <style> element to the page
        // Create the theme link for predefined themes
        this.theme = document.createElement("link");
        this.theme.rel = "stylesheet";
        document.head.appendChild(this.theme);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.ThemeStrategyName, ScreenPopups.ThemePopup, StrategyIds.ThemeGlyph);
    }
    InitState() {
        if (this.ThemeState != this.blotter.AdaptableBlotterStore.TheStore.getState().Theme) {
            this.ThemeState = this.blotter.AdaptableBlotterStore.TheStore.getState().Theme;
            this.style.innerHTML = "";
            this.theme.href = "";
            if (this.ThemeState.CurrentTheme == "None") {
                // do nothing...
            }
            else {
                let shippedTheme = this.ThemeState.SystemThemes.find(t => t == this.ThemeState.CurrentTheme);
                // if its a system theme then use that..
                if (shippedTheme) {
                    this.style.innerHTML = themes_1.ThemesContent.get(this.ThemeState.CurrentTheme);
                }
                else { // otherwise use the predefined one
                    let userTheme = this.ThemeState.UserThemes.find(t => t.Name == this.ThemeState.CurrentTheme);
                    if (userTheme) {
                        this.theme.href = userTheme.Url;
                    }
                }
            }
        }
    }
}
exports.ThemeStrategy = ThemeStrategy;

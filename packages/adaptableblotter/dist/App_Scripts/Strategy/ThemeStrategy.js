"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
const themes_1 = require("../Styles/themes");
const GeneralConstants = require("../Utilities/Constants/GeneralConstants");
const Enums_1 = require("../Utilities/Enums");
class ThemeStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.ThemeStrategyId, blotter);
        // Create the <style> tag for shipped themes
        this.style = document.createElement("style");
        this.style.id = `${blotter.BlotterOptions.containerOptions.adaptableBlotterContainer}-theme`;
        this.style.appendChild(document.createTextNode("")); // WebKit hack :(
        document.head.appendChild(this.style); // Adds the <style> element to the page
        // Create the theme link for predefined themes
        this.theme = document.createElement("link");
        this.theme.rel = "stylesheet";
        document.head.appendChild(this.theme);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ThemeStrategyName, ScreenPopups.ThemePopup, StrategyConstants.ThemeGlyph);
    }
    InitState() {
        if (this.ThemeState != this.blotter.AdaptableBlotterStore.TheStore.getState().Theme) {
            this.ThemeState = this.blotter.AdaptableBlotterStore.TheStore.getState().Theme;
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.Theme, this.ThemeState);
            }
            this.style.innerHTML = "";
            this.theme.href = "";
            switch (this.ThemeState.CurrentTheme) {
                case "None":
                    // do nothing...
                    break;
                case GeneralConstants.LIGHT_THEME:
                    this.style.innerHTML = themes_1.ThemesContent.get(this.ThemeState.CurrentTheme);
                    this.blotter.applyLightTheme();
                    break;
                case GeneralConstants.DARK_THEME:
                    this.style.innerHTML = themes_1.ThemesContent.get(this.ThemeState.CurrentTheme);
                    this.blotter.applyDarkTheme();
                    break;
                default:
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
                    break;
            }
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

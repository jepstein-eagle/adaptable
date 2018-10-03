import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IThemeStrategy } from './Interface/IThemeStrategy'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { ThemesContent } from '../Styles/themes'
import { ThemeState } from '../Redux/ActionsReducers/Interface/IState';
import * as GeneralConstants from '../Core/Constants/GeneralConstants'
import { StateChangedTrigger } from '../Core/Enums';

export class ThemeStrategy extends AdaptableStrategyBase implements IThemeStrategy {
    private ThemeState: ThemeState
    private style: HTMLStyleElement
    private theme: HTMLLinkElement

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ThemeStrategyId, blotter)


        // Create the <style> tag for shipped themes
        this.style = document.createElement("style");
        this.style.id = `${blotter.BlotterOptions.adaptableBlotterContainer}-theme`;
        this.style.appendChild(document.createTextNode(""));   // WebKit hack :(
        document.head.appendChild(this.style);  // Adds the <style> element to the page

        // Create the theme link for predefined themes
        this.theme = document.createElement("link");
        this.theme.rel = "stylesheet"
        document.head.appendChild(this.theme);
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.ThemeStrategyName, ScreenPopups.ThemePopup, StrategyIds.ThemeGlyph);
    }

    protected InitState() {
        if (this.ThemeState != this.blotter.AdaptableBlotterStore.TheStore.getState().Theme) {
            this.ThemeState = this.blotter.AdaptableBlotterStore.TheStore.getState().Theme
           
            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.Theme, this.ThemeState)
            }
           
            this.style.innerHTML = ""
            this.theme.href = ""
            switch (this.ThemeState.CurrentTheme) {
                case "None":
                    // do nothing...
                    break;
                case GeneralConstants.LIGHT_THEME:
                    this.style.innerHTML = ThemesContent.get(this.ThemeState.CurrentTheme)
                    this.blotter.applyLightTheme()
                    break;
                case GeneralConstants.DARK_THEME:
                    this.style.innerHTML = ThemesContent.get(this.ThemeState.CurrentTheme)
                    this.blotter.applyDarkTheme()
                     break;
                default:
                    let shippedTheme = this.ThemeState.SystemThemes.find(t => t == this.ThemeState.CurrentTheme)
                    // if its a system theme then use that..
                    if (shippedTheme) {
                        this.style.innerHTML = ThemesContent.get(this.ThemeState.CurrentTheme)
                    } else { // otherwise use the predefined one
                        let userTheme = this.ThemeState.UserThemes.find(t => t.Name == this.ThemeState.CurrentTheme)
                        if (userTheme) {
                            this.theme.href = userTheme.Url
                        }
                    }
                    break;
            }

            if (this.ThemeState.CurrentTheme == "None") {
                // do nothing...
            }
            else {
                let shippedTheme = this.ThemeState.SystemThemes.find(t => t == this.ThemeState.CurrentTheme)
                // if its a system theme then use that..
                if (shippedTheme) {
                    this.style.innerHTML = ThemesContent.get(this.ThemeState.CurrentTheme)
                } else { // otherwise use the predefined one
                    let userTheme = this.ThemeState.UserThemes.find(t => t.Name == this.ThemeState.CurrentTheme)
                    if (userTheme) {
                        this.theme.href = userTheme.Url
                    }
                }
            }
        }
    }

}

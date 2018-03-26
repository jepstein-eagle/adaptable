import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IThemeStrategy } from '../Strategy/Interface/IThemeStrategy'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { ThemesContent } from '../../themes/index'
import { ThemeState } from '../Redux/ActionsReducers/Interface/IState';
import { Helper } from '../Core/Helpers/Helper';

export class ThemeStrategy extends AdaptableStrategyBase implements IThemeStrategy {
    private ThemeState: ThemeState
    private style: HTMLStyleElement

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ThemeStrategyId, blotter)


        // Create the <style> tag
        this.style = document.createElement("style");
        // WebKit hack :(
        this.style.appendChild(document.createTextNode(""));
        // Add the <style> element to the page
        document.head.appendChild(this.style);
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.ThemeStrategyName, ScreenPopups.ThemePopup, StrategyGlyphs.ThemeGlyph);
    }

    protected InitState() {
        if (this.ThemeState != this.blotter.AdaptableBlotterStore.TheStore.getState().Theme) {
            this.ThemeState = this.blotter.AdaptableBlotterStore.TheStore.getState().Theme
            if (this.ThemeState.CurrentTheme == "None") {
                this.style.innerHTML = ""
            }
            else {
                let shippedTheme = this.ThemeState.SystemThemes.find(t => t == this.ThemeState.CurrentTheme)
                // if its a system theme then use that..
                if (shippedTheme) {
                    this.style.innerHTML = ThemesContent.get(this.ThemeState.CurrentTheme)
                } else { // otherwise use the predefined one
                    let predefinedTheme = this.ThemeState.PredefinedThemes.find(t => t.Name == this.ThemeState.CurrentTheme)
                    if (predefinedTheme) {
                        this.style.innerHTML = Helper.ReadFileContents(predefinedTheme.Location);
                    }
                }
            }
        }
    }

}
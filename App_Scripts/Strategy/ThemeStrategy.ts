import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyIds from '../Core/StrategyIds'
import * as StrategyNames from '../Core/StrategyNames'
import * as StrategyGlyphs from '../Core/StrategyGlyphs'
import * as ScreenPopups from '../Core/ScreenPopups'
import { IThemeStrategy } from '../Strategy/Interface/IThemeStrategy'
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { ThemesContent } from '../../themes/index'
import { ThemeState } from '../Redux/ActionsReducers/Interface/IState';

export class ThemeStrategy extends AdaptableStrategyBase implements IThemeStrategy {
    private ThemeState: ThemeState
    private style: HTMLStyleElement

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ThemeStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup(StrategyNames.ThemeStrategyName, ScreenPopups.ThemePopup, StrategyGlyphs.ThemeGlyph);


        // Create the <style> tag
        this.style = document.createElement("style");
        // WebKit hack :(
        this.style.appendChild(document.createTextNode(""));
        // Add the <style> element to the page
        document.head.appendChild(this.style);
    }

    protected InitState() {
        if (this.ThemeState != this.blotter.AdaptableBlotterStore.TheStore.getState().Theme) {
            this.ThemeState = this.blotter.AdaptableBlotterStore.TheStore.getState().Theme
            if (this.ThemeState.CurrentTheme == "None") {
                this.style.innerHTML = ""
            }
            else {
                this.style.innerHTML = ThemesContent.get(this.ThemeState.CurrentTheme)
            }
        }
    }

}

import { IAdaptableBlotter, IColumn } from '../Interface/IAdaptableBlotter';
import { ThemesContent } from '../../../themes/index'
import { ThemeState } from '../../Redux/ActionsReducers/Interface/IState';

export class ThemeService {
    private ThemeState: ThemeState
    private style: HTMLStyleElement
    constructor(private blotter: IAdaptableBlotter) {
        // Create the <style> tag
        this.style = document.createElement("style");
        // WebKit hack :(
        this.style.appendChild(document.createTextNode(""));
        // Add the <style> element to the page
        document.head.appendChild(this.style);

        this.InitState();
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
    }

    InitState() {
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

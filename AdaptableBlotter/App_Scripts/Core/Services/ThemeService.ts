
import { IAdaptableBlotter, IColumn } from '../Interface/IAdaptableBlotter';
import { ThemeState } from '../../Redux/ActionsReducers/Interface/IState';

export class ThemeService {
    private ThemeState: ThemeState
    private theme: HTMLLinkElement
    constructor(private blotter: IAdaptableBlotter) {
        this.theme = document.createElement("link");
        this.theme.rel = "stylesheet"
        document.head.appendChild(this.theme);

        this.InitState();
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
    }

    InitState() {
        if (this.ThemeState != this.blotter.AdaptableBlotterStore.TheStore.getState().Theme) {
            this.ThemeState = this.blotter.AdaptableBlotterStore.TheStore.getState().Theme
            if (this.ThemeState.CurrentTheme == "None") {
                this.theme.href = ""
            }
            else {
                this.theme.href = "adaptableblotter/themes/" + this.ThemeState.CurrentTheme.toLocaleLowerCase() + "/bootstrap.min.css"
            }
        }
    }
}

import { IStyle } from "./Interface/IAdaptableBlotterObjects";
import { DisplayAction } from "../Utilities/Enums";
import * as QuickSearchRedux from '../Redux/ActionsReducers/QuickSearchRedux'
import { ApiBase } from "./ApiBase";

export interface IQuickSearchApi {
    /**
   * Runs QuickSearch on the supplied text
   * @param quickSearchText text to run QuickSearch on
   */
    quickSearchRun(quickSearchText: string): void

    /**
     * Clears Quick Search
     */
    quickSearchClear(): void

    /**
     * Retrieves the current quick search text
     */
    quickSearchGetValue(): string
    quickSearchSetDisplayAction(displayAction: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell'): void
    quickSearchSetStyle(style: IStyle): void

}



export class QuickSearchApi extends ApiBase implements IQuickSearchApi {

   public quickSearchRun(quickSearchText: string): void {
        this.dispatchAction(QuickSearchRedux.QuickSearchApply(quickSearchText))
    }

    public quickSearchClear(): void {
        this.dispatchAction(QuickSearchRedux.QuickSearchApply(""))
    }

    public quickSearchGetValue(): string {
        return this.getState().QuickSearch.QuickSearchText;
    }

    public quickSearchSetDisplayAction(displayAction: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell'): void {
        this.dispatchAction(QuickSearchRedux.QuickSearchSetDisplay(displayAction as DisplayAction))
    }

    public quickSearchSetStyle(style: IStyle): void {
        this.dispatchAction(QuickSearchRedux.QuickSearchSetStyle(style))
    }

}
import { IStyle } from "./Interface/IAdaptableBlotterObjects";
import { DisplayAction } from "../Utilities/Enums";
import * as QuickSearchRedux from '../Redux/ActionsReducers/QuickSearchRedux'
import { ApiBase } from "./ApiBase";

export interface IQuickSearchApi {
    /**
   * Runs QuickSearch on the supplied text
   * @param quickSearchText text to run QuickSearch on
   */
    Apply(quickSearchText: string): void

    /**
     * Clears Quick Search
     */
    Clear(): void

    /**
     * Retrieves the current quick search text
     */
    GetValue(): string
    EditDisplayAction(displayAction: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell'): void
    EditStyle(style: IStyle): void

}



export class QuickSearchApi extends ApiBase implements IQuickSearchApi {

   public Apply(quickSearchText: string): void {
        this.dispatchAction(QuickSearchRedux.QuickSearchApply(quickSearchText))
    }

    public Clear(): void {
        this.dispatchAction(QuickSearchRedux.QuickSearchApply(""))
    }

    public GetValue(): string {
        return this.getState().QuickSearch.QuickSearchText;
    }

    public EditDisplayAction(displayAction: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell'): void {
        this.dispatchAction(QuickSearchRedux.QuickSearchSetDisplay(displayAction as DisplayAction))
    }

    public EditStyle(style: IStyle): void {
        this.dispatchAction(QuickSearchRedux.QuickSearchSetStyle(style))
    }

}
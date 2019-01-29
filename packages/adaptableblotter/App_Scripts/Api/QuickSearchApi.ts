import { IStyle } from "../Utilities/Interface/IStyle";
import { DisplayAction } from "../Utilities/Enums";
import * as QuickSearchRedux from '../Redux/ActionsReducers/QuickSearchRedux'
import { ApiBase } from "./ApiBase";
import { IQuickSearchApi } from "./Interface/IQuickSearchApi";

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

    public SetDisplayAction(displayAction: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell'): void {
        this.dispatchAction(QuickSearchRedux.QuickSearchSetDisplay(displayAction as DisplayAction))
    }

    public SetStyle(style: IStyle): void {
        this.dispatchAction(QuickSearchRedux.QuickSearchSetStyle(style))
    }

}
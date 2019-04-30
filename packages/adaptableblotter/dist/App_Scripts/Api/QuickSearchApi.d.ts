import { IStyle } from "../Utilities/Interface/IStyle";
import { ApiBase } from "./ApiBase";
import { IQuickSearchApi } from "./Interface/IQuickSearchApi";
import { QuickSearchState } from "../Redux/ActionsReducers/Interface/IState";
export declare class QuickSearchApi extends ApiBase implements IQuickSearchApi {
    getQuickSearchState(): QuickSearchState;
    applyQuickSearch(quickSearchText: string): void;
    clearQuickSearch(): void;
    getQuickSearchValue(): string;
    getQuickSearchStyle(): IStyle;
    setQuickSearchDisplayAction(displayAction: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell'): void;
    setQuickSearchStyle(style: IStyle): void;
}

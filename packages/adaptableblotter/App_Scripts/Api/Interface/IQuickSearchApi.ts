import { IStyle } from "../../Utilities/Interface/IStyle";
import { QuickSearchState } from "../../Redux/ActionsReducers/Interface/IState";
export interface IQuickSearchApi {

    getQuickSearchState(): QuickSearchState;
    /**
   * Runs QuickSearch on the supplied text
   * @param quickSearchText text to run QuickSearch on
   */
    applyQuickSearch(quickSearchText: string): void;
    /**
     * Clears Quick Search
     */
    clearQuickSearch(): void;
    /**
     * Retrieves the current quick search text
     */
    getQuickSearchValue(): string;
    getQuickSearchStyle(): IStyle;
    setQuickSearchDisplayAction(displayAction: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell'): void;
    setQuickSearchStyle(style: IStyle): void;
}

import { IStyle } from "../../Utilities/Interface/IStyle";
export interface IQuickSearchApi {
    /**
   * Runs QuickSearch on the supplied text
   * @param quickSearchText text to run QuickSearch on
   */
    Apply(quickSearchText: string): void;
    /**
     * Clears Quick Search
     */
    Clear(): void;
    /**
     * Retrieves the current quick search text
     */
    GetValue(): string;
    SetDisplayAction(displayAction: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell'): void;
    SetStyle(style: IStyle): void;
}

import { IStyle } from "./Interface/IAdaptableBlotterObjects";
import { ApiBase } from "./ApiBase";
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
    EditDisplayAction(displayAction: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell'): void;
    EditStyle(style: IStyle): void;
}
export declare class QuickSearchApi extends ApiBase implements IQuickSearchApi {
    Apply(quickSearchText: string): void;
    Clear(): void;
    GetValue(): string;
    EditDisplayAction(displayAction: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell'): void;
    EditStyle(style: IStyle): void;
}

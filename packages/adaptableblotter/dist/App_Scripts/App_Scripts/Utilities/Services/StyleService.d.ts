import { IAdaptableBlotter } from '../../api/Interface/IAdaptableBlotter';
export declare class StyleService {
    private blotter;
    private FlashingCellState;
    private ConditionalStyleState;
    private QuickSearchState;
    private FormatColumnState;
    private sheet;
    private style;
    constructor(blotter: IAdaptableBlotter);
    InitState(): void;
    private clearCSSRules;
    private addCSSRule;
}

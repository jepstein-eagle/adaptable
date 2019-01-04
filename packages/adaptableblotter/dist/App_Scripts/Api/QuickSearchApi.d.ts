import { IStyle } from "./Interface/IAdaptableBlotterObjects";
import { ApiBase } from "./ApiBase";
import { IQuickSearchApi } from "./Interface/IQuickSearchApi";
export declare class QuickSearchApi extends ApiBase implements IQuickSearchApi {
    Apply(quickSearchText: string): void;
    Clear(): void;
    GetValue(): string;
    EditDisplayAction(displayAction: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell'): void;
    EditStyle(style: IStyle): void;
}

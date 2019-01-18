import { IStyle } from "../Utilities/Interface/IAdaptableBlotterObjects";
import { ApiBase } from "./ApiBase";
import { IQuickSearchApi } from "./Interface/IQuickSearchApi";
export declare class QuickSearchApi extends ApiBase implements IQuickSearchApi {
    Apply(quickSearchText: string): void;
    Clear(): void;
    GetValue(): string;
    SetDisplayAction(displayAction: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell'): void;
    SetStyle(style: IStyle): void;
}

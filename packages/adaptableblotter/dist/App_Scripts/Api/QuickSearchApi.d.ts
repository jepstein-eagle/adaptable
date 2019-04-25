import { IStyle } from "../Utilities/Interface/IStyle";
import { ApiBase } from "./ApiBase";
import { IQuickSearchApi } from "./Interface/IQuickSearchApi";
import { QuickSearchState } from "../Redux/ActionsReducers/Interface/IState";
export declare class QuickSearchApi extends ApiBase implements IQuickSearchApi {
    GetState(): QuickSearchState;
    Apply(quickSearchText: string): void;
    Clear(): void;
    GetValue(): string;
    GetStyle(): IStyle;
    SetDisplayAction(displayAction: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell'): void;
    SetStyle(style: IStyle): void;
}

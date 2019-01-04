import { ILayout } from "./Interface/IAdaptableBlotterObjects";
import { ApiBase } from "./ApiBase";
import { ILayoutApi } from './Interface/ILayoutApi';
export declare class LayoutApi extends ApiBase implements ILayoutApi {
    Set(layoutName: string): void;
    Clear(): void;
    GetCurrent(): ILayout;
    GetCurrentName(): string;
    GetAll(): ILayout[];
    Save(): void;
}

import { ILayout } from "../Utilities/Interface/BlotterObjects/ILayout";
import { ApiBase } from "./ApiBase";
import { ILayoutApi } from './Interface/ILayoutApi';
import { LayoutState } from '../Redux/ActionsReducers/Interface/IState';
export declare class LayoutApi extends ApiBase implements ILayoutApi {
    GetState(): LayoutState;
    Set(layoutName: string): void;
    Clear(): void;
    GetCurrent(): ILayout;
    GetCurrentName(): string;
    GetByName(layoutName: string): ILayout;
    GetAll(): ILayout[];
    Save(): void;
}

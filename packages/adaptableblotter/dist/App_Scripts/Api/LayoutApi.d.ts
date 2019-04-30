import { ILayout } from "../Utilities/Interface/BlotterObjects/ILayout";
import { ApiBase } from "./ApiBase";
import { ILayoutApi } from './Interface/ILayoutApi';
import { LayoutState } from '../Redux/ActionsReducers/Interface/IState';
export declare class LayoutApi extends ApiBase implements ILayoutApi {
    getLayoutState(): LayoutState;
    setLayout(layoutName: string): void;
    clearLayout(): void;
    getCurrentLayout(): ILayout;
    getCurrentLayoutName(): string;
    getLayoutByName(layoutName: string): ILayout;
    getAllLayout(): ILayout[];
    saveLayout(): void;
}

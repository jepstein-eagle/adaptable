import { IStyle } from "../Utilities/Interface/IStyle";
import { IFormatColumn } from "../Utilities/Interface/BlotterObjects/IFormatColumn";
import { ApiBase } from "./ApiBase";
import { IFormatColumnApi } from './Interface/IFormatColumnApi';
import { FormatColumnState } from '../Redux/ActionsReducers/Interface/IState';
export declare class FormatColumnApi extends ApiBase implements IFormatColumnApi {
    getFormatColumnState(): FormatColumnState;
    getAllFormatColumn(): IFormatColumn[];
    addFormatColumn(column: string, style: IStyle): void;
    updateFormatColumn(column: string, style: IStyle): void;
    deleteFormatColumn(formatColumn: IFormatColumn): void;
    deleteAllFormatColumn(): void;
}

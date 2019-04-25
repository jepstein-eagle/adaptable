import { IStyle } from "../Utilities/Interface/IStyle";
import { IFormatColumn } from "../Utilities/Interface/BlotterObjects/IFormatColumn";
import { ApiBase } from "./ApiBase";
import { IFormatColumnApi } from './Interface/IFormatColumnApi';
import { FormatColumnState } from '../Redux/ActionsReducers/Interface/IState';
export declare class FormatColumnApi extends ApiBase implements IFormatColumnApi {
    GetState(): FormatColumnState;
    GetAll(): IFormatColumn[];
    Add(column: string, style: IStyle): void;
    Update(column: string, style: IStyle): void;
    Delete(formatColumn: IFormatColumn): void;
    DeleteAll(): void;
}

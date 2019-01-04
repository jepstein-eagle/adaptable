import { IFormatColumn, IStyle } from "./Interface/IAdaptableBlotterObjects";
import { ApiBase } from "./ApiBase";
import { IFormatColumnApi } from './Interface/IFormatColumnApi';
export declare class FormatColumnApi extends ApiBase implements IFormatColumnApi {
    GetAll(): IFormatColumn[];
    Add(column: string, style: IStyle): void;
    Update(column: string, style: IStyle): void;
    Delete(formatColumn: IFormatColumn): void;
    DeleteAll(): void;
}

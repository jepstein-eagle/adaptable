import { IStyle } from "../../Utilities/Interface/IStyle";
import { IFormatColumn } from "../../Utilities/Interface/BlotterObjects/IFormatColumn";
import { FormatColumnState } from "../../Redux/ActionsReducers/Interface/IState";
export interface IFormatColumnApi {
    getFormatColumnState(): FormatColumnState;
    getAllFormatColumn(): IFormatColumn[];
    addFormatColumn(column: string, style: IStyle): void;
    updateFormatColumn(column: string, style: IStyle): void;
    deleteFormatColumn(formatColumn: IFormatColumn): void;
    deleteAllFormatColumn(): void;
}

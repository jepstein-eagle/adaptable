import { ICellValidationRule } from "../Interface/BlotterObjects/ICellValidationRule";
import { IColumn } from '../Interface/IColumn';
import { IUIConfirmation } from '../Interface/IMessage';
import * as Redux from 'redux';
export declare module CellValidationHelper {
    function createCellValidationDescription(cellValidationRule: ICellValidationRule, columns: IColumn[]): string;
    function createCellValidationUIConfirmation(confirmAction: Redux.Action, cancelAction: Redux.Action, warningMessage?: string): IUIConfirmation;
}

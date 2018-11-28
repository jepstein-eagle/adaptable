import * as React from "react";
import { IColumn } from '../../Core/Interface/IColumn';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { ICellValidationRule } from "../../Core/Api/Interface/IAdaptableBlotterObjects";
import { ActionMode } from "../../Core/Enums";
export interface CellValidationEntityRowProps extends SharedEntityExpressionRowProps<CellValidationEntityRow> {
    Column: IColumn;
    onChangeActionMode: (index: number, ActionMode: ActionMode) => void;
}
export declare class CellValidationEntityRow extends React.Component<CellValidationEntityRowProps, {}> {
    render(): any;
    setExpressionDescription(CellValidation: ICellValidationRule): string;
    private getColumnandRule;
    onActionModeChanged(index: number, event: React.FormEvent<any>): void;
}

import * as React from "react";
import * as Redux from "redux";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import * as CalculatedColumnRedux from '../../Redux/ActionsReducers/CalculatedColumnRedux';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { ICalculatedColumn } from "../../api/Interface/IAdaptableBlotterObjects";
export interface CalculatedColumnSummaryProps extends StrategySummaryProps<CalculatedColumnSummaryComponent> {
    CalculatedColumns: ICalculatedColumn[];
    onEdit: (index: number, calculatedColumn: ICalculatedColumn) => void;
    onDeleteConfirm: Redux.Action;
    CalculatedColumnErrorMessage: string;
    IsExpressionValid: (expression: string) => CalculatedColumnRedux.CalculatedColumnIsExpressionValidAction;
}
export declare class CalculatedColumnSummaryComponent extends React.Component<CalculatedColumnSummaryProps, EditableConfigEntityState> {
    constructor(props: CalculatedColumnSummaryProps);
    render(): any;
    onEdit(index: number, calculatedColumn: ICalculatedColumn): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let CalculatedColumnSummary: React.ComponentClass<any, any>;

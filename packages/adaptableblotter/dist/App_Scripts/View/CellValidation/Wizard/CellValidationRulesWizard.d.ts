import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { LeafExpressionOperator } from '../../../Core/Enums';
import { ICellValidationRule } from "../../../Core/Api/Interface/AdaptableBlotterObjects";
export interface CellValidationRulesWizardProps extends AdaptableWizardStepProps<ICellValidationRule> {
    Columns: Array<IColumn>;
}
export interface CellValidationSettingsWizardState {
    Operator: LeafExpressionOperator;
    Operand1: string;
    Operand2: string;
}
export declare class CellValidationRulesWizard extends React.Component<CellValidationRulesWizardProps, CellValidationSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: CellValidationRulesWizardProps);
    render(): any;
    private onOperatorChanged;
    private onOperand1ValueChanged;
    private onOperand2ValueChanged;
    private onDisallowEditChanged;
    private getColumnDataTypeFromState;
    private checkOperator;
    private isBetweenOperator;
    private getAvailableOperators;
    createCellValidationDescription(CellValidation: ICellValidationRule): string;
    private operatorRequiresValue;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}

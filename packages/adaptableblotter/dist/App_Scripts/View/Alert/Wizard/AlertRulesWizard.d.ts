import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { LeafExpressionOperator } from '../../../Core/Enums';
import { IAlertDefinition } from "../../../Core/Api/Interface/AdaptableBlotterObjects";
export interface AlertRulesWizardProps extends AdaptableWizardStepProps<IAlertDefinition> {
    Columns: Array<IColumn>;
}
export interface AlertSettingsWizardState {
    Operator: LeafExpressionOperator;
    Operand1: string;
    Operand2: string;
}
export declare class AlertRulesWizard extends React.Component<AlertRulesWizardProps, AlertSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: AlertRulesWizardProps);
    render(): any;
    private onOperatorChanged;
    private onOperand1ValueChanged;
    private onOperand2ValueChanged;
    private onDisallowEditChanged;
    private getColumnDataTypeFromState;
    private checkOperator;
    private isBetweenOperator;
    private getAvailableOperators;
    createAlertDescription(Alert: IAlertDefinition): string;
    private operatorRequiresValue;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}

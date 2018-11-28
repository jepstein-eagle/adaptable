import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ICellValidationRule } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";
export interface CellValidationSelectQueryWizardProps extends AdaptableWizardStepProps<ICellValidationRule> {
    Columns: Array<IColumn>;
}
export interface CellValidationSelectQueryWizardState {
    HasExpression: boolean;
}
export declare class CellValidationSelectQueryWizard extends React.Component<CellValidationSelectQueryWizardProps, CellValidationSelectQueryWizardState> implements AdaptableWizardStep {
    constructor(props: CellValidationSelectQueryWizardProps);
    render(): any;
    private onOtherExpressionOptionChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): 2 | 1;
    GetIndexStepDecrement(): number;
    StepName: string;
}

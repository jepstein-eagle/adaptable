import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ICellValidationRule } from "../../../Api/Interface/IAdaptableBlotterObjects";
export interface CellValidationSelectColumnWizardProps extends AdaptableWizardStepProps<ICellValidationRule> {
    Columns: Array<IColumn>;
}
export interface CellValidationSelectColumnWizardState {
    ColumnId: string;
}
export declare class CellValidationSelectColumnWizard extends React.Component<CellValidationSelectColumnWizardProps, CellValidationSelectColumnWizardState> implements AdaptableWizardStep {
    constructor(props: CellValidationSelectColumnWizardProps);
    render(): any;
    private onColumnSelectedChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}

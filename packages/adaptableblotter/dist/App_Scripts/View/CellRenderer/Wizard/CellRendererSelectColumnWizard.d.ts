import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IPercentCellRenderer } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";
export interface CellRendererSelectColumnWizardProps extends AdaptableWizardStepProps<IPercentCellRenderer> {
    Columns: Array<IColumn>;
}
export interface CellRendererSelectColumnWizardState {
    ColumnId: string;
}
export declare class CellRendererSelectColumnWizard extends React.Component<CellRendererSelectColumnWizardProps, CellRendererSelectColumnWizardState> implements AdaptableWizardStep {
    constructor(props: CellRendererSelectColumnWizardProps);
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

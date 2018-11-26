import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IPercentCellRenderer } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";
export interface CellRendererSummaryWizardProps extends AdaptableWizardStepProps<IPercentCellRenderer> {
    Columns: IColumn[];
}
export declare class CellRendererSummaryWizard extends React.Component<CellRendererSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: CellRendererSummaryWizardProps);
    render(): any;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}

import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IColumnCategory } from "../../../api/Interface/Interfaces";
import { IColumn } from "../../../Api/Interface/IColumn";
export interface ColumnCategorySummaryWizardProps extends AdaptableWizardStepProps<IColumnCategory> {
    Columns: IColumn[];
}
export declare class ColumnCategorySummaryWizard extends React.Component<ColumnCategorySummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: ColumnCategorySummaryWizardProps);
    render(): any;
    canNext(): boolean;
    private getColumnNames;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}

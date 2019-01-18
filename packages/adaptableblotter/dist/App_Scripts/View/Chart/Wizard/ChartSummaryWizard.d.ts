import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { IChartDefinition } from "../../../Utilities/Interface/IAdaptableBlotterObjects";
export interface ChartSummaryWizardProps extends AdaptableWizardStepProps<IChartDefinition> {
    Columns: IColumn[];
}
export declare class ChartSummaryWizard extends React.Component<ChartSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: ChartSummaryWizardProps);
    render(): any;
    private getColumnValuesList;
    private getExpressionString;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}

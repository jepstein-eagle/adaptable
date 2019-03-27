import * as React from "react";
import { AdaptableWizardStepProps, AdaptableWizardStep } from "../../../Wizard/Interface/IAdaptableWizard";
import { IPieChartDefinition } from "../../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { SecondaryColumnOperation } from "../../../../Utilities/ChartEnums";
export interface PieChartSecondaryColumnWizardProps extends AdaptableWizardStepProps<IPieChartDefinition> {
}
export interface PieChartSecondaryColumnWizardState {
    SecondaryColumnId?: string;
    SecondaryColumnOperation: SecondaryColumnOperation;
}
export declare class PieChartSecondaryColumnWizard extends React.Component<PieChartSecondaryColumnWizardProps, PieChartSecondaryColumnWizardState> implements AdaptableWizardStep {
    constructor(props: PieChartSecondaryColumnWizardProps);
    render(): any;
    private onSecondaryColumnOperationChanged;
    private onSecondaryColumnChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}

import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IAlertDefinition, IUserFilter } from "../../../Api/Interface/IAdaptableBlotterObjects";
export interface AlertSummaryWizardProps extends AdaptableWizardStepProps<IAlertDefinition> {
    Columns: IColumn[];
    UserFilters: IUserFilter[];
}
export declare class AlertSummaryWizard extends React.Component<AlertSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: AlertSummaryWizardProps);
    render(): any;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): 2 | 1;
    StepName: string;
}

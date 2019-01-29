import * as React from "react";
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IUserFilter } from "../../../Utilities/Interface/BlotterObjects/IUserFilter";
import { IAlertDefinition } from "../../../Utilities/Interface/BlotterObjects/IAlertDefinition";
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
    GetIndexStepDecrement(): 1 | 2;
    StepName: string;
}

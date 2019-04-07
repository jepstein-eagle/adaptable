import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IReminder } from "../../../Utilities/Interface/BlotterObjects/IReminder";
export interface ReminderSummaryWizardProps extends AdaptableWizardStepProps<IReminder> {
}
export declare class ReminderSummaryWizard extends React.Component<ReminderSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: ReminderSummaryWizardProps);
    render(): any;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}

import { IReminder } from "../../../Utilities/Interface/BlotterObjects/IReminder";
import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { DayOfWeek } from "../../../Utilities/Enums";
export interface ReminderScheduleWizardProps extends AdaptableWizardStepProps<IReminder> {
}
export interface ReminderScheduleWizardState {
    IsRecurringDate: boolean;
    Hour: number;
    Minute: number;
    DaysOfWeek: DayOfWeek[];
    OneOffDate: any;
}
export declare class ReminderScheduleWizard extends React.Component<ReminderScheduleWizardProps, ReminderScheduleWizardState> implements AdaptableWizardStep {
    constructor(props: ReminderScheduleWizardProps);
    render(): any;
    private onDayChecked;
    private onOneOffDateChanged;
    private onRecurringDateChanged;
    private onHourChanged;
    private onMinuteChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}

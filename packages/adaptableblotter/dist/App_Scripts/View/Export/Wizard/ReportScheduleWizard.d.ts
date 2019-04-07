import { IReport } from "../../../Utilities/Interface/BlotterObjects/IReport";
import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ExportDestination, DayOfWeek } from "../../../Utilities/Enums";
export interface ReportScheduleWizardProps extends AdaptableWizardStepProps<IReport> {
}
export interface ReportScheduleWizardState {
    HasAutoExport: boolean;
    IsRecurringDate: boolean;
    Hour: number;
    Minute: number;
    DaysOfWeek: DayOfWeek[];
    OneOffDate: any;
    ExportDestination: ExportDestination;
}
export declare class ReportScheduleWizard extends React.Component<ReportScheduleWizardProps, ReportScheduleWizardState> implements AdaptableWizardStep {
    constructor(props: ReportScheduleWizardProps);
    render(): any;
    private onHasAutoExportChanged;
    private onDayChecked;
    private onOneOffDateChanged;
    private onRecurringDateChanged;
    private onHourChanged;
    private onMinuteChanged;
    private onExportDestinationChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}

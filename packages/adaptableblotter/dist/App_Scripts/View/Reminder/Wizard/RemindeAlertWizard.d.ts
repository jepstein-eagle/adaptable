import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { MessageType } from '../../../Utilities/Enums';
import { IReminder } from "../../../Utilities/Interface/BlotterObjects/IReminder";
export interface ReminderAlertWizardProps extends AdaptableWizardStepProps<IReminder> {
}
export interface ReminderAlertWizardState {
    Header: string;
    Msg: string;
    MessageType: MessageType;
    ShowAsPopup: boolean;
}
export declare class ReminderAlertWizard extends React.Component<ReminderAlertWizardProps, ReminderAlertWizardState> implements AdaptableWizardStep {
    constructor(props: ReminderAlertWizardProps);
    render(): any;
    private onHeaderChanged;
    private onMessageChanged;
    private onMessageTypeChanged;
    private onShowAsPopupChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}

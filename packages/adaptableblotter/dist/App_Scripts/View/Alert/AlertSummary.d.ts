import * as React from "react";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as AlertRedux from '../../Redux/ActionsReducers/AlertRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { IAdaptableBlotterObject, IAlertDefinition } from "../../Utilities/Interface/IAdaptableBlotterObjects";
export interface AlertSummaryProps extends StrategySummaryProps<AlertSummaryComponent> {
    Alerts: IAlertDefinition[];
    onAddUpdateAlert: (index: number, Alert: IAlertDefinition) => AlertRedux.AlertDefinitionAddUpdateAction;
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}
export declare class AlertSummaryComponent extends React.Component<AlertSummaryProps, EditableConfigEntityState> {
    constructor(props: AlertSummaryProps);
    render(): any;
    onNew(): void;
    onEdit(index: number, Alert: IAlertDefinition): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let AlertSummary: React.ComponentClass<any, any>;

import * as React from "react";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as UserFilterRedux from '../../Redux/ActionsReducers/UserFilterRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { IUserFilter, IAdaptableBlotterObject } from "../../Utilities/Interface/IAdaptableBlotterObjects";
export interface UserFilterSummaryProps extends StrategySummaryProps<UserFilterSummaryComponent> {
    onAddUpdateUserFilter: (index: number, UserFilter: IUserFilter) => UserFilterRedux.UserFilterAddUpdateAction;
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}
export declare class UserFilterSummaryComponent extends React.Component<UserFilterSummaryProps, EditableConfigEntityState> {
    constructor(props: UserFilterSummaryProps);
    render(): any;
    getSummary(): string;
    getDescription(userFilter: IUserFilter): string;
    isFilterable(): boolean;
    isColumnFilterable(): boolean;
    onNew(): void;
    onEdit(index: number, UserFilter: IUserFilter): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let UserFilterSummary: React.ComponentClass<any, any>;

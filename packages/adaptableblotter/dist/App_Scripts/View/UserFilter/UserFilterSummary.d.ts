import * as React from "react";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as FilterRedux from '../../Redux/ActionsReducers/FilterRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { IUserFilter, IAdaptableBlotterObject } from "../../Core/Api/Interface/AdaptableBlotterObjects";
export interface UserFilterSummaryProps extends StrategySummaryProps<UserFilterSummaryComponent> {
    onAddUpdateUserFilter: (index: number, UserFilter: IUserFilter) => FilterRedux.UserFilterAddUpdateAction;
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}
export declare class UserFilterSummaryComponent extends React.Component<UserFilterSummaryProps, EditableConfigEntityState> {
    constructor(props: UserFilterSummaryProps);
    render(): any;
    onNew(): void;
    onEdit(index: number, UserFilter: IUserFilter): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let UserFilterSummary: React.ComponentClass<any, any>;

import * as React from "react";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as ColumnFilterRedux from '../../Redux/ActionsReducers/ColumnFilterRedux';
import { IColumnFilter, IAdaptableBlotterObject } from "../../Api/Interface/IAdaptableBlotterObjects";
import { IEntitlement } from "../../api/Interface/Interfaces";
export interface ColumnFilterSummaryProps extends StrategySummaryProps<ColumnFilterSummaryComponent> {
    ColumnFilters: IColumnFilter[];
    onClearFilter: (columnId: string) => ColumnFilterRedux.ColumnFilterClearAction;
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
    Entitlements: IEntitlement[];
}
export declare class ColumnFilterSummaryComponent extends React.Component<ColumnFilterSummaryProps, EditableConfigEntityState> {
    constructor(props: ColumnFilterSummaryProps);
    render(): any;
    getDescription(columnFilter: IColumnFilter): string;
}
export declare let ColumnFilterSummary: React.ComponentClass<any, any>;

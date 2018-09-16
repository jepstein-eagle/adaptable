import * as React from "react";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as FilterRedux from '../../Redux/ActionsReducers/FilterRedux';
import { IColumnFilter, IAdaptableBlotterObject } from "../../Core/Api/Interface/AdaptableBlotterObjects";
export interface ColumnFilterSummaryProps extends StrategySummaryProps<ColumnFilterSummaryComponent> {
    ColumnFilters: IColumnFilter[];
    onClearFilter: (columnId: string) => FilterRedux.ColumnFilterClearAction;
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}
export declare class ColumnFilterSummaryComponent extends React.Component<ColumnFilterSummaryProps, EditableConfigEntityState> {
    constructor(props: ColumnFilterSummaryProps);
    render(): any;
}
export declare let ColumnFilterSummary: React.ComponentClass<any, any>;

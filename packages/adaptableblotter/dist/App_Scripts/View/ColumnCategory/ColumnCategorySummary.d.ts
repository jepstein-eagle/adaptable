import * as React from "react";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { IAdaptableBlotterObject } from "../../api/Interface/IAdaptableBlotterObjects";
import { IColumnCategory } from "../../api/Interface/Interfaces";
export interface ColumnCategorySummaryProps extends StrategySummaryProps<ColumnCategorySummaryComponent> {
    ColumnCategorys: IColumnCategory[];
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}
export declare class ColumnCategorySummaryComponent extends React.Component<ColumnCategorySummaryProps, EditableConfigEntityState> {
    constructor(props: ColumnCategorySummaryProps);
    render(): any;
    onNew(): void;
    onEdit(ColumnCategory: IColumnCategory): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): void;
}
export declare let ColumnCategorySummary: React.ComponentClass<any, any>;

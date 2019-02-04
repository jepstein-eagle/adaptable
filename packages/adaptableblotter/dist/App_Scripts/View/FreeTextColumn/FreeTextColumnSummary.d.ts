import * as React from "react";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as FreeTextColumnRedux from '../../Redux/ActionsReducers/FreeTextColumnRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { IAdaptableBlotterObject } from "../../Utilities/Interface/BlotterObjects/IAdaptableBlotterObject";
import { IFreeTextColumn } from "../../Utilities/Interface/BlotterObjects/IFreeTextColumn";
export interface FreeTextColumnSummaryProps extends StrategySummaryProps<FreeTextColumnSummaryComponent> {
    FreeTextColumns: IFreeTextColumn[];
    onAddFreeTextColumn: (FreeTextColumn: IFreeTextColumn) => FreeTextColumnRedux.FreeTextColumnAddAction;
    onEditFreeTextColumn: (FreeTextColumn: IFreeTextColumn) => FreeTextColumnRedux.FreeTextColumnEditAction;
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}
export declare class FreeTextColumnSummaryComponent extends React.Component<FreeTextColumnSummaryProps, EditableConfigEntityState> {
    constructor(props: FreeTextColumnSummaryProps);
    render(): any;
    onNew(): void;
    onEdit(index: number, FreeTextColumn: IFreeTextColumn): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let FreeTextColumnSummary: React.ComponentClass<any, any>;

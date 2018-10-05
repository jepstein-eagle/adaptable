import * as React from "react";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as FormatColumnRedux from '../../Redux/ActionsReducers/FormatColumnRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { IAdaptableBlotterObject, IFormatColumn } from "../../Core/Api/Interface/IAdaptableBlotterObjects";
export interface FormatColumnSummaryProps extends StrategySummaryProps<FormatColumnSummaryComponent> {
    FormatColumns: IFormatColumn[];
    ColorPalette: string[];
    StyleClassNames: string[];
    onAddFormatColumn: (FormatColumn: IFormatColumn) => FormatColumnRedux.FormatColumnAddAction;
    onEditFormatColumn: (FormatColumn: IFormatColumn) => FormatColumnRedux.FormatColumnEditAction;
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}
export declare class FormatColumnSummaryComponent extends React.Component<FormatColumnSummaryProps, EditableConfigEntityState> {
    constructor(props: FormatColumnSummaryProps);
    render(): any;
    onNew(): void;
    onEdit(formatColumn: IFormatColumn): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let FormatColumnSummary: React.ComponentClass<any, any>;

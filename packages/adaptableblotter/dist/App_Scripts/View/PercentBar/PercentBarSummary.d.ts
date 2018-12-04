import * as React from "react";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as PercentBarRedux from '../../Redux/ActionsReducers/PercentBarRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { IAdaptableBlotterObject, IPercentBar } from "../../Api/Interface/IAdaptableBlotterObjects";
export interface PercentBarSummaryProps extends StrategySummaryProps<PercentBarSummaryComponent> {
    PercentBars: IPercentBar[];
    ColorPalette: string[];
    StyleClassNames: string[];
    onAddPercentBar: (PercentBar: IPercentBar) => PercentBarRedux.PercentBarAddAction;
    onEditPercentBar: (index: number, PercentBar: IPercentBar) => PercentBarRedux.PercentBarEditAction;
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}
export declare class PercentBarSummaryComponent extends React.Component<PercentBarSummaryProps, EditableConfigEntityState> {
    constructor(props: PercentBarSummaryProps);
    render(): any;
    onNew(): void;
    onEdit(index: number, renderedColumn: IPercentBar): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let PercentBarSummary: React.ComponentClass<any, any>;

import * as React from "react";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as PlusMinusRedux from '../../Redux/ActionsReducers/PlusMinusRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { IAdaptableBlotterObject } from "../../Utilities/Interface/BlotterObjects/IAdaptableBlotterObject";
import { IPlusMinusRule } from "../../Utilities/Interface/BlotterObjects/IPlusMinusRule";
export interface PlusMinusSummaryProps extends StrategySummaryProps<PlusMinusSummaryComponent> {
    PlusMinusRules: IPlusMinusRule[];
    onAddUpdatePlusMinus: (index: number, PlusMinus: IPlusMinusRule) => PlusMinusRedux.PlusMinusAddUpdateConditionAction;
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}
export declare class PlusMinusSummaryComponent extends React.Component<PlusMinusSummaryProps, EditableConfigEntityState> {
    constructor(props: PlusMinusSummaryProps);
    render(): any;
    onNew(): void;
    onEdit(index: number, PlusMinus: IPlusMinusRule): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
    wrapExpressionDescription(expressionDescription: string): string;
}
export declare let PlusMinusSummary: React.ComponentClass<any, any>;

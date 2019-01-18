import * as React from "react";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as CellValidationRedux from '../../Redux/ActionsReducers/CellValidationRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { IAdaptableBlotterObject, ICellValidationRule } from "../../Utilities/Interface/IAdaptableBlotterObjects";
export interface CellValidationSummaryProps extends StrategySummaryProps<CellValidationSummaryComponent> {
    CellValidations: ICellValidationRule[];
    onAddUpdateCellValidation: (index: number, CellValidation: ICellValidationRule) => CellValidationRedux.CellValidationAddUpdateAction;
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}
export declare class CellValidationSummaryComponent extends React.Component<CellValidationSummaryProps, EditableConfigEntityState> {
    constructor(props: CellValidationSummaryProps);
    render(): any;
    onNew(): void;
    onEdit(index: number, CellValidation: ICellValidationRule): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let CellValidationSummary: React.ComponentClass<any, any>;

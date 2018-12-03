import * as React from "react";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as FlashingCellRedux from '../../Redux/ActionsReducers/FlashingCellsRedux';
import { IFlashingCell } from "../../api/Interface/IAdaptableBlotterObjects";
export interface FlashingCellSummaryProps extends StrategySummaryProps<FlashingCellSummaryComponent> {
    FlashingCells: IFlashingCell[];
    onSelectFlashingCell: (flashingCell: IFlashingCell) => FlashingCellRedux.FlashingCellSelectAction;
}
export declare class FlashingCellSummaryComponent extends React.Component<FlashingCellSummaryProps, EditableConfigEntityState> {
    render(): any;
    onFlashingSelectedChanged(flashingCell: IFlashingCell): void;
}
export declare let FlashingCellSummary: React.ComponentClass<any, any>;

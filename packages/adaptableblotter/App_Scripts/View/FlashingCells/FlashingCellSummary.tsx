import * as React from "react";
import * as Redux from "redux";
import { Button } from 'react-bootstrap';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps'
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as FlashingCellRedux from '../../Redux/ActionsReducers/FlashingCellsRedux'
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColumn } from "../../Utilities/Interface/IColumn";
import { IColItem } from "../UIInterfaces";
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { IFlashingCell } from "../../Utilities/Interface/BlotterObjects/IFlashingCell";
import { ColumnHelper } from "../../Utilities/Helpers/ColumnHelper";
import { FlashingCellState } from "../../Redux/ActionsReducers/Interface/IState";

export interface FlashingCellSummaryProps extends StrategySummaryProps<FlashingCellSummaryComponent> {
    FlashingCells: IFlashingCell[]
    onSelectFlashingCell: (flashingCell: IFlashingCell) => FlashingCellRedux.FlashingCellSelectAction,
}

export class FlashingCellSummaryComponent extends React.Component<FlashingCellSummaryProps, EditableConfigEntityState> {
    render(): any {
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__flashingcells";
        let flashingCell: IFlashingCell = this.props.FlashingCells.find(fc => fc.ColumnId == this.props.SummarisedColumn.ColumnId);
        let isFlashingCellColumn: boolean = (flashingCell && flashingCell.IsLive);

        let message: string = isFlashingCellColumn ? "Flashing on" : "Flashing off"
        let showFlashingButton = isFlashingCellColumn ?
            <Button onClick={() => this.onFlashingSelectedChanged(flashingCell)} bsStyle="default" bsSize="small">Turn Off</Button>
            : <Button onClick={() => this.onFlashingSelectedChanged(flashingCell)} bsStyle="deffault" bsSize="small">Turn On</Button>

        let colItems: IColItem[] = []
        colItems.push({ Size: 3, Content: <b>{StrategyConstants.FlashingCellsStrategyName}</b> });
        colItems.push({ Size: 7, Content: message });
        colItems.push({ Size: 2, Content: showFlashingButton });

        return <AdaptableObjectRow cssClassName={cssWizardClassName} colItems={colItems} />
    }

    onFlashingSelectedChanged(flashingCell: IFlashingCell) {
        let existingfc = this.props.FlashingCells.find(e => e.ColumnId == this.props.SummarisedColumn.ColumnId)
        if (!existingfc) {
            let flashingCellState: FlashingCellState = this.props.Blotter.api.configApi.configGetFlashingCellState(false);
            let col: IColumn = ColumnHelper.getColumnFromId(this.props.SummarisedColumn.ColumnId, this.props.Columns);
            existingfc = ObjectFactory.CreateDefaultFlashingCell(col, flashingCellState.DefaultUpColor, flashingCellState.DefautDownColor, flashingCellState.DefaultDuration);
            this.props.onSelectFlashingCell(existingfc)
        }
        this.props.onSelectFlashingCell(existingfc)
    }

}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        FlashingCells: state.FlashingCell.FlashingCells,
        Columns: state.Grid.Columns
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSelectFlashingCell: (flashingCell: IFlashingCell) => dispatch(FlashingCellRedux.FlashingCellSelect(flashingCell)),
    };
}

export let FlashingCellSummary = connect(mapStateToProps, mapDispatchToProps)(FlashingCellSummaryComponent);

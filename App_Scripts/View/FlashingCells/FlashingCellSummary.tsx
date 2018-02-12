import * as React from "react";
import * as Redux from "redux";
import { Button } from 'react-bootstrap';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps'
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { ObjectFactory } from '../../Core/ObjectFactory';
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { IFlashingColumn } from '../../Strategy/Interface/IFlashingCellsStrategy';
import * as FlashingCellRedux from '../../Redux/ActionsReducers/FlashingCellsRedux'
import { ConfigEntityRowItem } from '../Components/ConfigEntityRowItem';
import { IColumn } from "../../Core/Interface/IAdaptableBlotter";
import { IColItem } from "../Interfaces";

export interface FlashingCellSummaryProps extends StrategySummaryProps<FlashingCellSummaryComponent> {
    FlashingCellColumns: IFlashingColumn[]
    onSelectFlashingColumn: (flashingCell: IFlashingColumn) => FlashingCellRedux.FlashingCellSelectAction,
}

export class FlashingCellSummaryComponent extends React.Component<FlashingCellSummaryProps, EditableConfigEntityState> {
    render(): any {
        let flashingColumn: IFlashingColumn = this.props.FlashingCellColumns.find(fc => fc.ColumnName == this.props.SummarisedColumn.ColumnId);

        let showFlashingButton = (!flashingColumn || !flashingColumn.IsLive) ?
            <Button onClick={() => this.onFlashingSelectedChanged(flashingColumn)} bsStyle="info" bsSize="small">Flashing Off</Button>
            : <Button onClick={() => this.onFlashingSelectedChanged(flashingColumn)} bsStyle="success" bsSize="small">Flashing On</Button>

        let colItems: IColItem[] = []
        colItems.push({ Size: 3, Content: <b>{StrategyNames.FlashingCellsStrategyName}</b> });
        colItems.push({ Size: 5, Content: showFlashingButton });
        colItems.push({ Size: 3, Content: null });
        return <ConfigEntityRowItem ColItems={colItems} />
    }

    onFlashingSelectedChanged(flashingColumn: IFlashingColumn) {
        let existingfc = this.props.FlashingCellColumns.find(e => e.ColumnName == this.props.SummarisedColumn.ColumnId)
        if (!existingfc) {
            let col: IColumn = this.props.Columns.find(c => c.ColumnId == this.props.SummarisedColumn.ColumnId);
            existingfc = ObjectFactory.CreateDefaultFlashingColumn(col);
            this.props.onSelectFlashingColumn(existingfc)
        }
        this.props.onSelectFlashingColumn(existingfc)
    }

}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        FlashingCellColumns: state.FlashingCell.FlashingColumns,
        Columns: state.Grid.Columns
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSelectFlashingColumn: (flashingCell: IFlashingColumn) => dispatch(FlashingCellRedux.FlashingCellSelect(flashingCell)),
    };
}

export let FlashingCellSummary = connect(mapStateToProps, mapDispatchToProps)(FlashingCellSummaryComponent);

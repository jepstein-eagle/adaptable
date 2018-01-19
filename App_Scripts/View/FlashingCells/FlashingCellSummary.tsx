import * as React from "react";
import * as Redux from "redux";
import { Col, Row, Checkbox, FormControl, Button } from 'react-bootstrap';
import { IStrategySummaryProps } from '../../Core/Interface/IStrategySummary'
import { StrategySummaryInternalState } from '../../Core/Interface/IStrategySummary'
import { Provider, connect } from 'react-redux';
import { Helper } from '../../Core/Helper';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { ObjectFactory } from '../../Core/ObjectFactory';
import * as StrategyConstants from '../../Core/StrategyConstants'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategySummaryRow } from '../Components/StrategySummaryRow'
import { StrategyDetailRow } from '../Components/StrategyDetailRow'
import { IFlashingColumn } from '../../Core/Interface/IFlashingCellsStrategy';
import * as FlashingCellRedux from '../../Redux/ActionsReducers/FlashingCellsRedux'
import { ConfigEntityRow, IColItem } from '../Components/ConfigEntityRow';

export interface FlashingCellSummaryProps extends IStrategySummaryProps<FlashingCellSummaryComponent> {
    FlashingCellColumns: IFlashingColumn[]
    onSelectFlashingColumn: (flashingCell: IFlashingColumn) => FlashingCellRedux.FlashingCellSelectAction,
}

export class FlashingCellSummaryComponent extends React.Component<FlashingCellSummaryProps, StrategySummaryInternalState> {
    render(): any {
        let flashingColumn: IFlashingColumn = this.props.FlashingCellColumns.find(fc => fc.ColumnName == this.props.SummarisedColumn.ColumnId);

        let showFlashingButton = (!flashingColumn || !flashingColumn.IsLive) ?
            <Button onClick={() => this.onFlashingSelectedChanged(flashingColumn)} bsStyle="info" bsSize="small">Flashing Off</Button>
            : <Button onClick={() => this.onFlashingSelectedChanged(flashingColumn)} bsStyle="success" bsSize="small">Flashing On</Button>

        let myCols: IColItem[] = []
        myCols.push({ size: 3, content: <b>{StrategyConstants.FlashingCellsStrategyFriendlyName}</b> });
        myCols.push({ size: 5, content: showFlashingButton });
        myCols.push({ size: 3, content: null });
        return <ConfigEntityRow items={myCols} />
    }

    onFlashingSelectedChanged(flashingColumn: IFlashingColumn) {
        this.props.onSelectFlashingColumn(flashingColumn)
    }

}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        FlashingCellColumns: state.FlashingCell.FlashingColumns
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSelectFlashingColumn: (flashingCell: IFlashingColumn) => dispatch(FlashingCellRedux.FlashingCellSelect(flashingCell)),
    };
}

export let FlashingCellSummary = connect(mapStateToProps, mapDispatchToProps)(FlashingCellSummaryComponent);

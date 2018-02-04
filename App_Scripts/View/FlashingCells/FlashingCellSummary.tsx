import * as React from "react";
import * as Redux from "redux";
import { Col, Row, Checkbox, FormControl, Button } from 'react-bootstrap';
import { IStrategySummaryProps } from '../../Core/Interface/IStrategySummary'
import { EditableConfigEntityInternalState } from '../Components/SharedProps/EditableConfigEntityPopupProps';
import { Provider, connect } from 'react-redux';
import { Helper } from '../../Core/Helpers/Helper';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { ObjectFactory } from '../../Core/ObjectFactory';
import * as StrategyNames from '../../Core/StrategyNames'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategySummaryRow } from '../Components/StrategySummaryRow'
import { StrategyDetailRow } from '../Components/StrategyDetailRow'
import { IFlashingColumn } from '../../Strategy/Interface/IFlashingCellsStrategy';
import * as FlashingCellRedux from '../../Redux/ActionsReducers/FlashingCellsRedux'
import { ConfigEntityRowItem, IColItem } from '../Components/ConfigEntityRowItem';
import { FlashingCellGlyph } from "../../Core/StrategyGlyphs";
import { IColumn } from "../../Core/Interface/IAdaptableBlotter";

export interface FlashingCellSummaryProps extends IStrategySummaryProps<FlashingCellSummaryComponent> {
    FlashingCellColumns: IFlashingColumn[]
    onSelectFlashingColumn: (flashingCell: IFlashingColumn) => FlashingCellRedux.FlashingCellSelectAction,
}

export class FlashingCellSummaryComponent extends React.Component<FlashingCellSummaryProps, EditableConfigEntityInternalState> {
    render(): any {
        let flashingColumn: IFlashingColumn = this.props.FlashingCellColumns.find(fc => fc.ColumnName == this.props.SummarisedColumn.ColumnId);

        let showFlashingButton = (!flashingColumn || !flashingColumn.IsLive) ?
            <Button onClick={() => this.onFlashingSelectedChanged(flashingColumn)} bsStyle="info" bsSize="small">Flashing Off</Button>
            : <Button onClick={() => this.onFlashingSelectedChanged(flashingColumn)} bsStyle="success" bsSize="small">Flashing On</Button>

        let myCols: IColItem[] = []
        myCols.push({ size: 3, content: <b>{StrategyNames.FlashingCellsStrategyName}</b> });
        myCols.push({ size: 5, content: showFlashingButton });
        myCols.push({ size: 3, content: null });
        return <ConfigEntityRowItem items={myCols} />
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

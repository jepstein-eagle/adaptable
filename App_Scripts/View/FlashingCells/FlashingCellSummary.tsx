import * as React from "react";
import * as Redux from "redux";
import { Button } from 'react-bootstrap';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps'
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { ObjectFactory } from '../../Core/ObjectFactory';
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as FlashingCellRedux from '../../Redux/ActionsReducers/FlashingCellsRedux'
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColumn } from "../../Core/Interface/IColumn";
import { IColItem } from "../UIInterfaces";
import * as StyleConstants from '../../Core/Constants/StyleConstants';
import { IFlashingCell } from "../../Core/Api/AdaptableBlotterObjects";

export interface FlashingCellSummaryProps extends StrategySummaryProps<FlashingCellSummaryComponent> {
    FlashingCells: IFlashingCell[]
    onSelectFlashingCell: (flashingCell: IFlashingCell) => FlashingCellRedux.FlashingCellSelectAction,
}

export class FlashingCellSummaryComponent extends React.Component<FlashingCellSummaryProps, EditableConfigEntityState> {
    render(): any {
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__flashingcells";
        let flashingCell: IFlashingCell = this.props.FlashingCells.find(fc => fc.ColumnName == this.props.SummarisedColumn.ColumnId);

        let showFlashingButton = (!flashingCell || !flashingCell.IsLive) ?
            <Button onClick={() => this.onFlashingSelectedChanged(flashingCell)} bsStyle="info" bsSize="small">Flashing Off</Button>
            : <Button onClick={() => this.onFlashingSelectedChanged(flashingCell)} bsStyle="success" bsSize="small">Flashing On</Button>

        let colItems: IColItem[] = []
        colItems.push({ Size: 3, Content: <b>{StrategyNames.FlashingCellsStrategyName}</b> });
        colItems.push({ Size: 5, Content: showFlashingButton });
        colItems.push({ Size: 3, Content: null });
        
        return <AdaptableObjectRow cssClassName={cssWizardClassName} colItems ={colItems} />
     }

    onFlashingSelectedChanged(flashingCell: IFlashingCell) {
        let existingfc = this.props.FlashingCells.find(e => e.ColumnName == this.props.SummarisedColumn.ColumnId)
        if (!existingfc) {
            let col: IColumn = this.props.Columns.find(c => c.ColumnId == this.props.SummarisedColumn.ColumnId);
            existingfc = ObjectFactory.CreateDefaultFlashingCell(col);
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

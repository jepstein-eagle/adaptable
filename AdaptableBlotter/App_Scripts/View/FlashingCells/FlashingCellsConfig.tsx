/// <reference path="../../../typings/index.d.ts" />
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import * as StrategyIds from '../../Core/StrategyIds'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import * as FlashingCellsRedux from '../../Redux/ActionsReducers/FlashingCellsRedux'
import { IFlashingColumn, IFlashingCellDuration, IFlashingCellsStrategy } from '../../Core/Interface/IFlashingCellsStrategy';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { FormGroup, Form, Col, Panel, Row, Checkbox, ListGroup } from 'react-bootstrap';
import { DataType, SortOrder } from '../../Core/Enums'
import { FlashingCellConfigItem } from './FlashingCellConfigItem'
import { PanelWithRow } from '../PanelWithRow';
import { PanelWithImage } from '../PanelWithImage';
import { Helper } from '../../Core/Helper'
import { ObjectFactory } from '../../Core/ObjectFactory';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'

interface FlashingCellsConfigProps extends IStrategyViewPopupProps<FlashingCellsConfigComponent> {
    FlashingColumns: Array<IFlashingColumn>,
    Columns: IColumn[],
    onSelectColumn: (flashingCell: IFlashingColumn) => FlashingCellsRedux.FlashingCellSelectAction,
    onSelectAllColumns: (numericColumns: IFlashingColumn[]) => FlashingCellsRedux.FlashingCellSelectAllAction,
    onChangeFlashDurationFlashingColumn: (flashingCell: IFlashingColumn, newFlashDuration: IFlashingCellDuration) => FlashingCellsRedux.FlashingCellChangeDurationAction
    onChangeDownColorFlashingColumn: (flashingCell: IFlashingColumn, DownColor: string) => FlashingCellsRedux.FlashingCellChangeDownColorAction
    onChangeUpColorFlashingColumn: (flashingCell: IFlashingColumn, UpColor: string) => FlashingCellsRedux.FlashingCellChangeUpColorAction

}

class FlashingCellsConfigComponent extends React.Component<FlashingCellsConfigProps, {}> {

    render() {
        let flashingCellDurations: IFlashingCellDuration[] = ObjectFactory.GetFlashingCellDurations();

        let numericColumns = this.props.Columns.filter(c => c.DataType == DataType.Number);
        numericColumns = Helper.sortArrayWithProperty(SortOrder.Ascending, numericColumns, "FriendlyName")

        let cellInfo: [string, number][] = [["Live", 1], ["Column", 4], ["Flash Duration", 3], ["Up Colour", 2], ["Down Colour", 2]];
        
        let allPotentialFlashingColumns: IFlashingColumn[] = [];
        numericColumns.forEach(nc => {
            let existingfc = this.props.FlashingColumns.find(e => e.ColumnName == nc.ColumnId)
            if (!existingfc) {
                allPotentialFlashingColumns.push(ObjectFactory.CreateDefaultFlashingColumn(nc))
            }
            else {
                allPotentialFlashingColumns.push(existingfc);
            }
        })
        
        let allFlashingColumns = allPotentialFlashingColumns.map((flashingColumn: IFlashingColumn) => {
            return <FlashingCellConfigItem
                FlashingColumn={flashingColumn}
                key={flashingColumn.ColumnName}
                Columns={this.props.Columns}
                FlashingCellDurations={flashingCellDurations}
                onSelect={(flashingColumn) => this.props.onSelectColumn(flashingColumn)}
                onChangeFlashingDuration={(flashingColumn, newFlashDuration) => this.props.onChangeFlashDurationFlashingColumn(flashingColumn, newFlashDuration)}
                onChangeDownColorFlashingColumn={(flashingColumn, DownColor) => this.props.onChangeDownColorFlashingColumn(flashingColumn, DownColor)}
                onChangeUpColorFlashingColumn={(flashingColumn, UpColor) => this.props.onChangeUpColorFlashingColumn(flashingColumn, UpColor)}>
            </FlashingCellConfigItem>
        });

        let setAllOption = <AdaptableBlotterForm horizontal>
            <FormGroup controlId="formInlineName">
                <Col xs={12} style={topCheckBoxStyle}>
                    <Checkbox onChange={() => this.props.onSelectAllColumns(allPotentialFlashingColumns)}
                        checked={allPotentialFlashingColumns.every(f => f.IsLive)} > All Columns </Checkbox>
                </Col>
            </FormGroup>
        </AdaptableBlotterForm>;

        return <PanelWithImage header={"Flashing Cell Columns"} bsStyle="primary" style={panelStyle} glyphicon="flash">
            {setAllOption}
            <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
            <ListGroup style={divStyle}>
                {allFlashingColumns}
            </ListGroup>

        </PanelWithImage>
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        FlashingColumns: state.FlashingCell.FlashingColumns,
        Columns: state.Grid.Columns
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSelectColumn: (flashingCell: IFlashingColumn) => dispatch(FlashingCellsRedux.FlashingCellSelect(flashingCell)),
        onSelectAllColumns: (numericColumns: IFlashingColumn[]) => dispatch(FlashingCellsRedux.FlashingCellSelectAll(numericColumns)),
        onChangeFlashDurationFlashingColumn: (flashingCell: IFlashingColumn, newFlashDuration: IFlashingCellDuration) => dispatch(FlashingCellsRedux.FlashingCellChangeDuration(flashingCell, newFlashDuration)),
        onChangeDownColorFlashingColumn: (flashingCell: IFlashingColumn, DownColor: string) => dispatch(FlashingCellsRedux.FlashingCellChangeDownColor(flashingCell, DownColor)),
        onChangeUpColorFlashingColumn: (flashingCell: IFlashingColumn, UpColor: string) => dispatch(FlashingCellsRedux.FlashingCellChangeUpColor(flashingCell, UpColor))
    };
}

export let FlashingCellsConfig = connect(mapStateToProps, mapDispatchToProps)(FlashingCellsConfigComponent);

let panelStyle = {
    width: '800px'
}

let divStyle = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}

let topCheckBoxStyle = {
   'margin': '7px'
}
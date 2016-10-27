/// <reference path="../../../typings/index.d.ts" />
import { IFlashingColumn } from '../../Core/Interface/IFlashingCellsStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as FlashingCellsRedux from '../../Redux/ActionsReducers/FlashingCellsRedux'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { ButtonToolbar, ControlLabel, FormGroup, Button, Form, Col, Panel, Row, Modal, MenuItem, Checkbox, FormControl, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';
import { ColumnType, FlashingCellDuration } from '../../Core/Enums'
import { FlashingCellConfigItem, FlashingCellConfigHeader } from './FlashingCellConfigItem'


interface FlashingCellsConfigProps extends IStrategyViewPopupProps<FlashingCellsConfigComponent> {
    FlashingColumns: Array<IFlashingColumn>,
    Columns: IColumn[],
    onSelectFlashingColumn: (flashingCell: IFlashingColumn) => FlashingCellsRedux.FlashingColumnSelectAction,
    onSelectAllFlashingColumns: (numericColumns: IFlashingColumn[]) => FlashingCellsRedux.FlashingColumnSelectAllAction,
    onChangeFlashDurationFlashingColumn: (flashingCell: IFlashingColumn, newFlashDuration: FlashingCellDuration) => FlashingCellsRedux.FlashingColumnDurationChangeAction
}

class FlashingCellsConfigComponent extends React.Component<FlashingCellsConfigProps, {}> {

    render() {
        let numericColumns = this.props.Columns.filter(c => c.ColumnType == ColumnType.Number);

        let existingFlashingColumnNames: string[] = this.props.FlashingColumns.map((flashingColumn: IFlashingColumn) => {
            return flashingColumn.ColumnName
        });

        let allPotentialFlashingColumns: IFlashingColumn[]=[];
        this.props.FlashingColumns.forEach(fc => {
            allPotentialFlashingColumns.push(fc);
        });

        numericColumns.filter(c => existingFlashingColumnNames.findIndex(e => e == c.ColumnId) < 0).forEach(nc=>{
            let flashingColumn: IFlashingColumn= { IsLive: false, ColumnName: nc.ColumnId, FlashingCellDuration: FlashingCellDuration.HalfSecond };
             allPotentialFlashingColumns.push(flashingColumn);
        })
     
     let allFlashingColumns = allPotentialFlashingColumns.map((flashingColumn: IFlashingColumn) => {
            return <FlashingCellConfigItem
                FlashingColumn={flashingColumn}
                key={flashingColumn.ColumnName}
                Columns={this.props.Columns}
                onSelect={(flashingColumn) => this.props.onSelectFlashingColumn(flashingColumn)}
                onChangeFlashingDuration={(flashingColumn, newFlashDuration) => this.props.onChangeFlashDurationFlashingColumn(flashingColumn, newFlashDuration)}>
            </FlashingCellConfigItem>
        });

        allFlashingColumns.sort(compareFlashingCellConfigItems);

        let header = <Form horizontal>
            <Row style={{ display: "flex", alignItems: "center" }}>
                <Col xs={9}>Flashing Cell Columns</Col>
                <Col xs={3}>

                </Col>
            </Row>
        </Form>;

        let setAllOption = <Form horizontal>
            <Row style={rowStyle}>
                <Col xs={12}>
                    <Checkbox onChange={() => this.props.onSelectAllFlashingColumns(allPotentialFlashingColumns)} checked={allPotentialFlashingColumns.every(f=>f.IsLive)}>
                        Turn On All Flashing Columns
                    </Checkbox>
                </Col>
            </Row>
        </Form>;

        return <Panel header={header} bsStyle="primary" style={panelStyle}>
            {setAllOption}
            <FlashingCellConfigHeader />
            <ListGroup style={divStyle}>
                {allFlashingColumns}
            </ListGroup>

        </Panel>
    }
}

function compareFlashingCellConfigItems(a: any, b: any) {
    if (a.props.FlashingColumn.ColumnName < b.props.FlashingColumn.ColumnName)
        return -1;
    if (a.props.FlashingColumn.ColumnName > b.props.FlashingColumn.ColumnName)
        return 1;
    return 0;
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        FlashingColumns: state.FlashingCell.FlashingColumns,
        Columns: state.Grid.Columns
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSelectFlashingColumn: (flashingCell: IFlashingColumn) => dispatch(FlashingCellsRedux.SelectFlashingCellColumn(flashingCell)),
        onSelectAllFlashingColumns: (numericColumns: IFlashingColumn[]) => dispatch(FlashingCellsRedux.SelectAllFlashingCellColumn(numericColumns)),
        onChangeFlashDurationFlashingColumn: (flashingCell: IFlashingColumn, newFlashDuration: FlashingCellDuration) => dispatch(FlashingCellsRedux.ChangeFlashingDuration(flashingCell, newFlashDuration))
    };
}

export let FlashingCellsConfig = connect(mapStateToProps, mapDispatchToProps)(FlashingCellsConfigComponent);


var listGroupStyle = {
    'overflowY': 'auto',
    'maxHeight': '300px',
    'height': '300px'
};



let panelStyle = {
    width: '800px'
}

let rowStyle = {
    height: '50px',
    margin: '2px'
}

let divStyle = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}
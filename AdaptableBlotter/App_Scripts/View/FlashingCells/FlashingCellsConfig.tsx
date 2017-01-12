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
import { ColumnType } from '../../Core/Enums'
import { FlashingCellConfigItem } from './FlashingCellConfigItem'
import { PanelWithRow } from '../PanelWithRow';


interface FlashingCellsConfigProps extends IStrategyViewPopupProps<FlashingCellsConfigComponent> {
    FlashingColumns: Array<IFlashingColumn>,
    Columns: IColumn[],
    onSelectFlashingColumn: (flashingCell: IFlashingColumn) => FlashingCellsRedux.FlashingColumnSelectAction,
    onSelectAllFlashingColumns: (numericColumns: IFlashingColumn[]) => FlashingCellsRedux.FlashingColumnSelectAllAction,
    onChangeFlashDurationFlashingColumn: (flashingCell: IFlashingColumn, newFlashDuration: IFlashingCellDuration) => FlashingCellsRedux.FlashingColumnDurationChangeAction
    onChangeDownColorFlashingColumn: (flashingCell: IFlashingColumn, DownColor: string) => FlashingCellsRedux.FlashingColumnDownColorChangeAction
    onChangeUpColorFlashingColumn: (flashingCell: IFlashingColumn, UpColor: string) => FlashingCellsRedux.FlashingColumnUpColorChangeAction

}

class FlashingCellsConfigComponent extends React.Component<FlashingCellsConfigProps, {}> {

    render() {
        // have to use any because the cast fails as its not an enclosing jsx object - that must be fixable
        let flashingCelllStrategy: IFlashingCellsStrategy = this.props.AdaptableBlotter.Strategies.get(StrategyIds.FlashingCellsStrategyId) as IFlashingCellsStrategy;

        let flashingCellDurations: IFlashingCellDuration[] = flashingCelllStrategy.GetFlashingCellDurations();

        let numericColumns = this.props.Columns.filter(c => c.ColumnType == ColumnType.Number);

        let existingFlashingColumnNames: string[] = this.props.FlashingColumns.map((flashingColumn: IFlashingColumn) => {
            return flashingColumn.ColumnName
        });

        let cellInfo: [string, number][] = [["Live", 1], ["Column Name", 4], ["Flash Duration", 3], ["Up Color", 2], ["Down Color", 2]];

        let allPotentialFlashingColumns: IFlashingColumn[] = [];
        this.props.FlashingColumns.forEach(fc => {
            allPotentialFlashingColumns.push(fc);
        });

        numericColumns.filter(c => existingFlashingColumnNames.findIndex(e => e == c.ColumnId) < 0).forEach(nc => {
            let flashingColumn: IFlashingColumn = flashingCelllStrategy.CreateDefaultFlashingColumn(nc);
            allPotentialFlashingColumns.push(flashingColumn);
        })

        let allFlashingColumns = allPotentialFlashingColumns.map((flashingColumn: IFlashingColumn) => {
            return <FlashingCellConfigItem
                FlashingColumn={flashingColumn}
                key={flashingColumn.ColumnName}
                Columns={this.props.Columns}
                FlashingCellDurations={flashingCellDurations}
                onSelect={(flashingColumn) => this.props.onSelectFlashingColumn(flashingColumn)}
                onChangeFlashingDuration={(flashingColumn, newFlashDuration) => this.props.onChangeFlashDurationFlashingColumn(flashingColumn, newFlashDuration)}
                onChangeDownColorFlashingColumn={(flashingColumn, DownColor) => this.props.onChangeDownColorFlashingColumn(flashingColumn, DownColor)}
                onChangeUpColorFlashingColumn={(flashingColumn, UpColor) => this.props.onChangeUpColorFlashingColumn(flashingColumn, UpColor)}>
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
            <FormGroup controlId="formInlineName">
                <Col xs={12}>
                    <Checkbox onChange={() => this.props.onSelectAllFlashingColumns(allPotentialFlashingColumns)}
                        checked={allPotentialFlashingColumns.every(f => f.IsLive)} >
                        Turn On All Flashing Columns
                    </Checkbox>
                </Col>
            </FormGroup>
        </Form>;

        return <Panel header={header} bsStyle="primary" style={panelStyle}>
            {setAllOption}
            <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
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
        onChangeFlashDurationFlashingColumn: (flashingCell: IFlashingColumn, newFlashDuration: IFlashingCellDuration) => dispatch(FlashingCellsRedux.ChangeFlashingDuration(flashingCell, newFlashDuration)),
        onChangeDownColorFlashingColumn: (flashingCell: IFlashingColumn, DownColor: string) => dispatch(FlashingCellsRedux.ChangeFlashingDownColor(flashingCell, DownColor)),
        onChangeUpColorFlashingColumn: (flashingCell: IFlashingColumn, UpColor: string) => dispatch(FlashingCellsRedux.ChangeFlashingUpColor(flashingCell, UpColor))
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
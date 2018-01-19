import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, Col, Panel, ListGroup, Row, Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn, IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { DualListBoxEditor } from './../DualListBoxEditor'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import * as StrategyConstants from '../../Core/StrategyConstants'
import { StringExtensions } from '../../Core/Extensions'
import { CustomSortSummary } from '../CustomSort/CustomSortSummary'
import { ConditionalStyleSummary } from '../ConditionalStyle/ConditionalStyleSummary'
import { CellValidationSummary } from '../CellValidation/CellValidationSummary'
import { UserFilterSummary } from '../UserFilter/UserFilterSummary'
import { PlusMinusSummary } from '../PlusMinus/PlusMinusSummary'
import { FormatColumnSummary } from '../FormatColumn/FormatColumnSummary'
import { FlashingCellSummary } from '../FlashingCells/FlashingCellSummary'
import { CalculatedColumnSummary } from '../CalculatedColumn/CalculatedColumnSummary'
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { ICustomSort } from "../../Core/Interface/ICustomSortStrategy";
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { Helper } from '../../Core/Helper';
import { DataType, SelectionMode } from '../../Core/Enums'
import { ColumnSelector } from '../ColumnSelector';
import { ICalculatedColumn } from '../../Core/Interface/ICalculatedColumnStrategy';


interface ColumnInfoActionProps extends IStrategyViewPopupProps<ColumnInfoActionComponent> {
    Columns: Array<IColumn>
    CalculatedColumns: Array<ICalculatedColumn>
}

export interface ColumnInfoState {
    SelectedColumn: IColumn
    ShowSelector: boolean
}

class ColumnInfoActionComponent extends React.Component<ColumnInfoActionProps, ColumnInfoState> {
    constructor() {
        super();
        this.state = { SelectedColumn: null, ShowSelector: true }

    }
    componentWillMount() {
        if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            this.setState({ SelectedColumn: this.props.Columns.find(c => c.ColumnId == this.props.PopupParams), ShowSelector: false })
        }
    }

    render() {
        let infoBody: any[] = ["Shows info about columns."]
        let cellInfo: [string, number][] = [["Function", 3], ["Summary", 6], ["", 3]];

        let customSortSummary = <CustomSortSummary SummarisedColumn={this.state.SelectedColumn} getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />
        let conditionalStyleSummary = <ConditionalStyleSummary SummarisedColumn={this.state.SelectedColumn} getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />
        let cellValidationSummary = <CellValidationSummary SummarisedColumn={this.state.SelectedColumn} getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />
        let userFilterSummary = <UserFilterSummary SummarisedColumn={this.state.SelectedColumn} getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />
        let plusMinusSummary = <PlusMinusSummary SummarisedColumn={this.state.SelectedColumn} getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />
        let formatColumnSummary = <FormatColumnSummary SummarisedColumn={this.state.SelectedColumn} getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />
        let flashingCellSummary = <FlashingCellSummary SummarisedColumn={this.state.SelectedColumn} />
        let calculatedColumnSummary = <CalculatedColumnSummary SummarisedColumn={this.state.SelectedColumn} />

        let selectedColumnId: string = (this.state.SelectedColumn) ? this.state.SelectedColumn.ColumnId : null
        let headerText = "Column Info" //+ (this.state.SelectedColumn) ?  this.state.SelectedColumn.FriendlyName : "";
        if (this.state.SelectedColumn) {
            headerText = headerText + ": " + this.state.SelectedColumn.FriendlyName;
        }
        return <PanelWithImage header={headerText} bsStyle="primary" style={panelStyle} glyphicon={StrategyConstants.ColumnInfoGlyph} infoBody={infoBody}>

            {this.state.ShowSelector &&
                <ColumnSelector SelectedColumnIds={[selectedColumnId]}
                    ColumnList={this.props.Columns}
                    onColumnChange={columns => this.onColumnSelectedChanged(columns)}
                    SelectionMode={SelectionMode.Single} />
            }

            {this.state.SelectedColumn &&
                <div style={divMarginStyle}>
                    <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
                    <ListGroup style={divStyle}>
                        {customSortSummary}
                        {conditionalStyleSummary}
                        {cellValidationSummary}
                        {userFilterSummary}
                        {plusMinusSummary}
                        {formatColumnSummary}
                        {this.state.SelectedColumn.DataType == DataType.Number &&
                            flashingCellSummary
                        }
                        {this.props.CalculatedColumns.findIndex(c => c.ColumnId == this.state.SelectedColumn.ColumnId) != -1 &&
                            calculatedColumnSummary
                        }


                    </ListGroup>
                </div>
            }
        </PanelWithImage>
    }

    private onColumnSelectedChanged(columns: IColumn[]) {
        this.setState({ SelectedColumn: columns.length > 0 ? columns[0] : null })
    }

}


function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Columns: state.Grid.Columns,
        CalculatedColumns: state.CalculatedColumn.CalculatedColumns
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
    };
}

export let ColumnInfoAction = connect(mapStateToProps, mapDispatchToProps)(ColumnInfoActionComponent);

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}

let panelStyle = {
    width: '800px'
}

let divMarginStyle = {
    marginTop: '10px'
}
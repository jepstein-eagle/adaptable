/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, FormGroup, Panel, ControlLabel, Row, Col, ButtonToolbar, OverlayTrigger, Tooltip, ListGroup, Well, Glyphicon } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as FilterRedux from '../../Redux/ActionsReducers/FilterRedux'
import * as StrategyIds from '../../Core/StrategyIds'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { Helper } from '../../Core/Helper';
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { INamedExpression } from '../../Core/interface/IExpression';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { PanelWithButton } from '../PanelWithButton';
import { EntityListActionButtons } from '../EntityListActionButtons';
import { ColumnType, ExpressionMode } from '../../Core/Enums'
import { IFilterStrategy } from '../../Core/Interface/IFilterStrategy';
import { IStrategy } from '../../Core/Interface/IStrategy';
import { FilterExpressionWizard } from './FilterExpressionWizard'
import { FilterSettingsWizard } from './FilterSettingsWizard'
import { StringExtensions } from '../../Core/Extensions';
import { PanelWithRow } from '../PanelWithRow';


interface FilterConfigProps extends IStrategyViewPopupProps<FilterConfigComponent> {
    Filters: INamedExpression[]
    Columns: IColumn[],
    onDeleteFilter: (Filter: INamedExpression) => FilterRedux.FilterDeleteAction
    onAddEditFilter: (Filter: INamedExpression) => FilterRedux.FilterAddOrUpdateAction
}

interface FilterConfigState {
    EditedFilter: INamedExpression
}

class FilterConfigComponent extends React.Component<FilterConfigProps, FilterConfigState> {

    constructor() {
        super();
        this.state = { EditedFilter: null }
    }

    render() {

        let selectedColumnId: string = "select";
        if (this.state.EditedFilter != null) {
            let editedFilterColumn: string = ExpressionHelper.GetColumnIdForNamedExpression(this.state.EditedFilter);
            if (StringExtensions.IsNotNullOrEmpty(editedFilterColumn)) {
                selectedColumnId = editedFilterColumn;
            }
        }

        let cellInfo: [string, number][] = [["Name", 4], ["Description", 4], ["Temp", 1], ["", 3]];

        let filterItems = this.props.Filters.filter(f => !f.IsPredefined).map((x) => {
            return <li
                className="list-group-item" key={x.Uid}>
                <Row >
                    <Col xs={4}>
                        {x.FriendlyName}
                    </Col>
                    <Col xs={4}>
                        {ExpressionHelper.ConvertExpressionToString(x.Expression, this.props.Columns, this.props.AdaptableBlotter)}
                    </Col>
                    <Col xs={1}>
                        <Button onClick={() => this.tempApplyFilter(x)}><Glyphicon glyph="edit" /></Button>
                    </Col>
                    <Col xs={3}>
                        <EntityListActionButtons
                            deleteClick={() => this.onDeleteFilter(x)}
                            editClick={() => this.onEditFilter(x)}>
                        </EntityListActionButtons>
                    </Col>
                </Row>
            </li>
        })

        return <PanelWithButton headerText="Filters Configuration" bsStyle="primary" style={panelStyle}
            buttonContent={"Create Filter"}
            buttonClick={() => this.onCreateFilter()}  >
            {filterItems.length > 0 &&
                <div>
                    <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
                    <ListGroup style={listGroupStyle}>
                        {filterItems}
                    </ListGroup>
                </div>
            }

            {filterItems.length == 0 &&
                <Well bsSize="small">Click 'Create Filter' to start creating column filters.</Well>
            }

            {this.state.EditedFilter != null &&
                <AdaptableWizard Steps={[
                    <FilterExpressionWizard
                        Blotter={this.props.AdaptableBlotter}
                        ColumnList={this.props.Columns}
                        ExpressionMode={ExpressionMode.SingleColumn}
                        SelectedColumnId={selectedColumnId} />,
                    <FilterSettingsWizard
                        Blotter={this.props.AdaptableBlotter}
                        Columns={this.props.Columns} />,
                ]}
                    Data={this.state.EditedFilter}
                    StepStartIndex={0}
                    onHide={() => this.closeWizard()}
                    onFinish={() => this.finishWizard()} ></AdaptableWizard>}
        </PanelWithButton>
    }

    onCreateFilter() {
        // have to use any as cannot cast from IStrategy to IFilterStrategy  :(
        let filterStrategy: any = this.props.AdaptableBlotter.Strategies.get(StrategyIds.FilterStrategyId);
        let emptyFilter: INamedExpression = filterStrategy.CreateEmptyFilter();
        this.setState({ EditedFilter: emptyFilter });
    }

    onEditFilter(filter: INamedExpression) {
        //we clone the condition as we do not want to mutate the redux state here....
        this.setState({ EditedFilter: Helper.cloneObject(filter) });
    }

    tempApplyFilter(filter: INamedExpression) {
        this.props.AdaptableBlotter.applyFilters();
    }

    onDeleteFilter(filter: INamedExpression) {
        this.props.onDeleteFilter(filter);
    }

    closeWizard() {
        this.setState({ EditedFilter: null, });
    }

    finishWizard() {
        this.props.onAddEditFilter(this.state.EditedFilter);
        this.setState({ EditedFilter: null });
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Filters: state.Filter.CreatedFilters,
        Columns: state.Grid.Columns
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onDeleteFilter: (Filter: INamedExpression) => dispatch(FilterRedux.DeleteFilter(Filter)),
        onAddEditFilter: (Filter: INamedExpression) => dispatch(FilterRedux.AddEditFilter(Filter))
    };
}

export let FilterConfig = connect(mapStateToProps, mapDispatchToProps)(FilterConfigComponent);

let listGroupStyle = {
    overflowY: 'auto',
    minHeight: '100px',
    maxHeight: '300px'
};

let panelStyle = {
    width: '800px'
}

var headerStyle: React.CSSProperties = {
    wordWrap: 'break-word',
    fontWeight: 'bold'
};

let panelHeaderStyle: React.CSSProperties = {
    marginBottom: '0px'
}
/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, FormGroup, Panel, ControlLabel, FormControl, Row, Col, ButtonToolbar, OverlayTrigger, Tooltip, Glyphicon, ListGroup, Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as FilterRedux from '../../Redux/ActionsReducers/FilterRedux'
import * as StrategyIds from '../../Core/StrategyIds'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { Expression } from '../../Core/Expression/Expression';
import { Helper } from '../../Core/Helper';
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { INamedExpression } from '../../Core/interface/IExpression';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { PanelWithButton } from '../PanelWithButton';
import { EntityListActionButtons } from '../EntityListActionButtons';
import { ColumnType } from '../../Core/Enums'
import { IFilterStrategy } from '../../Core/Interface/IFilterStrategy';
import { IStrategy } from '../../Core/Interface/IStrategy';
import { FilterExpressionWizard } from './FilterExpressionWizard'
import { FilterSettingsWizard } from './FilterSettingsWizard'

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

        let filtersHeader = <Panel style={panelHeaderStyle} >
            <Row >
                <Col xs={4} style={headerStyle}>Name</Col>
                <Col xs={5} style={headerStyle}>Expression</Col>
                <Col xs={3} style={headerStyle}></Col>
            </Row>
        </Panel>

        let filterItems = this.props.Filters.filter(f=>!f.IsPredefined).map((x) => {
            return <li
                className="list-group-item" key={x.Uid}>
                <Row >
                    <Col xs={4}>
                        {x.FriendlyName}
                    </Col>
                    <Col xs={5}>
                        {ExpressionHelper.ConvertExpressionToString(x.Expression, this.props.Columns, this.props.AdaptableBlotter)}
                    </Col>
                    <Col xs={3}>
                        <EntityListActionButtons
                            deleteClick={() => this.props.onDeleteFilter(x)}
                            editClick={() => this.onEdit( x)}>
                        </EntityListActionButtons>
                    </Col>
                </Row>
            </li>
        })

        return <PanelWithButton headerText="Filters Configuration" bsStyle="primary" style={panelStyle}
            buttonContent={"Create Filter"}
            buttonClick={() => this.createFilter()}  >
            {filterItems.length > 0 && filtersHeader}
            {filterItems.length > 0 &&
                <ListGroup style={listGroupStyle}>
                    {filterItems}
                </ListGroup>
            }

            {filterItems.length == 0 &&
                <Well bsSize="small">Click 'Create Filter' to start creating column filters.</Well>
            }

            {this.state.EditedFilter != null &&
                <AdaptableWizard Steps={[
                    <FilterExpressionWizard
                        Blotter={this.props.AdaptableBlotter}
                        ColumnList={this.props.Columns}
                        SelectedColumnId={null} />,
                    <FilterSettingsWizard
                    Blotter={this.props.AdaptableBlotter}
                        Columns={this.props.Columns}
                        />,
                ]}
                    Data={this.state.EditedFilter}
                    StepStartIndex={0}
                    onHide={() => this.closeWizard()}
                    onFinish={() => this.finishWizard()} ></AdaptableWizard>}
        </PanelWithButton>
    }

    createFilter() {
        // have to use any as cannot cast from IStrategy to IFilterStrategy  :(
        let filterStrategy: any = this.props.AdaptableBlotter.Strategies.get(StrategyIds.FilterStrategyId);
        let emptyFilter: INamedExpression = filterStrategy.CreateEmptyFilter();
        this.setState({ EditedFilter: emptyFilter });
    }

    onEdit(Filter: INamedExpression) {
        //we clone the condition as we do not want to mutate the redux state here....
        this.setState({ EditedFilter: Helper.cloneObject(Filter) });
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
        Filters: state.Filter.Filters,
        Columns: state.Grid.Columns
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onDeleteFilter: (Filter: INamedExpression) => dispatch(FilterRedux.DeleteFilter(Filter)),
        onAddEditFilter: (  Filter: INamedExpression) => dispatch(FilterRedux.AddEditFilter( Filter))
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
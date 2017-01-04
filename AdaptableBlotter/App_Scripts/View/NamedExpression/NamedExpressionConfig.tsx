/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, FormGroup, Panel, ControlLabel, Row, Col, ButtonToolbar, OverlayTrigger, Tooltip, ListGroup, Well, Glyphicon } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as NamedExpressionRedux from '../../Redux/ActionsReducers/NamedExpressionRedux'
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
import { INamedExpressionStrategy } from '../../Core/Interface/INamedExpressionStrategy';
import { IStrategy } from '../../Core/Interface/IStrategy';
import { NamedExpressionWizard } from './NamedExpressionWizard'
import { NamedExpressionSettingsWizard } from './NamedExpressionSettingsWizard'
import { StringExtensions } from '../../Core/Extensions';
import { PanelWithRow } from '../PanelWithRow';


interface NamedExpressionConfigProps extends IStrategyViewPopupProps<NamedExpressionConfigComponent> {
    NamedExpressions: INamedExpression[]
    Columns: IColumn[],
    onDeleteNamedExpression: (NamedExpression: INamedExpression) => NamedExpressionRedux.NamedExpressionDeleteAction
    onAddEditNamedExpression: (NamedExpression: INamedExpression) => NamedExpressionRedux.NamedExpressionAddOrUpdateAction
}

interface NamedExpressionConfigState {
    EditedNamedExpression: INamedExpression
}

class NamedExpressionConfigComponent extends React.Component<NamedExpressionConfigProps, NamedExpressionConfigState> {

    constructor() {
        super();
        this.state = { EditedNamedExpression: null }
    }

    render() {

        let selectedColumnId: string = "select";
        if (this.state.EditedNamedExpression != null) {
            let editedColumn: string = ExpressionHelper.GetColumnIdForNamedExpression(this.state.EditedNamedExpression);
            if (StringExtensions.IsNotNullOrEmpty(editedColumn)) {
                selectedColumnId = editedColumn;
            }
        }

        let cellInfo: [string, number][] = [["Name", 4], ["Description", 4], ["Temp", 1], ["", 3]];

        let namedExpressionItems = this.props.NamedExpressions.filter(f => !f.IsPredefined).map((x) => {
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
                        <Button onClick={() => this.tempApplyNamedExpression(x)}><Glyphicon glyph="edit" /></Button>
                    </Col>
                    <Col xs={3}>
                        <EntityListActionButtons
                            deleteClick={() => this.onDeleteNamedExpression(x)}
                            editClick={() => this.onEditNamedExpression(x)}>
                        </EntityListActionButtons>
                    </Col>
                </Row>
            </li>
        })

        return <PanelWithButton headerText="Column Filters Configuration" bsStyle="primary" style={panelStyle}
            buttonContent={"Create Column Filter"}
            buttonClick={() => this.onCreateNamedExpression()}  >
            {namedExpressionItems.length > 0 &&
                <div>
                    <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
                    <ListGroup style={listGroupStyle}>
                        {namedExpressionItems}
                    </ListGroup>
                </div>
            }

            {namedExpressionItems.length == 0 &&
                <Well bsSize="small">Click 'Create Column Filter' to start creating column filters.</Well>
            }

            {this.state.EditedNamedExpression != null &&
                <AdaptableWizard Steps={[
                    <NamedExpressionWizard
                        Blotter={this.props.AdaptableBlotter}
                        ColumnList={this.props.Columns}
                        ExpressionMode={ExpressionMode.SingleColumn}
                        SelectedColumnId={selectedColumnId} />,
                    <NamedExpressionSettingsWizard
                        Blotter={this.props.AdaptableBlotter}
                        Columns={this.props.Columns} />,
                ]}
                    Data={this.state.EditedNamedExpression}
                    StepStartIndex={0}
                    onHide={() => this.closeWizard()}
                    onFinish={() => this.finishWizard()} ></AdaptableWizard>}
        </PanelWithButton>
    }

    onCreateNamedExpression() {
        // have to use any as cannot cast from IStrategy to INamedExpressionStrategy  :(
        let namedExpressionStrategy: any = this.props.AdaptableBlotter.Strategies.get(StrategyIds.NamedExpressionStrategyId);
        let emptyFilter: INamedExpression = namedExpressionStrategy.CreateEmptyNamedExpression();
        this.setState({ EditedNamedExpression: emptyFilter });
    }

    onEditNamedExpression(namedExpression: INamedExpression) {
        //we clone the condition as we do not want to mutate the redux state here....
        this.setState({ EditedNamedExpression: Helper.cloneObject(namedExpression) });
    }

    tempApplyNamedExpression(namedExpression: INamedExpression) {
        this.props.AdaptableBlotter.applyFilters();
    }

    onDeleteNamedExpression(namedExpression: INamedExpression) {
        this.props.onDeleteNamedExpression(namedExpression);
    }

    closeWizard() {
        this.setState({ EditedNamedExpression: null, });
    }

    finishWizard() {
        this.props.onAddEditNamedExpression(this.state.EditedNamedExpression);
        this.setState({ EditedNamedExpression: null });
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        NamedExpressions: state.NamedExpression.NamedExpressions,
        Columns: state.Grid.Columns
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onDeleteNamedExpression: (NamedExpression: INamedExpression) => dispatch(NamedExpressionRedux.DeleteNamedExpression(NamedExpression)),
        onAddEditNamedExpression: (NamedExpression: INamedExpression) => dispatch(NamedExpressionRedux.AddEditNamedExpression(NamedExpression))
    };
}

export let NamedExpressionConfig = connect(mapStateToProps, mapDispatchToProps)(NamedExpressionConfigComponent);

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
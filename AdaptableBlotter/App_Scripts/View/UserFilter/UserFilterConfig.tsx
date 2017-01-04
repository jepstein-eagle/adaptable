/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, FormGroup, Panel, ControlLabel, Row, Col, ButtonToolbar, OverlayTrigger, Tooltip, ListGroup, Well, Glyphicon } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as UserFilterRedux from '../../Redux/ActionsReducers/UserFilterRedux'
import * as StrategyIds from '../../Core/StrategyIds'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { Helper } from '../../Core/Helper';
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { IUserFilterExpression } from '../../Core/interface/IExpression';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { PanelWithButton } from '../PanelWithButton';
import { EntityListActionButtons } from '../EntityListActionButtons';
import { ColumnType, ExpressionMode } from '../../Core/Enums'
import { IUserFilterStrategy } from '../../Core/Interface/IUserFilterStrategy';
import { IStrategy } from '../../Core/Interface/IStrategy';
import { UserFilterExpressionWizard } from './UserFilterExpressionWizard'
import { UserFilterSettingsWizard } from './UserFilterSettingsWizard'
import { StringExtensions } from '../../Core/Extensions';
import { PanelWithRow } from '../PanelWithRow';


interface UserFilterConfigProps extends IStrategyViewPopupProps<UserFilterConfigComponent> {
    UserFilterExpressions: IUserFilterExpression[]
    Columns: IColumn[],
    onDeleteUserFilterExpression: (UserFilterExpression: IUserFilterExpression) => UserFilterRedux.UserFilterDeleteAction
    onAddEditUserFilterExpression: (UserFilterExpression: IUserFilterExpression) => UserFilterRedux.UserFilterAddOrUpdateAction
}

interface UserFilterConfigState {
    EditedUserFilterExpression: IUserFilterExpression
}

class UserFilterConfigComponent extends React.Component<UserFilterConfigProps, UserFilterConfigState> {

    constructor() {
        super();
        this.state = { EditedUserFilterExpression: null }
    }

    render() {

        let selectedColumnId: string = "select";
        if (this.state.EditedUserFilterExpression != null) {
            let editedColumn: string = ExpressionHelper.GetColumnIdForUserFilterExpression(this.state.EditedUserFilterExpression);
            if (StringExtensions.IsNotNullOrEmpty(editedColumn)) {
                selectedColumnId = editedColumn;
            }
        }

        let cellInfo: [string, number][] = [["Name", 4], ["Description", 5], ["", 3]];

        let UserFilterExpressionItems = this.props.UserFilterExpressions.filter(f => !f.IsPredefined).map((x) => {
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
                            deleteClick={() => this.onDeleteUserFilterExpression(x)}
                            editClick={() => this.onEditUserFilterExpression(x)}>
                        </EntityListActionButtons>
                    </Col>
                </Row>
            </li>
        })

        return <PanelWithButton headerText="Column Filters Configuration" bsStyle="primary" style={panelStyle}
            buttonContent={"Create Column Filter"}
            buttonClick={() => this.onCreateUserFilterExpression()}  >
            {UserFilterExpressionItems.length > 0 &&
                <div>
                    <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
                    <ListGroup style={listGroupStyle}>
                        {UserFilterExpressionItems}
                    </ListGroup>
                </div>
            }

            {UserFilterExpressionItems.length == 0 &&
                <Well bsSize="small">Click 'Create Column Filter' to start creating column filters.</Well>
            }

            {this.state.EditedUserFilterExpression != null &&
                <AdaptableWizard Steps={[
                    <UserFilterExpressionWizard
                        Blotter={this.props.AdaptableBlotter}
                        ColumnList={this.props.Columns}
                        ExpressionMode={ExpressionMode.SingleColumn}
                        SelectedColumnId={selectedColumnId} />,
                    <UserFilterSettingsWizard
                        Blotter={this.props.AdaptableBlotter}
                        Columns={this.props.Columns} />,
                ]}
                    Data={this.state.EditedUserFilterExpression}
                    StepStartIndex={0}
                    onHide={() => this.closeWizard()}
                    onFinish={() => this.finishWizard()} ></AdaptableWizard>}
        </PanelWithButton>
    }

    onCreateUserFilterExpression() {
        // have to use any as cannot cast from IStrategy to IUserFilterExpressionStrategy  :(
        let UserFilterExpressionStrategy: any = this.props.AdaptableBlotter.Strategies.get(StrategyIds.UserFilterStrategyId);
        let emptyFilter: IUserFilterExpression = UserFilterExpressionStrategy.CreateEmptyUserFilterExpression();
        this.setState({ EditedUserFilterExpression: emptyFilter });
    }

    onEditUserFilterExpression(UserFilterExpression: IUserFilterExpression) {
        //we clone the condition as we do not want to mutate the redux state here....
        this.setState({ EditedUserFilterExpression: Helper.cloneObject(UserFilterExpression) });
    }

    onDeleteUserFilterExpression(UserFilterExpression: IUserFilterExpression) {
        this.props.onDeleteUserFilterExpression(UserFilterExpression);
    }

    closeWizard() {
        this.setState({ EditedUserFilterExpression: null, });
    }

    finishWizard() {
        this.props.onAddEditUserFilterExpression(this.state.EditedUserFilterExpression);
        this.setState({ EditedUserFilterExpression: null });
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        UserFilterExpressions: state.UserFilter.UserFilters,
        Columns: state.Grid.Columns
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onDeleteUserFilterExpression: (UserFilterExpression: IUserFilterExpression) => dispatch(UserFilterRedux.DeleteUserFilter(UserFilterExpression)),
        onAddEditUserFilterExpression: (UserFilterExpression: IUserFilterExpression) => dispatch(UserFilterRedux.AddEditUserFilter(UserFilterExpression))
    };
}

export let UserFilterConfig = connect(mapStateToProps, mapDispatchToProps)(UserFilterConfigComponent);

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
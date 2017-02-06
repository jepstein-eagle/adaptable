/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, Panel, ControlLabel, Row, Col, ButtonToolbar, ListGroup, Well, Glyphicon } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as UserFilterRedux from '../../Redux/ActionsReducers/UserFilterRedux'
import * as StrategyIds from '../../Core/StrategyIds'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { Helper } from '../../Core/Helper';
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { IUserFilter } from '../../Core/interface/IExpression';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { UserFilterHelper } from '../../Core/Services/UserFilterHelper';
import { PanelWithButton } from '../PanelWithButton';
import { EntityListActionButtons } from '../EntityListActionButtons';
import { ExpressionMode } from '../../Core/Enums'
import { IUserFilterStrategy } from '../../Core/Interface/IUserFilterStrategy';
import { UserFilterExpressionWizard } from './UserFilterExpressionWizard'
import { UserFilterSettingsWizard } from './UserFilterSettingsWizard'
import { StringExtensions } from '../../Core/Extensions';
import { PanelWithRow } from '../PanelWithRow';


interface UserFilterConfigProps extends IStrategyViewPopupProps<UserFilterConfigComponent> {
    UserFilters: IUserFilter[]
    Columns: IColumn[],
    onDeleteUserFilter: (userFilter: IUserFilter) => UserFilterRedux.UserFilterDeleteAction
    onAddEditUserFilter: (userFilter: IUserFilter) => UserFilterRedux.UserFilterAddOrUpdateAction
}

interface UserFilterConfigState {
    EditedUserFilter: IUserFilter
}

class UserFilterConfigComponent extends React.Component<UserFilterConfigProps, UserFilterConfigState> {

    constructor() {
        super();
        this.state = { EditedUserFilter: null }
    }

    render() {

        let selectedColumnId: string = "select";
        if (this.state.EditedUserFilter != null) {
            let editedColumn: string = UserFilterHelper.GetColumnIdForUserFilter(this.state.EditedUserFilter);
            if (StringExtensions.IsNotNullOrEmpty(editedColumn)) {
                selectedColumnId = editedColumn;
            }
        }

        let cellInfo: [string, number][] = [["Name", 4], ["Description", 5], ["", 3]];

        let UserFilterItems = this.props.UserFilters.filter(f => !f.IsPredefined).map((x) => {
            return <li
                className="list-group-item" key={x.Uid}>
                <Row >
                    <Col xs={4}>
                        {x.FriendlyName}
                    </Col>
                    <Col xs={5}>
                        {ExpressionHelper.ConvertExpressionToString(x.Expression, this.props.Columns, this.props.UserFilters)}
                    </Col>
                    <Col xs={3}>
                        <EntityListActionButtons
                            deleteClick={() => this.onDeleteUserFilter(x)}
                            editClick={() => this.onEditUserFilter(x)}>
                        </EntityListActionButtons>
                    </Col>
                </Row>
            </li>
        })

        return <PanelWithButton headerText="User Filters Configuration" bsStyle="primary" style={panelStyle}
            buttonContent={"Create User Filter"}
            buttonClick={() => this.onCreateUserFilter()} glyphicon={"filter"}>
            {UserFilterItems.length > 0 &&
                <div>
                    <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
                    <ListGroup style={listGroupStyle}>
                        {UserFilterItems}
                    </ListGroup>
                </div>
            }

            {UserFilterItems.length == 0 &&
                <Well bsSize="small">Click 'Create User Filter' to start creating user filters.<p />
                    User filters are accessible when filtering columns or creating an expression (e.g. Advanced Search, Plus / Minus, Conditional Style etc).</Well>
            }

            {this.state.EditedUserFilter != null &&
                <AdaptableWizard Steps={[
                    <UserFilterExpressionWizard
                        UserFilters={this.props.UserFilters}
                        ColumnList={this.props.Columns}
                        ExpressionMode={ExpressionMode.SingleColumn}
                        SelectedColumnId={selectedColumnId}
                        getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />,
                    <UserFilterSettingsWizard
                        UserFilters={this.props.UserFilters}
                        Columns={this.props.Columns} />,
                ]}
                    Data={this.state.EditedUserFilter}
                    StepStartIndex={0}
                    onHide={() => this.closeWizard()}
                    onFinish={() => this.finishWizard()} ></AdaptableWizard>}
        </PanelWithButton>
    }

    onCreateUserFilter() {
        let userFilterStrategy: IUserFilterStrategy = this.props.AdaptableBlotter.Strategies.get(StrategyIds.UserFilterStrategyId) as IUserFilterStrategy;
        let emptyFilter: IUserFilter = userFilterStrategy.CreateEmptyUserFilter();
        this.setState({ EditedUserFilter: emptyFilter });
    }

    onEditUserFilter(userFilter: IUserFilter) {
        //we clone the condition as we do not want to mutate the redux state here....
        this.setState({ EditedUserFilter: Helper.cloneObject(userFilter) });
    }

    onDeleteUserFilter(userFilter: IUserFilter) {
        this.props.onDeleteUserFilter(userFilter);
    }

    closeWizard() {
        this.setState({ EditedUserFilter: null, });
    }

    finishWizard() {
        this.props.onAddEditUserFilter(this.state.EditedUserFilter);
        this.setState({ EditedUserFilter: null });
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        UserFilters: state.UserFilter.UserFilters,
        Columns: state.Grid.Columns,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onDeleteUserFilter: (userFilter: IUserFilter) => dispatch(UserFilterRedux.DeleteUserFilter(userFilter)),
        onAddEditUserFilter: (userFilter: IUserFilter) => dispatch(UserFilterRedux.AddEditUserFilter(userFilter))
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

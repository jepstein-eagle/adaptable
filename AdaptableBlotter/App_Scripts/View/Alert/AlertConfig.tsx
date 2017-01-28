/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, Panel, ControlLabel, Row, Col, ButtonToolbar, Glyphicon, ListGroup, Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as AlertRedux from '../../Redux/ActionsReducers/AlertRedux'
import * as StrategyIds from '../../Core/StrategyIds'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { Expression } from '../../Core/Expression/Expression';
import { Helper } from '../../Core/Helper';
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { AlertSelectAlertTypeWizard } from './AlertSelectAlertTypeWizard'
import { AlertSettingsWizard } from './AlertSettingsWizard'
import { AlertActionWizard } from './AlertActionWizard'
import { AlertContentsWizard } from './AlertContentsWizard'
import { IAlert, IAlertCommunicationInfo } from '../../Core/Interface/IAlertStrategy'
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { PanelWithButton } from '../PanelWithButton';
import { EntityListActionButtons } from '../EntityListActionButtons';
import { NotificationType, CellChangeType, PopupType } from '../../Core/Enums'
import { IAlertStrategy } from '../../Core/Interface/IAlertStrategy';
import { IStrategy } from '../../Core/Interface/IStrategy';
import { PanelWithRow } from '../PanelWithRow';


interface AlertConfigProps extends IStrategyViewPopupProps<AlertConfigComponent> {
    AlertConditions: IAlert[]
    Columns: IColumn[],
    onDeleteAlert: (Index: number) => AlertRedux.AlertDeleteAction
    onAddEditAlert: (Index: number, Alert: IAlert) => AlertRedux.AlertAddOrUpdateAction
}

interface AlertConfigState {
    EditedAlert: IAlert
    EditedIndexAlert: number
}

class AlertConfigComponent extends React.Component<AlertConfigProps, AlertConfigState> {

    constructor() {
        super();
        this.state = { EditedAlert: null, EditedIndexAlert: -1 }
    }
    render() {

        let cellInfo: [string, number][] = [["Alert Condition", 6], ["Email", 2], ["Popup", 2], ["", 2]];

        let alertItems = this.props.AlertConditions.map((x, index) => {
            return <li
                className="list-group-item" key={index}>
                <Row >
                    <Col xs={6}>
                        {this.createAlertDescription(x)}
                    </Col>
                    <Col xs={2}>
                        {x.AlertCommunicationInfo.SendEmail ? <Glyphicon glyph="ok" /> : <Glyphicon glyph="remove" />}
                    </Col>
                    <Col xs={2}>
                        {x.AlertCommunicationInfo.ShowPopup ? <Glyphicon glyph="ok" /> : <Glyphicon glyph="remove" />}
                    </Col>
                    <Col xs={2}>
                        <EntityListActionButtons
                            deleteClick={() => this.props.onDeleteAlert(index)}
                            editClick={() => this.onEdit(index, x)}>
                        </EntityListActionButtons>
                    </Col>
                </Row>
            </li>
        })
        return <PanelWithButton headerText="Alerts Configuration" bsStyle="primary" style={panelStyle}
            buttonContent={"Create Alert"}
            buttonClick={() => this.createAlert()}  >
            {alertItems.length > 0 &&
                <div>
                    <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
                    <ListGroup style={listGroupStyle}>
                        {alertItems}
                    </ListGroup>
                </div>
            }

            {alertItems.length == 0 &&
                <Well bsSize="small">Click 'Create Alert' to start creating alerts.</Well>
            }

            {this.state.EditedAlert != null &&
                <AdaptableWizard Steps={[
                    <AlertSelectAlertTypeWizard Blotter={this.props.AdaptableBlotter} Alerts={this.props.AlertConditions} />,
                    <AlertSettingsWizard Columns={this.props.Columns} Blotter={this.props.AdaptableBlotter} />,
                    <AlertActionWizard Blotter={this.props.AdaptableBlotter} />,
                    <AlertContentsWizard Blotter={this.props.AdaptableBlotter} />,
                ]}
                    Data={this.state.EditedAlert}
                    StepStartIndex={0}
                    onHide={() => this.closeWizard()}
                    onFinish={() => this.finishWizard()} ></AdaptableWizard>}

        </PanelWithButton>
    }

    createAlert() {
        let alertStrategy: IAlertStrategy = this.props.AdaptableBlotter.Strategies.get(StrategyIds.AlertStrategyId) as IAlertStrategy;
        this.setState({ EditedAlert: alertStrategy.CreateEmptyAlert(), EditedIndexAlert: -1 });
    }

    onEdit(index: number, alert: IAlert) {
        //we clone the condition as we do not want to mutate the redux state here....
        this.setState({ EditedAlert: Helper.cloneObject(alert), EditedIndexAlert: index });
    }

    closeWizard() {
        this.setState({ EditedAlert: null, EditedIndexAlert: -1 });
    }

    finishWizard() {
        this.props.onAddEditAlert(this.state.EditedIndexAlert, this.state.EditedAlert);
        this.setState({ EditedAlert: null, EditedIndexAlert: -1 });
    }

    createAlertDescription(alert: IAlert): string {

        // first get where it runs
        if (alert.NotificationType == NotificationType.FunctionExecuted) {
            return "Any function is executed"
        }

        if (alert.NotificationType == NotificationType.UserDataEdited) {
            return "Any piece of user data is edited"
        }

        // now dealing with updated / edited - need scope, action and value description
        let scope: string = this.props.Columns.find(c => c.ColumnId == alert.CellChangeRule.ColumnId).FriendlyName;

        let action: string = (alert.NotificationType == NotificationType.CellEdited) ? "edited" : "updated";

        let valueDescription: string = "";

        if (alert.CellChangeRule.CellChangeType != CellChangeType.Any) {
            switch (alert.CellChangeRule.CellChangeType) {
                case CellChangeType.Equals:
                    valueDescription = " and new value = ";
                    break;
                case CellChangeType.NotEquals:
                    valueDescription = " and new value <> ";
                    break;
                case CellChangeType.GreaterThan:
                    valueDescription = " and new value > ";
                    break;
                case CellChangeType.LessThan:
                    valueDescription = " and new value < ";
                    break;
                case CellChangeType.ValueChange:
                    valueDescription = " and change in value at least ";
                    break;
                case CellChangeType.PercentChange:
                    valueDescription = " and % change is at least ";
                    break;
            }
            valueDescription = valueDescription + alert.CellChangeRule.ChangeValue;
        } else {
            valueDescription = " with any change"
        }
        return "'" + scope + "' column is " + action + valueDescription;
    }


}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        AlertConditions: state.Alert.Alerts,
        Columns: state.Grid.Columns
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onDeleteAlert: (Index: number) => dispatch(AlertRedux.DeleteAlert(Index)),
        onAddEditAlert: (Index: number, Alert: IAlert) => dispatch(AlertRedux.AddEditAlert(Index, Alert))
    };
}

export let AlertConfig = connect(mapStateToProps, mapDispatchToProps)(AlertConfigComponent);

let listGroupStyle = {
    overflowY: 'auto',
    minHeight: '100px',
    maxHeight: '300px'
};

let panelStyle = {
    width: '800px'
}

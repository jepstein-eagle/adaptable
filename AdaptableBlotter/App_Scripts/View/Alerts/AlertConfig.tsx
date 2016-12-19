/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, FormGroup, Panel, ControlLabel, FormControl, Row, Col, ButtonToolbar, OverlayTrigger, Tooltip, Glyphicon, ListGroup } from 'react-bootstrap';

import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as AlertRedux from '../../Redux/ActionsReducers/AlertRedux'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { Expression } from '../../Core/Expression/Expression';
import { Helper } from '../../Core/Helper';
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { AlertSelectAlertTypeWizard } from './AlertSelectAlertTypeWizard'
import { AlertSettingsWizard } from './AlertSettingsWizard'
import { AlertActionWizard } from './AlertActionWizard'
import { IAlert, ICellChangeRule, IAlertEmailInfo, IAlertPopupInfo} from '../../Core/Interface/IAlertStrategy'
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { PanelWithButton } from '../PanelWithButton';
import { EntityListActionButtons } from '../EntityListActionButtons';
import { NotificationType, CellChangeType, PopupType } from '../../Core/Enums'




interface AlertConfigProps extends IStrategyViewPopupProps<AlertConfigComponent> {
    AlertConditions: IAlert[]
    Columns: IColumn[],
    onDeleteAlert: (Index: number) => AlertRedux.AlertDeleteAction
    onAddEditAlert: (Index: number, ColumnsDefaultNudge: IAlert) => AlertRedux.AlertAddOrUpdateAction
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
        let alertsHeader = <Panel style={panelHeaderStyle} >
            <Row >
                <Col xs={6} style={headerStyle}>When Run</Col>
                <Col xs={2} style={headerStyle}>Email</Col>
                <Col xs={2} style={headerStyle}>Popup</Col>
                <Col xs={2} style={headerStyle}></Col>
            </Row>
        </Panel>

        let alertItems = this.props.AlertConditions.map((x, index) => {
            return <li
                className="list-group-item" key={index}>
                <Row >
                    <Col xs={6}>
                        {this.createAlertDescription(x) }
                    </Col>
                    <Col xs={2}>
                        {x.AlertEmailInfo.SendEmail ? <Glyphicon glyph="ok" /> : <Glyphicon glyph="remove" />}
                    </Col>
                    <Col xs={2}>
                        {x.AlertPopupInfo.ShowPopup ? <Glyphicon glyph="ok" /> : <Glyphicon glyph="remove" />}
                    </Col>
                    <Col xs={2}>
                        <EntityListActionButtons
                            deleteClick={() => this.props.onDeleteAlert(index) }
                            editClick={() => this.onEdit(index, x) }>
                        </EntityListActionButtons>
                    </Col>
                </Row>
            </li>
        })
        return <PanelWithButton headerText="Alerts Configuration" bsStyle="primary" style={panelStyle}
            buttonContent={"Create Alert"}
            buttonClick={() => this.createAlert() }  >
            {alertItems.length > 0 && alertsHeader}
            <ListGroup style={panelColumNudge}>
                {alertItems}
            </ListGroup>

            {this.state.EditedAlert != null &&
                <AdaptableWizard Steps={[
                    <AlertSelectAlertTypeWizard Blotter={this.props.AdaptableBlotter} />,
                    <AlertSettingsWizard Columns={this.props.Columns} Blotter={this.props.AdaptableBlotter} />,
                    <AlertActionWizard Blotter={this.props.AdaptableBlotter} />,
                ]}
                    Data={this.state.EditedAlert}
                    StepStartIndex={0}
                    onHide={() => this.closeWizard() }
                    onFinish={() => this.WizardFinish() } ></AdaptableWizard>}

        </PanelWithButton>
    }

    createAlert() {
        let newCellChangeRule: ICellChangeRule = {
            ColumnId: "select",
            ChangeValue: null,
            CellChangeType: CellChangeType.Any
        }

        let emailInfo: IAlertEmailInfo = {
            SendEmail: true,
            EmailRecipients: ""
        }

        let popupInfo: IAlertPopupInfo = {
            ShowPopup: false,
            PopupType: PopupType.DisappearAutomatically
        }

        let _editedAlert: IAlert = {
            NotificationType: NotificationType.CellUpdated,
            AlertEmailInfo: emailInfo,
            AlertPopupInfo: popupInfo,
            AlertText: "",
            CellChangeRule: newCellChangeRule,
        }
        this.setState({ EditedAlert: _editedAlert, EditedIndexAlert: -1 });
    }

    onEdit(index: number, alert: IAlert) {
        //we clone the condition as we do not want to mutate the redux state here....
        this.setState({ EditedAlert: Helper.cloneObject(alert), EditedIndexAlert: index });
    }

    closeWizard() {
        this.setState({ EditedAlert: null, EditedIndexAlert: -1 });
    }

    WizardFinish() {
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
        let scope: string = this.props.Columns.find(c => c.ColumnId == alert.CellChangeRule.ColumnId).ColumnFriendlyName;

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
            valueDescription = " for any value change"
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

let panelColumNudge = {
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
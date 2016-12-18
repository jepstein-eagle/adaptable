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
//import { AlertExpressionWizard } from './AlertExpressionWizard'
import { IAlert, INotification, NotificationCellUpdated } from '../../Core/Interface/IAlertStrategy'
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { PanelWithButton } from '../PanelWithButton';
import { EntityListActionButtons } from '../EntityListActionButtons';

interface AlertConfigProps extends IStrategyViewPopupProps<AlertConfigComponent> {
    AlertConditions: IAlert[]
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
                <Col xs={4} style={headerStyle}>Where</Col>
                <Col xs={4} style={headerStyle}>Details</Col>
                <Col xs={1} style={headerStyle}>Email</Col>
                <Col xs={1} style={headerStyle}>Popup</Col>
                <Col xs={2} style={headerStyle}></Col>
            </Row>
        </Panel>

        let alertItems = this.props.AlertConditions.map((x, index) => {
            return <li
                className="list-group-item" key={index}>
                <Row >
                     <Col xs={4}>
                       {x.Notification.WhereApplied()}
                    </Col> 
                    <Col xs={4}>
                        {x.Notification.WhenApplied()}
                    </Col> 
                    <Col xs={1}>
                        {x.SendEmail? <Glyphicon glyph="ok" />:  <Glyphicon glyph="remove" />}
                    </Col>
                     <Col xs={1}>
                        {x.ShowPopup? <Glyphicon glyph="ok" />:  <Glyphicon glyph="remove" />}
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
            {alertItems.length > 0 && alertsHeader}
            <ListGroup style={panelColumNudge}>
                {alertItems}
            </ListGroup>

{this.state.EditedAlert != null &&
                <AdaptableWizard Steps={[
                    <AlertSelectAlertTypeWizard Blotter={this.props.AdaptableBlotter} />,
                ]}
                    Data={this.state.EditedAlert}
                    StepStartIndex={0}
                    onHide={() => this.closeWizard()}
                    onFinish={() => this.WizardFinish()} ></AdaptableWizard>}

        </PanelWithButton>
    }

    createAlert() {
        let _editedAlert: IAlert = {
            Notification: new NotificationCellUpdated(),
            SendEmail: false,
            ShowPopup: false,
            AlertText: ""
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
           // this.props.onAddEditAlert(this.state.EditedIndexAlert, this.state.EditedAlert);
            this.setState({ EditedAlert: null, EditedIndexAlert: -1 });
        }



}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        AlertConditions: state.Alert.Alerts,
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
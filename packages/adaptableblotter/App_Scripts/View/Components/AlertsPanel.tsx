import * as React from "react";
import { Glyphicon, Label, ListGroupItem, ListGroup, InputGroup } from "react-bootstrap";
import * as StyleConstants from '../../Core/Constants/StyleConstants';
import { IAlert } from "../../Core/Interface/IMessage";
import { UIHelper } from "../UIHelper";
import { ButtonClear } from "./Buttons/ButtonClear";
import { ButtonPreviewDelete } from "./Buttons/ButtonPreviewDelete";
import { PanelWithButton } from "./Panels/PanelWithButton";
import { AccessLevel } from "../../Core/Enums";

export interface AlertsPanelProps extends React.ClassAttributes<AlertsPanel> {
    Alerts: IAlert[];
    ShowPanel: boolean
    cssClassName: string
    ShowHeader: boolean
    onClearAlert: (index: number) => void;
    onClearAllAlerts: () => void;
    onRender: () => void;
}

export class AlertsPanel extends React.Component<AlertsPanelProps, {}> {
    componentWillUnmount() {
        this.props.onRender();
    }

    render(): any {
        let cssClassName: string = this.props.cssClassName + StyleConstants.ALERTS
        let panelHeader: string = this.props.ShowHeader && this.props.Alerts != null ? "Alerts: " : "";

        let alerts = this.props.Alerts.map((alert: IAlert, index: number) => {

            let alertText = <div style={{ maxWidth: "600px" }}>
                <div>
                    <InputGroup>
                        <span>
                            <Label bsSize="xsmall" bsStyle={UIHelper.getStyleNameByMessageType(alert.MessageType)} className="ab_medium_padding">
                                <Glyphicon glyph={UIHelper.getGlyphByMessageType(alert.MessageType)} />
                            </Label>
                            {' '}
                            <b>{alert.Header}</b>
                        </span>
                        <InputGroup.Button>
                            <ButtonPreviewDelete cssClassName={this.props.cssClassName}
                                onClick={() => this.props.onClearAlert(index)}
                                overrideTooltip="Clear Alert"
                                bsStyle={"default"}
                                DisplayMode="Glyph"
                                size={"xsmall"}
                                overrideDisableButton={false}
                                style={{ float: 'left' }}
                                AccessLevel={AccessLevel.Full}
                            />
                        </InputGroup.Button>
                    </InputGroup>
                </div>
                <div>
                    <span style={{ fontSize: "xsmall" }}>{alert.Msg}</span>
                </div>


            </div>

            return <ListGroupItem key={index}>
                {alertText}
            </ListGroupItem>

        });

        let clearAllButton = <ButtonClear cssClassName={this.props.cssClassName + " pull-right "} onClick={() => this.props.onClearAllAlerts()}
            bsStyle={"default"}
            style={{ margin: "5px" }}
            size={"xsmall"}
            overrideText={"Clear All"}
            DisplayMode="Text"
            hideToolTip={true}
            AccessLevel={AccessLevel.Full}
        />


        return <PanelWithButton cssClassName={cssClassName} headerText={"Alerts"} className="ab_no-padding-except-top-panel ab_small-padding-panel" bsStyle="default" button={clearAllButton} >

            <ListGroup style={{ overflowY: "hidden" }}>
                {alerts}
            </ListGroup>
        </PanelWithButton>
    }

}



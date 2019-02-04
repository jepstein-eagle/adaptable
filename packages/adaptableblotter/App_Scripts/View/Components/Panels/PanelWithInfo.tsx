import * as React from "react";
import { PanelProps, Panel, Row, Col } from 'react-bootstrap';
import { AdaptablePopover } from '../../AdaptablePopover';
import { MessageType } from '../../../Utilities/Enums';
import { AdaptableBlotterForm } from "../Forms/AdaptableBlotterForm";
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';

export interface PanelWithInfoProps extends PanelProps {
    infoBody: any[]
    cssClassName: string
}

export class PanelWithInfo extends React.Component<PanelWithInfoProps, {}> {
    render() {
        let className = "panel-with-info"
        if (this.props.className) {
            className += " " + this.props.className
        }

        let headerRow = <AdaptableBlotterForm inline>
            <Row style={{ display: "flex", alignItems: "center" }}>
                <Col xs={12}>
                    {this.props.header}
                    <span>
                        {' '}
                        <AdaptablePopover  cssClassName={this.props.cssClassName} headerText="" bodyText={this.props.infoBody} />
                    </span>

                </Col>
            </Row>
        </AdaptableBlotterForm>;
        return <Panel header={headerRow} className={className} style={this.props.style} bsSize={this.props.bsSize} bsStyle={this.props.bsStyle}>
            {this.props.children}
        </Panel>;
    }
}


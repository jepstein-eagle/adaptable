import * as React from "react";
import { PanelProps, Panel, Row, Col, Glyphicon } from 'react-bootstrap';
import { AdaptablePopover } from '../../AdaptablePopover';
import { PopoverType } from '../../../Core/Enums';
import { AdaptableBlotterForm } from "../Forms/AdaptableBlotterForm";
import * as StyleConstants from '../../../Core/Constants/StyleConstants';

export interface PanelWithImageProps extends PanelProps {
    glyphicon?: string
    infoBody?: any[]
    cssClassName: string
}


//We cannot destructure this.props using the react way in typescript which is a real pain as you 
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class PanelWithImage extends React.Component<PanelWithImageProps, {}> {
    render() {
        let cssClassName = this.props.cssClassName + StyleConstants.PANEL_WITH_IMAGE
        
        let headerRow = <AdaptableBlotterForm inline>
            <Row style={{ display: "flex", alignItems: "center" }}>
                <Col xs={12}>
                    {<Glyphicon glyph={this.props.glyphicon} className="ab_large_right_margin_style" />}
                    {this.props.header}
                    {' '}
                    {this.props.infoBody != null &&
                        <span>
                            <label>{' '}</label>
                            <span>  {' '} <AdaptablePopover  cssClassName={cssClassName} headerText="" bodyText={this.props.infoBody} popoverType={PopoverType.Info} /></span>
                        </span>
                    }
                </Col>
            </Row>
        </AdaptableBlotterForm>;
        return <Panel header={headerRow} className={cssClassName} style={this.props.style} bsStyle={this.props.bsStyle}>
            {this.props.children}
        </Panel>;
    }

}

import * as React from "react";
import { PanelProps, Panel, Row, Col, Button, Glyphicon, Radio } from 'react-bootstrap';
import { AdaptablePopover } from '../../AdaptablePopover';
import { MessageType, ContextMenuTab } from '../../../Utilities/Enums';
import { AdaptableBlotterForm } from "../Forms/AdaptableBlotterForm";
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';


export interface PanelWithImageThreeButtonsProps extends PanelProps {

    firstButtonContent?: React.ReactNode;
    firstButton?: React.ReactElement<any>;

    secondButtonContent?: React.ReactNode;
    secondButton?: React.ReactElement<any>;

    thirdButtonContent?: React.ReactNode;
    thirdButton?: React.ReactElement<any>;

    glyphicon?: string
    infoBody?: any[]
    cssClassName: string


}

//We cannot destructure this.props using the react way in typescript which is a real pain as you 
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class PanelWithImageThreeButtons extends React.Component<PanelWithImageThreeButtonsProps, {}> {
    render() {
        let cssClassName = this.props.cssClassName + StyleConstants.ITEMS_PANEL

        let className = "ab_panel-with-button"
        if (this.props.className) {
            className += " " + this.props.className
        }
        className += " " + "ab_panel-with-button-reduce-header-padding"
        let header =             <Row style={{ display: "flex", alignItems: "center" }}>

                <Col xs={4}>
                    {<Glyphicon glyph={this.props.glyphicon} className="ab_large_right_margin_style" />}
                    {this.props.header}
                    {' '}
                    {this.props.infoBody != null &&
                        <span>
                            <label>{' '}</label>
                            <span>  {' '} <AdaptablePopover cssClassName={cssClassName} headerText="" bodyText={this.props.infoBody} /></span>
                        </span>
                    }
                </Col>

                <Col xs={8}>
                    {this.props.secondButton && React.cloneElement(this.props.secondButton, { style: { float: 'right' } })}
                    {this.props.thirdButton && React.cloneElement(this.props.thirdButton, { style: { float: 'right' } })}
                    {this.props.firstButton && React.cloneElement(this.props.firstButton, { style: { float: 'right', marginRight: '20px' } })}
                    </Col>
            </Row>
        return             <Panel header={header} className={className} style={this.props.style} bsStyle={this.props.bsStyle} >
                {this.props.children}
            </Panel>
     }


}



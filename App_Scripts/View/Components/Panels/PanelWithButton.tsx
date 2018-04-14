import * as React from "react";
import { PanelProps, Panel, Row, Col, Button, Glyphicon } from 'react-bootstrap';
import { AdaptablePopover } from './../../AdaptablePopover';
import { PopoverType } from '../../../Core/Enums';
import { AdaptableBlotterForm } from "../Forms/AdaptableBlotterForm";

export interface PanelWithButtonProps extends PanelProps {
    //use either button content + buttonClick OR button
    buttonContent?: React.ReactNode;
    buttonClick?: () => void;
    button?: React.ReactElement<any>;
    headerText: string
    glyphicon?: string
    buttonDisabled?: boolean
    buttonStyle?: string
    infoBody?: any[]
}

//We cannot destructure this.props using the react way in typescript which is a real pain as you 
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class PanelWithButton extends React.Component<PanelWithButtonProps, {}> {
    render() {
        let { buttonContent } = this.props
        let className = "panel-with-button"
        if (this.props.className) {
            className += " " + this.props.className
        }
        if (buttonContent || this.props.button) {
            className += " " + "panel-with-button-reduce-header-padding"
        }
        let buttonStyle: string = (this.props.buttonStyle) ? this.props.buttonStyle : "default"


        let header = <AdaptableBlotterForm inline>
            <Row style={{ display: "flex", alignItems: "center" }}>

                <Col xs={9}>
                    {this.props.glyphicon != null &&
                        <Glyphicon glyph={this.props.glyphicon} className="large_right_margin_style" />
                    }
                    {this.props.headerText}
                    {' '}
                    {this.props.infoBody != null &&
                      <span> 
                         <label>{' '}</label>
                        <span>  {' '} <AdaptablePopover headerText="" bodyText={this.props.infoBody} popoverType={PopoverType.Info} /></span>
                 </span>
                    }

                </Col>
                <Col xs={3}>
                    {buttonContent &&
                        <Button bsSize="small" bsStyle={buttonStyle} disabled={this.props.buttonDisabled} onClick={() => this.props.buttonClick()} style={{ float: 'right' }}>
                            {buttonContent}
                        </Button>
                    }
                    {this.props.button && React.cloneElement(this.props.button, { style: { float: 'right' } })}
                </Col>
            </Row>
        </AdaptableBlotterForm>;
        return <Panel header={header} className={className} style={this.props.style} bsStyle={this.props.bsStyle} >
            {this.props.children}
        </Panel>;
    }
}



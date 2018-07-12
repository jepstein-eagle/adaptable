import * as React from "react";
import { PanelProps, Panel, Row, Col, Button, Glyphicon } from 'react-bootstrap';
import { AdaptablePopover } from '../../AdaptablePopover';
import { PopoverType } from '../../../Core/Enums';
import { AdaptableBlotterForm } from "../Forms/AdaptableBlotterForm";
import * as StyleConstants from '../../../Core/Constants/StyleConstants';


export interface PanelWithTwoButtonsProps extends PanelProps {
    //use either button content + buttonClick OR button
    buttonOneContent?: React.ReactNode;
   
    buttonOneClick?: () => void;
    buttonOne?: React.ReactElement<any>;
    buttonOneDisabled?: boolean
    buttonOneStyle?: string

    buttonTwoContent?: React.ReactNode;
     buttonTwoClick?: () => void;
    buttonTwo?: React.ReactElement<any>;
    buttonTwoDisabled?: boolean
    buttonTwoStyle?: string
  
    headerText: string
    glyphicon?: string
    infoBody?: any[]
    cssClassName: string
}

//We cannot destructure this.props using the react way in typescript which is a real pain as you 
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class PanelWithTwoButtons extends React.Component<PanelWithTwoButtonsProps, {}> {
    render() {
        let cssClassName = this.props.cssClassName +  StyleConstants.ITEMS_PANEL
       
        let { buttonOneContent } = this.props
        let { buttonTwoContent } = this.props
        let className = "ab_panel-with-button"
        if (this.props.className) {
            className += " " + this.props.className
        }
        if (buttonOneContent || this.props.buttonOne || this.props.buttonTwo) {
            className += " " + "ab_panel-with-button-reduce-header-padding"
        }
        let buttonOneStyle: string = (this.props.buttonOneStyle) ? this.props.buttonOneStyle : "default"
        let buttonTwoStyle: string = (this.props.buttonTwoStyle) ? this.props.buttonTwoStyle : "default"


        let header = <AdaptableBlotterForm inline>
            <Row style={{ display: "flex", alignItems: "center" }}>

                <Col xs={8}>
                    {this.props.glyphicon != null &&
                        <Glyphicon glyph={this.props.glyphicon} className="ab_large_right_margin_style" />
                    }
                    {this.props.headerText}
                    {' '}
                    {this.props.infoBody != null &&
                        <span>
                            <label>{' '}</label>
                            <span>  {' '} <AdaptablePopover cssClassName={this.props.cssClassName} headerText="" bodyText={this.props.infoBody} popoverType={PopoverType.Info} /></span>
                        </span>
                    }

                </Col>
                <Col xs={2}>
                    {buttonOneContent &&
                        <Button bsSize="small" bsStyle={buttonOneStyle} disabled={this.props.buttonOneDisabled} onClick={() => this.props.buttonOneClick()} style={{ float: 'right' }}>
                            {buttonOneContent}
                        </Button>
                    }
                    {this.props.buttonOne && React.cloneElement(this.props.buttonOne, { style: { float: 'right' } })}
                </Col>
                <Col xs={2}>
                    {buttonTwoContent &&
                        <Button bsSize="small" bsStyle={buttonTwoStyle} disabled={this.props.buttonTwoDisabled} onClick={() => this.props.buttonTwoClick()} style={{ float: 'right' }}>
                            {buttonTwoContent}
                        </Button>
                    }
                    {this.props.buttonTwo && React.cloneElement(this.props.buttonTwo, { style: { float: 'right' } })}
                </Col>
            </Row>
        </AdaptableBlotterForm>;
        return <div className={cssClassName}>
            <Panel header={header} className={className} style={this.props.style} bsStyle={this.props.bsStyle} >
                {this.props.children}
            </Panel>
        </div>;
    }
}



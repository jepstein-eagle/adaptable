import * as React from 'react';
import { PanelProps, Panel, Row, Col } from 'react-bootstrap';
import { AdaptableBlotterForm } from '../Forms/AdaptableBlotterForm';
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';

export interface PanelWithTwoButtonsProps extends PanelProps {
  firstButtonContent?: React.ReactNode;
  firstButton?: React.ReactElement<any>;

  secondButtonContent?: React.ReactNode;
  secondButton?: React.ReactElement<any>;

  cssClassName: string;

  headerText: string;
}

//We cannot destructure this.props using the react way in typescript which is a real pain as you
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class PanelWithTwoButtons extends React.Component<PanelWithTwoButtonsProps, {}> {
  render() {
    let cssClassName = this.props.cssClassName + StyleConstants.ITEMS_PANEL;

    let className = 'ab_panel-with-button';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    className += ' ' + 'ab_panel-with-button-reduce-header-padding';
    let header = (
      <AdaptableBlotterForm inline>
        <Row style={{ display: 'flex', alignItems: 'center' }}>
          <Col xs={5}>{this.props.headerText}</Col>

          <Col xs={5}>
            {this.props.secondButton &&
              React.cloneElement(this.props.secondButton, { style: { float: 'right' } })}
          </Col>
          <Col xs={2}>
            {this.props.firstButton &&
              React.cloneElement(this.props.firstButton, { style: { float: 'right' } })}
          </Col>
        </Row>
      </AdaptableBlotterForm>
    );
    return (
      <div className={cssClassName} style={this.props.style}>
        <Panel header={header} className={className} bsStyle={this.props.bsStyle}>
          {this.props.children}
        </Panel>
      </div>
    );
  }
}

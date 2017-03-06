import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import { Modal, Button } from 'react-bootstrap';
import { DistinctCriteriaPairValue } from '../Core/Enums'
import { AdaptableViewFactory } from './AdaptableViewFactory';
import { IStrategy } from '../Core/Interface/IStrategy';

interface IAdaptableBlotterPopupProps extends React.ClassAttributes<AdaptableBlotterPopup> {
  showModal: boolean;
  ComponentClassName: string;
  IsReadOnly: boolean
  onHide?: Function;
  AdaptableBlotter: IAdaptableBlotter;
}

export class AdaptableBlotterPopup extends React.Component<IAdaptableBlotterPopupProps, {}> {
  render() {
    if (this.props.ComponentClassName) {
      var bodyElement: any = AdaptableViewFactory[this.props.ComponentClassName];
      //Warning : FilterForm needs to be changed if we add properties since it uses the same interface
      var body = React.createElement(bodyElement,
        {
          getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => this.props.AdaptableBlotter.getColumnValueDisplayValuePairDistinctList(columnId, distinctCriteria),
          isGridPageable: () => this.props.AdaptableBlotter.isGridPageable
        });
    }
    //TODO: There is a CSS style in our App that makes the popup to autosize. Need to check how to do it directly from code
    return (
      <Modal show={this.props.showModal} onHide={this.props.onHide} className="adaptable_blotter_style"  >
        {/*<Modal.Header closeButton>
            <Modal.Title>{}</Modal.Title>
          </Modal.Header>*/}
        <Modal.Body style={divStyle} className={this.props.IsReadOnly ? "adaptable_blotter_readonly" : ""}>
          {body}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.onHide()}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

var divStyle = {
  maxHeight: '600px',
  minWidth: '600px'
};
import { IAdaptableBlotter } from '../../../Core/Interface/IAdaptableBlotter';
import * as React from "react";
import { Modal, Button } from 'react-bootstrap';
import { DistinctCriteriaPairValue } from '../../../Core/Enums'
import { AdaptableViewFactory } from './../../AdaptableViewFactory';
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux'
import { StrategyViewPopupProps } from '../SharedProps/StrategyViewPopupProps'

export interface IAdaptableBlotterPopupProps extends React.ClassAttributes<AdaptableBlotterPopup> {
  showModal: boolean;
  ComponentName: string;
  IsReadOnly: boolean
  onHide?: Function;
  AdaptableBlotter: IAdaptableBlotter;
  PopupParams: string
  onClearPopupParams: () => PopupRedux.PopupClearParamAction
}

export class AdaptableBlotterPopup extends React.Component<IAdaptableBlotterPopupProps, {}> {
  render() {
    if (this.props.ComponentName) {
      var bodyElement: any = AdaptableViewFactory[this.props.ComponentName];
      //Warning : FilterForm needs to be changed if we add properties since it uses the same interface
      let commonProps: StrategyViewPopupProps<this> = {
        getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => this.props.AdaptableBlotter ? this.props.AdaptableBlotter.getColumnValueDisplayValuePairDistinctList(columnId, distinctCriteria) : null,
        PopupParams: this.props.PopupParams,
        onClearPopupParams: () => this.props.onClearPopupParams(),
        TeamSharingActivated: this.props.AdaptableBlotter ? this.props.AdaptableBlotter.BlotterOptions.enableRemoteConfigServer : false
      }

      var body: any = React.createElement(bodyElement, commonProps);
    }
    //TODO: There is a CSS style in our App that makes the popup to autosize. Need to check how to do it directly from code
    return (
      <Modal show={this.props.showModal} onHide={this.props.onHide} className="adaptable_blotter_style_popup_base"  >
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
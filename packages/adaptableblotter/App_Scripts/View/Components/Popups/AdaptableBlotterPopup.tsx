import { IAdaptableBlotter } from '../../../Utilities/Interface/IAdaptableBlotter';
import * as React from "react";
import { Modal, Button } from 'react-bootstrap';
import { DistinctCriteriaPairValue, AccessLevel } from '../../../Utilities/Enums'
import { AdaptableViewFactory } from '../../AdaptableViewFactory';
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux'
import { StrategyViewPopupProps } from '../SharedProps/StrategyViewPopupProps'
import { UIHelper } from '../../UIHelper';
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import * as GeneralConstants from '../../../Utilities/Constants/GeneralConstants'
import { StrategyHelper } from '../../../Utilities/Helpers/StrategyHelper';
import { BlotterHelper } from '../../../Utilities/Helpers/BlotterHelper';

export interface IAdaptableBlotterPopupProps extends React.ClassAttributes<AdaptableBlotterPopup> {
  showModal: boolean;
  ComponentName: string;
  ComponentStrategy: string;
  onHide?: Function;
  Blotter: IAdaptableBlotter;
  PopupParams: string
  onClearPopupParams: () => PopupRedux.PopupClearParamAction;
}

export class AdaptableBlotterPopup extends React.Component<IAdaptableBlotterPopupProps, {}> {
  render() {

    let cssClassName: string = StyleConstants.AB_STYLE

    let modalContainer: HTMLElement = UIHelper.getModalContainer(this.props.Blotter.BlotterOptions, document);
    let accessLevel: AccessLevel = StrategyHelper.getEntitlementAccessLevelForStrategy(this.props.Blotter.AdaptableBlotterStore.TheStore.getState().Entitlements.FunctionEntitlements, this.props.ComponentStrategy);

    if (this.props.ComponentName) {
      

      let bodyElement: any = AdaptableViewFactory[this.props.ComponentName];

      //Warning : FilterForm needs to be changed if we add properties since it uses the same interface
      let commonProps: StrategyViewPopupProps<this> = {
        PopupParams: this.props.PopupParams,
        onClearPopupParams: () => this.props.onClearPopupParams(),
        TeamSharingActivated: BlotterHelper.IsConfigServerEnabled(this.props.Blotter.BlotterOptions),
        Columns: this.props.Blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns,
        UserFilters: this.props.Blotter.AdaptableBlotterStore.TheStore.getState().UserFilter.UserFilters,
        SystemFilters: this.props.Blotter.AdaptableBlotterStore.TheStore.getState().SystemFilter.SystemFilters,
        ColumnFilters: this.props.Blotter.AdaptableBlotterStore.TheStore.getState().ColumnFilter.ColumnFilters,
        ModalContainer: modalContainer,
        ColorPalette: this.props.Blotter.AdaptableBlotterStore.TheStore.getState().UserInterface.ColorPalette,
        GridSorts: this.props.Blotter.AdaptableBlotterStore.TheStore.getState().Grid.GridSorts,
        cssClassName: cssClassName + StyleConstants.MODAL_BODY,
        AccessLevel: accessLevel,
        Blotter: this.props.Blotter
      }

      var body: any = React.createElement(bodyElement, commonProps);
    }


    return (

      <Modal show={this.props.showModal} onHide={this.props.onHide} className={cssClassName + StyleConstants.BASE}
        container={modalContainer}
        enforceFocus={null}
      >
        <div className={cssClassName + StyleConstants.MODAL_BASE}>
          <Modal.Body className={cssClassName + StyleConstants.MODAL_BODY}>
            <div className="ab_main_popup">
              <div className={accessLevel == AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : ""}>
                {body}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className={cssClassName + StyleConstants.MODAL_FOOTER}>
            <Button className={cssClassName + StyleConstants.MODAL_FOOTER + StyleConstants.CLOSE_BUTTON} onClick={() => this.props.onHide()}>Close</Button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  }
}

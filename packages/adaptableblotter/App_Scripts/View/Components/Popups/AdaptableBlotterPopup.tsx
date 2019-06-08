import { IAdaptableBlotter } from '../../../Utilities/Interface/IAdaptableBlotter';
import * as React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Box, Flex } from 'rebass';
import { AccessLevel } from '../../../Utilities/Enums';
import { AdaptableViewFactory } from '../../AdaptableViewFactory';
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux';
import { StrategyViewPopupProps } from '../SharedProps/StrategyViewPopupProps';
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import * as GeneralConstants from '../../../Utilities/Constants/GeneralConstants';
import { StrategyHelper } from '../../../Utilities/Helpers/StrategyHelper';
import { BlotterHelper } from '../../../Utilities/Helpers/BlotterHelper';
import { UIHelper } from '../../UIHelper';
import Dialog from '../../../components/Dialog';

/**
 * This is the main popup that we use - so all function popups will appear here.
 */

export interface IAdaptableBlotterPopupProps extends React.ClassAttributes<AdaptableBlotterPopup> {
  showModal: boolean;
  ComponentName: string;
  ComponentStrategy: string;
  onHide?: () => void | Function;
  Blotter: IAdaptableBlotter;
  PopupParams: string;
  onClearPopupParams: () => PopupRedux.PopupClearParamAction;
}

export class AdaptableBlotterPopup extends React.Component<IAdaptableBlotterPopupProps, {}> {
  render() {
    let cssClassName: string = StyleConstants.AB_STYLE;

    let modalContainer: HTMLElement = UIHelper.getModalContainer(
      this.props.Blotter.blotterOptions,
      document
    );
    let accessLevel: AccessLevel = StrategyHelper.getEntitlementAccessLevelForStrategy(
      this.props.Blotter.adaptableBlotterStore.TheStore.getState().Entitlements
        .FunctionEntitlements,
      this.props.ComponentStrategy
    );

    if (this.props.ComponentName) {
      let bodyElement: any = AdaptableViewFactory[this.props.ComponentName];

      //Warning : FilterForm needs to be changed if we add properties since it uses the same interface
      let commonProps: StrategyViewPopupProps<this> = {
        PopupParams: this.props.PopupParams,
        onClearPopupParams: () => this.props.onClearPopupParams(),
        TeamSharingActivated: BlotterHelper.isConfigServerEnabled(
          this.props.Blotter.blotterOptions
        ),
        Columns: this.props.Blotter.adaptableBlotterStore.TheStore.getState().Grid.Columns,
        UserFilters: this.props.Blotter.adaptableBlotterStore.TheStore.getState().UserFilter
          .UserFilters,
        SystemFilters: this.props.Blotter.adaptableBlotterStore.TheStore.getState().SystemFilter
          .SystemFilters,
        ColumnFilters: this.props.Blotter.adaptableBlotterStore.TheStore.getState().ColumnFilter
          .ColumnFilters,
        ModalContainer: modalContainer,
        ColorPalette: this.props.Blotter.adaptableBlotterStore.TheStore.getState().UserInterface
          .ColorPalette,
        ColumnSorts: this.props.Blotter.adaptableBlotterStore.TheStore.getState().Grid.ColumnSorts,
        cssClassName: cssClassName + StyleConstants.MODAL_BODY,
        AccessLevel: accessLevel,
        Blotter: this.props.Blotter,
      };

      var body: any = React.createElement(bodyElement, commonProps);
    }

    return (
      <Dialog
        isOpen={this.props.showModal}
        onDismiss={this.props.onHide}
        className={cssClassName + StyleConstants.BASE}
        showCloseButton={false}
        modal
        padding={0}
      >
        <Flex flexDirection="column" className={cssClassName + StyleConstants.MODAL_BASE}>
          <Flex
            flexDirection="column"
            className={cssClassName + StyleConstants.MODAL_BODY}
            padding={0}
            flex={1}
          >
            <Flex className="ab_main_popup" flexDirection="column" flex={1}>
              <Flex
                flexDirection="column"
                flex={1}
                className={
                  accessLevel == AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : ''
                }
              >
                {body}
              </Flex>
            </Flex>
          </Flex>
          <Flex
            className={cssClassName + StyleConstants.MODAL_FOOTER}
            justifyContent="flex-end"
            padding={2}
            backgroundColor="lightgray"
          >
            <Button
              className={cssClassName + StyleConstants.MODAL_FOOTER + StyleConstants.CLOSE_BUTTON}
              onClick={() => this.props.onHide()}
            >
              Close
            </Button>
          </Flex>
        </Flex>
      </Dialog>
    );
  }
}

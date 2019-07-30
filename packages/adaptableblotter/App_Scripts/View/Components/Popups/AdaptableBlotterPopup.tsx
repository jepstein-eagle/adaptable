import { IAdaptableBlotter } from '../../../Utilities/Interface/IAdaptableBlotter';
import * as React from 'react';
import { AccessLevel } from '../../../PredefinedConfig/Common/Enums';
import { AdaptableViewFactory } from '../../AdaptableViewFactory';
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux';
import { StrategyViewPopupProps } from '../SharedProps/StrategyViewPopupProps';
import * as GeneralConstants from '../../../Utilities/Constants/GeneralConstants';
import { StrategyHelper } from '../../../Utilities/Helpers/StrategyHelper';
import { BlotterHelper } from '../../../Utilities/Helpers/BlotterHelper';
import { UIHelper } from '../../UIHelper';
import Dialog from '../../../components/Dialog';
import SimpleButton from '../../../components/SimpleButton';
import { Flex } from 'rebass';

/**
 * This is the main popup that we use - so all function popups will appear here.
 */

export interface IAdaptableBlotterPopupProps extends React.ClassAttributes<AdaptableBlotterPopup> {
  showModal: boolean;
  ComponentName?: string;
  ComponentStrategy: string;
  onHide?: () => void | Function;
  Blotter: IAdaptableBlotter;
  PopupParams: string;
  onClearPopupParams?: () => PopupRedux.PopupClearParamAction;
}

export class AdaptableBlotterPopup extends React.Component<IAdaptableBlotterPopupProps, {}> {
  render() {
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
        onClearPopupParams: () =>
          this.props.onClearPopupParams ? this.props.onClearPopupParams() : null,
        TeamSharingActivated: BlotterHelper.isConfigServerEnabled(
          this.props.Blotter.blotterOptions
        ),
        Columns: this.props.Blotter.adaptableBlotterStore.TheStore.getState().Grid.Columns,
        UserFilters: this.props.Blotter.adaptableBlotterStore.TheStore.getState().UserFilter
          .UserFilters,
        SystemFilters: this.props.Blotter.adaptableBlotterStore.TheStore.getState().SystemFilter
          .SystemFilters,
        NamedFilters: this.props.Blotter.adaptableBlotterStore.TheStore.getState().NamedFilter
          .NamedFilters,
        ColumnFilters: this.props.Blotter.adaptableBlotterStore.TheStore.getState().ColumnFilter
          .ColumnFilters,
        ModalContainer: modalContainer,
        ColorPalette: this.props.Blotter.adaptableBlotterStore.TheStore.getState().UserInterface
          .ColorPalette,
        ColumnSorts: this.props.Blotter.adaptableBlotterStore.TheStore.getState().Grid.ColumnSorts,
        AccessLevel: accessLevel,
        Blotter: this.props.Blotter,
      };

      var body: any = React.createElement(bodyElement, commonProps);
    }

    return (
      <Dialog
        isOpen={this.props.showModal}
        onDismiss={this.props.onHide}
        showCloseButton={false}
        modal
        padding={0}
      >
        <Flex
          flexDirection="column"
          style={{
            height: '100%',
            maxHeight: '90vh',

            width: '70vw',
            maxWidth: 800,
          }}
        >
          <Flex flexDirection="column" padding={0} flex={1}>
            <Flex flexDirection="column" flex={1}>
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
          <Flex padding={2} backgroundColor="secondarybackground">
            <SimpleButton onClick={() => this.props.onHide()} variant="text">
              CLOSE
            </SimpleButton>
          </Flex>
        </Flex>
      </Dialog>
    );
  }
}

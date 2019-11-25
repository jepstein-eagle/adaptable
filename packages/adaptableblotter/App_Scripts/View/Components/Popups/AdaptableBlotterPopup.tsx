import { IAdaptableBlotter } from '../../../BlotterInterfaces/IAdaptableBlotter';
import * as React from 'react';
import { AccessLevel } from '../../../PredefinedConfig/Common/Enums';
import { AdaptableViewFactory } from '../../AdaptableViewFactory';
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux';
import { StrategyViewPopupProps, StrategyParams } from '../SharedProps/StrategyViewPopupProps';
import * as GeneralConstants from '../../../Utilities/Constants/GeneralConstants';
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
  onHide?: () => void;
  Blotter: IAdaptableBlotter;
  PopupParams: StrategyParams;
  onClearPopupParams?: () => PopupRedux.PopupClearParamAction;
}

export class AdaptableBlotterPopup extends React.Component<IAdaptableBlotterPopupProps, {}> {
  render() {
    let modalContainer: HTMLElement = UIHelper.getModalContainer(
      this.props.Blotter.blotterOptions,
      document
    );
    let accessLevel: AccessLevel = BlotterHelper.getEntitlementAccessLevelForStrategy(
      this.props.Blotter.api.entitlementApi.getAllEntitlement(),
      this.props.ComponentStrategy
    );

    if (this.props.ComponentName) {
      let bodyElement: any = AdaptableViewFactory[this.props.ComponentName];

      //Warning : FilterForm needs to be changed if we add properties since it uses the same interface
      let commonProps: StrategyViewPopupProps<this> = {
        PopupParams: this.props.PopupParams,
        onClearPopupParams: () =>
          this.props.onClearPopupParams ? this.props.onClearPopupParams() : null,
        onClosePopup: () => this.props.onHide(),
        TeamSharingActivated: BlotterHelper.isConfigServerEnabled(
          this.props.Blotter.blotterOptions
        ),
        Columns: this.props.Blotter.api.gridApi.getColumns(),
        UserFilters: this.props.Blotter.api.userFilterApi.getAllUserFilter(),
        SystemFilters: this.props.Blotter.api.systemFilterApi.getAllSystemFilter(),
        NamedFilters: this.props.Blotter.api.namedFilterApi.getAllNamedFilter(),
        ColumnFilters: this.props.Blotter.api.columnFilterApi.getAllColumnFilter(),
        ModalContainer: modalContainer,
        ColumnCategories: this.props.Blotter.api.columnCategoryApi.getAllColumnCategory(),
        ColorPalette: this.props.Blotter.api.userInterfaceApi.getColorPalette(),
        ColumnSorts: this.props.Blotter.api.gridApi.getColumnSorts(),
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
          <Flex padding={2} backgroundColor="primary" className="ab-Popup__footer">
            <SimpleButton onClick={() => this.props.onHide()} variant="text">
              CLOSE
            </SimpleButton>
          </Flex>
        </Flex>
      </Dialog>
    );
  }
}

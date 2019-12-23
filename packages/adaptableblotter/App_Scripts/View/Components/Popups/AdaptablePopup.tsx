import { IAdaptableBlotter } from '../../../BlotterInterfaces/IAdaptableBlotter';
import * as React from 'react';
import { AccessLevel } from '../../../PredefinedConfig/Common/Enums';
import { AdaptableViewFactory } from '../../AdaptableViewFactory';
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux';
import { StrategyViewPopupProps, StrategyParams } from '../SharedProps/StrategyViewPopupProps';
import * as GeneralConstants from '../../../Utilities/Constants/GeneralConstants';
import { AdaptableHelper } from '../../../Utilities/Helpers/AdaptableHelper';
import { UIHelper } from '../../UIHelper';

import SimpleButton from '../../../components/SimpleButton';
import { Flex } from 'rebass';
import { PopupWithFooter } from '../../../components/PopupWithFooter';

import PopupContext from './PopupContext';
import { AdaptableFunctionName } from '../../../PredefinedConfig/Common/Types';

/**
 * This is the main popup that we use - so all function popups will appear here.
 */

export interface AdaptablePopupProps extends React.ClassAttributes<AdaptablePopup> {
  showModal: boolean;
  ComponentName?: string;
  ComponentStrategy: AdaptableFunctionName;
  onHide?: () => void;
  Blotter: IAdaptableBlotter;
  PopupParams: StrategyParams;
  PopupProps?: { [key: string]: any };
  onClearPopupParams?: () => PopupRedux.PopupClearParamAction;
}

export class AdaptablePopup extends React.Component<AdaptablePopupProps, {}> {
  render() {
    let modalContainer: HTMLElement = UIHelper.getModalContainer(
      this.props.Blotter.blotterOptions,
      document
    );
    let accessLevel: AccessLevel = AdaptableHelper.getEntitlementAccessLevelForStrategy(
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
        onClosePopup: () => {
          if (this.props.onHide) {
            this.props.onHide();
          }
        },
        TeamSharingActivated: AdaptableHelper.isConfigServerEnabled(
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
      <PopupContext.Provider
        value={{
          hidePopup: () => {
            if (this.props.onHide) {
              this.props.onHide();
            }
          },
        }}
      >
        <PopupWithFooter
          showModal={this.props.showModal}
          onHide={this.props.onHide}
          modal
          padding={0}
          footer={
            <>
              <SimpleButton
                onClick={() => {
                  if (this.props.onHide) {
                    this.props.onHide();
                  }
                }}
                variant="text"
              >
                CLOSE
              </SimpleButton>
            </>
          }
          {...this.props.PopupProps}
        >
          <Flex
            flexDirection="column"
            flex={1}
            className={accessLevel == AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : ''}
          >
            {body}
          </Flex>
        </PopupWithFooter>
      </PopupContext.Provider>
    );
  }
}

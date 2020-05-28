import { IAdaptable } from '../../../AdaptableInterfaces/IAdaptable';
import * as React from 'react';
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
import { AccessLevel } from '../../../PredefinedConfig/EntitlementState';

/**
 * This is the main popup that we use - so all function popups will appear here.
 */

export interface AdaptablePopupProps extends React.ClassAttributes<AdaptablePopup> {
  showModal: boolean;
  ComponentName?: string;
  ComponentStrategy: AdaptableFunctionName;
  onHide?: () => void;
  Adaptable: IAdaptable;
  PopupParams: StrategyParams;
  PopupProps?: { [key: string]: any };
  onClearPopupParams?: () => PopupRedux.PopupClearParamAction;
}

export class AdaptablePopup extends React.Component<AdaptablePopupProps, {}> {
  render() {
    let modalContainer: HTMLElement = UIHelper.getModalContainer(
      this.props.Adaptable.adaptableOptions,
      document
    );
    let accessLevel: AccessLevel = this.props.Adaptable.api.entitlementsApi.getEntitlementAccessLevelByAdaptableFunctionName(
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
        TeamSharingActivated: this.props.Adaptable.api.entitlementsApi.isFunctionFullEntitlement(
          'TeamSharing'
        ),
        Columns: this.props.Adaptable.api.gridApi.getColumns(),
        UserFilters: this.props.Adaptable.api.userFilterApi.getAllUserFilter(),
        SystemFilters: this.props.Adaptable.api.systemFilterApi.getAllSystemFilter(),
        NamedFilters: this.props.Adaptable.api.namedFilterApi.getAllNamedFilter(),
        ColumnFilters: this.props.Adaptable.api.columnFilterApi.getAllColumnFilter(),
        ModalContainer: modalContainer,
        ColumnCategories: this.props.Adaptable.api.columnCategoryApi.getAllColumnCategory(),
        ColorPalette: this.props.Adaptable.api.userInterfaceApi.getColorPalette(),
        ColumnSorts: this.props.Adaptable.api.gridApi.getColumnSorts(),
        AccessLevel: accessLevel,
        Adaptable: this.props.Adaptable,
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
            className={accessLevel == 'ReadOnly' ? GeneralConstants.READ_ONLY_STYLE : ''}
          >
            {body}
          </Flex>
        </PopupWithFooter>
      </PopupContext.Provider>
    );
  }
}

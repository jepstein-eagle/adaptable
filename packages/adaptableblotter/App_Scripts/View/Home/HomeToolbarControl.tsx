﻿import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';
import { DashboardState } from '../../PredefinedConfig/DashboardState';
import { GridState } from '../../PredefinedConfig/GridState';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { AdaptableBlotterColumn } from '../../Utilities/Interface/AdaptableBlotterColumn';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';

import {
  Visibility,
  AccessLevel,
  DashboardSize,
  MessageType,
} from '../../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { SystemStatus } from '../../Utilities/Interface/SystemStatus';
import { AdaptableAlert } from '../../Utilities/Interface/IMessage';
import { UIHelper } from '../UIHelper';
import Checkbox from '../../components/CheckBox';
import SimpleButton from '../../components/SimpleButton';
import DropdownButton from '../../components/DropdownButton';
import { Flex } from 'rebass';
import { Icon } from '../../components/icons';
import { AdaptableBlotterMenuItem } from '../../Utilities/MenuItem';
import ObjectFactory from '../../Utilities/ObjectFactory';

const preventDefault = (e: React.SyntheticEvent) => e.preventDefault();

interface HomeToolbarComponentProps
  extends ToolbarStrategyViewPopupProps<HomeToolbarControlComponent> {
  GridState: GridState;
  DashboardState: DashboardState;
  Columns: AdaptableBlotterColumn[];
  SystemStatus: SystemStatus;
  HeaderText: string;
  DashboardSize: DashboardSize;
  onNewColumnListOrder: (
    VisibleColumnList: AdaptableBlotterColumn[]
  ) => SystemRedux.SetNewColumnListOrderAction;
  onSetDashboardVisibility: (visibility: Visibility) => DashboardRedux.DashboardSetVisibilityAction;
  onSetToolbarVisibility: (strategyIds: string[]) => DashboardRedux.DashboardSetToolbarsAction;
  onShowStatusMessage: (alert: AdaptableAlert) => PopupRedux.PopupShowAlertAction;
  onShowGridInfo: () => PopupRedux.PopupShowGridInfoAction;
}

class HomeToolbarControlComponent extends React.Component<HomeToolbarComponentProps, {}> {
  constructor(props: HomeToolbarComponentProps) {
    super(props);
    this.state = { configMenuItems: [] };
  }

  render() {
    const functionsGlyph: any = <Icon name={'home'} />;
    const colsGlyph: any = <Icon name={'list'} />;
    const toolbarsGlyph: any = <Icon name={'align-justify'} />;

    // List strategies that are allowed - i.e. are offered by the Blotter instance and are not Hidden Entitlement
    let strategyKeys: string[] = [...this.props.Blotter.strategies.keys()];
    let allowedMenuItems = this.props.GridState.MainMenuItems.filter(
      x => x.IsVisible && ArrayExtensions.NotContainsItem(strategyKeys, x)
    );

    // function menu items
    let menuItems = allowedMenuItems.map(menuItem => {
      return {
        disabled: this.props.AccessLevel == AccessLevel.ReadOnly,
        onClick: () => this.onClick(menuItem),
        icon: <Icon name={menuItem.Icon} />,
        label: menuItem.Label,
      };
    });

    // column items
    let colItems: any = [
      {
        clickable: false,
        label: (
          <div key="colTitle">
            {' '}
            &nbsp;&nbsp;<b>{'Columns'}</b>
          </div>
        ),
      },
    ];
    this.props.Columns.forEach((col: AdaptableBlotterColumn, index) => {
      colItems.push({
        id: col.ColumnId,
        onClick: (e: React.SyntheticEvent) => {
          this.onSetColumnVisibility(col.ColumnId);
        },
        label: (
          <Checkbox
            as="div"
            className="ab-dd-checkbox"
            my={0}
            value={col.ColumnId}
            key={col.ColumnId}
            checked={col.Visible}
            onMouseDown={preventDefault}
          >
            {col.FriendlyName}
          </Checkbox>
        ),
      });
    });

    // toolbar items
    let toolbarItems: any = [];
    let allowedMenuNames: string[] = allowedMenuItems.map(vm => {
      return vm.StrategyId;
    });
    toolbarItems.push({
      clickable: false,
      label: (
        <div key="toolbarTitle">
          {' '}
          &nbsp;&nbsp;<b>{'Toolbars'}</b>
        </div>
      ),
    });
    this.props.DashboardState.AvailableToolbars.forEach((toolbar: string, index) => {
      if (ArrayExtensions.ContainsItem(allowedMenuNames, toolbar)) {
        let isVisible: boolean = ArrayExtensions.ContainsItem(
          this.props.DashboardState.VisibleToolbars,
          toolbar
        );
        let functionName = StrategyConstants.getNameForStrategyId(toolbar);
        toolbarItems.push({
          id: toolbar,
          onClick: (e: React.SyntheticEvent) => {
            this.onSetToolbarVisibility(toolbar, !isVisible);
          },
          label: (
            <Checkbox
              className="ab-dd-checkbox"
              my={0}
              as="div"
              value={toolbar}
              key={toolbar}
              checked={isVisible}
              onMouseDown={preventDefault}
            >
              {functionName}
            </Checkbox>
          ),
        });
      }
    });

    // status button
    let statusButton = (
      <SimpleButton
        variant="text"
        key={'systemstatus'}
        icon={UIHelper.getGlyphForMessageType(this.props.SystemStatus.StatusType as MessageType)}
        style={UIHelper.getStyleForMessageType(this.props.SystemStatus.StatusType as MessageType)}
        tooltip={'Status: ' + this.props.SystemStatus.StatusMessage}
        disabled={false}
        onClick={() => this.onClickStatus()}
        AccessLevel={AccessLevel.Full}
      />
    );

    // gridInfo button
    let gridInfoButton = (
      <SimpleButton
        tooltip="Grid Info"
        icon={'info'}
        variant="text"
        onClick={() => this.onClickGridInfo()}
        AccessLevel={AccessLevel.Full}
      />
    );

    // functions dropdown
    let functionsDropdown = (
      <DropdownButton
        variant="text"
        items={menuItems}
        tooltip="Grid Functions"
        key={'dropdown-functions'}
        id={'dropdown-functions'}
      >
        {functionsGlyph}
      </DropdownButton>
    );

    // columns dropdown
    let columnsDropDown = (
      <DropdownButton
        variant="text"
        collapseOnItemClick={false}
        items={colItems}
        columns={['label']}
        key={'dropdown-cols'}
        id={'dropdown-cols'}
        tooltip="Select Columns"
      >
        {colsGlyph}
      </DropdownButton>
    );

    // toolbars dropdown
    let toolbarsDropDown = (
      <DropdownButton
        variant="text"
        collapseOnItemClick={false}
        key={'dropdown-toolbars'}
        id={'dropdown-toolbars'}
        columns={['label']}
        items={toolbarItems}
        tooltip="Manage Toolbars"
      >
        {toolbarsGlyph}
      </DropdownButton>
    );

    // shortcuts
    let shortcutsArray: string[] = this.props.DashboardState.VisibleButtons;

    let shortcuts: any;
    if (shortcutsArray) {
      shortcuts = shortcutsArray.map(x => {
        let menuItem = this.props.GridState.MainMenuItems.find(
          y => y.IsVisible && y.StrategyId == x
        );
        if (menuItem) {
          return (
            <SimpleButton
              key={menuItem.Label}
              icon={menuItem.Icon}
              variant="text"
              tooltip={menuItem.Label}
              disabled={this.props.AccessLevel == AccessLevel.ReadOnly}
              onClick={() => this.onClick(menuItem!)}
              AccessLevel={AccessLevel.Full}
            />
          );
        }
      });
    }

    let toolbarTitle = this.props.DashboardState.HomeToolbarTitle;
    if (StringExtensions.IsNullOrEmpty(toolbarTitle)) {
      toolbarTitle = this.props.Blotter.blotterOptions.blotterId;
      if (toolbarTitle == GeneralConstants.USER_NAME) {
        toolbarTitle = 'Blotter ';
      }
    }

    return (
      <PanelDashboard
        showCloseButton={false}
        showMinimiseButton={true}
        onMinimise={() => this.props.onSetDashboardVisibility(Visibility.Minimised)}
        headerText={toolbarTitle}
        glyphicon={'home'}
        showGlyphIcon={false}
        onClose={() => this.props.onClose(StrategyConstants.HomeStrategyId)}
        onConfigure={() => this.props.onConfigure()}
      >
        <Flex flexDirection="row">
          {this.props.DashboardState.ShowFunctionsDropdown && functionsDropdown}
          {this.props.DashboardState.ShowSystemStatusButton && statusButton}
          {this.props.DashboardState.ShowGridInfoButton && gridInfoButton}

          {shortcuts}

          {this.props.DashboardState.ShowColumnsDropdown && columnsDropDown}

          {this.props.DashboardState.ShowToolbarsDropdown && toolbarsDropDown}
        </Flex>
      </PanelDashboard>
    );
  }

  onClick(menuItem: AdaptableBlotterMenuItem) {
    this.props.onClick(menuItem.Action);
  }

  onClickStatus() {
    let messageType: MessageType = this.props.SystemStatus.StatusType as MessageType;
    switch (messageType) {
      case MessageType.Success:
        let success: AdaptableAlert = {
          Header: 'System Status',
          Msg: StringExtensions.IsNotNullOrEmpty(this.props.SystemStatus.StatusMessage)
            ? this.props.SystemStatus.StatusMessage
            : 'No issues',
          AlertDefinition: ObjectFactory.CreateInternalAlertDefinitionForMessages(
            MessageType.Success
          ),
        };
        this.props.onShowStatusMessage(success);
        return;
      case MessageType.Info:
        let info: AdaptableAlert = {
          Header: 'System Status',
          Msg: this.props.SystemStatus.StatusMessage,
          AlertDefinition: ObjectFactory.CreateInternalAlertDefinitionForMessages(MessageType.Info),
        };
        this.props.onShowStatusMessage(info);
        return;
      case MessageType.Warning:
        let warning: AdaptableAlert = {
          Header: 'System Status',
          Msg: this.props.SystemStatus.StatusMessage,
          AlertDefinition: ObjectFactory.CreateInternalAlertDefinitionForMessages(
            MessageType.Warning
          ),
        };
        this.props.onShowStatusMessage(warning);
        return;
      case MessageType.Error:
        let error: AdaptableAlert = {
          Header: 'System Status',
          Msg: this.props.SystemStatus.StatusMessage,
          AlertDefinition: ObjectFactory.CreateInternalAlertDefinitionForMessages(
            MessageType.Error
          ),
        };
        this.props.onShowStatusMessage(error);
        return;
    }
  }
  onClickGridInfo() {
    this.props.onShowGridInfo();
  }

  onSetColumnVisibility(name: string) {
    let changedColumn: AdaptableBlotterColumn = ColumnHelper.getColumnFromId(
      name,
      this.props.Columns
    );

    let columns: AdaptableBlotterColumn[] = [].concat(this.props.Columns);
    changedColumn = Object.assign({}, changedColumn, {
      Visible: !changedColumn.Visible,
    });
    let index = columns.findIndex(x => x.ColumnId == name);
    columns[index] = changedColumn;
    this.props.onNewColumnListOrder(columns.filter(c => c.Visible));
  }

  onSetToolbarVisibility(name: string, checked: boolean) {
    const strategy: string = this.props.DashboardState.AvailableToolbars.find(at => at == name);
    const visibleToolbars: string[] = [].concat(this.props.DashboardState.VisibleToolbars);
    if (checked) {
      visibleToolbars.push(strategy);
    } else {
      let index: number = visibleToolbars.findIndex(vt => vt == strategy);
      visibleToolbars.splice(index, 1);
    }
    this.props.onSetToolbarVisibility(visibleToolbars);
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    GridState: state.Grid,
    DashboardState: state.Dashboard,
    Columns: state.Grid.Columns,
    SystemStatus: state.System.SystemStatus,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onClick: (action: Redux.Action) => dispatch(action),
    onClose: (dashboardControl: string) =>
      dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.HomeStrategyId, ScreenPopups.DashboardPopup)
      ),
    onNewColumnListOrder: (VisibleColumnList: AdaptableBlotterColumn[]) =>
      dispatch(SystemRedux.SetNewColumnListOrder(VisibleColumnList)),
    onSetDashboardVisibility: (visibility: Visibility) =>
      dispatch(DashboardRedux.DashboardSetVisibility(visibility)),
    onSetToolbarVisibility: (strategyIds: string[]) =>
      dispatch(DashboardRedux.DashboardSetToolbars(strategyIds)),
    onShowStatusMessage: (alert: AdaptableAlert) => dispatch(PopupRedux.PopupShowAlert(alert)),
    onShowGridInfo: () => dispatch(PopupRedux.PopupShowGridInfo()),
  };
}

export const HomeToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeToolbarControlComponent);

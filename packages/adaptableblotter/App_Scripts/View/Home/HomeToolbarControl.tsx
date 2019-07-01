import * as React from 'react';
import { connect, ReactNode } from 'react-redux';
import * as Redux from 'redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import {
  Glyphicon,
  MenuItem,
  OverlayTrigger,
  Tooltip,
  // DropdownButton,
} from 'react-bootstrap';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import { DashboardState } from '../../PredefinedConfig/RunTimeState/DashboardState';
import { MenuState } from '../../PredefinedConfig/InternalState/MenuState';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { IColumn } from '../../Utilities/Interface/IColumn';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { ButtonDashboard } from '../Components/Buttons/ButtonDashboard';
import {
  Visibility,
  StatusColour,
  MessageType,
  AccessLevel,
  DashboardSize,
} from '../../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { ISystemStatus } from '../../Utilities/Interface/ISystemStatus';
import { IMenuItem } from '../../Utilities/Interface/IMenu';
import { IAdaptableAlert } from '../../Utilities/Interface/IMessage';
import { UIHelper } from '../UIHelper';
import Checkbox from '../../components/CheckBox';
import SimpleButton from '../../components/SimpleButton';
import DropdownButton from '../../components/DropdownButton';
import { Flex } from 'rebass';

interface HomeToolbarComponentProps
  extends ToolbarStrategyViewPopupProps<HomeToolbarControlComponent> {
  MenuState: MenuState;
  DashboardState: DashboardState;
  Columns: IColumn[];
  SystemStatus: ISystemStatus;
  HeaderText: string;
  DashboardSize: DashboardSize;
  onNewColumnListOrder: (VisibleColumnList: IColumn[]) => SystemRedux.SetNewColumnListOrderAction;
  onSetDashboardVisibility: (visibility: Visibility) => DashboardRedux.DashboardSetVisibilityAction;
  onSetToolbarVisibility: (strategyIds: string[]) => DashboardRedux.DashboardSetToolbarsAction;
  onShowStatusMessage: (alert: IAdaptableAlert) => PopupRedux.PopupShowAlertAction;
  onShowAbout: () => PopupRedux.PopupShowAboutAction;
}

class HomeToolbarControlComponent extends React.Component<HomeToolbarComponentProps, {}> {
  constructor(props: HomeToolbarComponentProps) {
    super(props);
    this.state = { configMenuItems: [] };
  }

  render() {
    let cssClassName: string = this.props.cssClassName + '__home';
    let cssDropdownClassName: string = this.props.cssClassName + '__home__dropdown';

    const functionsGlyph: any = <Glyphicon glyph={'home'} />;
    const colsGlyph: any = <Glyphicon glyph={'list'} />;
    const toolbarsGlyph: any = <Glyphicon glyph={'align-justify'} />;

    // List strategies that are allowed - i.e. are offered by the Blotter instance and are not Hidden Entitlement
    let strategyKeys: string[] = [...this.props.Blotter.strategies.keys()];
    let allowedMenuItems = this.props.MenuState.MenuItems.filter(
      x => x.IsVisible && ArrayExtensions.NotContainsItem(strategyKeys, x)
    );

    // function menu items
    let menuItems = allowedMenuItems.map((menuItem: IMenuItem) => {
      return {
        disabled: this.props.AccessLevel == AccessLevel.ReadOnly,
        onClick: () => this.onClick(menuItem),
        icon: <Glyphicon glyph={menuItem.GlyphIcon} />,
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
    this.props.Columns.forEach((col: IColumn, index) => {
      colItems.push({
        id: col.ColumnId,
        onClick: (e: React.SyntheticEvent) => {
          this.onSetColumnVisibility(col.ColumnId);
        },
        label: (
          <div className="ab_home_toolbar_column_list">
            <Checkbox value={col.ColumnId} key={col.ColumnId} checked={col.Visible}>
              {col.FriendlyName}
            </Checkbox>
          </div>
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
            <div className="ab_home_toolbar_column_list" key={index}>
              <Checkbox value={toolbar} key={toolbar} checked={isVisible}>
                {functionName}
              </Checkbox>
            </div>
          ),
        });
      }
    });

    // status button
    let statusButton = (
      <SimpleButton
        variant="text"
        key={'systemstatus'}
        icon={UIHelper.getGlyphForSystemStatusButton(this.props.SystemStatus
          .StatusColour as StatusColour)}
        className={cssClassName}
        style={UIHelper.getStyleForSystemStatusButton(this.props.SystemStatus
          .StatusColour as StatusColour)}
        tooltip={'Status: ' + this.props.SystemStatus.StatusColour}
        disabled={false}
        onClick={() => this.onClickStatus()}
        AccessLevel={AccessLevel.Full}
      />
    );

    // about button
    let aboutButton = (
      <SimpleButton
        tooltip="About"
        icon={'info'}
        className={cssClassName}
        variant="text"
        onClick={() => this.onClickAbout()}
        AccessLevel={AccessLevel.Full}
      />
    );

    // functions dropdown
    let functionsDropdown = (
      <DropdownButton
        variant="text"
        bsStyle={'default'}
        className={cssDropdownClassName}
        bsSize={this.props.DashboardSize}
        items={menuItems}
        tooltip="Functions"
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
        className={cssDropdownClassName}
        items={colItems}
        key={'dropdown-cols'}
        id={'dropdown-cols'}
        tooltip="Columns"
      >
        {colsGlyph}
      </DropdownButton>
    );

    // toolbars dropdown
    let toolbarsDropDown = (
      <DropdownButton
        variant="text"
        collapseOnItemClick={false}
        className={cssDropdownClassName}
        key={'dropdown-toolbars'}
        id={'dropdown-toolbars'}
        columns={['label']}
        items={toolbarItems}
        tooltip="Toolbars"
      >
        {toolbarsGlyph}
      </DropdownButton>
    );

    // shortcuts
    let shortcutsArray: string[] = this.props.DashboardState.VisibleButtons;
    let shortcuts: any;
    if (shortcutsArray) {
      shortcuts = shortcutsArray.map(x => {
        let menuItem = this.props.MenuState.MenuItems.find(y => y.IsVisible && y.StrategyId == x);
        if (menuItem) {
          return (
            <OverlayTrigger
              key={x}
              overlay={<Tooltip id="tooltipButton"> {menuItem.Label}</Tooltip>}
            >
              <ButtonDashboard
                glyph={menuItem.GlyphIcon}
                cssClassName={cssClassName}
                bsStyle={'default'}
                DisplayMode={'Glyph'}
                bsSize={this.props.DashboardSize}
                ToolTipAndText={menuItem.Label}
                overrideDisableButton={this.props.AccessLevel == AccessLevel.ReadOnly}
                onClick={() => this.onClick(menuItem)}
                AccessLevel={AccessLevel.Full}
              />
            </OverlayTrigger>
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
        cssClassName={cssClassName}
        useDefaultPanelStyle={this.props.UseSingleColourForButtons}
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
          {this.props.DashboardState.ShowAboutButton && aboutButton}

          {shortcuts}

          {this.props.DashboardState.ShowColumnsDropdown && columnsDropDown}

          {this.props.DashboardState.ShowToolbarsDropdown && toolbarsDropDown}
        </Flex>
      </PanelDashboard>
    );
  }

  onClick(menuItem: IMenuItem) {
    this.props.onClick(menuItem.Action);
  }

  onClickStatus() {
    let statusColor: StatusColour = this.props.SystemStatus.StatusColour as StatusColour;
    switch (statusColor) {
      case StatusColour.Green:
        let success: IAdaptableAlert = {
          Header: 'System Status',
          Msg: StringExtensions.IsNotNullOrEmpty(this.props.SystemStatus.StatusMessage)
            ? this.props.SystemStatus.StatusMessage
            : 'No issues',
          MessageType: MessageType.Success,
          ShowAsPopup: true,
        };
        this.props.onShowStatusMessage(success);
        return;
      case StatusColour.Blue:
        let info: IAdaptableAlert = {
          Header: 'System Status',
          Msg: this.props.SystemStatus.StatusMessage,
          MessageType: MessageType.Info,
          ShowAsPopup: true,
        };
        this.props.onShowStatusMessage(info);
        return;
      case StatusColour.Amber:
        let warning: IAdaptableAlert = {
          Header: 'System Status',
          Msg: this.props.SystemStatus.StatusMessage,
          MessageType: MessageType.Warning,
          ShowAsPopup: true,
        };
        this.props.onShowStatusMessage(warning);
        return;
      case StatusColour.Red:
        let error: IAdaptableAlert = {
          Header: 'System Status',
          Msg: this.props.SystemStatus.StatusMessage,
          MessageType: MessageType.Error,
          ShowAsPopup: true,
        };
        this.props.onShowStatusMessage(error);
        return;
    }
  }
  onClickAbout() {
    this.props.onShowAbout();
  }

  onSetColumnVisibility(name: string) {
    let changedColumn: IColumn = ColumnHelper.getColumnFromId(name, this.props.Columns);

    let columns: IColumn[] = [].concat(this.props.Columns);
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
    MenuState: state.Menu,
    DashboardState: state.Dashboard,
    Columns: state.Grid.Columns,
    SystemStatus: state.System.SystemStatus,
    DashboardSize: state.Dashboard.UseExtraSmallButtons
      ? DashboardSize.XSmall
      : DashboardSize.Small,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onClick: (action: Redux.Action) => dispatch(action),
    onClose: (dashboardControl: string) =>
      dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.HomeStrategyId, ScreenPopups.DashboardPopup)
      ),
    onNewColumnListOrder: (VisibleColumnList: IColumn[]) =>
      dispatch(SystemRedux.SetNewColumnListOrder(VisibleColumnList)),
    onSetDashboardVisibility: (visibility: Visibility) =>
      dispatch(DashboardRedux.DashboardSetVisibility(visibility)),
    onSetToolbarVisibility: (strategyIds: string[]) =>
      dispatch(DashboardRedux.DashboardSetToolbars(strategyIds)),
    onShowStatusMessage: (alert: IAdaptableAlert) => dispatch(PopupRedux.PopupShowAlert(alert)),
    onShowAbout: () => dispatch(PopupRedux.PopupShowAbout()),
  };
}

export const HomeToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeToolbarControlComponent);

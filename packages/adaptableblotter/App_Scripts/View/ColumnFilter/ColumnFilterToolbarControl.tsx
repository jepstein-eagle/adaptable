import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as UserFilterRedux from '../../Redux/ActionsReducers/UserFilterRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux';
import { IColumn } from '../../Utilities/Interface/IColumn';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import * as ColumnFilterRedux from '../../Redux/ActionsReducers/ColumnFilterRedux';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { AdaptablePopover } from '../AdaptablePopover';
import { AccessLevel, DashboardSize } from '../../PredefinedConfig/Common/Enums';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { ColumnFilter } from '../../PredefinedConfig/RunTimeState/ColumnFilterState';

import { ActiveFiltersPanel } from './ActiveFiltersPanel';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { IUIPrompt } from '../../Utilities/Interface/IMessage';
import { SUCCESS_BSSTYLE, DEFAULT_BSSTYLE } from '../../Utilities/Constants/StyleConstants';

import { UserFilter } from '../../PredefinedConfig/RunTimeState/UserFilterState';
import { IEntitlement } from '../../PredefinedConfig/DesignTimeState/EntitlementsState';
import { Flex, Text } from 'rebass';
import CheckBox from '../../components/CheckBox';

interface ColumnFilterToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<ColumnFilterToolbarControlComponent> {
  onClearAllFilters: () => ColumnFilterRedux.ColumnFilterClearAllAction;
  onClearColumnFilter: (columnFilter: ColumnFilter) => ColumnFilterRedux.ColumnFilterClearAction;
  onShowPrompt: (prompt: IUIPrompt) => PopupRedux.PopupShowPromptAction;
  onHideQuickFilterBar: () => GridRedux.QuickFilterBarHideAction;
  onShowQuickFilterBar: () => GridRedux.QuickFilterBarShowAction;
  ColumnFilters: ColumnFilter[];
  Columns: IColumn[];
  UserFilters: UserFilter[];
  Entitlements: IEntitlement[];
  IsQuickFilterActive: boolean;
}

class ColumnFilterToolbarControlComponent extends React.Component<
  ColumnFilterToolbarControlComponentProps,
  {}
> {
  render(): any {
    let cssClassName: string = this.props.cssClassName + '__columnfilter';
    let collapsedText = ArrayExtensions.IsNullOrEmpty(this.props.ColumnFilters)
      ? 'No Filters'
      : ArrayExtensions.hasOneItem(this.props.ColumnFilters)
      ? '1 Filter'
      : this.props.ColumnFilters.length + ' Filters';

    let activeFiltersPanel = (
      <ActiveFiltersPanel
        cssClassName={cssClassName}
        Columns={this.props.Columns}
        ColumnFilters={this.props.ColumnFilters}
        AccessLevel={this.props.AccessLevel}
        onClear={(columnFilter: ColumnFilter) => this.onClearColumnFilter(columnFilter)}
        onSaveColumnFilterasUserFilter={(columnFilter: ColumnFilter) =>
          this.onSaveColumnFilterasUserFilter(columnFilter)
        }
      />
    );

    let content = (
      <Flex
        alignItems="stretch"
        className={
          this.props.AccessLevel == AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : ''
        }
      >
        {/*<Text mx={1}>{collapsedText}</Text>*/}
        {ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnFilters) && (
          <>
            <AdaptablePopover
              cssClassName={cssClassName}
              headerText=""
              bodyText={[activeFiltersPanel]}
              tooltipText={'Show Filter Details'}
              useButton={true}
              showEvent={'focus'}
              hideEvent="blur"
              popoverMinWidth={400}
            />
            <ButtonClear
              marginLeft={1}
              onClick={() => this.onClearFilters()}
              tooltip="Clear Column Filters"
              disabled={this.props.ColumnFilters.length == 0}
              AccessLevel={this.props.AccessLevel}
            />
          </>
        )}
        <CheckBox
          marginLeft={3}
          checked={this.props.IsQuickFilterActive}
          onChange={(checked: boolean) => {
            checked ? this.props.onShowQuickFilterBar() : this.props.onHideQuickFilterBar();
          }}
        >
          Quick Filter
        </CheckBox>
      </Flex>
    );

    return (
      <PanelDashboard
        cssClassName={cssClassName}
        headerText={StrategyConstants.ColumnFilterStrategyName}
        glyphicon={StrategyConstants.ColumnFilterGlyph}
        onClose={() => this.props.onClose(StrategyConstants.ColumnFilterStrategyId)}
        onConfigure={() => this.props.onConfigure()}
      >
        {content}
      </PanelDashboard>
    );
  }

  private onClearFilters() {
    // better to put in store but lets test first...
    this.props.onClearAllFilters();
    this.props.Blotter.clearGridFiltering();
  }

  private onClearColumnFilter(columnFilter: ColumnFilter) {
    this.props.onClearColumnFilter(columnFilter);
    this.props.Blotter.clearColumnFiltering([columnFilter.ColumnId]);
  }

  private onSaveColumnFilterasUserFilter(columnFilter: ColumnFilter): void {
    let prompt: IUIPrompt = {
      Header: 'Enter name for User Filter',
      Msg: '',
      ConfirmAction: UserFilterRedux.CreateUserFilterFromColumnFilter(columnFilter, ''),
    };
    this.props.onShowPrompt(prompt);
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    ColumnFilters: state.ColumnFilter.ColumnFilters,
    Entitlements: state.Entitlements.FunctionEntitlements,
    IsQuickFilterActive: state.Grid.IsQuickFilterActive,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onClearColumnFilter: (columnFilter: ColumnFilter) =>
      dispatch(ColumnFilterRedux.ColumnFilterClear(columnFilter)),
    onShowPrompt: (prompt: IUIPrompt) => dispatch(PopupRedux.PopupShowPrompt(prompt)),
    onClearAllFilters: () => dispatch(ColumnFilterRedux.ColumnFilterClearAll()),
    onHideQuickFilterBar: () => dispatch(GridRedux.QuickFilterBarHide()),
    onShowQuickFilterBar: () => dispatch(GridRedux.QuickFilterBarShow()),
    onClose: (dashboardControl: string) =>
      dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.ColumnFilterStrategyId,
          ScreenPopups.ColumnFilterPopup
        )
      ),
  };
}

export let ColumnFilterToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnFilterToolbarControlComponent);

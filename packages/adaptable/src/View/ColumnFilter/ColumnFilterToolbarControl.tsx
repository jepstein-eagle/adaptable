﻿import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as UserFilterRedux from '../../Redux/ActionsReducers/UserFilterRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import * as ColumnFilterRedux from '../../Redux/ActionsReducers/ColumnFilterRedux';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { AdaptablePopover } from '../AdaptablePopover';
import { ColumnFilter } from '../../PredefinedConfig/ColumnFilterState';

import { ActiveFiltersPanel } from './ActiveFiltersPanel';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { IUIPrompt } from '../../Utilities/Interface/IMessage';

import { UserFilter } from '../../PredefinedConfig/UserFilterState';
import { Entitlement } from '../../PredefinedConfig/EntitlementState';
import { Flex } from 'rebass';
import CheckBox from '../../components/CheckBox';
import { AdaptableDashboardToolbar } from '../../PredefinedConfig/Common/Types';

interface ColumnFilterToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<ColumnFilterToolbarControlComponent> {
  onClearAllFilters: () => ColumnFilterRedux.ColumnFilterClearAllAction;
  onClearColumnFilter: (columnFilter: ColumnFilter) => ColumnFilterRedux.ColumnFilterClearAction;
  onShowPrompt: (prompt: IUIPrompt) => PopupRedux.PopupShowPromptAction;
  onHideQuickFilterBar: () => GridRedux.QuickFilterBarHideAction;
  onShowQuickFilterBar: () => GridRedux.QuickFilterBarShowAction;
  ColumnFilters: ColumnFilter[];
  Columns: AdaptableColumn[];
  UserFilters: UserFilter[];
  Entitlements: Entitlement[];
  IsQuickFilterActive: boolean;
}

class ColumnFilterToolbarControlComponent extends React.Component<
  ColumnFilterToolbarControlComponentProps,
  {}
> {
  render(): any {
    let activeFiltersPanel = (
      <ActiveFiltersPanel
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
      <Flex alignItems="stretch" className="ab-DashboardToolbar__ColumnFilter__wrap">
        {/*<Text mx={1}>{collapsedText}</Text>*/}
        {ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnFilters) && (
          <>
            <AdaptablePopover
              className="ab-DashboardToolbar__ColumnFilter__info"
              headerText=""
              bodyText={[activeFiltersPanel]}
              //  tooltipText={'Show Filter Details'}
              useButton={true}
              showEvent={'focus'}
              hideEvent="blur"
              popoverMinWidth={400}
            />
            <ButtonClear
              marginLeft={1}
              className="ab-DashboardToolbar__ColumnFilter__clear"
              onClick={() => this.onClearFilters()}
              tooltip="Clear Column Filters"
              disabled={this.props.ColumnFilters.length == 0}
              AccessLevel={this.props.AccessLevel}
            />
          </>
        )}
        <CheckBox
          className="ab-DashboardToolbar__ColumnFilter__active-check"
          disabled={this.props.Adaptable.api.internalApi.isGridInPivotMode()}
          fontSize={2}
          checked={this.props.IsQuickFilterActive}
          onChange={(checked: boolean) => {
            checked ? this.props.onShowQuickFilterBar() : this.props.onHideQuickFilterBar();
          }}
        >
          Show Quick Filter
        </CheckBox>
      </Flex>
    );

    return (
      <PanelDashboard
        className="ab-DashboardToolbar__ColumnFilter"
        headerText={StrategyConstants.ColumnFilterStrategyFriendlyName}
        onConfigure={() => this.props.onConfigure()}
      >
        {content}
      </PanelDashboard>
    );
  }

  private onClearFilters() {
    // better to put in store but lets test first...
    this.props.onClearAllFilters();
    this.props.Adaptable.clearGridFiltering();
  }

  private onClearColumnFilter(columnFilter: ColumnFilter) {
    this.props.onClearColumnFilter(columnFilter);
    this.props.Adaptable.clearColumnFiltering([columnFilter.ColumnId]);
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

function mapStateToProps(
  state: AdaptableState,
  ownProps: any
): Partial<ColumnFilterToolbarControlComponentProps> {
  return {
    ColumnFilters: state.ColumnFilter.ColumnFilters,
    IsQuickFilterActive: state.Grid.IsQuickFilterActive,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<ColumnFilterToolbarControlComponentProps> {
  return {
    onClearColumnFilter: (columnFilter: ColumnFilter) =>
      dispatch(ColumnFilterRedux.ColumnFilterClear(columnFilter)),
    onShowPrompt: (prompt: IUIPrompt) => dispatch(PopupRedux.PopupShowPrompt(prompt)),
    onClearAllFilters: () => dispatch(ColumnFilterRedux.ColumnFilterClearAll()),
    onHideQuickFilterBar: () => dispatch(GridRedux.QuickFilterBarHide()),
    onShowQuickFilterBar: () => dispatch(GridRedux.QuickFilterBarShow()),
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

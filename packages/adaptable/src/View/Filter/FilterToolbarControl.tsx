﻿import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import * as FilterRedux from '../../Redux/ActionsReducers/FilterRedux';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { AdaptablePopover } from '../AdaptablePopover';
import { ActiveFiltersPanel } from './ActiveFiltersPanel';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { IUIPrompt } from '../../Utilities/Interface/IMessage';
import { Flex } from 'rebass';
import CheckBox from '../../components/CheckBox';
import { ColumnFilter } from '../../PredefinedConfig/FilterState';

interface FilterToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<FilterToolbarControlComponent> {
  onShowPrompt: (prompt: IUIPrompt) => PopupRedux.PopupShowPromptAction;
  onHideQuickFilterBar: () => GridRedux.QuickFilterBarHideAction;
  onShowQuickFilterBar: () => GridRedux.QuickFilterBarShowAction;
  ColumnFilters: ColumnFilter[];

  IsQuickFilterVisible: boolean;
}

class FilterToolbarControlComponent extends React.Component<
  FilterToolbarControlComponentProps,
  {}
> {
  render(): any {
    let activeFiltersPanel = (
      <ActiveFiltersPanel
        Columns={this.props.Api.gridApi.getColumns()}
        Api={this.props.Api}
        ColumnFilters={this.props.ColumnFilters}
        AccessLevel={this.props.AccessLevel}
        onClear={(columnFilter: ColumnFilter) => this.onClearColumnFilter(columnFilter)}
        onSaveColumnFilterasUserFilter={(columnFilter: ColumnFilter) =>
          this.onSaveColumnFilterasUserFilter(columnFilter)
        }
      />
    );

    let content = (
      <Flex alignItems="stretch" className="ab-DashboardToolbar__Filter__wrap">
        {/*<Text mx={1}>{collapsedText}</Text>*/}
        {ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnFilters) && (
          <>
            <AdaptablePopover
              className="ab-DashboardToolbar__Filter__info"
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
              className="ab-DashboardToolbar__Filter__clear"
              onClick={() => this.onClearFilters()}
              tooltip="Clear Column Filters"
              disabled={this.props.ColumnFilters.length == 0}
              AccessLevel={this.props.AccessLevel}
            />
          </>
        )}
        <CheckBox
          className="ab-DashboardToolbar__Filter__active-check"
          disabled={
            this.props.Api.internalApi.isGridInPivotMode() ||
            !this.props.Api.internalApi.isQuickFilterActive()
          }
          fontSize={2}
          checked={this.props.IsQuickFilterVisible}
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
        className="ab-DashboardToolbar__Filter"
        headerText={StrategyConstants.FilterStrategyFriendlyName}
        onConfigure={() => this.props.onConfigure()}
      >
        {content}
      </PanelDashboard>
    );
  }

  private onClearFilters() {
    this.props.Api.filterApi.clearAllColumnFilter();
  }

  private onClearColumnFilter(columnFilter: ColumnFilter) {
    this.props.Api.filterApi.clearColumnFilterByColumn(columnFilter.ColumnId);
  }

  private onSaveColumnFilterasUserFilter(columnFilter: ColumnFilter): void {
    let prompt: IUIPrompt = {
      Header: 'Enter name for User Filter',
      Msg: '',
      ConfirmAction: FilterRedux.CreateUserFilterFromColumnFilter(columnFilter, ''),
    };
    this.props.onShowPrompt(prompt);
  }
}

function mapStateToProps(
  state: AdaptableState,
  ownProps: any
): Partial<FilterToolbarControlComponentProps> {
  return {
    ColumnFilters: state.Filter.ColumnFilters,
    IsQuickFilterVisible: state.Grid.IsQuickFilterVisible,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<FilterToolbarControlComponentProps> {
  return {
    onShowPrompt: (prompt: IUIPrompt) => dispatch(PopupRedux.PopupShowPrompt(prompt)),
    onHideQuickFilterBar: () => dispatch(GridRedux.QuickFilterBarHide()),
    onShowQuickFilterBar: () => dispatch(GridRedux.QuickFilterBarShow()),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.FilterStrategyId, ScreenPopups.FilterPopup)
      ),
  };
}

export let FilterToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterToolbarControlComponent);

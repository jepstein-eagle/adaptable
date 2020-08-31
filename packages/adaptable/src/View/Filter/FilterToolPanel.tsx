import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as FilterRedux from '../../Redux/ActionsReducers/FilterRedux';
import * as ToolPanelRedux from '../../Redux/ActionsReducers/ToolPanelRedux';
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { AdaptablePopover } from '../AdaptablePopover';
import { ActiveFiltersPanel } from './ActiveFiltersPanel';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { IUIPrompt } from '../../Utilities/Interface/IMessage';
import { Entitlement } from '../../PredefinedConfig/EntitlementState';
import { Flex, Box, Text } from 'rebass';
import CheckBox from '../../components/CheckBox';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
import { AdaptableToolPanel } from '../../PredefinedConfig/Common/Types';
import { PanelToolPanel } from '../Components/Panels/PanelToolPanel';
import { ColumnFilter, UserFilter } from '../../PredefinedConfig/FilterState';

interface FilterToolPanelComponentProps
  extends ToolPanelStrategyViewPopupProps<FilterToolPanelComponent> {
  onShowPrompt: (prompt: IUIPrompt) => PopupRedux.PopupShowPromptAction;
  onHideQuickFilterBar: () => GridRedux.QuickFilterBarHideAction;
  onShowQuickFilterBar: () => GridRedux.QuickFilterBarShowAction;
  ColumnFilters: ColumnFilter[];
  Columns: AdaptableColumn[];
  UserFilters: UserFilter[];
  Entitlements: Entitlement[];
  IsQuickFilterVisible: boolean;
}

interface FilterTToolPanelComponentState {
  IsMinimised: boolean;
}

class FilterToolPanelComponent extends React.Component<
  FilterToolPanelComponentProps,
  FilterTToolPanelComponentState
> {
  constructor(props: FilterToolPanelComponentProps) {
    super(props);
    this.state = { IsMinimised: true };
  }

  render(): any {
    let activeFiltersPanel = (
      <ActiveFiltersPanel
        columns={this.props.Columns}
        columnFilters={this.props.ColumnFilters}
        api={this.props.api}
        accessLevel={this.props.accessLevel}
        onClear={(columnFilter: ColumnFilter) => this.onClearColumnFilter(columnFilter)}
        onSaveColumnFilterasUserFilter={(columnFilter: ColumnFilter) =>
          this.onSaveColumnFilterasUserFilter(columnFilter)
        }
      />
    );

    let content = (
      <Flex flexDirection="column" alignItems="stretch" className="ab-ToolPanel__Filter__wrap">
        <Flex flexDirection="row" alignItems="stretch" className={'ab-ToolPanel__Filter__wrap'}>
          {ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnFilters) && (
            <>
              <AdaptablePopover
                className="ab-ToolPanel__Filter__info"
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
                marginBottom={0}
                className="ab-ToolPanel__Filter__clear"
                onClick={() => this.onClearFilters()}
                tooltip="Clear Column Filters"
                disabled={this.props.ColumnFilters.length == 0}
                accessLevel={this.props.accessLevel}
              >
                Clear
              </ButtonClear>
            </>
          )}
        </Flex>
        <Flex flexDirection="row" alignItems="stretch" className={'ab-ToolPanel__Filter__wrap'}>
          <CheckBox
            className="ab-ToolPanel__Filter__active-check"
            disabled={
              this.props.api.internalApi.isGridInPivotMode() ||
              !this.props.api.internalApi.isQuickFilterActive()
            }
            marginLeft={1}
            marginTop={0}
            fontSize={2}
            padding={1}
            checked={this.props.IsQuickFilterVisible}
            onChange={(checked: boolean) => {
              checked ? this.props.onShowQuickFilterBar() : this.props.onHideQuickFilterBar();
            }}
          >
            Show Quick Filter
          </CheckBox>
        </Flex>
      </Flex>
    );

    return (
      <PanelToolPanel
        className="ab-ToolPanel__Filter"
        headerText={StrategyConstants.FilterStrategyFriendlyName}
        onConfigure={() => this.props.onConfigure()}
        onMinimiseChanged={() => this.setState({ IsMinimised: !this.state.IsMinimised })}
        isMinimised={this.state.IsMinimised}
        onClose={() => this.props.onClose('Filter')}
      >
        {this.state.IsMinimised ? null : content}
      </PanelToolPanel>
    );
  }

  private onClearFilters() {
    this.props.api.filterApi.clearAllColumnFilter();
  }

  private onClearColumnFilter(columnFilter: ColumnFilter) {
    this.props.api.filterApi.clearColumnFilterByColumn(columnFilter.ColumnId);
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
): Partial<FilterToolPanelComponentProps> {
  return {
    ColumnFilters: state.Filter.ColumnFilters,
    IsQuickFilterVisible: state.Grid.IsQuickFilterVisible,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<FilterToolPanelComponentProps> {
  return {
    onShowPrompt: (prompt: IUIPrompt) => dispatch(PopupRedux.PopupShowPrompt(prompt)),
    onHideQuickFilterBar: () => dispatch(GridRedux.QuickFilterBarHide()),
    onShowQuickFilterBar: () => dispatch(GridRedux.QuickFilterBarShow()),
    onClose: (toolPanel: AdaptableToolPanel) =>
      dispatch(ToolPanelRedux.ToolPanelHideToolPanel(toolPanel)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.FilterStrategyId, ScreenPopups.FilterPopup)
      ),
  };
}

export let FilterToolPanel = connect(mapStateToProps, mapDispatchToProps)(FilterToolPanelComponent);

import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as UserFilterRedux from '../../Redux/ActionsReducers/UserFilterRedux';
import * as ToolPanelRedux from '../../Redux/ActionsReducers/ToolPanelRedux';
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
import { AccessLevel } from '../../PredefinedConfig/Common/Enums';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { ColumnFilter } from '../../PredefinedConfig/ColumnFilterState';
import { ActiveFiltersPanel } from './ActiveFiltersPanel';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { IUIPrompt } from '../../Utilities/Interface/IMessage';
import { UserFilter } from '../../PredefinedConfig/UserFilterState';
import { Entitlement } from '../../PredefinedConfig/EntitlementsState';
import { Flex } from 'rebass';
import CheckBox from '../../components/CheckBox';
import { AdaptableDashboardToolbar } from '../../PredefinedConfig/DashboardState';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
import { AdaptableToolPanel } from '../../PredefinedConfig/ToolPanelState';
import { PanelToolPanel } from '../Components/Panels/PanelToolPanel';

interface ColumnFilterToolPanelComponentProps
  extends ToolPanelStrategyViewPopupProps<ColumnFilterToolPanelComponent> {
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

interface ColumnFilterTToolPanelComponentState {
  IsMinimised: boolean;
}

class ColumnFilterToolPanelComponent extends React.Component<
  ColumnFilterToolPanelComponentProps,
  ColumnFilterTToolPanelComponentState
> {
  constructor(props: ColumnFilterToolPanelComponentProps) {
    super(props);
    this.state = { IsMinimised: true };
  }

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
      <Flex alignItems="stretch" className="ab-ToolPanel__ColumnFilter__wrap">
        {/*<Text mx={1}>{collapsedText}</Text>*/}
        {ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnFilters) && (
          <>
            <AdaptablePopover
              className="ab-ToolPanel__ColumnFilter__info"
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
              className="ab-ToolPanel__ColumnFilter__clear"
              onClick={() => this.onClearFilters()}
              tooltip="Clear Column Filters"
              disabled={this.props.ColumnFilters.length == 0}
              AccessLevel={this.props.AccessLevel}
            />
          </>
        )}
        <CheckBox
          className="ab-ToolPanel__ColumnFilter__active-check"
          disabled={this.props.Blotter.api.internalApi.isGridInPivotMode()}
          marginLeft={1}
          marginTop={0}
          padding={1}
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
      <PanelToolPanel
        className="ab-ToolPanel__ColumnFilter"
        headerText={StrategyConstants.ColumnFilterStrategyName}
        onConfigure={() => this.props.onConfigure()}
        onMinimiseChanged={() => this.setState({ IsMinimised: !this.state.IsMinimised })}
        isMinimised={this.state.IsMinimised}
        onClose={() => this.props.onClose('ColumnFilter')}
      >
        {this.state.IsMinimised ? null : content}
      </PanelToolPanel>
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

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    ColumnFilters: state.ColumnFilter.ColumnFilters,
    Entitlements: state.Entitlements.FunctionEntitlements,
    IsQuickFilterActive: state.Grid.IsQuickFilterActive,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onClearColumnFilter: (columnFilter: ColumnFilter) =>
      dispatch(ColumnFilterRedux.ColumnFilterClear(columnFilter)),
    onShowPrompt: (prompt: IUIPrompt) => dispatch(PopupRedux.PopupShowPrompt(prompt)),
    onClearAllFilters: () => dispatch(ColumnFilterRedux.ColumnFilterClearAll()),
    onHideQuickFilterBar: () => dispatch(GridRedux.QuickFilterBarHide()),
    onShowQuickFilterBar: () => dispatch(GridRedux.QuickFilterBarShow()),
    onClose: (toolPanel: AdaptableToolPanel) =>
      dispatch(ToolPanelRedux.ToolPanelHideToolPanel(toolPanel)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.ColumnFilterStrategyId,
          ScreenPopups.ColumnFilterPopup
        )
      ),
  };
}

export let ColumnFilterToolPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnFilterToolPanelComponent);

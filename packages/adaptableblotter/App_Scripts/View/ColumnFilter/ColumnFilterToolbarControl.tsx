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
import { IColumnFilter } from '../../PredefinedConfig/IUserState/ColumnFilterState';
import { Label } from 'react-bootstrap';
import { ActiveFiltersPanel } from './ActiveFiltersPanel';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { IUIPrompt } from '../../Utilities/Interface/IMessage';
import { SUCCESS_BSSTYLE, DEFAULT_BSSTYLE } from '../../Utilities/Constants/StyleConstants';
import { ButtonHide } from '../Components/Buttons/ButtonHide';
import { ButtonShow } from '../Components/Buttons/ButtonShow';
import { IUserFilter } from '../../PredefinedConfig/IUserState/UserFilterState';
import { IEntitlement } from '../../PredefinedConfig/IDesignTimeState/EntitlementsState';

interface ColumnFilterToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<ColumnFilterToolbarControlComponent> {
  onClearAllFilters: () => ColumnFilterRedux.ColumnFilterClearAllAction;
  onClearColumnFilter: (columnId: string) => ColumnFilterRedux.ColumnFilterClearAction;
  onShowPrompt: (prompt: IUIPrompt) => PopupRedux.PopupShowPromptAction;
  onHideQuickFilterBar: () => GridRedux.QuickFilterBarHideAction;
  onShowQuickFilterBar: () => GridRedux.QuickFilterBarShowAction;
  ColumnFilters: IColumnFilter[];
  Columns: IColumn[];
  UserFilters: IUserFilter[];
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
        onClear={(columnFilter: IColumnFilter) => this.onClearColumnFilter(columnFilter)}
        onSaveColumnFilterasUserFilter={(columnFilter: IColumnFilter) =>
          this.onSaveColumnFilterasUserFilter(columnFilter)
        }
      />
    );

    let content = (
      <span>
        <div
          className={
            this.props.AccessLevel == AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : ''
          }
        >
          <Label bsSize={'large'} bsStyle={this.getStyleForLabel()}>
            {collapsedText}
          </Label>{' '}
          {ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnFilters) && (
            <span>
              <AdaptablePopover
                showDefaultStyle={this.props.UseSingleColourForButtons}
                size={this.props.DashboardSize}
                cssClassName={cssClassName}
                headerText=""
                bodyText={[activeFiltersPanel]}
                tooltipText={'Show Filter Details'}
                useButton={true}
                triggerAction={'click'}
                popoverMinWidth={400}
              />{' '}
              <ButtonClear
                onClick={() => this.onClearFilters()}
                bsStyle={'primary'}
                cssClassName={cssClassName}
                size={this.props.DashboardSize}
                overrideTooltip="Clear Column Filters"
                DisplayMode="Text"
                overrideDisableButton={this.props.ColumnFilters.length == 0}
                AccessLevel={this.props.AccessLevel}
                showDefaultStyle={this.props.UseSingleColourForButtons}
              />
            </span>
          )}
          {this.props.IsQuickFilterActive ? (
            <ButtonHide
              style={{ marginLeft: '2px' }}
              cssClassName={cssClassName}
              onClick={() => this.props.onHideQuickFilterBar()}
              size={this.props.DashboardSize}
              overrideTooltip="Hide Quick Filter"
              DisplayMode="Glyph"
              AccessLevel={this.props.AccessLevel}
              overrideDisableButton={
                !this.props.Blotter.blotterOptions.filterOptions.useAdaptableBlotterQuickFilter
              }
              showDefaultStyle={this.props.UseSingleColourForButtons}
            />
          ) : (
            <ButtonShow
              style={{ marginLeft: '2px' }}
              cssClassName={cssClassName}
              onClick={() => this.props.onShowQuickFilterBar()}
              size={this.props.DashboardSize}
              overrideTooltip="Show Quick Filter"
              DisplayMode="Glyph"
              AccessLevel={this.props.AccessLevel}
              overrideDisableButton={
                !this.props.Blotter.blotterOptions.filterOptions.useAdaptableBlotterQuickFilter
              }
              showDefaultStyle={this.props.UseSingleColourForButtons}
            />
          )}
        </div>
      </span>
    );

    return (
      <PanelDashboard
        cssClassName={cssClassName}
        useDefaultPanelStyle={this.props.UseSingleColourForButtons}
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

  private onClearColumnFilter(columnFilter: IColumnFilter) {
    this.props.onClearColumnFilter(columnFilter.ColumnId);
    this.props.Blotter.clearColumnFiltering([columnFilter.ColumnId]);
  }

  private onSaveColumnFilterasUserFilter(columnFilter: IColumnFilter): void {
    let prompt: IUIPrompt = {
      Header: 'Enter name for User Filter',
      Msg: '',
      ConfirmAction: UserFilterRedux.CreateUserFilterFromColumnFilter(columnFilter, ''),
    };
    this.props.onShowPrompt(prompt);
  }

  private getStyleForLabel(): string {
    return this.props.UseSingleColourForButtons == false &&
      ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnFilters)
      ? SUCCESS_BSSTYLE
      : DEFAULT_BSSTYLE;
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
    onClearColumnFilter: (columnId: string) =>
      dispatch(ColumnFilterRedux.ColumnFilterClear(columnId)),
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

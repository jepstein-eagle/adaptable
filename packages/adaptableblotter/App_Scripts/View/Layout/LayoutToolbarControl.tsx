import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { ButtonSave } from '../Components/Buttons/ButtonSave';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { ButtonUndo } from '../Components/Buttons/ButtonUndo';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { Layout } from '../../PredefinedConfig/RunTimeState/LayoutState';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { AccessLevel, DashboardSize } from '../../PredefinedConfig/Common/Enums';
import Dropdown from '../../components/Dropdown';
import { Flex } from 'rebass';

interface LayoutToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<LayoutToolbarControlComponent> {
  onSelectLayout: (layoutName: string) => LayoutRedux.LayoutSelectAction;
  onSaveLayout: (layout: Layout) => LayoutRedux.LayoutSaveAction;
  onNewLayout: () => PopupRedux.PopupShowScreenAction;
  Layouts: Layout[];
  CurrentLayout: string;
}

class LayoutToolbarControlComponent extends React.Component<
  LayoutToolbarControlComponentProps,
  {}
> {
  render(): any {
    let nonDefaultLayouts = this.props.Layouts.filter(
      l => l.Name != GeneralConstants.DEFAULT_LAYOUT
    );
    let layoutEntity = nonDefaultLayouts.find(
      x => x.Name == this.props.CurrentLayout || x.Uuid == this.props.CurrentLayout
    );
    let currentLayoutTitle = layoutEntity ? layoutEntity.Name : 'Select a Layout';

    let availableLayouts: any = nonDefaultLayouts.filter(l => l.Name != currentLayoutTitle);

    let availableLayoutOptions: any = nonDefaultLayouts.map((layout, index) => {
      return {
        ...layout,
        label: layout.Name,
        value: layout.Name,
      };
    });

    if (this.isLayoutModified(layoutEntity)) {
      currentLayoutTitle += ' (Modified)';
    }

    let content = (
      <Flex flexDirection="row">
        <Dropdown
          disabled={availableLayoutOptions.length == 0}
          style={{ minWidth: 160 }}
          marginRight={2}
          placeholder="Select Layout"
          value={layoutEntity ? layoutEntity.Name : null}
          options={availableLayoutOptions}
          onChange={(layoutName: any) => {
            if (layoutName) {
              this.onLayoutChanged(layoutName as string);
              return;
            }

            this.onLayoutChanged(GeneralConstants.DEFAULT_LAYOUT);
          }}
          clearButtonProps={{
            tooltip: 'Clear layout',
            disabled: this.props.CurrentLayout == GeneralConstants.DEFAULT_LAYOUT,
            AccessLevel: this.props.AccessLevel,
          }}
          showClearButton={this.props.CurrentLayout !== GeneralConstants.DEFAULT_LAYOUT}
        />

        <Flex
          flexDirection="row"
          className={
            this.props.AccessLevel == AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : ''
          }
        >
          <ButtonSave
            onClick={() => this.onSave()}
            tooltip="Save Changes to Current Layout"
            disabled={this.props.CurrentLayout == GeneralConstants.DEFAULT_LAYOUT}
            AccessLevel={this.props.AccessLevel}
          />

          <ButtonNew
            children={null}
            tone="none"
            variant="text"
            onClick={() => this.props.onNewLayout()}
            tooltip="Create a new Layout"
            AccessLevel={this.props.AccessLevel}
          />

          <ButtonUndo
            onClick={() => this.props.onSelectLayout(this.props.CurrentLayout)}
            tooltip="Undo Layout Changes"
            disabled={!currentLayoutTitle.endsWith('(Modified)')}
            AccessLevel={this.props.AccessLevel}
          />

          <ButtonDelete
            tooltip="Delete Layout"
            disabled={this.props.CurrentLayout == GeneralConstants.DEFAULT_LAYOUT}
            ConfirmAction={LayoutRedux.LayoutDelete(layoutEntity)}
            ConfirmationMsg={"Are you sure you want to delete '" + this.props.CurrentLayout + "'?"}
            ConfirmationTitle={'Delete Layout'}
            AccessLevel={this.props.AccessLevel}
          />
        </Flex>
      </Flex>
    );

    return (
      <PanelDashboard
        headerText={StrategyConstants.LayoutStrategyName}
        glyphicon={StrategyConstants.LayoutGlyph}
        onClose={() => this.props.onClose(StrategyConstants.LayoutStrategyId)}
        onConfigure={() => this.props.onConfigure()}
      >
        {content}
      </PanelDashboard>
    );
  }

  private isLayoutModified(layoutEntity: Layout): boolean {
    if (layoutEntity) {
      if (
        !ArrayExtensions.areArraysEqualWithOrder(
          layoutEntity.Columns,
          this.props.Columns.filter(y => y.Visible).map(x => x.ColumnId)
        )
      ) {
        return true;
      }
      if (
        !ArrayExtensions.areArraysEqualWithOrderandProperties(
          layoutEntity.ColumnSorts,
          this.props.ColumnSorts
        )
      ) {
        return true;
      }
    }
    return false;
  }

  private onLayoutChanged(layoutName: string): any {
    this.props.onSelectLayout(layoutName);
  }

  private onSelectedLayoutChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.props.onSelectLayout(e.value);
  }

  private onSave() {
    let currentLayoutObject: Layout = this.props.Layouts.find(
      l => l.Name == this.props.CurrentLayout
    );
    let gridState: any = currentLayoutObject ? currentLayoutObject.VendorGridInfo : null;

    let visibleColumns = this.props.Columns.filter(c => c.Visible);
    let layoutToSave: Layout = {
      Uuid: currentLayoutObject.Uuid,
      Name: this.props.CurrentLayout,
      Columns: visibleColumns ? visibleColumns.map(x => x.ColumnId) : [],
      ColumnSorts: this.props.ColumnSorts,
      VendorGridInfo: gridState,
    };
    this.props.onSaveLayout(layoutToSave);
  }

  private onUndo() {
    this.props.onSelectLayout(this.props.CurrentLayout);
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    CurrentLayout: state.Layout.CurrentLayout,
    Layouts: state.Layout.Layouts,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onSelectLayout: (layoutName: string) => dispatch(LayoutRedux.LayoutSelect(layoutName)),
    onSaveLayout: (layout: Layout) => dispatch(LayoutRedux.LayoutSave(layout)),
    onNewLayout: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.LayoutStrategyId, ScreenPopups.LayoutPopup, {
          action: 'New',
        })
      ),
    onClose: (dashboardControl: string) =>
      dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.LayoutStrategyId, ScreenPopups.LayoutPopup)
      ),
  };
}

export let LayoutToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutToolbarControlComponent);

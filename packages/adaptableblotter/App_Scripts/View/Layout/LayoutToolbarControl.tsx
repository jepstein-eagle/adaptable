import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { InputGroup, MenuItem, DropdownButton } from 'react-bootstrap';
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
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { Layout } from '../../PredefinedConfig/IUserState/LayoutState';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { AccessLevel, DashboardSize } from '../../PredefinedConfig/Common/Enums';

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
    let cssClassName: string = this.props.cssClassName + '__layout';
    let nonDefaultLayouts = this.props.Layouts.filter(
      l => l.Name != GeneralConstants.DEFAULT_LAYOUT
    );
    let layoutEntity = nonDefaultLayouts.find(x => x.Name == this.props.CurrentLayout);
    let currentLayoutTitle = layoutEntity ? layoutEntity.Name : 'Select a Layout';

    let availableLayouts: any = nonDefaultLayouts
      .filter(l => l.Name != currentLayoutTitle)
      .map((layout, index) => {
        return (
          <MenuItem key={index} eventKey={index} onClick={() => this.onLayoutChanged(layout.Name)}>
            {layout.Name}
          </MenuItem>
        );
      });

    if (this.isLayoutModified(layoutEntity)) {
      currentLayoutTitle += ' (Modified)';
    }

    let content = (
      <span>
        <InputGroup>
          <DropdownButton
            disabled={availableLayouts.length == 0}
            style={{ minWidth: '120px' }}
            className={cssClassName}
            bsSize={this.props.DashboardSize}
            bsStyle={'default'}
            title={currentLayoutTitle}
            id="layout"
          >
            {availableLayouts}
          </DropdownButton>

          {this.props.CurrentLayout != GeneralConstants.DEFAULT_LAYOUT && (
            <InputGroup.Button>
              <ButtonClear
                bsStyle={'default'}
                cssClassName={cssClassName}
                onClick={() => this.onLayoutChanged(GeneralConstants.DEFAULT_LAYOUT)}
                size={this.props.DashboardSize}
                overrideTooltip="Clear layout"
                overrideDisableButton={this.props.CurrentLayout == GeneralConstants.DEFAULT_LAYOUT}
                DisplayMode="Glyph"
                AccessLevel={this.props.AccessLevel}
                showDefaultStyle={this.props.UseSingleColourForButtons}
              />
            </InputGroup.Button>
          )}
        </InputGroup>

        <span
          className={
            this.props.AccessLevel == AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : ''
          }
        >
          <ButtonSave
            style={{ marginLeft: '5px' }}
            cssClassName={cssClassName}
            onClick={() => this.onSave()}
            size={this.props.DashboardSize}
            overrideTooltip="Save Changes to Current Layout"
            overrideDisableButton={this.props.CurrentLayout == GeneralConstants.DEFAULT_LAYOUT}
            DisplayMode="Glyph"
            AccessLevel={this.props.AccessLevel}
            showDefaultStyle={this.props.UseSingleColourForButtons}
          />

          <ButtonNew
            style={{ marginLeft: '2px' }}
            cssClassName={cssClassName}
            onClick={() => this.props.onNewLayout()}
            size={this.props.DashboardSize}
            overrideTooltip="Create a new Layout"
            DisplayMode="Glyph"
            AccessLevel={this.props.AccessLevel}
            showDefaultStyle={this.props.UseSingleColourForButtons}
          />

          <ButtonUndo
            style={{ marginLeft: '2px' }}
            cssClassName={cssClassName}
            onClick={() => this.props.onSelectLayout(this.props.CurrentLayout)}
            size={this.props.DashboardSize}
            overrideTooltip="Undo Layout Changes"
            overrideDisableButton={!currentLayoutTitle.endsWith('(Modified)')}
            DisplayMode="Glyph"
            AccessLevel={this.props.AccessLevel}
            showDefaultStyle={this.props.UseSingleColourForButtons}
          />

          <ButtonDelete
            style={{ marginLeft: '2px' }}
            cssClassName={cssClassName}
            size={this.props.DashboardSize}
            overrideTooltip="Delete Layout"
            overrideDisableButton={this.props.CurrentLayout == GeneralConstants.DEFAULT_LAYOUT}
            DisplayMode="Glyph"
            ConfirmAction={LayoutRedux.LayoutDelete(layoutEntity)}
            ConfirmationMsg={"Are you sure you want to delete '" + this.props.CurrentLayout + "'?"}
            ConfirmationTitle={'Delete Layout'}
            AccessLevel={this.props.AccessLevel}
            showDefaultStyle={this.props.UseSingleColourForButtons}
          />
        </span>
      </span>
    );

    return (
      <PanelDashboard
        cssClassName={cssClassName}
        useDefaultPanelStyle={this.props.UseSingleColourForButtons}
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

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onSelectLayout: (layoutName: string) => dispatch(LayoutRedux.LayoutSelect(layoutName)),
    onSaveLayout: (layout: Layout) => dispatch(LayoutRedux.LayoutSave(layout)),
    onNewLayout: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.LayoutStrategyId,
          ScreenPopups.LayoutPopup,
          'New'
        )
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

import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';
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
import { Layout } from '../../PredefinedConfig/LayoutState';
import { AccessLevel } from '../../PredefinedConfig/Common/Enums';
import Dropdown from '../../components/Dropdown';
import { Flex } from 'rebass';
import join from '../../components/utils/join';
import StringExtensions from '../../Utilities/Extensions/StringExtensions';
import { AdaptableBlotterDashboardToolbar } from '../../PredefinedConfig/DashboardState';

interface LayoutToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<LayoutToolbarControlComponent> {
  onSelectLayout: (layoutName: string) => LayoutRedux.LayoutSelectAction;
  onRestoreLayout: (layout: Layout) => LayoutRedux.LayoutRestoreAction;
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
    // this is wrong at the moment an always returning true
    // but not going to worry until we test with non autosavelayouts (that dont think anyone uses)
    // but worth fixing and then making that save button enabled depending on whether this is true
    let isModifiedLayout: boolean = this.props.Blotter.LayoutService.isLayoutModified(layoutEntity);

    let isManualSaveLayout: boolean =
      this.props.Blotter.blotterOptions.layoutOptions!.autoSaveLayouts == false;

    let availableLayoutOptions: any = nonDefaultLayouts.map((layout, index) => {
      return {
        ...layout,
        label: layout.Name,
        value: layout.Name,
      };
    });

    let content = (
      <Flex flexDirection="row">
        <Dropdown
          disabled={availableLayoutOptions.length == 0}
          style={{ minWidth: 160 }}
          marginRight={2}
          className="ab-DashboardToolbar__Layout__select"
          placeholder="Select Layout"
          value={layoutEntity ? layoutEntity.Name : null}
          options={availableLayoutOptions}
          onChange={(layoutName: any) => {
            this.onSelectedLayoutChanged(layoutName);
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
          className={join(
            this.props.AccessLevel == AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : '',
            'ab-DashboardToolbar__Layout__wrap'
          )}
        >
          {isManualSaveLayout && (
            <ButtonSave
              className="ab-DashboardToolbar__Layout__save"
              onClick={() => this.onSaveLayout()}
              tooltip="Save Changes to Current Layout"
              disabled={this.props.CurrentLayout == GeneralConstants.DEFAULT_LAYOUT}
              AccessLevel={this.props.AccessLevel}
            />
          )}

          <ButtonNew
            children={null}
            tone="neutral"
            variant="text"
            className="ab-DashboardToolbar__Layout__new"
            onClick={() => this.props.onNewLayout()}
            tooltip="Create a new Layout"
            AccessLevel={this.props.AccessLevel}
          />

          <ButtonUndo
            className="ab-DashboardToolbar__Layout__undo"
            onClick={() =>
              isManualSaveLayout
                ? this.onSelectedLayoutChanged(this.props.CurrentLayout)
                : this.onRestoreLayout()
            }
            disabled={
              this.props.CurrentLayout == GeneralConstants.DEFAULT_LAYOUT //|| !isModifiedLayout
            }
            tooltip={isManualSaveLayout ? 'Undo Layout Changes' : 'Restore Layout'}
            AccessLevel={this.props.AccessLevel}
          />

          <ButtonDelete
            tooltip="Delete Layout"
            className="ab-DashboardToolbar__Layout__delete"
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
        className="ab-DashboardToolbar__Layout"
        headerText={StrategyConstants.LayoutStrategyName}
        glyphicon={StrategyConstants.LayoutGlyph}
        onClose={() => this.props.onClose(StrategyConstants.LayoutStrategyId)}
        onConfigure={() => this.props.onConfigure()}
      >
        {content}
      </PanelDashboard>
    );
  }

  private onSelectedLayoutChanged(layoutName: string): any {
    if (StringExtensions.IsNotNullOrEmpty(layoutName)) {
      this.props.onSelectLayout(layoutName);
    } else {
      this.props.onSelectLayout(GeneralConstants.DEFAULT_LAYOUT);
    }
  }

  private onSaveLayout() {
    let currentLayoutObject: Layout | undefined = this.props.Layouts.find(
      l => l.Name == this.props.CurrentLayout
    );
    if (currentLayoutObject) {
      let gridState: any = currentLayoutObject ? currentLayoutObject.VendorGridInfo : null;

      let visibleColumns = this.props.Columns.filter(c => c.Visible);
      let layoutToSave: Layout = {
        Uuid: currentLayoutObject.Uuid,
        Name: this.props.CurrentLayout,
        Columns: currentLayoutObject.Columns,
        ColumnSorts: currentLayoutObject.ColumnSorts,
        VendorGridInfo: gridState,
        BlotterGridInfo: {
          CurrentColumns: visibleColumns ? visibleColumns.map(x => x.ColumnId) : [],
          CurrentColumnSorts: this.props.ColumnSorts,
        },
      };
      this.props.onSaveLayout(layoutToSave);
    }
  }

  private onRestoreLayout() {
    let currentLayoutObject: Layout | undefined = this.props.Layouts.find(
      l => l.Name == this.props.CurrentLayout
    );
    if (currentLayoutObject) {
      this.props.onRestoreLayout(currentLayoutObject);
    }
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
    onRestoreLayout: (layout: Layout) => dispatch(LayoutRedux.LayoutRestore(layout)),
    onNewLayout: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.LayoutStrategyId, ScreenPopups.LayoutPopup, {
          action: 'New',
          source: 'Toolbar',
        })
      ),
    onClose: (toolbar: AdaptableBlotterDashboardToolbar) =>
      dispatch(DashboardRedux.DashboardHideToolbar(toolbar)),
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

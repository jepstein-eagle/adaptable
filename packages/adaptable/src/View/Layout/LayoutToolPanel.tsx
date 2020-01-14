import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as ToolPanelRedux from '../../Redux/ActionsReducers/ToolPanelRedux';
import { ButtonSave } from '../Components/Buttons/ButtonSave';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { ButtonUndo } from '../Components/Buttons/ButtonUndo';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { Layout } from '../../PredefinedConfig/LayoutState';
import { AccessLevel } from '../../PredefinedConfig/Common/Enums';
import Dropdown from '../../components/Dropdown';
import { Flex } from 'rebass';
import join from '../../components/utils/join';
import { PanelToolPanel } from '../Components/Panels/PanelToolPanel';
import { AdaptableApi } from '../../Api/AdaptableApi';
import StringExtensions from '../../Utilities/Extensions/StringExtensions';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
import { AdaptableToolPanel } from '../../PredefinedConfig/Common/Types';

interface LayoutToolPanelComponentProps
  extends ToolPanelStrategyViewPopupProps<LayoutToolPanelComponent> {
  onSelectLayout: (layoutName: string) => LayoutRedux.LayoutSelectAction;
  onRestoreLayout: (layout: Layout) => LayoutRedux.LayoutRestoreAction;
  onSaveLayout: (layout: Layout) => LayoutRedux.LayoutSaveAction;
  onNewLayout: () => PopupRedux.PopupShowScreenAction;
  Layouts: Layout[];
  CurrentLayout: string;
  AdaptableApi: AdaptableApi;
}

interface LayoutToolPanelComponentState {
  IsMinimised: boolean;
}

class LayoutToolPanelComponent extends React.Component<
  LayoutToolPanelComponentProps,
  LayoutToolPanelComponentState
> {
  constructor(props: LayoutToolPanelComponentProps) {
    super(props);
    this.state = { IsMinimised: true };
  }

  render(): any {
    let nonDefaultLayouts = this.props.Layouts.filter(
      l => l.Name != GeneralConstants.DEFAULT_LAYOUT
    );
    let layoutEntity = nonDefaultLayouts.find(
      x => x.Name == this.props.CurrentLayout || x.Uuid == this.props.CurrentLayout
    );

    // let availableLayouts: any = nonDefaultLayouts.filter(l => l.Name != currentLayoutTitle);

    // this is wrong at the moment an always returning true
    // but not going to worry until we test with non autosavelayouts (that dont think anyone uses)
    // but worth fixing and then making that save button enabled depending on whether this is true
    let isModifiedLayout: boolean = this.props.Adaptable.LayoutService.isLayoutModified(
      layoutEntity
    );

    let isManualSaveLayout: boolean =
      this.props.AdaptableApi.gridApi.getadaptableOptions().layoutOptions!.autoSaveLayouts == false;

    let availableLayoutOptions: any = nonDefaultLayouts.map((layout, index) => {
      return {
        ...layout,
        label: layout.Name,
        value: layout.Name,
      };
    });

    let content = (
      <Flex flexDirection="column">
        <Flex flexDirection="row" alignItems="stretch" className="ab-ToolPanel__Layout__wrap">
          <Dropdown
            disabled={availableLayoutOptions.length == 0}
            style={{ minWidth: 170 }}
            className="ab-ToolPanel__Layout__select"
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
        </Flex>
        <Flex
          flexDirection="row"
          className={join(
            this.props.AccessLevel == AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : '',
            'ab-ToolPanel__Layout__wrap'
          )}
        >
          {isManualSaveLayout && (
            <ButtonSave
              className="ab-ToolPanel__Layout__save"
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
            className="ab-ToolPanel__Layout__new"
            onClick={() => this.props.onNewLayout()}
            tooltip="Create a new Layout"
            AccessLevel={this.props.AccessLevel}
          />

          <ButtonUndo
            className="ab-ToolPanel__Layout__undo"
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
            className="ab-ToolPanel__Layout__delete"
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
      <PanelToolPanel
        className="ab-ToolPanel__Layout"
        headerText={StrategyConstants.LayoutStrategyFriendlyName}
        onConfigure={() => this.props.onConfigure()}
        onMinimiseChanged={() => this.setState({ IsMinimised: !this.state.IsMinimised })}
        isMinimised={this.state.IsMinimised}
        onClose={() => this.props.onClose('Layout')}
      >
        {this.state.IsMinimised ? null : content}
      </PanelToolPanel>
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
        AdaptableGridInfo: {
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

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    CurrentLayout: state.Layout.CurrentLayout,
    Layouts: state.Layout.Layouts,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
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
    onClose: (toolPanel: AdaptableToolPanel) =>
      dispatch(ToolPanelRedux.ToolPanelHideToolPanel(toolPanel)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.LayoutStrategyId, ScreenPopups.LayoutPopup)
      ),
  };
}

export let LayoutToolPanel = connect(mapStateToProps, mapDispatchToProps)(LayoutToolPanelComponent);

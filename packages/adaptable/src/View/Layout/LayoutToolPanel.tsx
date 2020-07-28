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

import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { Layout } from '../../PredefinedConfig/LayoutState';
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

  onSaveLayout: (layout: Layout) => LayoutRedux.LayoutSaveAction;
  onNewLayout: () => PopupRedux.PopupShowScreenAction;
  Layouts: Layout[];
  CurrentLayoutName: string;
  CurrentDraftLayout: Layout;
  CanSave: boolean;
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
      x => x.Name == this.props.CurrentLayoutName || x.Uuid == this.props.CurrentLayoutName
    );

    let isManualSaveLayout: boolean =
      this.props.Api.gridApi.getadaptableOptions().layoutOptions!.autoSaveLayouts == false;

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
            showClearButton={false}
          />
        </Flex>
        <Flex
          flexDirection="row"
          className={join(
            this.props.AccessLevel == 'ReadOnly' ? GeneralConstants.READ_ONLY_STYLE : '',
            'ab-ToolPanel__Layout__wrap'
          )}
        >
          {isManualSaveLayout && (
            <ButtonSave
              className="ab-ToolPanel__Layout__save"
              onClick={() => this.onSaveLayout()}
              tooltip="Save Changes to Current Layout"
              disabled={!this.props.CanSave}
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

          <ButtonDelete
            tooltip="Delete Layout"
            className="ab-ToolPanel__Layout__delete"
            disabled={this.props.Layouts.length <= 1}
            ConfirmAction={LayoutRedux.LayoutDelete(layoutEntity)}
            ConfirmationMsg={
              "Are you sure you want to delete '" + this.props.CurrentLayoutName + "'?"
            }
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
    const currentLayoutObject: Layout | null = this.props.CurrentDraftLayout;

    if (currentLayoutObject) {
      this.props.onSaveLayout(currentLayoutObject);
    }
  }
}

function mapStateToProps(
  state: AdaptableState,
  ownProps: any
): Partial<LayoutToolPanelComponentProps> {
  const CurrentLayoutName = state.Layout.CurrentLayout;
  const Layouts = state.Layout.Layouts || [];
  const selectedLayout = Layouts.find(l => l.Name === CurrentLayoutName);
  return {
    CurrentLayoutName,
    CurrentDraftLayout: state.Grid.CurrentLayout || selectedLayout,
    CanSave: !ownProps.Api.internalApi
      .getLayoutService()
      .areEqual(selectedLayout, state.Grid.CurrentLayout),
    Layouts,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<LayoutToolPanelComponentProps> {
  return {
    onSelectLayout: (layoutName: string) => dispatch(LayoutRedux.LayoutSelect(layoutName)),
    onSaveLayout: (layout: Layout) => dispatch(LayoutRedux.LayoutSave(layout)),

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

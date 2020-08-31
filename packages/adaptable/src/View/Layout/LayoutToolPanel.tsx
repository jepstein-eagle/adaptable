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
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';

interface LayoutToolPanelComponentProps
  extends ToolPanelStrategyViewPopupProps<LayoutToolPanelComponent> {
  onSelectLayout: (layoutName: string) => LayoutRedux.LayoutSelectAction;

  onSaveLayout: (layout: Layout) => LayoutRedux.LayoutSaveAction;
  onNewLayout: () => PopupRedux.PopupShowScreenAction;
  onEditLayout: () => PopupRedux.PopupShowScreenAction;
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
    let layoutEntity = this.props.Layouts.find(
      x => x.Name == this.props.CurrentLayoutName || x.Uuid == this.props.CurrentLayoutName
    );

    let isManualSaveLayout: boolean =
      this.props.api.internalApi.getAdaptableOptions().layoutOptions!.autoSaveLayouts == false;

    let availableLayoutOptions: any = this.props.Layouts.map((layout, index) => {
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
            style={{ minWidth: 160 }}
            marginRight={2}
            className="ab-ToolPanel__Layout__select"
            showEmptyItem={false}
            value={layoutEntity ? layoutEntity.Name : null}
            options={availableLayoutOptions}
            onChange={(layoutName: any) => {
              this.props.onSelectLayout(layoutName);
            }}
            showClearButton={false}
          />
        </Flex>
        <Flex
          flexDirection="row"
          className={join(
            this.props.accessLevel == 'ReadOnly' ? GeneralConstants.READ_ONLY_STYLE : '',
            'ab-ToolPanel__Layout__wrap'
          )}
        >
          {isManualSaveLayout && (
            <ButtonSave
              className="ab-ToolPanel__Layout__save"
              onClick={() => this.onSaveLayout()}
              tooltip="Save Changes to Current Layout"
              disabled={!this.props.CanSave}
              accessLevel={this.props.accessLevel}
            />
          )}
          <ButtonEdit
            onClick={() => this.props.onEditLayout()}
            tooltip="Edit Layout"
            className="ab-DashboardToolbar__Layout__edit"
            accessLevel={this.props.accessLevel}
          />

          <ButtonNew
            children={null}
            tone="neutral"
            variant="text"
            className="ab-ToolPanel__Layout__new"
            onClick={() => this.props.onNewLayout()}
            tooltip="Create a new Layout"
            accessLevel={this.props.accessLevel}
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
            accessLevel={this.props.accessLevel}
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
    CanSave: !ownProps.api.internalApi
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
    onEditLayout: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.LayoutStrategyId, ScreenPopups.LayoutPopup, {
          action: 'Edit',
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

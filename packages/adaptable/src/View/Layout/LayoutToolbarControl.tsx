import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
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
import Dropdown from '../../components/Dropdown';
import { Flex } from 'rebass';
import join from '../../components/utils/join';
import StringExtensions from '../../Utilities/Extensions/StringExtensions';
import { AdaptableDashboardToolbar } from '../../PredefinedConfig/Common/Types';
import { isEqual } from 'lodash';

interface LayoutToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<LayoutToolbarControlComponent> {
  onSelectLayout: (layoutName: string) => LayoutRedux.LayoutSelectAction;
  onSaveLayout: (layout: Layout) => LayoutRedux.LayoutSaveAction;
  onNewLayout: () => PopupRedux.PopupShowScreenAction;
  Layouts: Layout[];
  CurrentDraftLayout: Layout;
  CanSave: boolean;
  CurrentLayoutName: string;
}

class LayoutToolbarControlComponent extends React.Component<
  LayoutToolbarControlComponentProps,
  {}
> {
  render(): any {
    let layoutEntity = this.props.Layouts.find(
      x => x.Name == this.props.CurrentLayoutName || x.Uuid == this.props.CurrentLayoutName
    );
    // this is wrong at the moment an always returning true
    // but not going to worry until we test with non autosavelayouts (that dont think anyone uses)
    // but worth fixing and then making that save button enabled depending on whether this is true
    // let isModifiedLayout: boolean = this.props.Api.internalApi
    //   .getLayoutService()
    //   .isLayoutModified(layoutEntity); //TODO

    let isManualSaveLayout: boolean =
      this.props.Api.internalApi.getAdaptableOptions().layoutOptions!.autoSaveLayouts == false;

    let availableLayoutOptions: any = this.props.Layouts.map((layout, index) => {
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
            this.props.onSelectLayout(layoutName);
          }}
          showClearButton={false}
        />

        <Flex
          flexDirection="row"
          className={join(
            this.props.AccessLevel == 'ReadOnly' ? GeneralConstants.READ_ONLY_STYLE : '',
            'ab-DashboardToolbar__Layout__wrap'
          )}
        >
          {isManualSaveLayout && (
            <ButtonSave
              className="ab-DashboardToolbar__Layout__save"
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
            className="ab-DashboardToolbar__Layout__new"
            onClick={() => this.props.onNewLayout()}
            tooltip="Create a new Layout"
            AccessLevel={this.props.AccessLevel}
          />

          <ButtonDelete
            tooltip="Delete Layout"
            disabled={this.props.Layouts.length <= 1}
            className="ab-DashboardToolbar__Layout__delete"
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
      <PanelDashboard
        className="ab-DashboardToolbar__Layout"
        headerText={StrategyConstants.LayoutStrategyFriendlyName}
        onConfigure={() => this.props.onConfigure()}
      >
        {content}
      </PanelDashboard>
    );
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
): Partial<LayoutToolbarControlComponentProps> {
  const CurrentLayoutName = state.Layout.CurrentLayout;
  const Layouts = state.Layout.Layouts || [];
  const selectedLayout = Layouts.find(l => l.Name === CurrentLayoutName);

  return {
    CurrentLayoutName,
    CurrentDraftLayout: state.Grid.CurrentLayout || selectedLayout,
    Layouts,
    CanSave: !ownProps.Api.internalApi
      .getLayoutService()
      .areEqual(selectedLayout, state.Grid.CurrentLayout),
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<LayoutToolbarControlComponentProps> {
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

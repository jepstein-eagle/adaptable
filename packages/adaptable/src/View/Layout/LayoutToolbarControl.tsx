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
import { Flex } from 'rebass';
import join from '../../components/utils/join';
import { AdaptableDashboardToolbar } from '../../PredefinedConfig/Common/Types';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import DropdownButton from '../../components/DropdownButton';

interface LayoutToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<LayoutToolbarControlComponent> {
  onSelectLayout: (layoutName: string) => LayoutRedux.LayoutSelectAction;
  onSaveLayout: (layout: Layout) => void;
  onNewLayout: () => PopupRedux.PopupShowScreenAction;
  onEditLayout: () => PopupRedux.PopupShowScreenAction;
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

    let isManualSaveLayout: boolean = !this.props.api.layoutApi.shouldAutoSaveLayout(
      this.props.CurrentDraftLayout
    );

    let availableLayoutOptions: any = this.props.Layouts.map((layout, index) => {
      return {
        ...layout,
        label: layout.Name,
        value: layout.Name,
        onClick: () => this.props.onSelectLayout(layout.Name),
      };
    });

    let content = (
      <Flex flexDirection="row">
        <DropdownButton
          marginRight={2}
          columns={['label']}
          style={{ minWidth: 150, fontSize: 'small' }}
          className="ab-DashboardToolbar__Layout__select"
          items={availableLayoutOptions}
          disabled={availableLayoutOptions.length == 0}
        >
          {layoutEntity ? layoutEntity.Name : null}
        </DropdownButton>

        <Flex
          flexDirection="row"
          className={join(
            this.props.accessLevel == 'ReadOnly' ? GeneralConstants.READ_ONLY_STYLE : '',
            'ab-DashboardToolbar__Layout__wrap'
          )}
        >
          {isManualSaveLayout && (
            <ButtonSave
              className="ab-DashboardToolbar__Layout__save"
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
            className="ab-DashboardToolbar__Layout__new"
            onClick={() => this.props.onNewLayout()}
            tooltip="Create a new Layout"
            accessLevel={this.props.accessLevel}
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
            accessLevel={this.props.accessLevel}
          />
        </Flex>
      </Flex>
    );

    return (
      <PanelDashboard
        className="ab-DashboardToolbar__Layout"
        headerText={StrategyConstants.LayoutStrategyFriendlyName}
        onConfigure={() => this.props.onConfigure()}
        onClose={() => this.props.onClose('Layout')}
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
  ownProps: LayoutToolbarControlComponentProps
): Partial<LayoutToolbarControlComponentProps> {
  const CurrentLayoutName = state.Layout.CurrentLayout;
  const Layouts = state.Layout.Layouts || [];
  const selectedLayout = Layouts.find(l => l.Name === CurrentLayoutName);

  return {
    CurrentLayoutName,
    CurrentDraftLayout: state.Grid.CurrentLayout || selectedLayout,
    Layouts,
    CanSave:
      state.Grid.CurrentLayout &&
      !ownProps.api.internalApi
        .getLayoutService()
        .areEqual(selectedLayout, state.Grid.CurrentLayout),
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<LayoutToolbarControlComponentProps> {
  return {
    onSelectLayout: (layoutName: string) => dispatch(LayoutRedux.LayoutSelect(layoutName)),
    onSaveLayout: (layout: Layout) => {
      dispatch(LayoutRedux.LayoutSave(layout));
      dispatch(LayoutRedux.LayoutUpdateCurrentDraft(null));
    },

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
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.LayoutStrategyId, ScreenPopups.LayoutPopup)
      ),
    onClose: (toolbar: AdaptableDashboardToolbar) =>
      dispatch(DashboardRedux.DashboardCloseToolbar(toolbar)),
  };
}

export let LayoutToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutToolbarControlComponent);

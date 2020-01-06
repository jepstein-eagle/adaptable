import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as ToolPanelRedux from '../../Redux/ActionsReducers/ToolPanelRedux';
import * as ThemeRedux from '../../Redux/ActionsReducers/ThemeRedux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { AccessLevel } from '../../PredefinedConfig/Common/Enums';
import { AdaptableTheme } from '../../PredefinedConfig/ThemeState';
import DropdownButton from '../../components/DropdownButton';
import join from '../../components/utils/join';
import { PanelToolPanel } from '../Components/Panels/PanelToolPanel';
import Dropdown from '../../components/Dropdown';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
import { AdaptableToolPanel } from '../../PredefinedConfig/Common/Types';

interface ThemeToolPanelComponentProps
  extends ToolPanelStrategyViewPopupProps<ThemeToolPanelComponent> {
  onSelectTheme: (theme: string) => ThemeRedux.ThemeSelectAction;
  SystemThemes: AdaptableTheme[];
  UserThemes: AdaptableTheme[];
  CurrentTheme: string;
}

interface ThemeToolPanelComponentState {
  IsMinimised: boolean;
}

class ThemeToolPanelComponent extends React.Component<
  ThemeToolPanelComponentProps,
  ThemeToolPanelComponentState
> {
  constructor(props: ThemeToolPanelComponentProps) {
    super(props);
    this.state = { IsMinimised: true };
  }

  render(): any {
    let allThemes: AdaptableTheme[] = [...this.props.SystemThemes, ...this.props.UserThemes];

    let themes: any[] = allThemes.map((theme: AdaptableTheme, index) => {
      return {
        label: theme.Description,
        value: theme.Description,
      };
    });

    let currentTheme = allThemes.find(theme => theme.Name === this.props.CurrentTheme);

    return (
      <PanelToolPanel
        className="ab-ToolPanel__Theme"
        headerText={StrategyConstants.ThemeStrategyFriendlyName}
        onConfigure={() => this.props.onConfigure()}
        onMinimiseChanged={() => this.setState({ IsMinimised: !this.state.IsMinimised })}
        isMinimised={this.state.IsMinimised}
        onClose={() => this.props.onClose('Theme')}
      >
        {!this.state.IsMinimised && (
          <div
            className={join(
              this.props.AccessLevel == AccessLevel.ReadOnly
                ? GeneralConstants.READ_ONLY_STYLE
                : '',
              'ab-ToolPanel__Theme__wrap'
            )}
          >
            <Dropdown
              style={{ minWidth: 170 }}
              className="ab-ToolPanel__Theme__select"
              placeholder="Select Theme"
              showEmptyItem={false}
              value={currentTheme!.Description}
              options={themes}
              showClearButton={false}
              onChange={(themeDescription: string) => this.onSelectTheme(themeDescription)}
            />
          </div>
        )}
      </PanelToolPanel>
    );
  }

  private onSelectTheme(themeDescription: string) {
    let allThemes: AdaptableTheme[] = [...this.props.SystemThemes, ...this.props.UserThemes];
    let selectedTheme = allThemes.find(theme => theme.Description === themeDescription);
    if (selectedTheme) {
      this.props.onSelectTheme(selectedTheme.Name);
    }
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    SystemThemes: state.Theme.SystemThemes,
    CurrentTheme: state.Theme.CurrentTheme,
    UserThemes: state.Theme.UserThemes,
    Entitlements: state.Entitlements.FunctionEntitlements,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onSelectTheme: (theme: string) => dispatch(ThemeRedux.ThemeSelect(theme)),
    onClose: (toolPanel: AdaptableToolPanel) =>
      dispatch(ToolPanelRedux.ToolPanelHideToolPanel(toolPanel)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.ThemeStrategyId, ScreenPopups.ThemePopup)
      ),
  };
}

export let ThemeToolPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemeToolPanelComponent);

import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import * as ThemeRedux from '../../Redux/ActionsReducers/ThemeRedux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { AccessLevel, DashboardSize } from '../../PredefinedConfig/Common/Enums';

import { UserTheme } from '../../PredefinedConfig/RunTimeState/ThemeState';
import DropdownButton from '../../components/DropdownButton';

interface ThemeToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<ThemeToolbarControlComponent> {
  onSelectTheme: (theme: string) => ThemeRedux.ThemeSelectAction;
  SystemThemes: string[];
  UserThemes: UserTheme[];
  CurrentTheme: string;
}

class ThemeToolbarControlComponent extends React.Component<ThemeToolbarControlComponentProps, {}> {
  render(): any {
    let allThemes = [].concat(this.props.SystemThemes).concat(
      this.props.UserThemes.map(x => {
        return x.Name;
      })
    );

    let themes: any[] = allThemes.map((search, index) => {
      return {
        label: search,
        onClick: () => this.onSelectTheme(search),
      };
    });

    let content = (
      <div
        className={
          this.props.AccessLevel == AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : ''
        }
      >
        <DropdownButton style={{ minWidth: '100px' }} id="themeDropDown" items={themes}>
          {this.props.CurrentTheme}
        </DropdownButton>
      </div>
    );

    return (
      <PanelDashboard
        headerText={StrategyConstants.ThemeStrategyName}
        glyphicon={StrategyConstants.ThemeGlyph}
        onClose={() => this.props.onClose(StrategyConstants.ThemeStrategyId)}
        onConfigure={() => this.props.onConfigure()}
      >
        {content}
      </PanelDashboard>
    );
  }

  private onSelectTheme(theme: string) {
    this.props.onSelectTheme(theme);
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    SystemThemes: state.Theme.SystemThemes,
    CurrentTheme: state.Theme.CurrentTheme,
    UserThemes: state.Theme.UserThemes,
    Entitlements: state.Entitlements.FunctionEntitlements,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onSelectTheme: (theme: string) => dispatch(ThemeRedux.ThemeSelect(theme)),
    onClose: (dashboardControl: string) =>
      dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.ThemeStrategyId, ScreenPopups.ThemePopup)
      ),
  };
}

export let ThemeToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemeToolbarControlComponent);

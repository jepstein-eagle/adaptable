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
import { AccessLevel } from '../../PredefinedConfig/Common/Enums';

import { AdaptableBlotterTheme } from '../../PredefinedConfig/RunTimeState/ThemeState';
import DropdownButton from '../../components/DropdownButton';

interface ThemeToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<ThemeToolbarControlComponent> {
  onSelectTheme: (theme: string) => ThemeRedux.ThemeSelectAction;
  SystemThemes: AdaptableBlotterTheme[];
  UserThemes: AdaptableBlotterTheme[];
  CurrentTheme: string;
}

class ThemeToolbarControlComponent extends React.Component<ThemeToolbarControlComponentProps, {}> {
  render(): any {
    let allThemes: AdaptableBlotterTheme[] = [...this.props.SystemThemes, ...this.props.UserThemes];

    let themes: any[] = allThemes.map((theme: AdaptableBlotterTheme, index) => {
      if (typeof theme === 'string') {
        // protection against old state, which could be string
        theme = {
          Name: theme,
          Description: theme,
        };
      }
      return {
        label: theme.Description,
        onClick: () => this.onSelectTheme(theme),
      };
    });

    let currentTheme = allThemes.filter(theme => theme.Name === this.props.CurrentTheme)[0];
    let currentThemeDescription = currentTheme ? currentTheme.Description : this.props.CurrentTheme;

    let content = (
      <div
        className={
          this.props.AccessLevel == AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : ''
        }
      >
        <DropdownButton
          style={{
            maxWidth: '25rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          items={themes}
          columns={['label']}
        >
          {currentThemeDescription}
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

  private onSelectTheme(theme: AdaptableBlotterTheme) {
    this.props.onSelectTheme(theme.Name);
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

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
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

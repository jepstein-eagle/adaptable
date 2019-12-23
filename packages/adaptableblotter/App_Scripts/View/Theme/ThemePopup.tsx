import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';

import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as ThemeRedux from '../../Redux/ActionsReducers/ThemeRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';

import { AdaptableBlotterTheme } from '../../PredefinedConfig/ThemeState';
import { Flex, Box, Text } from 'rebass';
import Dropdown from '../../components/Dropdown';

interface ThemePopupProps extends StrategyViewPopupProps<ThemePopupComponent> {
  SystemThemes: Array<AdaptableBlotterTheme>;
  UserThemes: Array<AdaptableBlotterTheme>;
  CurrentTheme: string;
  SelectTheme: (newTheme: string) => ThemeRedux.ThemeSelectAction;
}

class ThemePopupComponent extends React.Component<ThemePopupProps, {}> {
  render() {
    let infoBody: any[] = [
      'Choose a theme to change the look & feel of the Adaptable Blotter screens.',
      <br />,
      <br />,
      'Select ',
      <i>None</i>,
      ' if you prefer to upload your own custom theme or ',
      <i>Default</i>,
      ' to use the standard theme.',
    ];

    let availableThemes: AdaptableBlotterTheme[] = [];
    this.props.SystemThemes.forEach((st: AdaptableBlotterTheme) => {
      availableThemes.push(st);
    });
    this.props.UserThemes.forEach(ut => {
      availableThemes.push(ut);
    });

    let optionThemes = availableThemes.map(theme => {
      if (typeof theme === 'string') {
        // protection against old state, which could be string
        theme = {
          Name: theme,
          Description: theme,
        };
      }
      return {
        value: theme.Name,
        label: theme.Description,
      };
    });
    return (
      <Flex flex={1} flexDirection="column">
        <PanelWithButton
          headerText={StrategyConstants.ThemeStrategyFriendlyName}
          glyphicon={StrategyConstants.ThemeGlyph}
          infoBody={infoBody}
        >
          <>
            <Flex flexDirection="row" alignItems="center" marginTop={3}>
              <Text style={{ flex: 2 }} textAlign="end" marginRight={2}>
                Current Theme:
              </Text>
              <Flex flex={7} flexDirection="row" alignItems="center">
                <Dropdown
                  style={{ width: '50%', minWidth: 200 }}
                  placeholder="Select theme"
                  showEmptyItem={false}
                  showClearButton={false}
                  value={this.props.CurrentTheme}
                  onChange={(value: any) => this.onChangeTheme(value)}
                  options={optionThemes}
                />
              </Flex>
            </Flex>
          </>
        </PanelWithButton>
      </Flex>
    );
  }

  onChangeTheme(value: string) {
    this.props.SelectTheme(value);
  }
}
function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    SystemThemes: state.Theme.SystemThemes,
    UserThemes: state.Theme.UserThemes,
    CurrentTheme: state.Theme.CurrentTheme,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    SelectTheme: (newTheme: string) => dispatch(ThemeRedux.ThemeSelect(newTheme)),
  };
}

export let ThemePopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemePopupComponent);

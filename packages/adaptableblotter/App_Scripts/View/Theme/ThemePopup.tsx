import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';

import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import * as ThemeRedux from '../../Redux/ActionsReducers/ThemeRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';

import { UserTheme } from '../../PredefinedConfig/RunTimeState/ThemeState';
import { Flex, Box, Text } from 'rebass';
import Dropdown from '../../components/Dropdown';

interface ThemePopupProps extends StrategyViewPopupProps<ThemePopupComponent> {
  SystemThemes: Array<string>;
  UserThemes: Array<UserTheme>;
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
      ' to use the standard Bootstrap theme.',
    ];

    let availableThemes: string[] = [];
    this.props.SystemThemes.forEach(st => {
      availableThemes.push(st);
    });
    this.props.UserThemes.forEach(ut => {
      availableThemes.push(ut.Name);
    });

    let optionThemes = availableThemes.map(x => {
      return {
        value: x,
        label: x,
      };
    });
    return (
      <Flex flex={1} flexDirection="column">
        <PanelWithButton
          headerText={StrategyConstants.ThemeStrategyName}
          glyphicon={StrategyConstants.ThemeGlyph}
          infoBody={infoBody}
        >
          <Flex padding={2} alignItems="center" flexDirection="row">
            <Text marginRight={3}>Current: </Text>

            <Box>
              <Dropdown
                placeholder="select"
                value={this.props.CurrentTheme}
                onChange={(value: any) => this.onChangeTheme(value)}
                options={optionThemes}
              />
            </Box>
          </Flex>
        </PanelWithButton>
      </Flex>
    );
  }

  onChangeTheme(value: string) {
    this.props.SelectTheme(value);
  }
}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    SystemThemes: state.Theme.SystemThemes,
    UserThemes: state.Theme.UserThemes,
    CurrentTheme: state.Theme.CurrentTheme,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    SelectTheme: (newTheme: string) => dispatch(ThemeRedux.ThemeSelect(newTheme)),
  };
}

export let ThemePopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemePopupComponent);

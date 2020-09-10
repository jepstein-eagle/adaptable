import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';

import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as ThemeRedux from '../../Redux/ActionsReducers/ThemeRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';

import { AdaptableTheme } from '../../PredefinedConfig/ThemeState';
import { Flex } from 'rebass';
import FormLayout, { FormRow } from '../../components/FormLayout';
import DropdownButton from '../../components/DropdownButton';

interface ThemePopupProps extends StrategyViewPopupProps<ThemePopupComponent> {
  SystemThemes: (AdaptableTheme | string)[];
  UserThemes: Array<AdaptableTheme>;
  CurrentTheme: string;
  SelectTheme: (newTheme: string) => ThemeRedux.ThemeSelectAction;
}

class ThemePopupComponent extends React.Component<ThemePopupProps, {}> {
  render() {
    let infoBody: any[] = [
      'Choose a theme to change the look & feel of Adaptable screens.',
      <br />,
      <br />,
      'Select ',
      <i>None</i>,
      ' if you prefer to upload your own custom theme or ',
      <i>Default</i>,
      ' to use the standard theme.',
    ];

    let availableThemes: AdaptableTheme[] = [];
    this.props.SystemThemes.forEach((st: AdaptableTheme) => {
      availableThemes.push(st);
    });
    this.props.UserThemes.forEach(ut => {
      availableThemes.push(ut);
    });

    let currentThemeDescription = '';
    let optionThemes = availableThemes.map(theme => {
      if (typeof theme === 'string') {
        // protection against old state, which could be string
        theme = {
          Name: theme,
          Description: theme,
        };
      }

      if (theme.Name === this.props.CurrentTheme) {
        currentThemeDescription = theme.Description;
      }
      return {
        value: theme.Name,
        label: theme.Description,
        onClick: () => this.onChangeTheme(theme.Name),
      };
    });
    return (
      <Flex flex={1} flexDirection="column">
        <PanelWithButton
          headerText={StrategyConstants.ThemeStrategyFriendlyName}
          glyphicon={StrategyConstants.ThemeGlyph}
          infoBody={infoBody}
        >
          <FormLayout>
            <FormRow label="Current Theme:">
              <DropdownButton
                style={{ width: '50%', minWidth: 200 }}
                placeholder="Select theme"
                value={this.props.CurrentTheme}
                items={optionThemes}
              >
                {currentThemeDescription}
              </DropdownButton>
            </FormRow>
          </FormLayout>
        </PanelWithButton>
      </Flex>
    );
  }

  onChangeTheme(value: string) {
    this.props.SelectTheme(value);
  }
}
function mapStateToProps(state: AdaptableState, ownProps: any): Partial<ThemePopupProps> {
  return {
    SystemThemes: state.Theme.SystemThemes,
    UserThemes: state.Theme.UserThemes,
    CurrentTheme: state.Theme.CurrentTheme,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<ThemePopupProps> {
  return {
    SelectTheme: (newTheme: string) => dispatch(ThemeRedux.ThemeSelect(newTheme)),
  };
}

export let ThemePopup = connect(mapStateToProps, mapDispatchToProps)(ThemePopupComponent);

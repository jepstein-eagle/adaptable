import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';

import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';

import { UIHelper } from '../UIHelper';
import { AccessLevel } from '../../PredefinedConfig/Common/Enums';
import { Flex, Box } from 'rebass';
import SimpleButton from '../../components/SimpleButton';
import HelpBlock from '../../components/HelpBlock';

interface StateManagementPopupProps extends StrategyViewPopupProps<StateManagementPopupComponent> {}

class StateManagementPopupComponent extends React.Component<StateManagementPopupProps, {}> {
  constructor(props: StateManagementPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  render() {
    let infoBody: any[] = [
      'Function that clears user config - advisable for development use only.',
    ];

    let clearButton = (
      <SimpleButton
        onClick={() => this.onClearLocalStorage()}
        tooltip="Clear User Data"
        tone="error"
        variant="raised"
        marginTop={2}
        AccessLevel={AccessLevel.Full}
      >
        Clear User Data
      </SimpleButton>
    );

    let copyAllButton = (
      <SimpleButton
        onClick={() => this.onCopyAllStateToClipboard()}
        tooltip="Copy All Data to Clipboard"
        tone="neutral"
        variant="raised"
        marginTop={2}
        marginRight={3}
        AccessLevel={AccessLevel.Full}
      >
        Copy All Data to Clipboard
      </SimpleButton>
    );

    let copyUserStateButton = (
      <SimpleButton
        onClick={() => this.onCopyUserStateToClipboard()}
        tooltip="Copy User State to Clipboard"
        tone="neutral"
        variant="raised"
        marginTop={2}
        marginRight={3}
        AccessLevel={AccessLevel.Full}
      >
        Copy User Data to Clipboard
      </SimpleButton>
    );

    return (
      <Flex flex={1} flexDirection="column">
        <PanelWithButton
          headerText={StrategyConstants.StateManagementStrategyFriendlyName}
          button={null}
          glyphicon={StrategyConstants.StateManagementGlyph}
          infoBody={infoBody}
        >
          <Box>
            <HelpBlock>
              {
                'Clear all current user state that has been applied.   When you restart / refresh the Blotter any state that you have previously created will be lost.  However your Predefined Config will then be re-applied.'
              }
            </HelpBlock>
            {clearButton}
            <HelpBlock marginTop={3}>
              {'Copy either everything in the State, or just the User State, to the Clipboard.'}
            </HelpBlock>
            {copyAllButton}
            {copyUserStateButton}
          </Box>
        </PanelWithButton>
      </Flex>
    );
  }

  onClearLocalStorage() {
    this.props.Blotter.api.configApi.configDeleteLocalStorage();
  }

  onCopyAllStateToClipboard() {
    this.props.Blotter.api.configApi.configCopyAllStateToClipboard();
  }
  onCopyUserStateToClipboard() {
    this.props.Blotter.api.configApi.configCopyUserStateToClipboard();
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {};
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {};
}

export let StateManagementPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(StateManagementPopupComponent);

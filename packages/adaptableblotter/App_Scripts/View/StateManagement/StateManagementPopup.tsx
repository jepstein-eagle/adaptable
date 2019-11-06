import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';

import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';

import { UIHelper } from '../UIHelper';
import { AccessLevel } from '../../PredefinedConfig/Common/Enums';
import { Flex, Box } from 'rebass';
import SimpleButton from '../../components/SimpleButton';

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
        onClick={() => this.onClear()}
        tooltip="Clear User Data"
        tone="error"
        variant="raised"
        marginTop={2}
        AccessLevel={AccessLevel.Full}
      >
        Clear User Data
      </SimpleButton>
    );

    return (
      <Flex flex={1} flexDirection="column">
        <PanelWithButton
          headerText={StrategyConstants.StateManagementStrategyName}
          button={null}
          glyphicon={StrategyConstants.StateManagementGlyph}
          infoBody={infoBody}
        >
          <Box>
            <p>Click below to clear all current user state that has been applied.</p>
            <p>
              When you restart / refresh the Blotter any state that you have previously created will
              be lost.
            </p>
            <p>
              However your <i>predefined config</i> will be re-added.
            </p>
            <p>
              <b>This option should ideally only appear in non production builds.</b>
            </p>
          </Box>

          {clearButton}
        </PanelWithButton>
      </Flex>
    );
  }

  onClear() {
    this.props.Blotter.api.configApi.configDeleteLocalStorage();
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {};
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {};
}

export let StateManagementPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(StateManagementPopupComponent);

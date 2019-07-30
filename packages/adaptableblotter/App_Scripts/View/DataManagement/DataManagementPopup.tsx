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

interface DataManagementPopupProps extends StrategyViewPopupProps<DataManagementPopupComponent> {}

class DataManagementPopupComponent extends React.Component<DataManagementPopupProps, {}> {
  constructor(props: DataManagementPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  render() {
    let infoBody: any[] = ['Function that clears user config - for development use only.'];

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
          headerText={StrategyConstants.DataManagementStrategyName}
          button={null}
          glyphicon={StrategyConstants.DataManagementGlyph}
          infoBody={infoBody}
        >
          <Box>
            Click below to clear all current state.
            <br />
            <br />
            When you restart / refresh the Blotter any state that you have previously created will
            be lost and only the 'predefined config' will be re-added.
            <br />
            <br />
            <b>This option only appears in non production builds.</b>
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

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {};
}

export let DataManagementPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(DataManagementPopupComponent);

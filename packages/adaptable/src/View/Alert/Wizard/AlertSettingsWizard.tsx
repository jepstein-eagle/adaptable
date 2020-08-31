import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';

import { AlertDefinition } from '../../../PredefinedConfig/AlertState';
import Checkbox from '../../../components/CheckBox';
import WizardPanel from '../../../components/WizardPanel';
import HelpBlock from '../../../components/HelpBlock';
import { Flex, Box } from 'rebass';

export interface AlertSettingsWizardProps extends AdaptableWizardStepProps<AlertDefinition> {}

export interface AlertSettingsWizardState {
  ShowPopup: boolean;
  HighlightCell: boolean;
  JumpToCell: boolean;
  ShowInDiv: boolean;
}

export class AlertSettingsWizard
  extends React.Component<AlertSettingsWizardProps, AlertSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: AlertSettingsWizardProps) {
    super(props);
    this.state = {
      ShowPopup: this.props.data!.AlertProperties.ShowPopup,
      HighlightCell: this.props.data!.AlertProperties.HighlightCell,
      JumpToCell: this.props.data!.AlertProperties.JumpToCell,
      ShowInDiv: this.props.data!.AlertProperties.ShowInDiv,
    };
  }

  render(): any {
    return (
      <>
        <WizardPanel border="none">
          <Flex flexDirection="column" padding={2}>
            <Box>
              <HelpBlock>
                {'Display Alert as a Popup - coloured according to the message type.'}
              </HelpBlock>
              <Checkbox
                marginLeft={2}
                checked={this.state.ShowPopup == true}
                onChange={this.onShowPopupChanged}
              >
                Show as Popup
              </Checkbox>
            </Box>
            <Box marginTop={2}>
              <HelpBlock>
                {'Colour the cell that triggered the Alert according to the Alert message type'}
              </HelpBlock>
              <Checkbox
                marginLeft={2}
                checked={this.state.HighlightCell == true}
                onChange={this.onHighlightCellChanged}
              >
                Highight Cell
              </Checkbox>
            </Box>
            <Box marginTop={2}>
              <HelpBlock>
                {
                  'Make Grid move in order to display the row which contains the cell that raiggered the Alert'
                }
              </HelpBlock>
              <Checkbox
                marginLeft={2}
                checked={this.state.JumpToCell == true}
                onChange={this.onJumpToCellChanged}
              >
                Jump To Cell
              </Checkbox>
            </Box>
            <Box marginTop={2}>
              <HelpBlock>
                {
                  'Show the Alert in a separate <Div> (as specified in the "AlertDisplayDiv" property in Alert Config)'
                }
              </HelpBlock>
              <Checkbox
                marginLeft={2}
                checked={this.state.ShowInDiv == true}
                onChange={this.onShowInDivChanged}
              >
                Show in Div
              </Checkbox>
            </Box>
          </Flex>
        </WizardPanel>
      </>
    );
  }

  private onShowPopupChanged = (checked: boolean) => {
    this.setState({ ShowPopup: checked } as AlertSettingsWizardState, () =>
      this.props.updateGoBackState()
    );
  };
  private onHighlightCellChanged = (checked: boolean) => {
    this.setState({ HighlightCell: checked } as AlertSettingsWizardState, () =>
      this.props.updateGoBackState()
    );
  };
  private onJumpToCellChanged = (checked: boolean) => {
    this.setState({ JumpToCell: checked } as AlertSettingsWizardState, () =>
      this.props.updateGoBackState()
    );
  };
  private onShowInDivChanged = (checked: boolean) => {
    this.setState({ ShowInDiv: checked } as AlertSettingsWizardState, () =>
      this.props.updateGoBackState()
    );
  };

  public canNext(): boolean {
    return true;
  }

  public canBack(): boolean {
    return true;
  }
  public next(): void {
    this.props.data!.AlertProperties.ShowPopup = this.state.ShowPopup;
    this.props.data!.AlertProperties.HighlightCell = this.state.HighlightCell;
    this.props.data!.AlertProperties.JumpToCell = this.state.JumpToCell;
    this.props.data!.AlertProperties.ShowInDiv = this.state.ShowInDiv;
  }

  public back(): void {
    // todo
  }

  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}

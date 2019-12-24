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

export interface AlertScopeWizardProps extends AdaptableWizardStepProps<AlertDefinition> {}

export interface AlertScopeWizardState {
  ShowPopup: boolean;
  HighlightCell: boolean;
  JumpToCell: boolean;
  ShowInDiv: boolean;
}

export class AlertScopeWizard extends React.Component<AlertScopeWizardProps, AlertScopeWizardState>
  implements AdaptableWizardStep {
  constructor(props: AlertScopeWizardProps) {
    super(props);
    this.state = {
      ShowPopup: this.props.Data!.AlertProperties.ShowPopup,
      HighlightCell: this.props.Data!.AlertProperties.HighlightCell,
      JumpToCell: this.props.Data!.AlertProperties.JumpToCell,
      ShowInDiv: this.props.Data!.AlertProperties.ShowInDiv,
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
    this.setState({ ShowPopup: checked } as AlertScopeWizardState, () =>
      this.props.UpdateGoBackState()
    );
  };
  private onHighlightCellChanged = (checked: boolean) => {
    this.setState({ HighlightCell: checked } as AlertScopeWizardState, () =>
      this.props.UpdateGoBackState()
    );
  };
  private onJumpToCellChanged = (checked: boolean) => {
    this.setState({ JumpToCell: checked } as AlertScopeWizardState, () =>
      this.props.UpdateGoBackState()
    );
  };
  private onShowInDivChanged = (checked: boolean) => {
    this.setState({ ShowInDiv: checked } as AlertScopeWizardState, () =>
      this.props.UpdateGoBackState()
    );
  };

  public canNext(): boolean {
    return true;
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data!.AlertProperties.ShowPopup = this.state.ShowPopup;
    this.props.Data!.AlertProperties.HighlightCell = this.state.HighlightCell;
    this.props.Data!.AlertProperties.JumpToCell = this.state.JumpToCell;
    this.props.Data!.AlertProperties.ShowInDiv = this.state.ShowInDiv;
  }

  public Back(): void {
    // todo
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}

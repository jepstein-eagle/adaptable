import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';

import { AlertDefinition } from '../../../PredefinedConfig/RunTimeState/AlertState';
import Checkbox from '../../../components/CheckBox';
import WizardPanel from '../../../components/WizardPanel';
import HelpBlock from '../../../components/HelpBlock';

export interface AlertScopeWizardProps extends AdaptableWizardStepProps<AlertDefinition> {}

export interface AlertScopeWizardState {
  ShowPopup: boolean;
  HighlightCell: boolean;
  JumpToCell: boolean;
}

export class AlertScopeWizard extends React.Component<AlertScopeWizardProps, AlertScopeWizardState>
  implements AdaptableWizardStep {
  constructor(props: AlertScopeWizardProps) {
    super(props);
    this.state = {
      ShowPopup: this.props.Data!.AlertProperties.ShowPopup,
      HighlightCell: this.props.Data!.AlertProperties.HighlightCell,
      JumpToCell: this.props.Data!.AlertProperties.JumpToCell,
    };
  }

  render(): any {
    return (
      <>
        <WizardPanel border="none">
          <HelpBlock>
            {
              'All Alerts - when triggered - will appear in the Alert toolbar.  However, additionally they can:'
            }
          </HelpBlock>

          <Checkbox
            marginLeft={2}
            checked={this.state.ShowPopup == true}
            onChange={this.onShowPopupChanged}
          >
            Show as Popup
          </Checkbox>
          <Checkbox
            marginLeft={2}
            checked={this.state.HighlightCell == true}
            onChange={this.onHighlightCellChanged}
          >
            Highight Cell
          </Checkbox>
          <Checkbox
            marginLeft={2}
            checked={this.state.JumpToCell == true}
            onChange={this.onJumpToCellChanged}
          >
            Jump To Cell
          </Checkbox>
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

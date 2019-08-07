import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';

import { AlertDefinition } from '../../../PredefinedConfig/RunTimeState/AlertState';
import Checkbox from '../../../components/CheckBox';
import WizardPanel from '../../../components/WizardPanel';

export interface AlertScopeWizardProps extends AdaptableWizardStepProps<AlertDefinition> {}

export interface AlertScopeWizardState {
  ShowAsPopup: boolean;
}

export class AlertScopeWizard extends React.Component<AlertScopeWizardProps, AlertScopeWizardState>
  implements AdaptableWizardStep {
  constructor(props: AlertScopeWizardProps) {
    super(props);
    this.state = {
      ShowAsPopup: this.props.Data!.ShowAsPopup,
    };
  }

  render(): any {
    return (
      <>
        <WizardPanel border="none">
          <Checkbox
            marginLeft={2}
            checked={this.state.ShowAsPopup == true}
            onChange={this.onShowAsPopupChanged}
          >
            Show as Popup
          </Checkbox>
        </WizardPanel>
      </>
    );
  }

  private onShowAsPopupChanged = (checked: boolean) => {
    this.setState({ ShowAsPopup: checked } as AlertScopeWizardState, () =>
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
    this.props.Data!.ShowAsPopup = this.state.ShowAsPopup;
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

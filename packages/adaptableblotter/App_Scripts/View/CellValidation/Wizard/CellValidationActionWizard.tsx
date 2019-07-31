import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { ActionMode } from '../../../PredefinedConfig/Common/Enums';
import { AdaptablePopover } from '../../AdaptablePopover';

import { CellValidationRule } from '../../../PredefinedConfig/RunTimeState/CellValidationState';

import { Flex, Box } from 'rebass';
import WizardPanel from '../../../components/WizardPanel';
import Radio from '../../../components/Radio';
import { SyntheticEvent } from 'react';
import HelpBlock from '../../../components/HelpBlock';

export interface CellValidationActionWizardProps
  extends AdaptableWizardStepProps<CellValidationRule> {}
export interface CellValidationSettingsWizardState {
  ActionMode: ActionMode;
}

export class CellValidationActionWizard
  extends React.Component<CellValidationActionWizardProps, CellValidationSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: CellValidationActionWizardProps) {
    super(props);
    this.state = {
      ActionMode: this.props.Data.ActionMode as ActionMode,
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <Flex flexDirection="column" padding={2}>
          <HelpBlock>
            Disallow all cell edits that break the validation rule - with no override available.
          </HelpBlock>
          <Radio
            value={ActionMode.StopEdit}
            marginRight={3}
            checked={this.state.ActionMode == ActionMode.StopEdit}
            onChange={(_: boolean, e: SyntheticEvent) => this.onActionModeChanged(e)}
          >
            Prevent the cell edit
          </Radio>{' '}
          <HelpBlock>
            Display a warning that the validation rule has been broken. If this is overriden, the
            edit will be allowed.
          </HelpBlock>
          <Radio
            marginRight={3}
            value={ActionMode.WarnUser}
            checked={this.state.ActionMode == ActionMode.WarnUser}
            onChange={(_: boolean, e: SyntheticEvent) => this.onActionModeChanged(e)}
          >
            Show a warning
          </Radio>{' '}
        </Flex>
      </WizardPanel>
    );
  }

  private onActionModeChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ ActionMode: e.value as ActionMode } as CellValidationSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return true;
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.ActionMode = this.state.ActionMode;
  }

  public Back(): void {
    //
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}

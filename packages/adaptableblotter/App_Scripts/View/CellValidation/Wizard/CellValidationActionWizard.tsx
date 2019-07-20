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
    let cssClassName: string = this.props.cssClassName + '-action';

    return (
      <WizardPanel header="Action When Validation Fails">
        <HelpBlock>
          <p>Choose what should happen to an edit when cell validation fails.</p>
          <p>
            <i>Prevent cell edit</i> ensures that no edits which fail validation will occur.
          </p>
          <p>
            <i>Show a warning</i> gives you the option to allow the edit after providing a reason
            (which will be audited).
          </p>
        </HelpBlock>

        <Flex marginTop={3} flexDirection="row" alignItems="center" marginLeft={2}>
          <Radio
            value={ActionMode.StopEdit}
            marginRight={3}
            checked={this.state.ActionMode == ActionMode.StopEdit}
            onChange={(_: boolean, e: SyntheticEvent) => this.onActionModeChanged(e)}
          >
            Prevent the cell edit
          </Radio>{' '}
          <AdaptablePopover
            cssClassName={cssClassName}
            headerText={'Cell Validation Action: Prevent'}
            bodyText={[
              'Disallows all cell edits that break the validation rule with no override available.',
            ]}
          />
        </Flex>
        <Flex marginTop={3} flexDirection="row" alignItems="center" marginLeft={2}>
          <Radio
            marginRight={3}
            value={ActionMode.WarnUser}
            checked={this.state.ActionMode == ActionMode.WarnUser}
            onChange={(_: boolean, e: SyntheticEvent) => this.onActionModeChanged(e)}
          >
            Show a warning
          </Radio>{' '}
          <AdaptablePopover
            cssClassName={cssClassName}
            headerText={'Cell Validation Action: Warning'}
            bodyText={[
              'Displays a warning that the validation rule has been broken.  If this is overriden, the edit will be allowed.',
            ]}
          />
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

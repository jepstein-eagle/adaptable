import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { AdaptablePopover } from '../../AdaptablePopover';
import { PlusMinusRule } from '../../../PredefinedConfig/PlusMinusState';
import WizardPanel from '../../../components/WizardPanel';
import { Flex, Text } from 'rebass';
import Input from '../../../components/Input';
import Radio, { RadioGroup } from '../../../components/Radio';
import FormLayout, { FormRow } from '../../../components/FormLayout';

export interface PlusMinusSettingsWizardProps extends AdaptableWizardStepProps<PlusMinusRule> {}
export interface PlusMinusSettingsWizardState {
  NudgeValue: number;
  IsDefaultNudge: boolean;
}

export class PlusMinusSettingsWizard
  extends React.Component<PlusMinusSettingsWizardProps, PlusMinusSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: PlusMinusSettingsWizardProps) {
    super(props);
    this.state = {
      NudgeValue: this.props.data.NudgeValue,
      IsDefaultNudge: this.props.data.IsDefaultNudge,
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <FormLayout columns={[1, 2]}>
          <FormRow>
            <span>Nudge Value:</span>

            <Input
              width="100%"
              value={this.state.NudgeValue.toString()}
              type="number"
              placeholder="Enter a Number"
              onChange={(e: React.SyntheticEvent) => this.onColumnDefaultNudgeValueChange(e)}
            />
          </FormRow>
          <FormRow>
            <Text marginRight={2} style={{ flex: 2 }}>
              Apply As:
            </Text>
            <RadioGroup orientation="vertical" flex={9}>
              <Flex flexDirection="row" alignItems="center">
                <Radio
                  value="expression"
                  marginRight={2}
                  checked={!this.state.IsDefaultNudge}
                  onChange={(_: any, e: any) => this.onExpressionOptionChange(e)}
                >
                  Custom Plus/Minus Rule{' '}
                </Radio>
                <AdaptablePopover
                  headerText={'Plus Minus Settings: Apply As'}
                  bodyText={[
                    'Create a Custom Plus/Minus Rule (using the Query Builder in the next step of the wizard)',
                  ]}
                />
              </Flex>
              <Flex flexDirection="row" alignItems="center">
                <Radio
                  value="default"
                  marginRight={2}
                  checked={this.state.IsDefaultNudge}
                  onChange={(_, e) => this.onExpressionOptionChange(e)}
                >
                  Default Nudge Value for Column
                </Radio>
                <AdaptablePopover
                  headerText={'Plus Minus Settings: Apply As'}
                  bodyText={['Set default nudge value for the column']}
                />
              </Flex>
            </RadioGroup>
          </FormRow>
        </FormLayout>
      </WizardPanel>
    );
  }

  private onExpressionOptionChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    let isDefault: boolean = e.value == 'default';
    this.setState({ IsDefaultNudge: isDefault } as PlusMinusSettingsWizardState, () =>
      this.props.updateGoBackState()
    );
  }

  onColumnDefaultNudgeValueChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ NudgeValue: parseFloat(e.value) } as PlusMinusSettingsWizardState, () =>
      this.props.updateGoBackState()
    );
  }

  public canNext(): boolean {
    return Number.isFinite(this.state.NudgeValue);
    //  && this.state.IsDefaultNudge==false;
  }
  public canBack(): boolean {
    return true;
  }
  public next(): void {
    this.props.data.NudgeValue = this.state.NudgeValue;
    this.props.data.IsDefaultNudge = this.state.IsDefaultNudge;
    if (this.props.data.IsDefaultNudge) {
      this.props.data.Expression = undefined;
      this.props.data.SharedQueryId = undefined;
    }
  }
  public back(): void {
    //todo
  }
  public getIndexStepIncrement() {
    return this.state.IsDefaultNudge ? 2 : 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}

import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { MessageType } from '../../../PredefinedConfig/Common/Enums';
import { AdaptablePopover } from '../../AdaptablePopover';
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';
import { AdaptableBlotterForm } from '../../Components/Forms/AdaptableBlotterForm';
import { PlusMinusRule } from '../../../PredefinedConfig/RunTimeState/PlusMinusState';
import WizardPanel from '../../../components/WizardPanel';
import { Flex, Text } from 'rebass';
import Input from '../../../components/Input';
import Radio from '../../../components/Radio';

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
      NudgeValue: this.props.Data.NudgeValue,
      IsDefaultNudge: this.props.Data.IsDefaultNudge,
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <Flex flexDirection="row" alignItems="center">
          <Text style={{ flex: 2 }} marginRight={2}>
            Nudge Value:
          </Text>

          <Input
            style={{ flex: 9 }}
            value={this.state.NudgeValue.toString()}
            type="number"
            placeholder="Enter a Number"
            onChange={e => this.onColumnDefaultNudgeValueChange(e)}
          />
        </Flex>
        <Flex flexDirection="row" marginTop={2}>
          <Text marginRight={2} style={{ flex: 2 }}>
            Apply As:
          </Text>
          <Flex flexDirection="column" flex={9}>
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
          </Flex>
        </Flex>
      </WizardPanel>
    );
  }

  private onExpressionOptionChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    let isDefault: boolean = e.value == 'default';
    this.setState({ IsDefaultNudge: isDefault } as PlusMinusSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  onColumnDefaultNudgeValueChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ NudgeValue: parseFloat(e.value) } as PlusMinusSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return Number.isFinite(this.state.NudgeValue);
    //  && this.state.IsDefaultNudge==false;
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.NudgeValue = this.state.NudgeValue;
    this.props.Data.IsDefaultNudge = this.state.IsDefaultNudge;
    if (this.props.Data.Expression == null || this.props.Data.IsDefaultNudge) {
      this.props.Data.Expression = ExpressionHelper.CreateEmptyExpression();
    }
  }
  public Back(): void {
    //todo
  }
  public GetIndexStepIncrement() {
    return this.state.IsDefaultNudge ? 2 : 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}

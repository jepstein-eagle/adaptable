import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import {
  DataType,
  LeafExpressionOperator,
  RangeOperandType,
} from '../../../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';
import { AlertDefinition } from '../../../PredefinedConfig/AlertState';
import Radio from '../../../components/Radio';
import HelpBlock from '../../../components/HelpBlock';
import { Box, Flex } from 'rebass';
import Dropdown from '../../../components/Dropdown';
import Input from '../../../components/Input';
import WizardPanel from '../../../components/WizardPanel';
import { QueryRange } from '../../../PredefinedConfig/Common/Expression';
import { Scope } from '../../../PredefinedConfig/Common/Scope';

export interface AlertRulesWizardProps extends AdaptableWizardStepProps<AlertDefinition> {}
export interface AlertSettingsWizardState {
  Id: string;
  Inputs: any[];
}

export class AlertRulesWizard
  extends React.Component<AlertRulesWizardProps, AlertSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: AlertRulesWizardProps) {
    super(props);
    this.state = {
      Id: this.props.data.Predicate.Id,
      Inputs: this.props.data.Predicate.Inputs ?? [],
    };
  }

  render(): any {
    const predicatesOptions = this.props.api.alertApi
      .getPredicateDefsForScope(this.props.data.Scope)
      .map(predicateDef => {
        return {
          value: predicateDef.id,
          label: predicateDef.name,
        };
      });

    const currentPredicateDef = this.props.api.predicateApi.getPredicateDefById(this.state.Id);

    return (
      <WizardPanel>
        <Flex flexDirection="column" padding={2}>
          <Dropdown
            placeholder="Select a Predicate"
            value={this.state.Id}
            onChange={Id => this.onPredicateChange(Id)}
            options={predicatesOptions}
            style={{ maxWidth: 'inherit' }}
          />
          {currentPredicateDef?.inputs?.map((predicateDefInput, index) => (
            <Input
              key={index}
              type={predicateDefInput.type}
              autoFocus={index === 0}
              value={this.state.Inputs[index]}
              onChange={(e: any) => this.onPredicateInputChange(e, index)}
            />
          ))}
        </Flex>
      </WizardPanel>
    );
  }

  private onPredicateChange(Id: string) {
    const predicateDef = this.props.api.predicateApi.getPredicateDefById(Id);

    this.setState(
      {
        Id,
        Inputs: (predicateDef?.inputs ?? []).map(input => input.defaultValue ?? ''),
      },
      () => this.props.updateGoBackState()
    );
  }

  private onPredicateInputChange(e: React.FormEvent, index: number) {
    const { value } = e.target as HTMLInputElement;
    const { Inputs } = this.state;
    Inputs[index] = value;

    this.setState({ Inputs }, () => this.props.updateGoBackState());
  }

  public canNext(): boolean {
    if (StringExtensions.IsNullOrEmpty(this.state.Id)) {
      return false;
    }

    if (this.state.Inputs?.some(StringExtensions.IsNullOrEmpty)) {
      return false;
    }

    return true;
  }

  public canBack(): boolean {
    return true;
  }

  public next(): void {
    this.props.data.Predicate = {
      Id: this.state.Id,
      Inputs: this.state.Inputs,
    };
  }

  public back(): void {
    //todo
  }

  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}

import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import HelpBlock from '../../../components/HelpBlock';
import { Flex } from 'rebass';
import Dropdown from '../../../components/Dropdown';
import Input from '../../../components/Input';
import WizardPanel from '../../../components/WizardPanel';
import { ConditionalStyle } from '../../../PredefinedConfig/ConditionalStyleState';
import Radio from '../../../components/Radio';
import Panel from '../../../components/Panel';
import FormLayout, { FormRow } from '../../../components/FormLayout';
import { ColorPicker } from '../../ColorPicker';

export interface ConditionalStylePredicateWizardProps
  extends AdaptableWizardStepProps<ConditionalStyle> {}

export interface ConditionalStylePredicateWizardState {
  PredicateId: string;
  PredicateInputs: any[];
  ConditionType: 'Predicate' | 'Expression';
}

export class ConditionalStylePredicateWizard
  extends React.Component<
    ConditionalStylePredicateWizardProps,
    ConditionalStylePredicateWizardState
  >
  implements AdaptableWizardStep {
  constructor(props: ConditionalStylePredicateWizardProps) {
    super(props);

    this.state = {
      PredicateId:
        this.props.data.Predicate != undefined ? this.props.data.Predicate.PredicateId : undefined,
      PredicateInputs:
        this.props.data.Predicate != undefined && this.props.data.Predicate.Inputs != undefined
          ? this.props.data.Predicate.Inputs
          : [],
      ConditionType: this.setConditionType(),
    };
  }

  render(): any {
    const predicatesOptions = this.props.api.conditionalStyleApi
      .getPredicateDefsForScope(this.props.data.Scope)
      .map(predicateDef => {
        return {
          value: predicateDef.id,
          label: predicateDef.label,
        };
      });

    const currentPredicateDef = this.props.api.predicateApi.getPredicateDefById(
      this.state.PredicateId
    );

    return (
      <WizardPanel>
        <Panel header="Create a Condition" margin={2}>
          {' '}
          <Flex flexDirection="row" padding={2}>
            <Radio
              marginLeft={3}
              value="Predicate"
              checked={this.state.ConditionType == 'Predicate'}
              onChange={(checked: boolean, e: React.SyntheticEvent) =>
                this.onConditionTypeChanged(e)
              }
            >
              Basic Condition
            </Radio>{' '}
            <Radio
              marginLeft={3}
              value="Expression"
              checked={this.state.ConditionType == 'Expression'}
              onChange={(checked: boolean, e: React.SyntheticEvent) =>
                this.onConditionTypeChanged(e)
              }
            >
              Advanced Condition{' '}
            </Radio>{' '}
          </Flex>
          {this.state.ConditionType == 'Predicate' && (
            <Flex flexDirection="column" padding={2} marginLeft={3}>
              <FormLayout>
                <FormRow label="Rule: ">
                  <Dropdown
                    placeholder="Select Rule"
                    value={this.state.PredicateId}
                    onChange={Id => this.onPredicateChange(Id)}
                    options={predicatesOptions}
                    style={{ maxWidth: 'inherit' }}
                  />
                </FormRow>
              </FormLayout>
              {currentPredicateDef?.inputs?.map((predicateDefInput, index) => (
                <FormLayout key={index}>
                  <FormRow label="Input: ">
                    <Input
                      key={index}
                      marginTop={2}
                      type={predicateDefInput.type}
                      autoFocus={index === 0}
                      value={this.state.PredicateInputs[index]}
                      onChange={(e: any) => this.onPredicateInputChange(e, index)}
                      style={{ maxWidth: 'inherit' }}
                    />
                  </FormRow>
                </FormLayout>
              ))}
            </Flex>
          )}
          {this.state.ConditionType == 'Expression' && (
            <Flex flexDirection="column" padding={2}>
              <HelpBlock>
                An Advanced Condition uses an <b>Expression</b> allowing for multiple criteria to be
                assessed.
                <br />
                <br />
                An Expression is typically used in 3 use cases:
                <ul>
                  <li>
                    The <i>Scope</i> is 'Whole Row'
                  </li>
                </ul>
                <ul>
                  <li>
                    The Condition's query will be based on different columns to those which will be
                    styled (as set in the <i>Scope</i>)
                  </li>
                </ul>
                <ul>
                  <li>Multiple criteria or complex functions are required in the Condition</li>
                </ul>{' '}
                <br />
                Click 'Next' to create the Query using the Expression Editor
              </HelpBlock>
            </Flex>
          )}
        </Panel>
      </WizardPanel>
    );
  }

  private setConditionType(): 'Predicate' | 'Expression' {
    // if an existing predicate then its 'Predicate'
    if (
      StringExtensions.IsNotNullOrEmpty(this.props.data.SharedQueryId) ||
      StringExtensions.IsNotNullOrEmpty(this.props.data.Expression)
    ) {
      return 'Expression';
    }
    if (this.props.data.Predicate != null) {
      return 'Predicate';
    }
    // if an existing expression then its 'Expression'

    // if the Scope is All then its 'Expression'
    if (this.props.api.scopeApi.scopeIsAll(this.props.data.Scope)) {
      return 'Expression';
    }

    // otherwise its a Predicate
    return 'Predicate';
  }

  private onConditionTypeChanged(event: React.FormEvent<any>): void {
    let e = event.target as HTMLInputElement;
    if (e.value == 'Predicate') {
      this.setState(
        {
          ConditionType: 'Predicate',
          PredicateId: undefined,
        } as ConditionalStylePredicateWizardState,
        () => this.props.updateGoBackState()
      );
    } else if (e.value == 'Expression') {
      this.setState(
        {
          ConditionType: 'Expression',
        } as ConditionalStylePredicateWizardState,
        () => this.props.updateGoBackState()
      );
    }
  }

  private onPredicateChange(Id: string) {
    const predicateDef = this.props.api.predicateApi.getPredicateDefById(Id);

    this.setState(
      {
        PredicateId: Id,
        PredicateInputs: (predicateDef?.inputs ?? []).map(input => input.defaultValue ?? ''),
      } as ConditionalStylePredicateWizardState,
      () => this.props.updateGoBackState()
    );
  }

  private onPredicateInputChange(e: React.FormEvent, index: number) {
    const { value } = e.target as HTMLInputElement;
    const { PredicateInputs: Inputs } = this.state;
    Inputs[index] = value;

    this.setState({ PredicateInputs: Inputs }, () => this.props.updateGoBackState());
  }

  public canNext(): boolean {
    if (this.state.ConditionType == 'Predicate') {
      if (StringExtensions.IsNullOrEmpty(this.state.PredicateId)) {
        return false;
      }

      if (this.state.PredicateInputs?.some(StringExtensions.IsNullOrEmpty)) {
        return false;
      }
    }

    return true;
  }

  public canBack(): boolean {
    return true;
  }

  public next(): void {
    if (this.state.ConditionType == 'Predicate') {
      this.props.data.Predicate = {
        PredicateId: this.state.PredicateId,
        Inputs: this.state.PredicateInputs,
      };
      this.props.data.Expression = '';
      this.props.data.SharedQueryId = '';
    }
    if (this.state.ConditionType == 'Expression') {
      this.props.data.Predicate = undefined;
    }
  }

  public back(): void {
    //todo
  }

  public getIndexStepIncrement() {
    return this.state.ConditionType == 'Expression' ? 1 : 2;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}

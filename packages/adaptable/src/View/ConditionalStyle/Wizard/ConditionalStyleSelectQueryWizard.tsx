import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { AdaptablePopover } from '../../AdaptablePopover';
import WizardPanel from '../../../components/WizardPanel';
import HelpBlock from '../../../components/HelpBlock';
import CheckBox from '../../../components/CheckBox';
import { Flex } from 'rebass';
import StringExtensions from '../../../Utilities/Extensions/StringExtensions';
import { ConditionalStyle } from '../../../PredefinedConfig/ConditionalStyleState';

export interface ConditionalStyleSelectQueryWizardProps
  extends AdaptableWizardStepProps<ConditionalStyle> {}
export interface ConditionalStyleSelectQueryWizardState {
  HasExpression: boolean;
}

export class ConditionalStyleSelectQueryWizard
  extends React.Component<
    ConditionalStyleSelectQueryWizardProps,
    ConditionalStyleSelectQueryWizardState
  >
  implements AdaptableWizardStep {
  constructor(props: ConditionalStyleSelectQueryWizardProps) {
    super(props);
    this.state = {
      HasExpression:
        StringExtensions.IsNotNullOrEmpty(this.props.data.Expression) ||
        StringExtensions.IsNotNullOrEmpty(this.props.data.SharedQueryId),
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <HelpBlock>
          A Query can be added to the Conditional Style to match 3 use cases:
          <ul>
            <li>The Scope is 'Whole Row'</li>
          </ul>
          <ul>
            <li>
              The Condition should be based on different columns to those which will be styled (as
              set in the Scope)
            </li>
          </ul>
          <ul>
            <li>
              Additional complexity or criteria are required to those already in the Condition
            </li>
          </ul>
        </HelpBlock>

        <Flex alignItems="center" flexDirection="row" marginTop={2}>
          <CheckBox
            marginRight={3}
            marginLeft={2}
            onChange={(checked: boolean) => this.onOtherExpressionOptionChanged(checked)}
            checked={this.state.HasExpression}
          >
            Use Query
          </CheckBox>{' '}
        </Flex>
      </WizardPanel>
    );
  }

  private onOtherExpressionOptionChanged(checked: boolean) {
    this.setState({ HasExpression: checked } as ConditionalStyleSelectQueryWizardState, () =>
      this.props.updateGoBackState()
    );
  }

  public canNext(): boolean {
    return true;
  }

  public canBack(): boolean {
    return true;
  }
  public next(): void {
    // if we have an expression and its null then create an empty one
    if (!this.state.HasExpression) {
      this.props.data.Expression = undefined;
      this.props.data.SharedQueryId = undefined;
    }
  }

  public back(): void {
    /* no implementation */
  }
  public getIndexStepIncrement() {
    return this.state.HasExpression ? 1 : 2;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}

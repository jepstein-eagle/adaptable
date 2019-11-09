import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { CellValidationRule } from '../../../PredefinedConfig/CellValidationState';

import { AdaptablePopover } from '../../AdaptablePopover';

import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';
import WizardPanel from '../../../components/WizardPanel';

import { Flex } from 'rebass';
import HelpBlock from '../../../components/HelpBlock';
import Checkbox from '../../../components/CheckBox';

export interface CellValidationSelectQueryWizardProps
  extends AdaptableWizardStepProps<CellValidationRule> {}
export interface CellValidationSelectQueryWizardState {
  HasExpression: boolean;
}

export class CellValidationSelectQueryWizard
  extends React.Component<
    CellValidationSelectQueryWizardProps,
    CellValidationSelectQueryWizardState
  >
  implements AdaptableWizardStep {
  constructor(props: CellValidationSelectQueryWizardProps) {
    super(props);
    this.state = {
      HasExpression: ExpressionHelper.IsNotNullOrEmptyExpression(this.props.Data.Expression),
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <HelpBlock marginBottom={2}>
          <p>A Query is used if the rule is dependent on other values in the row.</p>
          <p>The rule will only be activated and checked if the Query passes.</p>
        </HelpBlock>
        <Flex flexDirection="row" alignItems="center">
          <Checkbox
            marginLeft={2}
            marginRight={2}
            onChange={(checked: boolean) => this.onOtherExpressionOptionChanged(checked)}
            checked={this.state.HasExpression}
          >
            Use Validation Query
          </Checkbox>{' '}
          <AdaptablePopover
            headerText={'Validation Rule: Query'}
            bodyText={[
              'Create a query (in next step) which will stipulate other cell values required for the Rule.',
            ]}
          />
        </Flex>
      </WizardPanel>
    );
  }

  private onOtherExpressionOptionChanged(checked: boolean) {
    this.setState({ HasExpression: checked } as CellValidationSelectQueryWizardState, () =>
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
    if (
      !this.state.HasExpression ||
      (this.state.HasExpression && this.props.Data.Expression == null)
    ) {
      this.props.Data.Expression = ExpressionHelper.CreateEmptyExpression();
    }
  }

  public Back(): void {
    /* no implementation */
  }
  public GetIndexStepIncrement() {
    return this.state.HasExpression ? 1 : 2;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}

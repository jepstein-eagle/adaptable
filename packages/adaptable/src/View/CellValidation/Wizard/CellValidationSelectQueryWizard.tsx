import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { CellValidationRule } from '../../../PredefinedConfig/CellValidationState';
import { AdaptablePopover } from '../../AdaptablePopover';
import WizardPanel from '../../../components/WizardPanel';
import { Flex } from 'rebass';
import HelpBlock from '../../../components/HelpBlock';
import Checkbox from '../../../components/CheckBox';
import StringExtensions from '../../../Utilities/Extensions/StringExtensions';

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
      HasExpression:
        StringExtensions.IsNotNullOrEmpty(this.props.data.Expression) ||
        StringExtensions.IsNotNullOrEmpty(this.props.data.SharedQueryId),
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <HelpBlock marginBottom={2}>
          A Query is used if the rule is dependent on other values in the row.
          <br />
          <br />
          The rule will only be activated and checked if the Query passes.
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

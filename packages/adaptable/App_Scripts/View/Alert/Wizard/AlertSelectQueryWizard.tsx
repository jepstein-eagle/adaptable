import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { AdaptablePopover } from '../../AdaptablePopover';

import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';
import { AlertDefinition } from '../../../PredefinedConfig/AlertState';
import WizardPanel from '../../../components/WizardPanel';
import HelpBlock from '../../../components/HelpBlock';
import CheckBox from '../../../components/CheckBox';
import { Flex } from 'rebass';

export interface AlertSelectQueryWizardProps extends AdaptableWizardStepProps<AlertDefinition> {}
export interface AlertSelectQueryWizardState {
  HasExpression: boolean;
}

export class AlertSelectQueryWizard
  extends React.Component<AlertSelectQueryWizardProps, AlertSelectQueryWizardState>
  implements AdaptableWizardStep {
  constructor(props: AlertSelectQueryWizardProps) {
    super(props);
    this.state = {
      HasExpression: ExpressionHelper.IsNotNullOrEmptyExpression(this.props.Data.Expression),
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <HelpBlock>
          A Query is used if the alert triggering is dependent on value in other columns in the row.
          <br />
          <br />
          If so, then alert will only be triggered if the Query evaluates as true.
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
          <AdaptablePopover
            headerText={'Alert: Query'}
            bodyText={[
              'Create a query (in next step) which will stipulate other cell values required for the Alert to be triggered.',
            ]}
          />
        </Flex>
      </WizardPanel>
    );
  }

  private onOtherExpressionOptionChanged(checked: boolean) {
    this.setState({ HasExpression: checked } as AlertSelectQueryWizardState, () =>
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
    // if we have an expression and its null then create an empty one
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

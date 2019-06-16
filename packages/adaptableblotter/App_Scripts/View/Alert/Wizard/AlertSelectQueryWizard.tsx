import * as React from 'react';
import { Col, Panel, Checkbox, HelpBlock } from 'react-bootstrap';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { AdaptablePopover } from '../../AdaptablePopover';
import { AdaptableBlotterForm } from '../../Components/Forms/AdaptableBlotterForm';
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';
import { AlertDefinition } from '../../../PredefinedConfig/IUserState/AlertState';

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
    let cssClassName: string = this.props.cssClassName + '-selectquery';

    return (
      <div className={cssClassName}>
        <Panel header="Alert Query" bsStyle="primary">
          <AdaptableBlotterForm inline>
            <Col xs={12}>
              <HelpBlock>
                A Query is used if the alert is dependent on other values in the row.
                <br />
                The alert will only be triggered if the Query passes.
              </HelpBlock>
            </Col>
            <Col xs={12}>
              <Checkbox
                inline
                onChange={e => this.onOtherExpressionOptionChanged(e)}
                checked={this.state.HasExpression}
              >
                Use Query
              </Checkbox>{' '}
              <AdaptablePopover
                cssClassName={cssClassName}
                headerText={'Alert: Query'}
                bodyText={[
                  'Create a query (in next step) which will stipulate other cell values required for the Alert to be triggered.',
                ]}
              />
            </Col>
          </AdaptableBlotterForm>
        </Panel>
      </div>
    );
  }

  private onOtherExpressionOptionChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ HasExpression: e.checked } as AlertSelectQueryWizardState, () =>
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

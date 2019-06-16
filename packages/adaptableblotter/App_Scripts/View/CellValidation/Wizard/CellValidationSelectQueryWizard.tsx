import * as React from 'react';
import { Col, Panel, Checkbox, HelpBlock } from 'react-bootstrap';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { ICellValidationRule } from '../../../PredefinedConfig/IUserState Interfaces/CellValidationState';
import { MessageType } from '../../../PredefinedConfig/Common Objects/Enums';
import { AdaptablePopover } from '../../AdaptablePopover';
import { AdaptableBlotterForm } from '../../Components/Forms/AdaptableBlotterForm';
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';

export interface CellValidationSelectQueryWizardProps
  extends AdaptableWizardStepProps<ICellValidationRule> {}
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
    let cssClassName: string = this.props.cssClassName + '-selectquery';

    return (
      <div className={cssClassName}>
        <Panel header="Cell Validation Query" bsStyle="primary">
          <AdaptableBlotterForm inline>
            <Col xs={12}>
              <HelpBlock>
                A Query is used if the rule is dependent on other values in the row.
                <br />
                The rule will only be activated and checked if the Query passes.
              </HelpBlock>
            </Col>
            <Col xs={12}>
              <Checkbox
                inline
                onChange={e => this.onOtherExpressionOptionChanged(e)}
                checked={this.state.HasExpression}
              >
                Use Validation Query
              </Checkbox>{' '}
              <AdaptablePopover
                cssClassName={cssClassName}
                headerText={'Validation Rule: Query'}
                bodyText={[
                  'Create a query (in next step) which will stipulate other cell values required for the Rule.',
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
    this.setState({ HasExpression: e.checked } as CellValidationSelectQueryWizardState, () =>
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

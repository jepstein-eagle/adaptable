import * as React from 'react';
import { AdaptableWizardStep } from '../Wizard/Interface/IAdaptableWizard';
import { ExpressionMode } from '../../PredefinedConfig/Common/Enums';
import { AdaptableApi } from '../../Api/AdaptableApi';
import ExpressionEditor from '../../components/ExpressionEditor';
import * as parser from '../../parser/src';
import Radio from '../../components/Radio';
import { Flex } from 'rebass';
import { NewExpression } from '../../PredefinedConfig/Common/Expression';
import { SharedExpression } from '../../PredefinedConfig/SharedExpressionState';
import * as SharedExpressionRedux from '../../Redux/ActionsReducers/SharedExpressionRedux';
import Dropdown from '../../components/Dropdown';

export interface ExpressionBuilderPageProps extends React.ClassAttributes<ExpressionBuilderPage> {
  SharedExpressions: SharedExpression[];
  onAddSharedExpression: (
    sharedExpression: SharedExpression
  ) => SharedExpressionRedux.SharedExpressionAddAction;
  // these all need to be ptional because of wizard compatibility - todo: fix...
  UpdateGoBackState?(finish?: boolean): void;
  StepName?: string;
  // Columns?: Array<AdaptableColumn>;
  Api: AdaptableApi;
}

export type ExpressionBuilderPageState = NewExpression;

export class ExpressionBuilderPage
  extends React.Component<ExpressionBuilderPageProps, ExpressionBuilderPageState>
  implements AdaptableWizardStep {
  render() {
    const firstRow = this.props.Api.gridApi.getFirstRowNode().data;

    return (
      <>
        <Flex
          flexDirection="row"
          padding={2}
          style={{ borderBottom: '1px solid var(--ab-color-primary)' }}
        >
          <Radio
            marginLeft={3}
            value="Shared"
            checked={this.state.Type === 'Shared'}
            onChange={() => this.setState({ Type: 'Shared' })}
          >
            Use Shared Expression
          </Radio>
          <Radio
            marginLeft={3}
            value="Custom"
            checked={this.state.Type === 'Custom'}
            onChange={() => this.setState({ Type: 'Custom' })}
          >
            Use Custom Expression
          </Radio>
        </Flex>
        {this.state.Type === 'Shared' && (
          <div>
            <Dropdown
              placeholder="Select Shared Expression"
              value={this.state.SharedExpressionId}
              onChange={(value: any) => this.setState({ SharedExpressionId: value })}
              options={this.props.SharedExpressions.map(item => ({
                value: item.Uuid,
                label: item.Name,
              }))}
            />
          </div>
        )}
        {this.state.Type === 'Custom' && (
          <ExpressionEditor
            value={this.state.CustomExpression}
            onChange={(e: React.SyntheticEvent) => this.handleCustomExpressionChange(e)}
            initialData={firstRow}
            columns={this.props.Api.gridApi.getColumns()}
            functions={parser.defaultFunctions}
          />
        )}
      </>
    );
  }

  handleCustomExpressionChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ CustomExpression: e.value }, () => this.props.UpdateGoBackState());
  }

  public canNext(): boolean {
    return true;
    // return parser.validateBoolean(this.state.Expression);
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    /*this.props.Data.Values = this.state.SelectedValues*/
  }
  public Back(): void {
    // todo
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
  public StepName = 'Build Expression';
}

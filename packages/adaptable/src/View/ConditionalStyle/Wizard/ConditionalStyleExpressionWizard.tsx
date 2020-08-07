import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import {
  ExpressionBuilderPage,
  ExpressionBuilderPageProps,
} from '../../ExpressionBuilder/ExpressionBuilderPage';
import { ConditionalStyle } from '../../../PredefinedConfig/ConditionalStyleState';
import { UIHelper } from '../../UIHelper';
import { NewExpression } from '../../../PredefinedConfig/Common/Expression';
import { SharedExpression } from '../../../PredefinedConfig/SharedExpressionState';
import * as SharedExpressionRedux from '../../../Redux/ActionsReducers/SharedExpressionRedux';
import ExpressionEditor from '../../../components/ExpressionEditor';
import Radio from '../../../components/Radio';
import { Flex } from 'rebass';
import Dropdown from '../../../components/Dropdown';
import * as parser from '../../../parser/src';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import CheckBox from '../../../components/CheckBox';
import check from '../../../components/icons/check';
import Input from '../../../components/Input';
import { createUuid } from '../../../components/utils/uuid';

export interface ConditionalStyleExpressionWizardProps
  extends AdaptableWizardStepProps<ConditionalStyle> {
  SharedExpressions: SharedExpression[];
  onAddSharedExpression: (
    sharedExpression: SharedExpression
  ) => SharedExpressionRedux.SharedExpressionAddAction;
}

export interface ConditionalStyleExpressionWizardState {
  Expression: NewExpression;
  saveToSharedExpressions: boolean;
  newSharedExpressionName: string;
}

export class ConditionalStyleExpressionWizard
  extends React.Component<
    ConditionalStyleExpressionWizardProps,
    ConditionalStyleExpressionWizardState
  >
  implements AdaptableWizardStep {
  constructor(props: ConditionalStyleExpressionWizardProps) {
    super(props);
    this.state = {
      Expression: props.Data.Expression,
      saveToSharedExpressions: false,
      newSharedExpressionName: '',
    };
  }

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
            checked={this.state.Expression.Type === 'Shared'}
            onChange={() =>
              this.setState(
                {
                  Expression: {
                    ...this.state.Expression,
                    Type: 'Shared',
                  },
                },
                () => this.props.UpdateGoBackState()
              )
            }
          >
            Use Shared Expression
          </Radio>
          <Radio
            marginLeft={3}
            value="Custom"
            checked={this.state.Expression.Type === 'Custom'}
            onChange={() =>
              this.setState(
                {
                  Expression: {
                    ...this.state.Expression,
                    Type: 'Custom',
                  },
                },
                () => this.props.UpdateGoBackState()
              )
            }
          >
            Use Custom Expression
          </Radio>
        </Flex>
        {this.state.Expression.Type === 'Shared' && (
          <div>
            <Dropdown
              placeholder="Select Shared Expression"
              value={this.state.Expression.SharedExpressionId}
              onChange={(value: any) =>
                this.setState(
                  {
                    Expression: {
                      ...this.state.Expression,
                      SharedExpressionId: value,
                    },
                  },
                  () => this.props.UpdateGoBackState()
                )
              }
              options={this.props.SharedExpressions.map(item => ({
                value: item.Uuid,
                label: item.Name,
              }))}
            />
          </div>
        )}
        {this.state.Expression.Type === 'Custom' && (
          <div>
            <ExpressionEditor
              value={this.state.Expression.CustomExpression}
              onChange={(e: React.SyntheticEvent) => this.handleCustomExpressionChange(e)}
              initialData={firstRow}
              columns={this.props.Api.gridApi.getColumns()}
              functions={parser.defaultFunctions}
            />
            <CheckBox
              checked={this.state.saveToSharedExpressions}
              onChange={checked =>
                this.setState(
                  {
                    saveToSharedExpressions: checked,
                  },
                  () => this.props.UpdateGoBackState()
                )
              }
            >
              Save to Shared Expressions
            </CheckBox>
            <Input
              value={this.state.newSharedExpressionName}
              onChange={(e: React.FormEvent) =>
                this.setState(
                  {
                    newSharedExpressionName: (e.target as HTMLInputElement).value,
                  },
                  () => this.props.UpdateGoBackState()
                )
              }
            />
          </div>
        )}
      </>
    );
  }

  handleCustomExpressionChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        Expression: {
          ...this.state.Expression,
          CustomExpression: e.value,
        },
      },
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    if (
      this.state.Expression.Type === 'Shared' &&
      StringExtensions.IsNullOrEmpty(this.state.Expression.SharedExpressionId)
    ) {
      return false;
    }

    if (
      this.state.Expression.Type === 'Custom' &&
      (StringExtensions.IsNullOrEmpty(this.state.Expression.CustomExpression) ||
        !parser.validateBoolean(this.state.Expression.CustomExpression))
    ) {
      return false;
    }

    if (
      this.state.saveToSharedExpressions &&
      StringExtensions.IsNullOrEmpty(this.state.newSharedExpressionName)
    ) {
      return false;
    }

    return true;
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.Expression = this.state.Expression;

    if (this.state.saveToSharedExpressions) {
      const Uuid = createUuid();
      this.props.onAddSharedExpression({
        Uuid,
        Name: this.state.newSharedExpressionName,
        Expression: this.state.Expression.CustomExpression,
      });
      this.props.Data.Expression = {
        Type: 'Shared',
        SharedExpressionId: Uuid,
      };
    }
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
}

import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../Wizard/Interface/IAdaptableWizard';
import ExpressionEditor from '../../components/ExpressionEditor';
import Radio from '../../components/Radio';
import { Flex } from 'rebass';
import Dropdown from '../../components/Dropdown';
import * as parser from '../../parser/src';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import CheckBox from '../../components/CheckBox';
import Input from '../../components/Input';
import { TypeUuid } from '../../PredefinedConfig/Uuid';
import { QueryObject } from '../../PredefinedConfig/Common/QueryObject';

export interface ExpressionWizardProps extends AdaptableWizardStepProps<QueryObject> {
  onSetNewSharedQueryName: (newSharedQueryName: string) => void;
  onSetUseSharedQuery: (useSharedQuery: boolean) => void;
}

export interface ExpressionWizardState {
  expression?: string;
  sharedQueryId?: TypeUuid;
  useSharedQuery: boolean;
  saveToSharedQueries: boolean;
  newSharedQueryName: string;
}

export class ExpressionWizard extends React.Component<ExpressionWizardProps, ExpressionWizardState>
  implements AdaptableWizardStep {
  constructor(props: ExpressionWizardProps) {
    super(props);
    this.state = {
      expression: props.data.Expression,
      sharedQueryId: props.data.SharedQueryId,
      useSharedQuery: StringExtensions.IsNotNullOrEmpty(props.data.SharedQueryId),
      saveToSharedQueries: false,
      newSharedQueryName: '',
    };
  }

  render() {
    const firstRow = this.props.api.gridApi.getFirstRowNode().data;

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
            checked={this.state.useSharedQuery == true}
            onChange={() =>
              this.setState(
                {
                  useSharedQuery: !this.state.useSharedQuery,
                },
                () => this.props.updateGoBackState()
              )
            }
          >
            Use Shared Expression
          </Radio>
          <Radio
            marginLeft={3}
            value="Custom"
            checked={this.state.useSharedQuery == false}
            onChange={() =>
              this.setState(
                {
                  useSharedQuery: !this.state.useSharedQuery,
                },
                () => this.props.updateGoBackState()
              )
            }
          >
            Use Custom Expression
          </Radio>
        </Flex>
        {this.state.useSharedQuery == true && (
          <div>
            <Dropdown
              placeholder="Select Shared Expression"
              value={this.state.sharedQueryId}
              onChange={(value: any) =>
                this.setState(
                  {
                    sharedQueryId: value,
                  },
                  () => this.props.updateGoBackState()
                )
              }
              options={this.props.api.queryApi.getAllSharedQuery().map(item => ({
                value: item.Uuid,
                label: item.Name,
              }))}
            />
          </div>
        )}
        {this.state.useSharedQuery == false && (
          <div>
            <ExpressionEditor
              value={this.state.expression}
              onChange={(e: React.SyntheticEvent) => this.handleCustomExpressionChange(e)}
              initialData={firstRow}
              columns={this.props.api.columnApi.getColumns()}
              functions={parser.defaultFunctions}
              hideHelpBlock={true}
              api={this.props.api}
            />
            <CheckBox
              checked={this.state.saveToSharedQueries}
              onChange={checked =>
                this.setState(
                  {
                    saveToSharedQueries: checked,
                  },
                  () => this.props.updateGoBackState()
                )
              }
            >
              Save to Shared Expressions
            </CheckBox>
            {this.state.saveToSharedQueries && (
              <Input
                value={this.state.newSharedQueryName}
                onChange={(e: React.FormEvent) =>
                  this.setState(
                    {
                      newSharedQueryName: (e.target as HTMLInputElement).value,
                    },
                    () => this.props.updateGoBackState()
                  )
                }
              />
            )}
          </div>
        )}
      </>
    );
  }

  handleCustomExpressionChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        expression: e.value,
      },
      () => this.props.updateGoBackState()
    );
  }

  public canNext(): boolean {
    if (
      this.state.useSharedQuery == true &&
      StringExtensions.IsNullOrEmpty(this.state.sharedQueryId)
    ) {
      return false;
    }

    if (
      this.state.useSharedQuery == false &&
      StringExtensions.IsNullOrEmpty(this.state.expression)
    ) {
      return false;
    }

    if (this.state.useSharedQuery == false && !parser.validateBoolean(this.state.expression)) {
      return false;
    }

    if (
      this.state.saveToSharedQueries &&
      StringExtensions.IsNullOrEmpty(this.state.newSharedQueryName)
    ) {
      return false;
    }

    return true;
  }

  public canBack(): boolean {
    return true;
  }
  public next(): void {
    if (this.state.useSharedQuery) {
      this.props.data.Expression = undefined;
      this.props.data.SharedQueryId = this.state.sharedQueryId;
    } else {
      this.props.data.Expression = this.state.expression;
      this.props.data.SharedQueryId = undefined;
    }

    this.props.onSetUseSharedQuery(this.state.useSharedQuery);

    if (this.state.saveToSharedQueries) {
      this.props.onSetNewSharedQueryName(this.state.newSharedQueryName);
    }
  }

  public back(): void {
    // todo
  }

  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}

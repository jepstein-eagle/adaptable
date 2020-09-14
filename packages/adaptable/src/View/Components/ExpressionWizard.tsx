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
import DropdownButton from '../../components/DropdownButton';
import FormLayout, { FormRow } from '../../components/FormLayout';
import { DataType } from '../../PredefinedConfig/Common/Enums';

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
    const firstNode = this.props.api.gridApi.getFirstRowNode();
    const initialData = firstNode ? firstNode.data : {};

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
            Use Shared Query
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
            Create Custom Expression
          </Radio>
        </Flex>
        {this.state.useSharedQuery == true && (
          <Flex
            flexDirection="row"
            padding={2}
            style={{ borderBottom: '1px solid var(--ab-color-primary)' }}
          >
            <DropdownButton
              margin={3}
              placeholder="Select"
              variant="outlined"
              tone="none"
              style={{
                minWidth: '15rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              items={this.props.api.queryApi.getAllSharedQuery().map(item => ({
                value: item.Uuid,
                label: item.Name,
                onClick: () => {
                  this.setState(
                    {
                      sharedQueryId: item.Uuid,
                    },
                    () => this.props.updateGoBackState()
                  );
                },
              }))}
            >
              {this.props.api.queryApi
                .getAllSharedQuery()
                .find(sq => sq.Uuid == this.state.sharedQueryId)
                ? this.props.api.queryApi
                    .getAllSharedQuery()
                    .find(sq => sq.Uuid == this.state.sharedQueryId).Name
                : 'Select Shared Query'}
            </DropdownButton>
          </Flex>
        )}
        {this.state.useSharedQuery == false && (
          <>
            <ExpressionEditor
              value={this.state.expression}
              onChange={(e: React.SyntheticEvent) => this.handleCustomExpressionChange(e)}
              initialData={initialData}
              columns={this.props.api.columnApi.getColumns()}
              functions={parser.defaultFunctions}
              hideHelpBlock={true}
              api={this.props.api}
            />{' '}
            <Flex
              flexDirection="row"
              padding={1}
              marginBottom={2}
              marginLeft={1}
              alignItems="center"
            >
              <CheckBox
                marginLeft={2}
                disabled={!this.isValidExpression()}
                marginBottom={2}
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
                Save as new Shared Query
              </CheckBox>
              {this.state.saveToSharedQueries && (
                <Input
                  marginLeft={2}
                  style={{ minWidth: '20rem' }}
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
            </Flex>
          </>
        )}
      </>
    );
  }

  isValidExpression(): boolean {
    return (
      StringExtensions.IsNotNullOrEmpty(this.state.expression) &&
      parser.validateBoolean(this.state.expression)
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

    if (this.state.useSharedQuery == false && this.isValidExpression() == false) {
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

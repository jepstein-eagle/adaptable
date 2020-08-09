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
import { SharedQuery } from '../../../PredefinedConfig/SharedQueryState';
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
import { TypeUuid } from '../../../PredefinedConfig/Uuid';

export interface ConditionalStyleExpressionWizardProps
  extends AdaptableWizardStepProps<ConditionalStyle> {
  SharedQueries: SharedQuery[];
  onSetNewSharedQueryName: (newSharedQueryName: string) => void;
  onSetUseSharedQuery: (useSharedQuery: boolean) => void;
}

export interface ConditionalStyleExpressionWizardState {
  Query: string | TypeUuid;
  useSharedQuery: boolean;
  saveToSharedQueries: boolean;
  newSharedQueryName: string;
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
      Query: props.Data.Query,
      useSharedQuery: this.props.Api.sharedQueryApi.isSharedQuery(props.Data.Query),
      saveToSharedQueries: false,
      newSharedQueryName: '',
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
            checked={this.state.useSharedQuery == true}
            onChange={() =>
              this.setState(
                {
                  useSharedQuery: !this.state.useSharedQuery,
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
            checked={this.state.useSharedQuery == false}
            onChange={() =>
              this.setState(
                {
                  useSharedQuery: !this.state.useSharedQuery,
                },
                () => this.props.UpdateGoBackState()
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
              value={this.state.Query}
              onChange={(value: any) =>
                this.setState(
                  {
                    Query: value,
                  },
                  () => this.props.UpdateGoBackState()
                )
              }
              options={this.props.SharedQueries.map(item => ({
                value: item.Uuid,
                label: item.Name,
              }))}
            />
          </div>
        )}
        {this.state.useSharedQuery == false && (
          <div>
            <ExpressionEditor
              value={this.state.Query}
              onChange={(e: React.SyntheticEvent) => this.handleCustomExpressionChange(e)}
              initialData={firstRow}
              columns={this.props.Api.gridApi.getColumns()}
              functions={parser.defaultFunctions}
              hideHelpBlock={true}
            />
            <CheckBox
              checked={this.state.saveToSharedQueries}
              onChange={checked =>
                this.setState(
                  {
                    saveToSharedQueries: checked,
                  },
                  () => this.props.UpdateGoBackState()
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
                    () => this.props.UpdateGoBackState()
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
        Query: e.value,
      },
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    if (StringExtensions.IsNullOrEmpty(this.state.Query)) {
      return false;
    }

    if (this.state.useSharedQuery == false && !parser.validateBoolean(this.state.Query)) {
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
  public Next(): void {
    this.props.Data.Query = this.state.Query;

    this.props.onSetUseSharedQuery(this.state.useSharedQuery);

    if (this.state.saveToSharedQueries) {
      this.props.onSetNewSharedQueryName(this.state.newSharedQueryName);
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

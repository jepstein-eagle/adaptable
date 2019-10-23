import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import {
  DataType,
  LeafExpressionOperator,
  RangeOperandType,
} from '../../../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';
import { QueryRange } from '../../../PredefinedConfig/Common/Expression/QueryRange';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import { AlertDefinition } from '../../../PredefinedConfig/RunTimeState/AlertState';
import Radio from '../../../components/Radio';
import HelpBlock from '../../../components/HelpBlock';
import { Box, Flex } from 'rebass';
import Dropdown from '../../../components/Dropdown';
import Input from '../../../components/Input';
import WizardPanel from '../../../components/WizardPanel';

export interface AlertRulesWizardProps extends AdaptableWizardStepProps<AlertDefinition> {}
export interface AlertSettingsWizardState {
  Operator: LeafExpressionOperator;
  Operand1: string;
  Operand2: string;
}

export class AlertRulesWizard
  extends React.Component<AlertRulesWizardProps, AlertSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: AlertRulesWizardProps) {
    super(props);
    this.state = {
      Operator: this.props.Data.Range.Operator as LeafExpressionOperator,
      Operand1: this.props.Data.Range.Operand1,
      Operand2: this.props.Data.Range.Operand2,
    };
  }

  render(): any {
    let operatorTypes = this.getAvailableOperators().map((operator: LeafExpressionOperator) => {
      return {
        value: operator.toString(),
        label: ExpressionHelper.OperatorToLongFriendlyString(
          operator,
          this.getColumnDataTypeFromState()
        ),
      };
    });

    let columnFriendlyName: string = ColumnHelper.getFriendlyNameFromColumnId(
      this.props.Data.ColumnId,
      this.props.Columns
    );

    return (
      <WizardPanel>
        <Flex flexDirection="column" padding={2}>
          <Box>
            <HelpBlock>
              {'Show alerts for any data change to the ' + columnFriendlyName + ' column.'}
            </HelpBlock>
            <Radio
              marginLeft={1}
              value="Any"
              name="alert"
              checked={this.state.Operator == LeafExpressionOperator.AnyChange}
              onChange={(v: any, e: React.SyntheticEvent) => this.onDisallowEditChanged(e)}
            >
              Show Alert for ALL changes
            </Radio>{' '}
          </Box>
          <Box marginTop={2}>
            <HelpBlock>
              {
                'Only show an Alert when the change to the column matches a rule (to be set by you).'
              }
            </HelpBlock>
            <Radio
              marginLeft={1}
              value="others"
              name="alert"
              checked={this.state.Operator != LeafExpressionOperator.AnyChange}
              onChange={(v: any, e: React.SyntheticEvent) => this.onDisallowEditChanged(e)}
            >
              Show Alert when new cell value matches rule:
            </Radio>{' '}
          </Box>

          {/* if not AnyChange operator then show operator dropdown */}
          <Flex flexDirection="column">
            {this.state.Operator != LeafExpressionOperator.AnyChange ? (
              <Box marginBottom={2} style={{ flex: 1, width: '100%' }}>
                <Dropdown
                  disabled={this.checkOperator(LeafExpressionOperator.AnyChange)}
                  placeholder="Select an Operator"
                  value={this.state.Operator ? this.state.Operator.toString() : ''}
                  onChange={(operator: any) => this.onOperatorChanged(operator)}
                  options={operatorTypes}
                  style={{ maxWidth: 'inherit' }}
                ></Dropdown>
              </Box>
            ) : null}
            <Flex flexDirection="row" flex={1}>
              {/* if  numeric then show a numeric control */}
              {this.state.Operator != null &&
                !this.checkOperator(LeafExpressionOperator.AnyChange) &&
                !this.checkOperator(LeafExpressionOperator.IsPositive) &&
                !this.checkOperator(LeafExpressionOperator.IsNegative) &&
                !this.checkOperator(LeafExpressionOperator.IsNotNumber) &&
                this.getColumnDataTypeFromState() == DataType.Number && (
                  <>
                    <Input
                      style={{ flex: 1 }}
                      value={this.state.Operand1}
                      type="number"
                      placeholder="Enter Number"
                      onChange={(x: React.SyntheticEvent) => this.onOperand1ValueChanged(x)}
                    />
                    {this.isBetweenOperator() ? (
                      <Input
                        style={{ flex: 1 }}
                        marginLeft={2}
                        value={this.state.Operand2}
                        type="number"
                        placeholder="Enter Number"
                        onChange={(x: React.SyntheticEvent) => this.onOperand2ValueChanged(x)}
                      />
                    ) : null}
                  </>
                )}

              {/* if  date then show a date control */}
              {this.state.Operator != null &&
                !this.checkOperator(LeafExpressionOperator.AnyChange) &&
                this.getColumnDataTypeFromState() == DataType.Date && (
                  <>
                    <Input
                      type="date"
                      style={{ flex: 1 }}
                      placeholder="Enter Date"
                      value={this.state.Operand1}
                      onChange={(x: React.SyntheticEvent) => this.onOperand1ValueChanged(x)}
                    />
                    {this.isBetweenOperator() && (
                      <Input
                        style={{ flex: 1 }}
                        marginLeft={2}
                        value={this.state.Operand2}
                        type="date"
                        placeholder="Enter Date"
                        onChange={(x: React.SyntheticEvent) => this.onOperand2ValueChanged(x)}
                      />
                    )}
                  </>
                )}

              {/* if string then show a text control  */}
              {this.state.Operator != null &&
                !this.checkOperator(LeafExpressionOperator.AnyChange) &&
                !this.checkOperator(LeafExpressionOperator.NoDuplicateValues) &&
                !this.checkOperator(LeafExpressionOperator.ExistingValuesOnly) &&
                this.getColumnDataTypeFromState() == DataType.String && (
                  <Input
                    style={{ flex: 1 }}
                    value={this.state.Operand1}
                    type="text"
                    placeholder="Enter a Value"
                    onChange={(x: React.SyntheticEvent) => this.onOperand1ValueChanged(x)}
                  />
                )}
            </Flex>
          </Flex>
        </Flex>
      </WizardPanel>
    );
  }

  private onOperatorChanged(operator: string) {
    operator = operator || '';
    this.setState(
      { Operator: operator, Operand1: '', Operand2: '' } as AlertSettingsWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  private onOperand1ValueChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ Operand1: e.value } as AlertSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onOperand2ValueChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ Operand2: e.value } as AlertSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onDisallowEditChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    let operator: LeafExpressionOperator =
      e.value == 'Any' ? LeafExpressionOperator.AnyChange : null;
    this.setState({ Operator: operator } as AlertSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private getColumnDataTypeFromState(): DataType {
    return ColumnHelper.getColumnDataTypeFromColumnId(this.props.Data.ColumnId, this.props.Columns);
  }

  private checkOperator(operator: LeafExpressionOperator): boolean {
    return this.state.Operator == operator;
  }

  private isBetweenOperator(): boolean {
    return (
      this.checkOperator(LeafExpressionOperator.Between) ||
      this.checkOperator(LeafExpressionOperator.NotBetween)
    );
  }

  private getAvailableOperators(): LeafExpressionOperator[] {
    switch (this.getColumnDataTypeFromState()) {
      case DataType.Boolean:
        return [LeafExpressionOperator.IsTrue, LeafExpressionOperator.IsFalse];
      case DataType.String:
        return [
          LeafExpressionOperator.Equals,
          LeafExpressionOperator.NotEquals,
          LeafExpressionOperator.Contains,
          LeafExpressionOperator.NotContains,
          LeafExpressionOperator.StartsWith,
          LeafExpressionOperator.Regex,
          LeafExpressionOperator.NoDuplicateValues,
          LeafExpressionOperator.ExistingValuesOnly,
        ];
      case DataType.Date:
        return [
          LeafExpressionOperator.Equals,
          LeafExpressionOperator.NotEquals,
          LeafExpressionOperator.GreaterThan,
          LeafExpressionOperator.LessThan,
          LeafExpressionOperator.Between,
          LeafExpressionOperator.NotBetween,
        ];
      case DataType.Number:
        return [
          LeafExpressionOperator.Equals,
          LeafExpressionOperator.NotEquals,
          LeafExpressionOperator.LessThan,
          LeafExpressionOperator.GreaterThan,
          LeafExpressionOperator.Between,
          LeafExpressionOperator.NotBetween,
          LeafExpressionOperator.IsPositive,
          LeafExpressionOperator.IsNegative,
          LeafExpressionOperator.ValueChange,
          LeafExpressionOperator.PercentChange,
          LeafExpressionOperator.IsNotNumber,
        ];
    }
  }

  public canNext(): boolean {
    if (this.state.Operator == null || this.state.Operator == undefined) {
      return false;
    }

    if (this.state.Operator == LeafExpressionOperator.AnyChange) {
      return true;
    }

    if (!ExpressionHelper.OperatorRequiresValue(this.state.Operator)) {
      return true;
    }

    if (this.isBetweenOperator() && StringExtensions.IsNullOrEmpty(this.state.Operand2)) {
      return false;
    }
    return StringExtensions.IsNotNullOrEmpty(this.state.Operand1);
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    let rangeExpression: QueryRange = {
      Operator: this.state.Operator,
      Operand1: this.state.Operand1,
      Operand2: this.state.Operand2,
      Operand1Type: RangeOperandType.Value,
      Operand2Type: RangeOperandType.Value,
    };
    this.props.Data.Range = rangeExpression;
  }

  public Back(): void {
    //todo
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}

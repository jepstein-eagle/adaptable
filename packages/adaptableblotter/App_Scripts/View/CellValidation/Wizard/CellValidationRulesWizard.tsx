import * as React from 'react';
import { FormGroup, FormControl, Col } from 'react-bootstrap';
import { IColumn } from '../../../Utilities/Interface/IColumn';
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
import { AdaptablePopover } from '../../AdaptablePopover';
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';
import { AdaptableBlotterForm } from '../../Components/Forms/AdaptableBlotterForm';
import { CellValidationRule } from '../../../PredefinedConfig/RunTimeState/CellValidationState';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import { QueryRange } from '../../../PredefinedConfig/Common/Expression/QueryRange';
import { Box, Flex } from 'rebass';
import Dropdown from '../../../components/Dropdown';
import Panel from '../../../components/Panel';
import WizardPanel from '../../../components/WizardPanel';
import HelpBlock from '../../../components/HelpBlock';
import Radio from '../../../components/Radio';
import Input from '../../../components/Input';

export interface CellValidationRulesWizardProps
  extends AdaptableWizardStepProps<CellValidationRule> {}
export interface CellValidationSettingsWizardState {
  Operator: LeafExpressionOperator;
  Operand1: string;
  Operand2: string;
}

export class CellValidationRulesWizard
  extends React.Component<CellValidationRulesWizardProps, CellValidationSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: CellValidationRulesWizardProps) {
    super(props);
    this.state = {
      Operator: this.props.Data.Range.Operator as LeafExpressionOperator,
      Operand1: this.props.Data.Range.Operand1,
      Operand2: this.props.Data.Range.Operand2,
    };
  }

  render(): any {
    const availableOperators = this.getAvailableOperators();
    let operatorTypes = availableOperators.map((operator: LeafExpressionOperator) => {
      return (
        <option key={operator} value={operator.toString()}>
          {ExpressionHelper.OperatorToLongFriendlyString(
            operator,
            ColumnHelper.getColumnDataTypeFromColumnId(this.props.Data.ColumnId, this.props.Columns)
          )}
        </option>
      );
    });
    let operatorOptions = availableOperators.map((operator: LeafExpressionOperator) => {
      return {
        value: operator.toString(),
        label: ExpressionHelper.OperatorToLongFriendlyString(
          operator,
          ColumnHelper.getColumnDataTypeFromColumnId(this.props.Data.ColumnId, this.props.Columns)
        ),
      };
    });

    let columnFriendlyName: string = ColumnHelper.getFriendlyNameFromColumnId(
      this.props.Data.ColumnId,
      this.props.Columns
    );

    let validationRuleHeader: string = 'Validation Rule for Column: ' + columnFriendlyName;

    let helpText: string =
      'Choose whether to prevent all edits for this column, or whether to allow those which match a rule (to be set by you).';
    let cssClassName: string = this.props.cssClassName + '-rules';

    return (
      <WizardPanel header={validationRuleHeader}>
        <HelpBlock>
          <p>{helpText}</p>
        </HelpBlock>
        <Flex flexDirection="row" alignItems="center" marginTop={3} marginLeft={2}>
          <Radio
            marginRight={2}
            value="None"
            checked={this.state.Operator == LeafExpressionOperator.None}
            onChange={(_, e: any) => this.onDisallowEditChanged(e)}
          >
            Disallow ALL edits
          </Radio>{' '}
          <AdaptablePopover
            cssClassName={cssClassName}
            headerText={'Validation Rule: No Edits Allowed'}
            bodyText={['Any edit is invalid - effectively makes the column read-only.']}
          />
        </Flex>
        <Flex flexDirection="row" alignItems="center" marginTop={3} marginLeft={2}>
          <Radio
            marginRight={2}
            value="others"
            checked={this.state.Operator != LeafExpressionOperator.None}
            onChange={(_, e: any) => this.onDisallowEditChanged(e)}
          >
            Disallow edits where the new cell value matches rule:
          </Radio>{' '}
          <AdaptablePopover
            cssClassName={cssClassName}
            headerText={'Validation Rule: Custom'}
            bodyText={['Disallow edits that match the rule defined in the dropdown below.']}
          />
        </Flex>

        {/* if not None operator then show operator dropdown */}
        <Flex flexDirection="column" marginTop={3} marginLeft={2} marginRight={2}>
          {this.state.Operator != LeafExpressionOperator.None ? (
            <Dropdown
              style={{ maxWidth: 'inherit', width: '100%' }}
              marginBottom={2}
              options={operatorOptions}
              disabled={this.checkOperator(LeafExpressionOperator.None)}
              placeholder="select"
              value={this.state.Operator ? this.state.Operator.toString() : ''}
              onChange={(x: any) => this.onOperatorChanged(x)}
            />
          ) : null}
          {/* if  numeric then show a numeric control */}
          {!this.checkOperator(LeafExpressionOperator.None) &&
            !this.checkOperator(LeafExpressionOperator.Unknown) &&
            !this.checkOperator(LeafExpressionOperator.IsPositive) &&
            !this.checkOperator(LeafExpressionOperator.IsNegative) &&
            !this.checkOperator(LeafExpressionOperator.IsNotNumber) &&
            ColumnHelper.getColumnDataTypeFromColumnId(
              this.props.Data.ColumnId,
              this.props.Columns
            ) == DataType.Number && (
              <Flex flex={5} alignItems="center">
                <Input
                  value={this.state.Operand1}
                  type="number"
                  placeholder="Enter Number"
                  style={{ flex: 1 }}
                  onChange={(x: any) => this.onOperand1ValueChanged(x)}
                />
                {this.isBetweenOperator() && (
                  <Input
                    marginLeft={2}
                    value={this.state.Operand2}
                    style={{ flex: 1 }}
                    type="number"
                    placeholder="Enter Number"
                    onChange={(x: any) => this.onOperand2ValueChanged(x)}
                  />
                )}
              </Flex>
            )}
          {/* if  date then show a date control */}
          {!this.checkOperator(LeafExpressionOperator.None) &&
            !this.checkOperator(LeafExpressionOperator.Unknown) &&
            ColumnHelper.getColumnDataTypeFromColumnId(
              this.props.Data.ColumnId,
              this.props.Columns
            ) == DataType.Date && (
              <Flex flex={5} alignItems="center">
                <Input
                  type="date"
                  style={{ width: '100%' }}
                  placeholder="Enter Date"
                  value={this.state.Operand1}
                  onChange={(x: any) => this.onOperand1ValueChanged(x)}
                />
                {this.isBetweenOperator() && (
                  <Input
                    value={this.state.Operand2}
                    marginLeft={2}
                    type="date"
                    style={{ width: '100%' }}
                    placeholder="Enter Date"
                    onChange={(x: any) => this.onOperand2ValueChanged(x)}
                  />
                )}
              </Flex>
            )}
          {/* if string then show a text control  */}
          {!this.checkOperator(LeafExpressionOperator.None) &&
            !this.checkOperator(LeafExpressionOperator.Unknown) &&
            !this.checkOperator(LeafExpressionOperator.NoDuplicateValues) &&
            !this.checkOperator(LeafExpressionOperator.ExistingValuesOnly) &&
            ColumnHelper.getColumnDataTypeFromColumnId(
              this.props.Data.ColumnId,
              this.props.Columns
            ) == DataType.String && (
              <Flex flex={5} alignItems="center">
                <Input
                  value={this.state.Operand1}
                  type="string"
                  style={{ width: '100%' }}
                  placeholder="Enter a Value"
                  onChange={(x: any) => this.onOperand1ValueChanged(x)}
                />
              </Flex>
            )}
        </Flex>
      </WizardPanel>
    );
  }

  private onOperatorChanged(value: any) {
    this.setState(
      { Operator: value, Operand1: '', Operand2: '' } as CellValidationSettingsWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  private onOperand1ValueChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ Operand1: e.value } as CellValidationSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onOperand2ValueChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ Operand2: e.value } as CellValidationSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onDisallowEditChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    let operator: LeafExpressionOperator =
      e.value == 'None' ? LeafExpressionOperator.None : LeafExpressionOperator.Unknown;
    this.setState({ Operator: operator } as CellValidationSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
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
    switch (
      ColumnHelper.getColumnDataTypeFromColumnId(this.props.Data.ColumnId, this.props.Columns)
    ) {
      case DataType.Boolean:
        return [
          LeafExpressionOperator.Unknown,
          LeafExpressionOperator.IsTrue,
          LeafExpressionOperator.IsFalse,
        ];
      case DataType.String:
        return [
          LeafExpressionOperator.Unknown,
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
          LeafExpressionOperator.Unknown,
          LeafExpressionOperator.Equals,
          LeafExpressionOperator.NotEquals,
          LeafExpressionOperator.GreaterThan,
          LeafExpressionOperator.LessThan,
          LeafExpressionOperator.Between,
          LeafExpressionOperator.NotBetween,
        ];
      case DataType.Number:
        return [
          LeafExpressionOperator.Unknown,
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
    if (!ExpressionHelper.OperatorRequiresValue(this.state.Operator)) {
      return true;
    }

    if (this.checkOperator(LeafExpressionOperator.Unknown)) {
      return false;
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
    //     this.props.Data.Description = this.createCellValidationDescription(this.props.Data);
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

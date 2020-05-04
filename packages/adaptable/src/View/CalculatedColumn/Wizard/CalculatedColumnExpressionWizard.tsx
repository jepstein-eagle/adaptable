import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { CalculatedColumn } from '../../../PredefinedConfig/CalculatedColumnState';
import ErrorBox from '../../../components/ErrorBox';
import Textarea from '../../../components/Textarea';
import WizardPanel from '../../../components/WizardPanel';
import { DataType } from '../../../PredefinedConfig/Common/Enums';
import Input from '../../../components/Input';
import { Box, Flex } from 'rebass';
import FormLayout, { FormRow } from '../../../components/FormLayout';
import CheckBox from '../../../components/CheckBox';
import { CalculatedColumnExpressionService } from '../../../Utilities/Services/CalculatedColumnExpressionService';
import { ICalculatedColumnExpressionService } from '../../../Utilities/Services/Interface/ICalculatedColumnExpressionService';
import { AdaptableColumn } from '../../../types';
import calculatedColumn from '../../../components/icons/calculated-column';
import { evaluate } from 'adaptable-parser';

export interface CalculatedColumnExpressionWizardProps
  extends AdaptableWizardStepProps<CalculatedColumn> {
  IsExpressionValid: (expression: string) => void;
  GetErrorMessage: () => string;
  calculatedColumnExpressionService: ICalculatedColumnExpressionService;
}
export interface CalculatedColumnExpressionWizardState {
  ColumnExpression: string;
}

export class CalculatedColumnExpressionWizard
  extends React.Component<
    CalculatedColumnExpressionWizardProps,
    CalculatedColumnExpressionWizardState
  >
  implements AdaptableWizardStep {
  constructor(props: CalculatedColumnExpressionWizardProps) {
    super(props);
    this.state = { ColumnExpression: this.props.Data.ColumnExpression };
  }
  render(): any {
    let validationState: 'error' | null = StringExtensions.IsNullOrEmpty(
      this.props.GetErrorMessage()
    )
      ? null
      : 'error';

    const firstRow = this.props.Adaptable.getFirstRowNode().data;
    let result;

    try {
      result = evaluate(this.state.ColumnExpression, {
        data: firstRow,
      });
    } catch (error) {
      result = 'Error: ' + error.message;
    }

    return (
      <Flex p={2}>
        <Box flex={1}>
          <Textarea
            value={this.state.ColumnExpression}
            placeholder="Enter expression"
            autoFocus
            onChange={(e: React.SyntheticEvent) => this.handleExpressionChange(e)}
            style={{ width: '100%', height: '100px' }}
          ></Textarea>
          <pre>{JSON.stringify(result, null, 2)}</pre>
          {validationState ? (
            <ErrorBox marginTop={2}>{this.props.GetErrorMessage()}</ErrorBox>
          ) : null}
        </Box>
        <FormLayout>
          {this.props.Columns.map(Column => (
            <FormRow key={Column.ColumnId} label={Column.FriendlyName}>
              {Column.DataType === 'Number' ? (
                <Input type="number" defaultValue={firstRow[Column.ColumnId]} />
              ) : Column.DataType === 'String' ? (
                <Input type="text" defaultValue={firstRow[Column.ColumnId]} />
              ) : Column.DataType === 'Date' ? (
                <Input
                  type="date"
                  defaultValue={firstRow[Column.ColumnId].toISOString().substr(0, 10)}
                />
              ) : Column.DataType === 'Boolean' ? (
                <CheckBox defaultChecked={firstRow[Column.ColumnId]} />
              ) : null}
            </FormRow>
          ))}
        </FormLayout>
      </Flex>
    );
  }

  handleExpressionChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.props.IsExpressionValid(e.value);
    this.setState({ ColumnExpression: e.value }, () => this.props.UpdateGoBackState());
  }

  public canNext(): boolean {
    return (
      StringExtensions.IsNotNullOrEmpty(this.state.ColumnExpression) &&
      StringExtensions.IsNullOrEmpty(this.props.GetErrorMessage())
    );
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    const hasChanged: boolean = this.props.Data.ColumnExpression != this.state.ColumnExpression;
    this.props.Data.ColumnExpression = this.state.ColumnExpression;

    // if its changed then lets work out the other values based on it
    if (hasChanged) {
      // workd out the correct datatype if possible
      const cleanedExpression: string = this.props.calculatedColumnExpressionService.CleanExpressionColumnNames(
        this.state.ColumnExpression,
        this.props.Columns
      );

      const dataType = this.props.calculatedColumnExpressionService.GetCalculatedColumnDataType(
        cleanedExpression
      );

      const pivotable: boolean = dataType == DataType.String;
      const aggregatable: boolean = dataType == DataType.Number;

      this.props.Data.CalculatedColumnSettings.DataType = dataType;
      this.props.Data.CalculatedColumnSettings.Pivotable = pivotable;
      this.props.Data.CalculatedColumnSettings.Aggregatable = aggregatable;
    }
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

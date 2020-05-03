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
import { Box } from 'rebass';
import FormLayout, { FormRow } from '../../../components/FormLayout';
import CheckBox from '../../../components/CheckBox';

export interface CalculatedColumnExpressionWizardProps
  extends AdaptableWizardStepProps<CalculatedColumn> {
  IsExpressionValid: (expression: string) => void;
  GetErrorMessage: () => string;
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

    return (
      <Box p={2}>
        <Textarea
          value={this.state.ColumnExpression}
          placeholder="Enter expression"
          autoFocus
          onChange={(e: React.SyntheticEvent) => this.handleExpressionChange(e)}
          style={{ width: '100%', height: '100px' }}
        ></Textarea>
        {validationState ? <ErrorBox marginTop={2}>{this.props.GetErrorMessage()}</ErrorBox> : null}
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
      </Box>
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
    this.props.Data.ColumnExpression = this.state.ColumnExpression;
    this.props.Data.ColumnType = this.props.Data.ColumnType ?? DataType.Number; // hard coded for now
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

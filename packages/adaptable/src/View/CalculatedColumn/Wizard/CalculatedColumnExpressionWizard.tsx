import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { CalculatedColumn } from '../../../PredefinedConfig/CalculatedColumnState';
import { DataType } from '../../../PredefinedConfig/Common/Enums';
import { ICalculatedColumnExpressionService } from '../../../Utilities/Services/Interface/ICalculatedColumnExpressionService';
import { defaultFunctions } from '../../../parser/src';
import ExpressionEditor from '../../../components/ExpressionEditor';

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
    const firstRow = this.props.Api.gridApi.getFirstRowNode().data;

    return (
      <ExpressionEditor
        value={this.state.ColumnExpression}
        onChange={(e: React.SyntheticEvent) => this.handleExpressionChange(e)}
        initialData={firstRow}
        columns={this.props.Api.columnApi.getColumns()}
        functions={defaultFunctions}
        isFullExpression={true}
      />
    );
    /* {validationState ? (
        <ErrorBox marginTop={2}>{this.props.GetErrorMessage()}</ErrorBox>
      ) : null} */
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
        this.props.Api.columnApi.getColumns()
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

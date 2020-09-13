import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';
import { CalculatedColumn } from '../../../PredefinedConfig/CalculatedColumnState';

export interface CalculatedColumnSummaryWizardProps
  extends AdaptableWizardStepProps<CalculatedColumn> {}

export class CalculatedColumnSummaryWizard
  extends React.Component<CalculatedColumnSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: CalculatedColumnSummaryWizardProps) {
    super(props);
    this.state = { ColumnId: this.props.data.ColumnId, ErrorMessage: null };
  }
  render(): any {
    let keyValuePairs: KeyValuePair[] = [
      { Key: 'Column Id', Value: this.props.data.ColumnId },
      { Key: 'Column Name', Value: this.props.data.FriendlyName },
      {
        Key: 'Expression',
        Value: this.props.api.internalApi
          .getCalculatedColumnExpressionService()
          .GetExpressionString(
            this.props.data.ColumnExpression,
            this.props.api.columnApi.getColumns()
          ),
      },
      { Key: 'DataType', Value: this.props.data.CalculatedColumnSettings.DataType },
      { Key: 'Width', Value: this.props.data.CalculatedColumnSettings.Width },
      {
        Key: 'Show Tooltip',
        Value: this.props.data.CalculatedColumnSettings.ShowToolTip ? 'True' : 'False',
      },
      {
        Key: 'Filterable',
        Value: this.props.data.CalculatedColumnSettings.Filterable ? 'True' : 'False',
      },
      {
        Key: 'Resizable',
        Value: this.props.data.CalculatedColumnSettings.Resizable ? 'True' : 'False',
      },
      {
        Key: 'Groupable',
        Value: this.props.data.CalculatedColumnSettings.Groupable ? 'True' : 'False',
      },
      {
        Key: 'Sortable',
        Value: this.props.data.CalculatedColumnSettings.Sortable ? 'True' : 'False',
      },
      {
        Key: 'Pivotable',
        Value: this.props.data.CalculatedColumnSettings.Pivotable ? 'True' : 'False',
      },
      {
        Key: 'Aggregatable',
        Value: this.props.data.CalculatedColumnSettings.Aggregatable ? 'True' : 'False',
      },
    ];

    return (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.CalculatedColumnStrategyFriendlyName}
      />
    );
  }

  public canNext(): boolean {
    return true;
  }
  public canBack(): boolean {
    return true;
  }
  public next(): void {
    //
  }
  public back(): void {
    //
  }
  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}

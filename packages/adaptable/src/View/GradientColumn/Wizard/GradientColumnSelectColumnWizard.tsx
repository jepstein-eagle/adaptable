import * as React from 'react';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { SelectionMode } from '../../../PredefinedConfig/Common/Enums';
import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';
import { GradientColumn } from '../../../PredefinedConfig/GradientColumnState';
import WizardPanel from '../../../components/WizardPanel';

export interface GradientColumnSelectColumnWizardProps
  extends AdaptableWizardStepProps<GradientColumn> {}
export interface GradientColumnSelectColumnWizardState {
  ColumnId: string;
  NegativeValue: number;
  PositiveValue: number;
  BaseValue: number;
}

export class GradientColumnSelectColumnWizard
  extends React.Component<
    GradientColumnSelectColumnWizardProps,
    GradientColumnSelectColumnWizardState
  >
  implements AdaptableWizardStep {
  constructor(props: GradientColumnSelectColumnWizardProps) {
    super(props);
    this.state = {
      ColumnId: this.props.data.ColumnId,
      NegativeValue: this.props.data.NegativeValue,
      PositiveValue: this.props.data.PositiveValue,
      BaseValue: this.props.data.BaseValue,
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <ColumnSelector
          SelectedColumnIds={[this.state.ColumnId]}
          ColumnList={this.props.api.columnApi.getNumericColumns()}
          onColumnChange={columns => this.onColumnSelectedChanged(columns)}
          SelectionMode={SelectionMode.Single}
        />
      </WizardPanel>
    );
  }

  private onColumnSelectedChanged(columns: AdaptableColumn[]) {
    if (columns.length > 0) {
      let distinctColumnsValues: number[] = this.props.api.columnApi.getDistinctRawValuesForColumn(
        columns[0].ColumnId
      );

      let smallestValue = Math.min(...distinctColumnsValues);

      let negativeValue = smallestValue < 0 ? smallestValue : undefined;

      let largestValue = Math.max(...distinctColumnsValues);
      let positiveValue = largestValue > 0 ? largestValue : undefined;

      let baseValue: number;
      // work out the base value
      if (smallestValue > 0) {
        baseValue = smallestValue;
      } else {
        let positiveValues: number[] = distinctColumnsValues.filter(f => f > 0);
        baseValue = Math.min(...positiveValues);
      }

      this.setState(
        {
          ColumnId: columns[0].ColumnId,
          NegativeValue: negativeValue,
          PositiveValue: positiveValue,
          BaseValue: baseValue,
        } as GradientColumnSelectColumnWizardState,
        () => this.props.updateGoBackState()
      );
    } else {
      this.setState({ ColumnId: '' } as GradientColumnSelectColumnWizardState, () =>
        this.props.updateGoBackState()
      );
    }
  }

  public canNext(): boolean {
    return StringExtensions.IsNotNullOrEmpty(this.state.ColumnId);
  }

  public canBack(): boolean {
    return true;
  }
  public next(): void {
    this.props.data.ColumnId = this.state.ColumnId;
    this.props.data.NegativeValue = this.state.NegativeValue;
    this.props.data.PositiveValue = this.state.PositiveValue;
    this.props.data.BaseValue = this.state.BaseValue;
  }

  public back(): void {
    //todo
  }
  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}

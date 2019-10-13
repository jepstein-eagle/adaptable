import * as React from 'react';
import {
  AdaptableWizardStepProps,
  AdaptableWizardStep,
} from '../../../Wizard/Interface/IAdaptableWizard';
import { SparklinesChartDefinition } from '../../../../PredefinedConfig/RunTimeState/ChartState';
import { ColumnSelector } from '../../../Components/Selectors/ColumnSelector';
import { SelectionMode } from '../../../../PredefinedConfig/Common/Enums';
import { AdaptableBlotterColumn } from '../../../../Utilities/Interface/AdaptableBlotterColumn';
import { ArrayExtensions } from '../../../../Utilities/Extensions/ArrayExtensions';
import { StringExtensions } from '../../../../Utilities/Extensions/StringExtensions';

import WizardPanel from '../../../../components/WizardPanel';

import FormLayout, { FormRow } from '../../../../components/FormLayout';
import { ColumnHelper } from '../../../../Utilities/Helpers/ColumnHelper';
import Radio from '../../../../components/Radio';
import { Expression } from '../../../../PredefinedConfig/Common/Expression/Expression';
import { ExpressionHelper } from '../../../../Utilities/Helpers/ExpressionHelper';

export interface SparklinesChartColumnWizardProps
  extends AdaptableWizardStepProps<SparklinesChartDefinition> {
  //  ChartDefinitions: ChartDefinition[]
}

export interface SparklinesChartColumnWizardState {
  ColumnId: string;
  Filtered: boolean;
  Expression?: Expression;
}

export class SparklinesChartColumnWizard
  extends React.Component<SparklinesChartColumnWizardProps, SparklinesChartColumnWizardState>
  implements AdaptableWizardStep {
  constructor(props: SparklinesChartColumnWizardProps) {
    super(props);
    this.state = {
      Filtered: ExpressionHelper.IsNotNullOrEmptyExpression(props.Data.Expression),
      Expression: props.Data.Expression,
      ColumnId: props.Data.ColumnId,
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <FormLayout>
          <FormRow label="Column">
            <ColumnSelector
              SelectedColumnIds={[this.state.ColumnId]}
              ColumnList={ColumnHelper.getNumericColumns(this.props.Columns)}
              onColumnChange={columns => this.onColumnChanged(columns)}
              SelectionMode={SelectionMode.Single}
            />
          </FormRow>
          <FormRow label="Column Values">
            <div>
              <Radio
                name="values"
                checked={!this.state.Filtered}
                onChange={checked => {
                  this.setFiltered(!checked);
                }}
                marginRight={2}
              >
                All
              </Radio>
              <Radio
                name="values"
                checked={this.state.Filtered}
                onChange={checked => {
                  this.setFiltered(checked);
                }}
              >
                Filtered
              </Radio>
            </div>
          </FormRow>
        </FormLayout>
      </WizardPanel>
    );
  }

  private setFiltered = (Filtered: boolean) => {
    const state = {
      Filtered,
    } as SparklinesChartColumnWizardState;

    let Expression: Expression = this.state.Expression;
    if (Filtered && ExpressionHelper.IsNullOrEmptyExpression(this.state.Expression)) {
      Expression = ExpressionHelper.CreateEmptyExpression();
      state.Expression = Expression;
    }

    this.setState(state);
  };

  private onColumnChanged(columns: AdaptableBlotterColumn[]) {
    let isColumn: boolean = ArrayExtensions.IsNotNullOrEmpty(columns);
    this.setState(
      {
        ColumnId: isColumn ? columns[0].ColumnId : '',
      } as SparklinesChartColumnWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return StringExtensions.IsNotNullOrEmpty(this.state.ColumnId);
  }

  public canBack(): boolean {
    return true;
  }

  public Next(): void {
    this.props.Data.ColumnId = this.state.ColumnId;
    this.props.Data.Expression = !this.state.Filtered ? null : this.state.Expression;
  }

  public Back(): void {
    // todo
  }

  public GetIndexStepIncrement() {
    return this.state.Filtered ? 1 : 2;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}

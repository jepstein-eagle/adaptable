import * as React from 'react';
import {
  AdaptableWizardStepProps,
  AdaptableWizardStep,
} from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { SparklinesChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { ColumnSelector } from '@adaptabletools/adaptable/src/View/Components/Selectors/ColumnSelector';
import { SelectionMode } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Enums';
import { AdaptableColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableColumn';
import { ArrayExtensions } from '@adaptabletools/adaptable/src/Utilities/Extensions/ArrayExtensions';
import { StringExtensions } from '@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions';

import WizardPanel from '@adaptabletools/adaptable/src/components/WizardPanel';

import FormLayout, { FormRow } from '@adaptabletools/adaptable/src/components/FormLayout';
import { ColumnHelper } from '@adaptabletools/adaptable/src/Utilities/Helpers/ColumnHelper';
import Radio from '@adaptabletools/adaptable/src/components/Radio';
import { Expression } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Expression';
import { ExpressionHelper } from '@adaptabletools/adaptable/src/Utilities/Helpers/ExpressionHelper';

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
              ColumnList={this.props.Adaptable.api.gridApi.getNumericColumns()}
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

  private onColumnChanged(columns: AdaptableColumn[]) {
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

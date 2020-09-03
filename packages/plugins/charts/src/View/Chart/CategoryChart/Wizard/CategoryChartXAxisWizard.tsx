import * as React from 'react';
import {
  AdaptableWizardStepProps,
  AdaptableWizardStep,
} from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { CategoryChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';

import { ColumnSelector } from '@adaptabletools/adaptable/src/View/Components/Selectors/ColumnSelector';
import { SelectionMode } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Enums';
import { AdaptableColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableColumn';
import { ArrayExtensions } from '@adaptabletools/adaptable/src/Utilities/Extensions/ArrayExtensions';
import { StringExtensions } from '@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions';
import { Flex, Box, Text } from 'rebass';
import WizardPanel from '@adaptabletools/adaptable/src/components/WizardPanel';
import Radio from '@adaptabletools/adaptable/src/components/Radio';
import HelpBlock from '@adaptabletools/adaptable/src/components/HelpBlock';

export interface CategoryChartXAxisWizardProps
  extends AdaptableWizardStepProps<CategoryChartDefinition> {}

export interface CategoryChartXAxisWizardState {
  XAxisColumnId: string;
  UseAllXAsisColumnValues: boolean;
  XAxisExpression?: string;
}

export class CategoryChartXAxisWizard
  extends React.Component<CategoryChartXAxisWizardProps, CategoryChartXAxisWizardState>
  implements AdaptableWizardStep {
  constructor(props: CategoryChartXAxisWizardProps) {
    super(props);
    this.state = {
      XAxisColumnId: props.data.XAxisColumnId,
      UseAllXAsisColumnValues: StringExtensions.IsNullOrEmpty(this.props.data.XAxisExpression),
      XAxisExpression: this.props.data.XAxisExpression,
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <HelpBlock>Select a column for the X Axis (Horizontal).</HelpBlock>

        <Flex flexDirection="row" alignItems="center" marginTop={3}>
          <Text style={{ flex: 2 }} textAlign="end" marginRight={2}>
            X Axis Column:
          </Text>
          <Flex flex={7} flexDirection="row" alignItems="center">
            <ColumnSelector
              SelectedColumnIds={[this.state.XAxisColumnId]}
              ColumnList={this.props.api.columnApi.getColumns()}
              onColumnChange={columns => this.onXAxisColumnChanged(columns)}
              SelectionMode={SelectionMode.Single}
            />
          </Flex>
        </Flex>

        <HelpBlock marginTop={3}>
          Choose whether to show all values for this column or to filter them (performed in next
          step)
        </HelpBlock>
        <Flex paddingLeft={2} marginTop={3} flexDirection="row" alignItems="center">
          <Text style={{ flex: 2 }} textAlign="end" marginRight={2}>
            X Axis Column Values:
          </Text>
          <Flex flex={7} flexDirection="row" alignItems="center">
            <Radio
              value="All"
              marginRight={2}
              checked={this.state.UseAllXAsisColumnValues == true}
              onChange={(_, e: any) => this.onUseAllColumnValuesChanged(e)}
            >
              All
            </Radio>
            <Radio
              value="Filtered"
              checked={this.state.UseAllXAsisColumnValues == false}
              onChange={(_, e: any) => this.onUseAllColumnValuesChanged(e)}
            >
              Filtered
            </Radio>
          </Flex>
        </Flex>
      </WizardPanel>
    );
  }

  private onUseAllColumnValuesChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    let showAll: boolean = e.value == 'All';
    let expression: string = this.state.XAxisExpression;

    this.setState(
      {
        UseAllXAsisColumnValues: showAll,
        XAxisExpression: expression,
      } as CategoryChartXAxisWizardState,
      () => this.props.updateGoBackState()
    );
  }

  private onXAxisColumnChanged(columns: AdaptableColumn[]) {
    let isColumn: boolean = ArrayExtensions.IsNotNullOrEmpty(columns);
    this.setState(
      {
        XAxisColumnId: isColumn ? columns[0].ColumnId : '',
        UseAllXAsisColumnValues: true,
      } as CategoryChartXAxisWizardState,
      () => this.props.updateGoBackState()
    );
  }

  public canNext(): boolean {
    return StringExtensions.IsNotNullOrEmpty(this.state.XAxisColumnId);
  }

  public canBack(): boolean {
    return true;
  }

  public next(): void {
    this.props.data.XAxisColumnId = this.state.XAxisColumnId;
    this.props.data.XAxisExpression = this.state.UseAllXAsisColumnValues
      ? null
      : this.state.XAxisExpression;
    if (this.props.data.XAxisColumnId != this.state.XAxisColumnId) {
      this.props.data.XAxisExpression = null;
    }
  }

  public back(): void {
    // todo
  }

  public getIndexStepIncrement() {
    return this.state.UseAllXAsisColumnValues ? 2 : 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}

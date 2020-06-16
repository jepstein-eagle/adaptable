import * as React from 'react';
import {
  AdaptableWizardStepProps,
  AdaptableWizardStep,
} from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { CategoryChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { AxisTotal } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums';
import { ArrayExtensions } from '@adaptabletools/adaptable/src/Utilities/Extensions/ArrayExtensions';

import { AdaptablePopover } from '@adaptabletools/adaptable/src/View/AdaptablePopover';
import {
  DualListBoxEditor,
  DisplaySize,
} from '@adaptabletools/adaptable/src/View/Components/ListBox/DualListBoxEditor';
import WizardPanel from '@adaptabletools/adaptable/src/components/WizardPanel';
import Radio from '@adaptabletools/adaptable/src/components/Radio';
import { Flex, Text, Box } from 'rebass';
import HelpBlock from '@adaptabletools/adaptable/src/components/HelpBlock';

export interface CategoryChartYAxisWizardProps
  extends AdaptableWizardStepProps<CategoryChartDefinition> {}

export interface CategoryChartYAxisWizardState {
  YAxisColumnIds: string[];
  YAxisTotal: AxisTotal;
}

export class CategoryChartYAxisWizard
  extends React.Component<CategoryChartYAxisWizardProps, CategoryChartYAxisWizardState>
  implements AdaptableWizardStep {
  constructor(props: CategoryChartYAxisWizardProps) {
    super(props);
    this.state = {
      YAxisColumnIds: props.Data.YAxisColumnIds,
      YAxisTotal: props.Data.YAxisTotal as AxisTotal,
    };
  }
  render(): any {
    let numericColumnIds = this.props.Adaptable.api.gridApi.getNumericColumns().map(c => {
      return c.ColumnId;
    });
    let availableColumns: string[] = numericColumnIds
      .filter(c => ArrayExtensions.NotContainsItem(this.state.YAxisColumnIds, c))
      .map(ac => {
        return this.props.Adaptable.api.gridApi.getFriendlyNameFromColumnId(ac);
      });

    let existingColumns: string[] = this.state.YAxisColumnIds.map(ec => {
      return this.props.Adaptable.api.gridApi.getFriendlyNameFromColumnId(ec);
    });

    return (
      <WizardPanel
        header="Chart: Y (Vertical) Axis Column(s)"
        bodyProps={{ padding: 0, style: { display: 'flex', flexDirection: 'column' } }}
      >
        <Flex flexDirection="row" alignItems="center" padding={3}>
          <Text style={{ flex: 3 }}>Display Total:</Text>
          <Flex style={{ flex: 10 }} alignItems="center" flexDirection="row">
            <Radio
              value="Sum"
              checked={this.state.YAxisTotal == AxisTotal.Sum}
              onChange={(_: any, e: any) => this.onYAisTotalChanged(e)}
              marginRight={3}
            >
              Sum
            </Radio>
            <Radio
              value="Average"
              marginRight={3}
              checked={this.state.YAxisTotal == AxisTotal.Average}
              onChange={(_: any, e: any) => this.onYAisTotalChanged(e)}
            >
              Average
            </Radio>{' '}
            <AdaptablePopover
              headerText={'Chart Y Axis: Display Total'}
              bodyText={[
                'Choose whether the X Axis is grouped according to the sum of it values (by X Axis) or their average.',
              ]}
            />
          </Flex>
        </Flex>

        <Flex flex={1} padding={2} flexDirection={'column'}>
          <HelpBlock marginBottom={2}>
            Press ctrl/cmd key while clicking to select multiple items.
          </HelpBlock>
          <DualListBoxEditor
            style={{ flex: 1, overflow: 'hidden' }}
            AvailableValues={availableColumns}
            SelectedValues={existingColumns}
            HeaderAvailable="Numeric Columns"
            HeaderSelected="Y Axis Columns"
            onChange={SelectedValues => this.OnSelectedValuesChange(SelectedValues)}
            DisplaySize={DisplaySize.XSmall}
          />
        </Flex>
      </WizardPanel>
    );
  }

  OnSelectedValuesChange(newValues: Array<string>) {
    let yAxisColumnIds = this.props.Adaptable.api.gridApi.getColumnIdsFromFriendlyNames(newValues);
    this.setState({ YAxisColumnIds: yAxisColumnIds } as CategoryChartYAxisWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onYAisTotalChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    let axisTotal: AxisTotal = e.value == 'Sum' ? AxisTotal.Sum : AxisTotal.Average;
    this.setState({ YAxisTotal: axisTotal } as CategoryChartYAxisWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return ArrayExtensions.IsNotNullOrEmpty(this.state.YAxisColumnIds);
  }

  public canBack(): boolean {
    return true;
  }

  public Next(): void {
    this.props.Data.YAxisColumnIds = this.state.YAxisColumnIds;
    this.props.Data.YAxisTotal = this.state.YAxisTotal;
  }
  public Back(): void {
    // todo
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}

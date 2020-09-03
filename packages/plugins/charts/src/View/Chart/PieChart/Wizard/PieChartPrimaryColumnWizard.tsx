import * as React from 'react';
import {
  AdaptableWizardStepProps,
  AdaptableWizardStep,
} from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import {
  CategoryChartDefinition,
  PieChartDefinition,
} from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { ColumnSelector } from '@adaptabletools/adaptable/src/View/Components/Selectors/ColumnSelector';
import { SelectionMode } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Enums';
import { AdaptableColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableColumn';
import { ArrayExtensions } from '@adaptabletools/adaptable/src/Utilities/Extensions/ArrayExtensions';
import { StringExtensions } from '@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions';
import { SecondaryColumnOperation } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums';
import WizardPanel from '@adaptabletools/adaptable/src/components/WizardPanel';
import HelpBlock from '@adaptabletools/adaptable/src/components/HelpBlock';

import { Flex, Text } from 'rebass';

export interface PieChartPrimaryColumnWizardProps
  extends AdaptableWizardStepProps<PieChartDefinition> {
  //  ChartDefinitions: ChartDefinition[]
}

export interface PieChartPrimaryColumnWizardState {
  PrimaryColumnId: string;
}

export class PieChartPrimaryColumnWizard
  extends React.Component<PieChartPrimaryColumnWizardProps, PieChartPrimaryColumnWizardState>
  implements AdaptableWizardStep {
  constructor(props: PieChartPrimaryColumnWizardProps) {
    super(props);
    this.state = {
      PrimaryColumnId: props.data.PrimaryColumnId,
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <Flex paddingLeft={2} marginTop={3} flexDirection="row" alignItems="center">
          <Text marginRight={2}>Primary Column:</Text>

          <ColumnSelector
            SelectedColumnIds={[this.state.PrimaryColumnId]}
            ColumnList={this.props.api.columnApi.getColumns()}
            onColumnChange={columns => this.onPrimaryColumnChanged(columns)}
            SelectionMode={SelectionMode.Single}
          />
        </Flex>
      </WizardPanel>
    );
  }

  private onPrimaryColumnChanged(columns: AdaptableColumn[]) {
    let isColumn: boolean = ArrayExtensions.IsNotNullOrEmpty(columns);
    this.setState(
      {
        PrimaryColumnId: isColumn ? columns[0].ColumnId : '',
      } as PieChartPrimaryColumnWizardState,
      () => this.props.updateGoBackState()
    );
  }

  public canNext(): boolean {
    return StringExtensions.IsNotNullOrEmpty(this.state.PrimaryColumnId);
  }

  public canBack(): boolean {
    return true;
  }

  public next(): void {
    this.props.data.PrimaryColumnId = this.state.PrimaryColumnId;
  }

  public back(): void {
    // todo
  }

  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}

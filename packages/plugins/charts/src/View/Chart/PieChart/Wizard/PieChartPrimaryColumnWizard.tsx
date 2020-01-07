import * as React from 'react';
import {
  AdaptableWizardStepProps,
  AdaptableWizardStep,
} from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import {
  CategoryChartDefinition,
  PieChartDefinition,
} from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { Expression } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Expression';
import { ExpressionHelper } from '@adaptabletools/adaptable/src/Utilities/Helpers/ExpressionHelper';
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
      PrimaryColumnId: props.Data.PrimaryColumnId,
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <Flex paddingLeft={2} marginTop={3} flexDirection="row" alignItems="center">
          <Text marginRight={2}>Primary Column:</Text>

          <ColumnSelector
            SelectedColumnIds={[this.state.PrimaryColumnId]}
            ColumnList={this.props.Columns}
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
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return StringExtensions.IsNotNullOrEmpty(this.state.PrimaryColumnId);
  }

  public canBack(): boolean {
    return true;
  }

  public Next(): void {
    this.props.Data.PrimaryColumnId = this.state.PrimaryColumnId;
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

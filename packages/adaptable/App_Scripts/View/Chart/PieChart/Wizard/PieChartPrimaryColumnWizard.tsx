import * as React from 'react';
import {
  AdaptableWizardStepProps,
  AdaptableWizardStep,
} from '../../../Wizard/Interface/IAdaptableWizard';
import {
  CategoryChartDefinition,
  PieChartDefinition,
} from '../../../../PredefinedConfig/ChartState';
import { Expression } from '../../../../PredefinedConfig/Common/Expression';
import { ExpressionHelper } from '../../../../Utilities/Helpers/ExpressionHelper';
import { ColumnSelector } from '../../../Components/Selectors/ColumnSelector';
import { SelectionMode } from '../../../../PredefinedConfig/Common/Enums';
import { AdaptableColumn } from '../../../../PredefinedConfig/Common/AdaptableColumn';
import { ArrayExtensions } from '../../../../Utilities/Extensions/ArrayExtensions';
import { StringExtensions } from '../../../../Utilities/Extensions/StringExtensions';
import { SecondaryColumnOperation } from '../../../../PredefinedConfig/Common/ChartEnums';
import WizardPanel from '../../../../components/WizardPanel';
import HelpBlock from '../../../../components/HelpBlock';

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
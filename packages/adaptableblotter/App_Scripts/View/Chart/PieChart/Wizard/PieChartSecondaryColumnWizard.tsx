import * as React from 'react';
import {
  AdaptableWizardStepProps,
  AdaptableWizardStep,
} from '../../../Wizard/Interface/IAdaptableWizard';
import { PieChartDefinition } from '../../../../PredefinedConfig/ChartState';

import { ColumnSelector } from '../../../Components/Selectors/ColumnSelector';
import { SelectionMode, DataType } from '../../../../PredefinedConfig/Common/Enums';
import { AdaptableBlotterColumn } from '../../../../Utilities/Interface/AdaptableBlotterColumn';
import { ArrayExtensions } from '../../../../Utilities/Extensions/ArrayExtensions';
import { SecondaryColumnOperation } from '../../../../PredefinedConfig/Common/ChartEnums';
import { StringExtensions } from '../../../../Utilities/Extensions/StringExtensions';
import { ColumnHelper } from '../../../../Utilities/Helpers/ColumnHelper';
import { Flex, Text, Box } from 'rebass';
import WizardPanel from '../../../../components/WizardPanel';
import HelpBlock from '../../../../components/HelpBlock';
import Radio from '../../../../components/Radio';

export interface PieChartSecondaryColumnWizardProps
  extends AdaptableWizardStepProps<PieChartDefinition> {}

export interface PieChartSecondaryColumnWizardState {
  SecondaryColumnId?: string;
  SecondaryColumnOperation: SecondaryColumnOperation;
}

export class PieChartSecondaryColumnWizard
  extends React.Component<PieChartSecondaryColumnWizardProps, PieChartSecondaryColumnWizardState>
  implements AdaptableWizardStep {
  constructor(props: PieChartSecondaryColumnWizardProps) {
    super(props);
    this.state = {
      SecondaryColumnId: props.Data!.SecondaryColumnId,
      SecondaryColumnOperation: props.Data!.SecondaryColumnOperation as SecondaryColumnOperation,
    };
  }

  render(): any {
    let secondaryColumnDataType: DataType = StringExtensions.IsNotNullOrEmpty(
      this.state.SecondaryColumnId
    )
      ? ColumnHelper.getColumnDataTypeFromColumnId(this.state.SecondaryColumnId, this.props.Columns)
      : DataType.Unknown;

    return (
      <WizardPanel>
        <Flex paddingLeft={2} marginTop={3} flexDirection="row" alignItems="center">
          <Text style={{ flex: 2 }}>Secondary Column (optional): </Text>

          <Flex flex={7}>
            <ColumnSelector
              SelectedColumnIds={[this.state.SecondaryColumnId]}
              ColumnList={this.props.Columns}
              onColumnChange={columns => this.onSecondaryColumnChanged(columns)}
              SelectionMode={SelectionMode.Single}
            />
          </Flex>
        </Flex>
        {StringExtensions.IsNotNullOrEmpty(this.state.SecondaryColumnId) &&
          secondaryColumnDataType == DataType.Number && (
            <Flex marginTop={3} flexDirection="column">
              <HelpBlock>Choose whether to show a count for these values or to sum them</HelpBlock>

              <Flex alignItems="center" flexDirection="row" marginTop={3} paddingLeft={2}>
                <Text style={{ flex: 2 }}>Summary Type:</Text>
                <Flex flex={7} flexDirection="row" alignItems="center">
                  <Radio
                    marginRight={3}
                    value="Count"
                    checked={this.state.SecondaryColumnOperation == SecondaryColumnOperation.Count}
                    onChange={(_, e: any) => this.onSecondaryColumnOperationChanged(e)}
                  >
                    Count
                  </Radio>
                  <Radio
                    value="Sum"
                    checked={this.state.SecondaryColumnOperation == SecondaryColumnOperation.Sum}
                    onChange={(_, e: any) => this.onSecondaryColumnOperationChanged(e)}
                  >
                    Sum
                  </Radio>
                </Flex>
              </Flex>
            </Flex>
          )}
      </WizardPanel>
    );
  }

  private onSecondaryColumnOperationChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        SecondaryColumnOperation: e.value as SecondaryColumnOperation,
      } as PieChartSecondaryColumnWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  private onSecondaryColumnChanged(columns: AdaptableBlotterColumn[]) {
    let isColumn: boolean = ArrayExtensions.IsNotNullOrEmpty(columns);
    let secondaryColumnOperation: SecondaryColumnOperation = SecondaryColumnOperation.Count;
    if (isColumn) {
      if (columns[0].DataType == DataType.Number) {
        secondaryColumnOperation = SecondaryColumnOperation.Sum;
      }
    }
    this.setState(
      {
        SecondaryColumnId: isColumn ? columns[0].ColumnId : '',
        SecondaryColumnOperation: secondaryColumnOperation,
      } as PieChartSecondaryColumnWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return true;
  }

  public canBack(): boolean {
    return true;
  }

  public Next(): void {
    this.props.Data.SecondaryColumnId = this.state.SecondaryColumnId;
    this.props.Data.SecondaryColumnOperation = this.state.SecondaryColumnOperation;
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

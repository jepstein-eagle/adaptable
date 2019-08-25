import * as React from 'react';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { SelectionMode } from '../../../PredefinedConfig/Common/Enums';
import { AdaptablePopover } from '../../AdaptablePopover';

import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import WizardPanel from '../../../components/WizardPanel';
import Panel from '../../../components/Panel';
import Radio from '../../../components/Radio';
import { Flex, Text } from 'rebass';
import Input from '../../../components/Input';
import { SparklineColumn } from '../../../PredefinedConfig/DesignTimeState/SparklineColumnState';

export interface SparklinesValuesWizardProps extends AdaptableWizardStepProps<SparklineColumn> {}

export interface SparklinesValuesWizardState {
  MinimumValue: number;
  MaximumValue: number;
  MinimumValueColumnId: string;
  MaximumValueColumnId: string;
  UseMinColumn: boolean;
  UseMaxColumn: boolean;
}

export class SparklinesValuesWizard
  extends React.Component<SparklinesValuesWizardProps, SparklinesValuesWizardState>
  implements AdaptableWizardStep {
  constructor(props: SparklinesValuesWizardProps) {
    super(props);
    this.state = {
      MinimumValue: this.props.Data.MinimumValue,
      MaximumValue: this.props.Data.MaximumValue,
      MinimumValueColumnId: this.props.Data.MinimumValueColumnId,
      MaximumValueColumnId: this.props.Data.MaximumValueColumnId,
      UseMinColumn: StringExtensions.IsNotNullOrEmpty(this.props.Data.MinimumValueColumnId),
      UseMaxColumn: StringExtensions.IsNotNullOrEmpty(this.props.Data.MaximumValueColumnId),
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <Panel header={'Minimum Value'} marginTop={2}>
          <Flex flexDirection="row" alignItems="center">
            <Text style={{ flex: 3 }} textAlign="end" marginRight={2}>
              Use:
            </Text>
            <Flex flex={7} alignItems="center">
              <Radio
                marginRight={2}
                value="value"
                checked={this.state.UseMinColumn == false}
                onChange={(_, e: any) => this.onUseMinColumnSelectChanged(e)}
              >
                Static Value
              </Radio>{' '}
              <Radio
                marginRight={2}
                value="column"
                checked={this.state.UseMinColumn == true}
                onChange={(_, e: any) => this.onUseMinColumnSelectChanged(e)}
              >
                Another Column Value
              </Radio>
              <AdaptablePopover
                headerText={'Sparkline Column: Minimum Value'}
                bodyText={[
                  'The minimum value of the column (can be minus). Defaults to the currenty smallest value in the cell. If the column only contains positive numbers use 0. Additionally, you can set the value to be that in another column.',
                ]}
              />
            </Flex>
          </Flex>

          <Flex flexDirection="row" alignItems="center">
            <Text style={{ flex: 3 }} textAlign="end" marginRight={2}>
              {this.state.UseMinColumn == false ? 'Value' : 'Column'}
            </Text>
            <Flex flex={7} alignItems="center">
              {this.state.UseMinColumn == false ? (
                <Input
                  type="number"
                  placeholder="Enter Number"
                  onChange={this.onMinValueChanged}
                  value={this.state.MinimumValue}
                />
              ) : (
                <ColumnSelector
                  SelectedColumnIds={[this.state.MinimumValueColumnId]}
                  ColumnList={this.props.Columns}
                  onColumnChange={columns => this.onColumnMinValueSelectedChanged(columns)}
                  SelectionMode={SelectionMode.Single}
                />
              )}
            </Flex>
          </Flex>
        </Panel>
        <Panel header="Maximum Value" marginTop={2}>
          <Flex flexDirection="row" alignItems="center">
            <Text style={{ flex: 3 }} textAlign="end" marginRight={2}>
              Use:
            </Text>
            <Flex flex={7} alignItems="center">
              <Radio
                marginRight={2}
                value="value"
                checked={this.state.UseMaxColumn == false}
                onChange={(checked, e) => this.onUseMaxColumnSelectChanged(e)}
              >
                Static Value
              </Radio>{' '}
              <Radio
                marginRight={2}
                value="column"
                checked={this.state.UseMaxColumn == true}
                onChange={(checked, e) => this.onUseMaxColumnSelectChanged(e)}
              >
                Another Column Value
              </Radio>
              <AdaptablePopover
                headerText={'Sparkline Column: Maximum Value'}
                bodyText={[
                  'The maximum value of the column. Defaults to the currently largest value in the cell. Additionally, you can set the value to be that in another column.',
                ]}
              />
            </Flex>
          </Flex>

          <Flex flexDirection="row" alignItems="center" marginTop={2}>
            <Text style={{ flex: 3 }} textAlign="end" marginRight={2}>
              {this.state.UseMaxColumn == false ? 'Value' : 'Column'}
            </Text>

            <Flex flex={7} alignItems="center">
              {this.state.UseMaxColumn == false ? (
                <Input
                  type="number"
                  placeholder="Enter Number"
                  onChange={this.onMaxValueChanged}
                  value={this.state.MaximumValue}
                />
              ) : (
                <ColumnSelector
                  SelectedColumnIds={[this.state.MaximumValueColumnId]}
                  ColumnList={this.props.Columns}
                  onColumnChange={columns => this.onColumnMaxValueSelectedChanged(columns)}
                  SelectionMode={SelectionMode.Single}
                />
              )}
            </Flex>
          </Flex>
        </Panel>
      </WizardPanel>
    );
  }

  private onUseMinColumnSelectChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ UseMinColumn: e.value == 'column' } as SparklinesValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onMinValueChanged = (e: any) => {
    this.setState({ MinValue: e.target.value } as SparklinesValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  };

  private onColumnMinValueSelectedChanged(columns: IColumn[]) {
    this.setState(
      {
        MinimumValueColumnId: columns.length > 0 ? columns[0].ColumnId : '',
      } as SparklinesValuesWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  private onUseMaxColumnSelectChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ UseMaxColumn: e.value == 'column' } as SparklinesValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onMaxValueChanged = (e: any) => {
    this.setState({ MaxValue: e.target.value } as SparklinesValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  };

  private onColumnMaxValueSelectedChanged(columns: IColumn[]) {
    this.setState(
      {
        MaximumValueColumnId: columns.length > 0 ? columns[0].ColumnId : '',
      } as SparklinesValuesWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    if (StringExtensions.IsNullOrEmpty(this.props.Data.ColumnId)) {
      return false;
    }
    if (
      this.state.UseMinColumn &&
      StringExtensions.IsNullOrEmpty(this.state.MinimumValueColumnId)
    ) {
      return false;
    }
    if (
      this.state.UseMaxColumn &&
      StringExtensions.IsNullOrEmpty(this.state.MaximumValueColumnId)
    ) {
      return false;
    }

    return true;
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.MinimumValue = this.state.UseMinColumn ? 0 : this.state.MinimumValue;
    this.props.Data.MaximumValue = this.state.UseMaxColumn ? 100 : this.state.MaximumValue;
    this.props.Data.MinimumValueColumnId = this.state.UseMinColumn
      ? this.state.MinimumValueColumnId
      : null;
    this.props.Data.MaximumValueColumnId = this.state.UseMaxColumn
      ? this.state.MaximumValueColumnId
      : null;
  }

  public Back(): void {
    //todo
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}

import * as React from 'react';
import { AdaptableBlotterColumn } from '../../../Utilities/Interface/AdaptableBlotterColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { SelectionMode } from '../../../PredefinedConfig/Common/Enums';
import { AdaptablePopover } from '../../AdaptablePopover';

import { PercentBar } from '../../../PredefinedConfig/RunTimeState/PercentBarState';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import WizardPanel from '../../../components/WizardPanel';
import Panel from '../../../components/Panel';
import Radio from '../../../components/Radio';
import { Flex, Text, Box } from 'rebass';
import Input from '../../../components/Input';

export interface PercentBarValuesWizardProps extends AdaptableWizardStepProps<PercentBar> {}

export interface PercentBarValuesWizardState {
  MinValue: number;
  MaxValue: number;
  MinValueColumnId: string;
  MaxValueColumnId: string;
  UseMinColumn: boolean;
  UseMaxColumn: boolean;
}

export class PercentBarValuesWizard
  extends React.Component<PercentBarValuesWizardProps, PercentBarValuesWizardState>
  implements AdaptableWizardStep {
  constructor(props: PercentBarValuesWizardProps) {
    super(props);
    this.state = {
      MinValue: this.props.Data.MinValue,
      MaxValue: this.props.Data.MaxValue,
      MinValueColumnId: this.props.Data.MinValueColumnId,
      MaxValueColumnId: this.props.Data.MaxValueColumnId,
      UseMinColumn: StringExtensions.IsNotNullOrEmpty(this.props.Data.MinValueColumnId),
      UseMaxColumn: StringExtensions.IsNotNullOrEmpty(this.props.Data.MaxValueColumnId),
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
                headerText={'Percent Bar: Minimum Value'}
                bodyText={[
                  'The minimum value of the column (can be minus).  Defaults to the currenty smallest value in the column.  If the column only contains positive numbers use 0.  Additionally, you can set the value to be that in another column.',
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
                  value={this.state.MinValue}
                />
              ) : (
                <ColumnSelector
                  SelectedColumnIds={[this.state.MinValueColumnId]}
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
                headerText={'Percent Bar: Maximum Value'}
                bodyText={[
                  'The maximum value of the bar.  Defaults to the currently largest value in the column.  Additionally, you can set the value to be that in another column.',
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
                  value={this.state.MaxValue}
                />
              ) : (
                <ColumnSelector
                  SelectedColumnIds={[this.state.MaxValueColumnId]}
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
    this.setState({ UseMinColumn: e.value == 'column' } as PercentBarValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onMinValueChanged = (e: any) => {
    this.setState({ MinValue: e.target.value } as PercentBarValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  };

  private onColumnMinValueSelectedChanged(columns: AdaptableBlotterColumn[]) {
    this.setState(
      {
        MinValueColumnId: columns.length > 0 ? columns[0].ColumnId : '',
      } as PercentBarValuesWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  private onUseMaxColumnSelectChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ UseMaxColumn: e.value == 'column' } as PercentBarValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onMaxValueChanged = (e: any) => {
    this.setState({ MaxValue: e.target.value } as PercentBarValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  };

  private onColumnMaxValueSelectedChanged(columns: AdaptableBlotterColumn[]) {
    this.setState(
      {
        MaxValueColumnId: columns.length > 0 ? columns[0].ColumnId : '',
      } as PercentBarValuesWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    if (StringExtensions.IsNullOrEmpty(this.props.Data.ColumnId)) {
      return false;
    }
    if (this.state.UseMinColumn && StringExtensions.IsNullOrEmpty(this.state.MinValueColumnId)) {
      return false;
    }
    if (this.state.UseMaxColumn && StringExtensions.IsNullOrEmpty(this.state.MaxValueColumnId)) {
      return false;
    }

    return true;
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.MinValue = this.state.UseMinColumn ? 0 : this.state.MinValue;
    this.props.Data.MaxValue = this.state.UseMaxColumn ? 100 : this.state.MaxValue;
    this.props.Data.MinValueColumnId = this.state.UseMinColumn ? this.state.MinValueColumnId : null;
    this.props.Data.MaxValueColumnId = this.state.UseMaxColumn ? this.state.MaxValueColumnId : null;
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

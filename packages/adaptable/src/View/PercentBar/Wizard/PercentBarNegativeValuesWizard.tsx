import * as React from 'react';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { SelectionMode } from '../../../PredefinedConfig/Common/Enums';
import { AdaptablePopover } from '../../AdaptablePopover';

import { PercentBar } from '../../../PredefinedConfig/PercentBarState';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import WizardPanel from '../../../components/WizardPanel';
import Panel from '../../../components/Panel';
import Radio from '../../../components/Radio';
import { Flex, Text, Box } from 'rebass';
import Input from '../../../components/Input';
import { ColorPicker } from '../../ColorPicker';

export interface PercentBarNegativeValuesWizardProps extends AdaptableWizardStepProps<PercentBar> {
  ColorPalette: Array<string>;
}

export interface PercentBarNegativeValuesWizardState {
  NegativeColor: string;
  NegativeValue: number | undefined;
  NegativeValueColumnId: string | undefined;
  UseMinColumn: boolean;
}

export class PercentBarNegativeValuesWizard
  extends React.Component<PercentBarNegativeValuesWizardProps, PercentBarNegativeValuesWizardState>
  implements AdaptableWizardStep {
  constructor(props: PercentBarNegativeValuesWizardProps) {
    super(props);
    this.state = {
      NegativeColor: this.props.Data.NegativeColor,
      NegativeValue: this.props.Data.NegativeValue,
      NegativeValueColumnId: this.props.Data.NegativeValueColumnId,
      UseMinColumn: StringExtensions.IsNotNullOrEmpty(this.props.Data.NegativeValueColumnId),
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <Panel header={'Negative Value'} marginTop={2}>
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
                  value={this.state.NegativeValue}
                />
              ) : (
                <ColumnSelector
                  SelectedColumnIds={[this.state.NegativeValueColumnId]}
                  ColumnList={this.props.Columns}
                  onColumnChange={columns => this.onColumnMinValueSelectedChanged(columns)}
                  SelectionMode={SelectionMode.Single}
                />
              )}
            </Flex>
          </Flex>

          <Flex flexDirection="row" alignItems="center" marginTop={3}>
            <Text style={{ flex: 3 }} textAlign="end" marginRight={2}>
              Colour:
            </Text>
            <Flex flex={7} alignItems="center">
              <ColorPicker
                ColorPalette={this.props.ColorPalette}
                value={this.state.NegativeColor}
                onChange={x => this.onNegativeColorSelectChanged(x)}
              />
            </Flex>
          </Flex>
        </Panel>
      </WizardPanel>
    );
  }

  private onUseMinColumnSelectChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      { UseMinColumn: e.value == 'column' } as PercentBarNegativeValuesWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  private onMinValueChanged = (e: any) => {
    this.setState({ NegativeValue: e.target.value } as PercentBarNegativeValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  };

  private onColumnMinValueSelectedChanged(columns: AdaptableColumn[]) {
    this.setState(
      {
        NegativeValueColumnId: columns.length > 0 ? columns[0].ColumnId : '',
      } as PercentBarNegativeValuesWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  private onNegativeColorSelectChanged(event: React.FormEvent<ColorPicker>) {
    let e = event.target as HTMLInputElement;
    this.setState({ NegativeColor: e.value } as PercentBarNegativeValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    if (StringExtensions.IsNullOrEmpty(this.props.Data!.ColumnId)) {
      return false;
    }
    if (
      this.state.UseMinColumn &&
      StringExtensions.IsNullOrEmpty(this.state.NegativeValueColumnId)
    ) {
      return false;
    }
    if (!this.state.UseMinColumn && this.state.NegativeValue && this.state.NegativeValue > 0) {
      return false;
    }

    if (
      StringExtensions.IsNotNullOrEmpty(this.state.NegativeValueColumnId) ||
      this.state.NegativeValue
    ) {
      if (StringExtensions.IsNullOrEmpty(this.state.NegativeColor)) {
        return false;
      }
    }

    return true;
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.NegativeColor = this.state.NegativeColor;
    this.props.Data.NegativeValue = this.state.UseMinColumn ? 0 : this.state.NegativeValue;
    this.props.Data.NegativeValueColumnId = this.state.UseMinColumn
      ? this.state.NegativeValueColumnId
      : undefined;
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

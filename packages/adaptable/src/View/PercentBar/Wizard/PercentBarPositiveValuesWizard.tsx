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

export interface PercentBarPositiveValuesWizardProps extends AdaptableWizardStepProps<PercentBar> {
  ColorPalette: Array<string>;
}

export interface PercentBarPositiveValuesWizardState {
  PositiveColor: string;
  PositiveValue: number | undefined;
  PositiveValueColumnId: string | undefined;
  UseColumn: boolean;
}

export class PercentBarPositiveValuesWizard
  extends React.Component<PercentBarPositiveValuesWizardProps, PercentBarPositiveValuesWizardState>
  implements AdaptableWizardStep {
  constructor(props: PercentBarPositiveValuesWizardProps) {
    super(props);
    this.state = {
      PositiveColor: this.props.Data.PositiveColor,
      PositiveValue: this.props.Data.PositiveValue,
      PositiveValueColumnId: this.props.Data.PositiveValueColumnId,
      UseColumn: StringExtensions.IsNotNullOrEmpty(this.props.Data.PositiveValueColumnId),
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <Panel header="Positive Value" marginTop={2}>
          <Flex flexDirection="row" alignItems="center">
            <Text style={{ flex: 3 }} textAlign="end" marginRight={2}>
              Use:
            </Text>
            <Flex flex={7} alignItems="center">
              <Radio
                marginRight={2}
                value="value"
                checked={this.state.UseColumn == false}
                onChange={(checked, e) => this.onUsePositiveColumnSelectChanged(e)}
              >
                Static Value
              </Radio>{' '}
              <Radio
                marginRight={2}
                value="column"
                checked={this.state.UseColumn == true}
                onChange={(checked, e) => this.onUsePositiveColumnSelectChanged(e)}
              >
                Another Column Value
              </Radio>
              <AdaptablePopover
                headerText={'Percent Bar: Positive Value'}
                bodyText={[
                  'The maximum positive value of the bar.  Defaults to the currently largest value in the column.  Additionally, you can set the value to be that in another column.',
                ]}
              />
            </Flex>
          </Flex>

          <Flex flexDirection="row" alignItems="center" marginTop={2}>
            <Text style={{ flex: 3 }} textAlign="end" marginRight={2}>
              {this.state.UseColumn == false ? 'Value' : 'Column'}
            </Text>

            <Flex flex={7} alignItems="center">
              {this.state.UseColumn == false ? (
                <Input
                  type="number"
                  placeholder="Enter Number"
                  onChange={this.onMaxValueChanged}
                  value={this.state.PositiveValue}
                />
              ) : (
                <ColumnSelector
                  SelectedColumnIds={[this.state.PositiveValueColumnId]}
                  ColumnList={this.props.Columns}
                  onColumnChange={columns => this.onPositiveColumnSelectedChanged(columns)}
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
                value={this.state.PositiveColor}
                onChange={x => this.onPositiveColorSelectChanged(x)}
              />
            </Flex>
          </Flex>
        </Panel>
      </WizardPanel>
    );
  }

  private onUsePositiveColumnSelectChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ UseColumn: e.value == 'column' } as PercentBarPositiveValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onMaxValueChanged = (e: any) => {
    this.setState({ PositiveValue: e.target.value } as PercentBarPositiveValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  };

  private onPositiveColumnSelectedChanged(columns: AdaptableColumn[]) {
    this.setState(
      {
        PositiveValueColumnId: columns.length > 0 ? columns[0].ColumnId : '',
      } as PercentBarPositiveValuesWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  private onPositiveColorSelectChanged(event: React.FormEvent<ColorPicker>) {
    let e = event.target as HTMLInputElement;
    this.setState({ PositiveColor: e.value } as PercentBarPositiveValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    if (StringExtensions.IsNullOrEmpty(this.props.Data!.ColumnId)) {
      return false;
    }

    if (this.state.UseColumn && StringExtensions.IsNullOrEmpty(this.state.PositiveValueColumnId)) {
      return false;
    }
    if (!this.state.UseColumn && this.state.PositiveValue && this.state.PositiveValue < 0) {
      return false;
    }
    if (
      StringExtensions.IsNotNullOrEmpty(this.state.PositiveValueColumnId) ||
      this.state.PositiveValue
    ) {
      if (StringExtensions.IsNullOrEmpty(this.state.PositiveColor)) {
        return false;
      }
    }

    return true;
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.PositiveColor = this.state.PositiveColor;
    this.props.Data.PositiveValue = this.state.UseColumn ? 0 : this.state.PositiveValue;
    this.props.Data.PositiveValueColumnId = this.state.UseColumn
      ? this.state.PositiveValueColumnId
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

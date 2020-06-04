import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';

import { AdaptablePopover } from '../../AdaptablePopover';

import { PercentBar } from '../../../PredefinedConfig/PercentBarState';
import { ColorPicker } from '../../ColorPicker';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import WizardPanel from '../../../components/WizardPanel';
import Checkbox from '../../../components/CheckBox';
import { Flex, Text, Box } from 'rebass';
import Panel from '../../../components/Panel';
import Input from '../../../components/Input';
import SimpleButton from '../../../components/SimpleButton';
import FormLayout, { FormRow } from '../../../components/FormLayout';
import Dropdown from '../../../components/Dropdown';
import Radio from '../../../components/Radio';

export interface PercentBarSettingsWizardProps extends AdaptableWizardStepProps<PercentBar> {
  ColorPalette: Array<string>;
}

export interface PercentBarSettingsWizardState {
  Ranges: PercentBar['Ranges'];
  DisplayType: PercentBar['DisplayType'];
  DisplayValue: PercentBar['DisplayValue'];
}

export class PercentBarSettingsWizard
  extends React.Component<PercentBarSettingsWizardProps, PercentBarSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: PercentBarSettingsWizardProps) {
    super(props);
    this.state = {
      Ranges: this.props.Data.Ranges || [
        {
          Min: 0,
          Max: 100,
          Color: '#00ff00',
        },
      ],
      DisplayType: this.props.Data.DisplayType || 'Inside',
      DisplayValue: this.props.Data.DisplayValue || 'Percentage',
    };
  }

  render(): any {
    return (
      <>
        <Panel header={'Ranges'} margin={2}>
          {this.state.Ranges.map((range, index) => (
            <Flex key={index} mb={2}>
              <Input
                type="number"
                value={range.Min}
                onChange={(event: React.FormEvent) => {
                  const { value } = event.target as HTMLInputElement;
                  this.changeRangeMin(index, value);
                }}
                mr={2}
              />
              <Input
                type="number"
                value={range.Max}
                onChange={(event: React.FormEvent) => {
                  const { value } = event.target as HTMLInputElement;
                  this.changeRangeMax(index, value);
                }}
                mr={2}
              />
              <ColorPicker
                ColorPalette={this.props.ColorPalette}
                value={range.Color}
                onChange={(event: React.FormEvent) => {
                  const { value } = event.target as HTMLInputElement;
                  this.changeRangeColor(index, value);
                }}
                mr={2}
                height="100%"
              />
              <SimpleButton icon="delete" onClick={() => this.removeRange(index)} />
            </Flex>
          ))}
          <SimpleButton onClick={() => this.addRange()}>Add New Range</SimpleButton>
        </Panel>
        <Panel header={'Value'} margin={2}>
          <FormLayout>
            <FormRow label="Display Type">
              <Radio
                name="display-type"
                value="Inside"
                checked={this.state.DisplayType === 'Inside'}
                onChange={checked => checked && this.setState({ DisplayType: 'Inside' })}
                mr={2}
              >
                Inside
              </Radio>
              <Radio
                name="display-type"
                value="Tooltip"
                checked={this.state.DisplayType === 'Tooltip'}
                onChange={checked => checked && this.setState({ DisplayType: 'Tooltip' })}
                mr={2}
              >
                Tooltip
              </Radio>
            </FormRow>
            <FormRow label="Display Value">
              <Radio
                name="display-value"
                value="Percentage"
                checked={this.state.DisplayValue === 'Percentage'}
                onChange={checked => checked && this.setState({ DisplayValue: 'Percentage' })}
                mr={2}
              >
                Percentage
              </Radio>
              <Radio
                name="display-value"
                value="Raw"
                checked={this.state.DisplayValue === 'Raw'}
                onChange={checked => checked && this.setState({ DisplayValue: 'Raw' })}
                mr={2}
              >
                Raw
              </Radio>
            </FormRow>
          </FormLayout>
        </Panel>
      </>
    );
  }

  public canNext(): boolean {
    return true;
  }

  public canBack(): boolean {
    return true;
  }

  public Next(): void {
    this.props.Data.Ranges = this.state.Ranges;
    this.props.Data.DisplayType = this.state.DisplayType;
    this.props.Data.DisplayValue = this.state.DisplayValue;
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

  changeRangeMin(index: number, value: string) {
    const { Ranges } = this.state;
    Ranges[index].Min = Number(value);
    if (Ranges[index - 1]) {
      Ranges[index - 1].Max = Number(value);
    }
    this.setState({ Ranges });
  }

  changeRangeMax(index: number, value: string) {
    const { Ranges } = this.state;
    Ranges[index].Max = Number(value);
    if (Ranges[index + 1]) {
      Ranges[index + 1].Min = Number(value);
    }
    this.setState({ Ranges });
  }

  changeRangeColor(index: number, value: string) {
    const { Ranges } = this.state;
    Ranges[index].Color = value;
    this.setState({ Ranges });
  }

  removeRange(index: number) {
    const { Ranges } = this.state;
    Ranges.splice(index, 1);
    this.setState({ Ranges });
  }

  addRange() {
    const { Ranges } = this.state;
    const lastRange = Ranges[Ranges.length - 1];
    this.setState({
      Ranges: Ranges.concat({
        Min: lastRange.Max,
        Max: lastRange.Max + 1,
        Color: '#00ff00',
      }),
    });
  }
}

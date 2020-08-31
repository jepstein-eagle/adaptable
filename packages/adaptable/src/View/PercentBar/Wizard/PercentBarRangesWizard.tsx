import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { PercentBar } from '../../../PredefinedConfig/PercentBarState';
import { ColorPicker } from '../../ColorPicker';
import { Flex } from 'rebass';
import Panel from '../../../components/Panel';
import Input from '../../../components/Input';
import SimpleButton from '../../../components/SimpleButton';
import { getHexForName, GRAY } from '../../UIHelper';

export interface PercentBarRangesWizardProps extends AdaptableWizardStepProps<PercentBar> {}

export interface PercentBarRangesWizardState {
  Ranges: PercentBar['Ranges'];
}

export class PercentBarRangesWizard
  extends React.Component<PercentBarRangesWizardProps, PercentBarRangesWizardState>
  implements AdaptableWizardStep {
  constructor(props: PercentBarRangesWizardProps) {
    super(props);
    this.state = {
      Ranges: this.props.data.Ranges,
    };
  }

  render(): any {
    return (
      <Panel header={'Ranges'} margin={2}>
        {this.state.Ranges.map((range, index) => (
          <Flex key={index} mb={2} data-name="percent-bar-range">
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
              api={this.props.api}
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
        <SimpleButton data-name="add" onClick={() => this.addRange()}>
          Add New Range
        </SimpleButton>
      </Panel>
    );
  }

  public canNext(): boolean {
    return this.state.Ranges.length > 0;
  }

  public canBack(): boolean {
    return true;
  }

  public next(): void {
    this.props.data.Ranges = this.state.Ranges;
  }

  public back(): void {
    //todo
  }

  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
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
        Max: lastRange.Max,
        Color: getHexForName(GRAY),
      }),
    });
  }
}

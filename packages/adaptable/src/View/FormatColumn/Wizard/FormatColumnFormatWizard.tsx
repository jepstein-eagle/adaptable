import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { FormatColumn } from '../../../PredefinedConfig/FormatColumnState';
import { Flex } from 'rebass';
import Radio from '../../../components/Radio';
import Panel from '../../../components/Panel';
import HelpBlock from '../../../components/HelpBlock';
import Input from '../../../components/Input';
import SimpleButton from '../../../components/SimpleButton';

export interface FormatColumnFormatWizardProps extends AdaptableWizardStepProps<FormatColumn> {}

export interface FormatColumnFormatWizardState {
  Format: string;
}

export class FormatColumnFormatWizard
  extends React.Component<FormatColumnFormatWizardProps, FormatColumnFormatWizardState>
  implements AdaptableWizardStep {
  constructor(props: FormatColumnFormatWizardProps) {
    super(props);
    this.state = { Format: this.props.Data.Format };
  }

  render() {
    const column = this.props.Columns.find(column => column.ColumnId === this.props.Data.ColumnId);
    return (
      <Panel header="Format" margin={2}>
        {column.DataType === 'Number' ? (
          <div>
            <Input
              value={this.state.Format}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                this.setFormat(e.currentTarget.value)
              }
            />
            <SimpleButton onClick={() => this.setFormat('0,0')}>Default 1</SimpleButton>
            <SimpleButton onClick={() => this.setFormat('0,0.00')}>Default 2</SimpleButton>
            <SimpleButton onClick={() => this.setFormat('0,0.0000')}>Default 3</SimpleButton>
            <SimpleButton onClick={() => this.setFormat('(.00)')}>Default 4</SimpleButton>
          </div>
        ) : column.DataType === 'Date' ? (
          <div>
            <Input
              value={this.state.Format}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                this.setFormat(e.currentTarget.value)
              }
            />
            <SimpleButton onClick={() => this.setFormat('MM/dd/yyyy')}>Default 1</SimpleButton>
            <SimpleButton onClick={() => this.setFormat("EEE, MMM d, ''yy")}>
              Default 2
            </SimpleButton>
          </div>
        ) : (
          'No Options'
        )}
      </Panel>
    );
  }

  setFormat(Format: string) {
    this.setState({
      Format,
    });
  }

  public canNext(): boolean {
    return true;
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.Format = this.state.Format;
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

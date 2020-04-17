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
import { AdaptableFormat } from '../../../PredefinedConfig/Common/AdaptableFormat';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import CheckBox from '../../../components/CheckBox';
import FormatHelper from '../../../Utilities/Helpers/FormatHelper';

export interface FormatColumnFormatWizardProps extends AdaptableWizardStepProps<FormatColumn> {}

export interface FormatColumnFormatWizardState {
  Format: AdaptableFormat;
}

export class FormatColumnFormatWizard
  extends React.Component<FormatColumnFormatWizardProps, FormatColumnFormatWizardState>
  implements AdaptableWizardStep {
  column: AdaptableColumn;
  constructor(props: FormatColumnFormatWizardProps) {
    super(props);
    const column = this.props.Columns.find(column => column.ColumnId === this.props.Data.ColumnId);
    this.state = { Format: this.props.Data.Format };

    if (this.state.Format === undefined) {
      if (column.DataType === 'Number') {
        this.state = { Format: { Type: 'number-v1', Options: {} } };
      } else if (column.DataType === 'Date') {
        this.state = { Format: { Type: 'date-v1', Options: {} } };
      }
    }
  }

  render() {
    const Type = this.state.Format && this.state.Format.Type;
    return (
      <Panel header="Format" margin={2}>
        {Type === 'number-v1'
          ? this.renderNumberFormat()
          : Type === 'date-v1'
          ? this.renderDateFormat()
          : 'No Options'}
      </Panel>
    );
  }

  renderNumberFormat() {
    if (this.state.Format.Type !== 'number-v1') return null;
    return (
      <div>
        <div>
          Fraction Digits
          <Input
            type="number"
            value={this.state.Format.Options.FractionDigits}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              this.setFormatOption('FractionDigits', Number(e.currentTarget.value))
            }
          />
        </div>
        <div>
          Fraction Separator
          <Input
            value={this.state.Format.Options.FractionSeparator}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              this.setFormatOption('FractionSeparator', e.currentTarget.value)
            }
          />
        </div>
        <div>
          Integer Digits
          <Input
            type="number"
            value={this.state.Format.Options.IntegerDigits}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              this.setFormatOption('IntegerDigits', Number(e.currentTarget.value))
            }
          />
        </div>
        <div>
          Integer Separator
          <Input
            value={this.state.Format.Options.IntegerSeparator}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              this.setFormatOption('IntegerSeparator', e.currentTarget.value)
            }
          />
        </div>
        <div>
          Prefix
          <Input
            value={this.state.Format.Options.Prefix}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              this.setFormatOption('Prefix', e.currentTarget.value)
            }
          />
        </div>
        <div>
          Suffix
          <Input
            value={this.state.Format.Options.Suffix}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              this.setFormatOption('Suffix', e.currentTarget.value)
            }
          />
        </div>
        <div>
          Multiplier
          <Input
            type="number"
            value={this.state.Format.Options.Multiplier}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              this.setFormatOption('Multiplier', Number(e.currentTarget.value))
            }
          />
        </div>
        <div>
          Parentheses
          <CheckBox
            checked={this.state.Format.Options.Parentheses}
            onChange={checked => this.setFormatOption('Parentheses', checked)}
          />
        </div>
        <pre>
          {' 12345.6789 =>'} {FormatHelper.FormatNumber(12345.6789, this.state.Format.Options)}
        </pre>
        <pre>
          {'-12345.6789 =>'} {FormatHelper.FormatNumber(-12345.6789, this.state.Format.Options)}
        </pre>
        <pre>
          {'0.123       =>'} {FormatHelper.FormatNumber(0.123, this.state.Format.Options)}
        </pre>
      </div>
    );
  }

  renderDateFormat() {
    if (this.state.Format.Type !== 'date-v1') return null;
    return (
      <div>
        <Input
          value={this.state.Format.Options.Pattern}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            this.setFormatOption('Pattern', e.currentTarget.value)
          }
        />
        <SimpleButton onClick={() => this.setFormatOption('Pattern', 'MM/dd/yyyy')}>
          Default 1
        </SimpleButton>
        <SimpleButton onClick={() => this.setFormatOption('Pattern', "EEE, MMM d, ''yy")}>
          Default 2
        </SimpleButton>
        <pre>{FormatHelper.FormatDate(new Date(), this.state.Format.Options)}</pre>
      </div>
    );
  }

  setFormatOption(key: string, value: any) {
    const { Format } = this.state;
    // @ts-ignore
    Format.Options[key] = value;
    this.setState({ Format });
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

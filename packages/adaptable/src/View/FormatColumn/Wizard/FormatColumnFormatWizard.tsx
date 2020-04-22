import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { FormatColumn } from '../../../PredefinedConfig/FormatColumnState';
import { Flex, Box } from 'rebass';
import Radio from '../../../components/Radio';
import Panel from '../../../components/Panel';
import HelpBlock from '../../../components/HelpBlock';
import Input from '../../../components/Input';
import SimpleButton from '../../../components/SimpleButton';
import { AdaptableFormat } from '../../../PredefinedConfig/Common/AdaptableFormat';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import CheckBox from '../../../components/CheckBox';
import FormatHelper from '../../../Utilities/Helpers/FormatHelper';
import FormLayout, { FormRow } from '../../../components/FormLayout';
import { AdaptableObjectRow } from '../../Components/AdaptableObjectRow';

export interface FormatColumnFormatWizardProps extends AdaptableWizardStepProps<FormatColumn> {}

export interface FormatColumnFormatWizardState {
  Format: AdaptableFormat;
}

const DateFormatPresets = [
  'MM/dd/yyyy',
  'dd-MM-yyyy',
  'MMMM do yyyy, h:mm:ss a',
  'EEEE',
  'MMM do yy',
];

export class FormatColumnFormatWizard
  extends React.Component<FormatColumnFormatWizardProps, FormatColumnFormatWizardState>
  implements AdaptableWizardStep {
  column: AdaptableColumn;
  constructor(props: FormatColumnFormatWizardProps) {
    super(props);
    const column = this.props.Columns.find(column => column.ColumnId === this.props.Data.ColumnId);
    this.state = { Format: this.props.Data.Format };

    if (this.state.Format === undefined && column.DataType === 'Number') {
      this.state = {
        Format: {
          Formatter: 'NumberFormatter',
          Options: {
            FractionDigits: 2,
            FractionSeparator: '.',
            IntegerDigits: 0,
            IntegerSeparator: ',',
            Prefix: '',
            Suffix: '',
            Multiplier: 1,
            Parentheses: false,
          },
        },
      };
    }

    if (this.state.Format === undefined && column.DataType === 'Date') {
      this.state = {
        Format: {
          Formatter: 'DateFormatter',
          Options: {
            Pattern: 'MM/dd/yyyy',
          },
        },
      };
    }
  }

  render() {
    const Type = this.state.Format && this.state.Format.Formatter;
    if (Type === 'NumberFormatter') return this.renderNumberFormat();
    if (Type === 'DateFormatter') return this.renderDateFormat();
    return 'No formatter available';
  }

  renderNumberFormat() {
    if (this.state.Format.Formatter !== 'NumberFormatter') return null;
    return (
      <>
        <Panel header="Format" margin={2}>
          <Flex flexDirection="row">
            <FormLayout mr={3}>
              <FormRow label="Fraction Separator">
                <Input
                  value={this.state.Format.Options.FractionSeparator}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    this.setFormatOption('FractionSeparator', e.currentTarget.value)
                  }
                />
              </FormRow>
              <FormRow label="Integer Separator">
                <Input
                  value={this.state.Format.Options.IntegerSeparator}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    this.setFormatOption('IntegerSeparator', e.currentTarget.value)
                  }
                />
              </FormRow>
              <FormRow label="Prefix">
                <Input
                  value={this.state.Format.Options.Prefix}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    this.setFormatOption('Prefix', e.currentTarget.value)
                  }
                />
              </FormRow>
              <FormRow label="Suffix">
                <Input
                  value={this.state.Format.Options.Suffix}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    this.setFormatOption('Suffix', e.currentTarget.value)
                  }
                />
              </FormRow>
            </FormLayout>
            <FormLayout>
              <FormRow label="Fraction Digits">
                <Input
                  type="number"
                  min="0"
                  value={this.state.Format.Options.FractionDigits}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    this.setFormatOption('FractionDigits', Number(e.currentTarget.value))
                  }
                />
              </FormRow>
              <FormRow label="Integer Digits">
                <Input
                  type="number"
                  min="0"
                  value={this.state.Format.Options.IntegerDigits}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    this.setFormatOption('IntegerDigits', Number(e.currentTarget.value))
                  }
                />
              </FormRow>
              <FormRow label="Multiplier">
                <Input
                  type="number"
                  value={this.state.Format.Options.Multiplier}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    this.setFormatOption('Multiplier', Number(e.currentTarget.value))
                  }
                />
              </FormRow>
              <FormRow label="Parentheses">
                <CheckBox
                  checked={this.state.Format.Options.Parentheses}
                  onChange={checked => this.setFormatOption('Parentheses', checked)}
                />
              </FormRow>
            </FormLayout>
          </Flex>
        </Panel>
        <Panel header="Examples" margin={2}>
          <AdaptableObjectRow
            style={{ fontWeight: 'bold' }}
            colItems={[
              { Content: 'Raw Number', Size: 1 },
              { Content: 'Formatted Number', Size: 1 },
            ]}
          />
          <AdaptableObjectRow
            colItems={[
              { Content: '12345.6789', Size: 1 },
              {
                Content: FormatHelper.NumberFormatter(12345.6789, this.state.Format.Options),
                Size: 1,
              },
            ]}
          />
          <AdaptableObjectRow
            colItems={[
              { Content: '-12345.6789', Size: 1 },
              {
                Content: FormatHelper.NumberFormatter(-12345.6789, this.state.Format.Options),
                Size: 1,
              },
            ]}
          />
          <AdaptableObjectRow
            colItems={[
              { Content: '0.123', Size: 1 },
              { Content: FormatHelper.NumberFormatter(0.123, this.state.Format.Options), Size: 1 },
            ]}
          />
        </Panel>
      </>
    );
  }

  renderDateFormat() {
    if (this.state.Format.Formatter !== 'DateFormatter') return null;
    return (
      <>
        <Panel header="Format" margin={2}>
          <HelpBlock mb={2}>
            Either create your own or select one of the preset date formats. Checkout available
            symbols{' '}
            <a
              href="https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table"
              target="_blank"
            >
              here
            </a>
            .
          </HelpBlock>
          <FormLayout>
            <FormRow label="Pattern">
              <Input
                value={this.state.Format.Options.Pattern}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  this.setFormatOption('Pattern', e.currentTarget.value)
                }
                mr={2}
              />
              <span>{FormatHelper.DateFormatter(new Date(), this.state.Format.Options)}</span>
            </FormRow>
          </FormLayout>
        </Panel>
        <Panel header="Presets" margin={2}>
          <AdaptableObjectRow
            style={{ fontWeight: 'bold' }}
            colItems={[
              { Content: 'Pattern', Size: 1 },
              { Content: 'Formatted Date', Size: 1 },
              { Content: '', Size: 1 },
            ]}
          />
          {DateFormatPresets.map((Pattern, index) => (
            <AdaptableObjectRow
              key={index}
              colItems={[
                { Content: Pattern, Size: 1 },
                {
                  Content: FormatHelper.DateFormatter(new Date(), { Pattern }),
                  Size: 1,
                },
                {
                  Content: (
                    <SimpleButton onClick={() => this.setFormatOption('Pattern', Pattern)}>
                      Apply
                    </SimpleButton>
                  ),
                  Size: 1,
                },
              ]}
            />
          ))}
        </Panel>
      </>
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

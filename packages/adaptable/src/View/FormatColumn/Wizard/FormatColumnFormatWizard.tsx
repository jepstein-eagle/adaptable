import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { FormatColumn } from '../../../PredefinedConfig/FormatColumnState';
import { Flex } from 'rebass';
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
  DisplayFormat: AdaptableFormat;
}

const DateFormatPresets = [
  'MM/dd/yyyy',
  'dd-MM-yyyy',
  'MMMM do yyyy, h:mm:ss a',
  'EEEE',
  'MMM do yyyy',
  'yyyyMMdd',
  'HH:mm:ss',
];

export class FormatColumnFormatWizard
  extends React.Component<FormatColumnFormatWizardProps, FormatColumnFormatWizardState>
  implements AdaptableWizardStep {
  column: AdaptableColumn;
  constructor(props: FormatColumnFormatWizardProps) {
    super(props);
    const column = this.props.Api.columnApi
      .getColumns()
      .find(column => column.ColumnId === this.props.Data.ColumnId);
    this.state = { DisplayFormat: this.props.Data.DisplayFormat };

    if (this.state.DisplayFormat === undefined && column.DataType === 'Number') {
      this.state = {
        DisplayFormat: {
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

    if (this.state.DisplayFormat === undefined && column.DataType === 'Date') {
      this.state = {
        DisplayFormat: {
          Formatter: 'DateFormatter',
          Options: {
            Pattern: 'MM/dd/yyyy',
          },
        },
      };
    }
  }

  render() {
    const Type = this.state.DisplayFormat && this.state.DisplayFormat.Formatter;
    if (Type === 'NumberFormatter') {
      return this.renderNumberFormat();
    }
    if (Type === 'DateFormatter') {
      return this.renderDateFormat();
    }
    return (
      <HelpBlock margin={3}>Formatting is only available on Numeric and Date columns</HelpBlock>
    );
  }

  renderNumberFormat() {
    if (this.state.DisplayFormat.Formatter !== 'NumberFormatter') {
      return null;
    }
    return (
      <>
        <Panel header="Format" margin={2}>
          <Flex flexDirection="row">
            <FormLayout mr={3}>
              <FormRow label="Fraction Separator">
                <Input
                  value={this.state.DisplayFormat.Options.FractionSeparator}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    this.setFormatOption('FractionSeparator', e.currentTarget.value)
                  }
                />
              </FormRow>
              <FormRow label="Integer Separator">
                <Input
                  value={this.state.DisplayFormat.Options.IntegerSeparator}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    this.setFormatOption('IntegerSeparator', e.currentTarget.value)
                  }
                />
              </FormRow>
              <FormRow label="Prefix">
                <Input
                  value={this.state.DisplayFormat.Options.Prefix}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    this.setFormatOption('Prefix', e.currentTarget.value)
                  }
                />
              </FormRow>
              <FormRow label="Suffix">
                <Input
                  value={this.state.DisplayFormat.Options.Suffix}
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
                  value={this.state.DisplayFormat.Options.FractionDigits}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    this.setFormatOption('FractionDigits', Number(e.currentTarget.value))
                  }
                />
              </FormRow>
              <FormRow label="Integer Digits">
                <Input
                  type="number"
                  min="0"
                  value={this.state.DisplayFormat.Options.IntegerDigits}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    this.setFormatOption('IntegerDigits', Number(e.currentTarget.value))
                  }
                />
              </FormRow>
              <FormRow label="Multiplier">
                <Input
                  type="number"
                  value={this.state.DisplayFormat.Options.Multiplier}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    this.setFormatOption('Multiplier', Number(e.currentTarget.value))
                  }
                />
              </FormRow>
              <FormRow label="Parentheses">
                <CheckBox
                  checked={this.state.DisplayFormat.Options.Parentheses}
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
                Content: FormatHelper.NumberFormatter(12345.6789, this.state.DisplayFormat.Options),
                Size: 1,
              },
            ]}
          />
          <AdaptableObjectRow
            colItems={[
              { Content: '-12345.6789', Size: 1 },
              {
                Content: FormatHelper.NumberFormatter(
                  -12345.6789,
                  this.state.DisplayFormat.Options
                ),
                Size: 1,
              },
            ]}
          />
          <AdaptableObjectRow
            colItems={[
              { Content: '0.123', Size: 1 },
              {
                Content: FormatHelper.NumberFormatter(0.123, this.state.DisplayFormat.Options),
                Size: 1,
              },
            ]}
          />
        </Panel>
      </>
    );
  }

  renderDateFormat() {
    if (this.state.DisplayFormat.Formatter !== 'DateFormatter') {
      return null;
    }
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
                value={this.state.DisplayFormat.Options.Pattern}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  this.setFormatOption('Pattern', e.currentTarget.value)
                }
                mr={2}
              />
              <span>
                {FormatHelper.DateFormatter(new Date(), this.state.DisplayFormat.Options)}
              </span>
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
    const { DisplayFormat } = this.state;
    // @ts-ignore
    DisplayFormat.Options[key] = value;
    this.setState({ DisplayFormat });
  }

  public canNext(): boolean {
    return true;
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.DisplayFormat = this.state.DisplayFormat;
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

import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';

import { FreeTextColumn } from '../../../PredefinedConfig/FreeTextColumnState';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';

import { Box, Text, Flex } from 'rebass';
import Input from '../../../components/Input';
import WizardPanel from '../../../components/WizardPanel';
import ErrorBox from '../../../components/ErrorBox';
import Radio from '../../../components/Radio';

export interface FreeTextColumnSettingsWizardProps
  extends AdaptableWizardStepProps<FreeTextColumn> {}
export interface FreeTextColumnSettingsWizardState {
  ColumnId: string;
  ErrorMessage: string;
  DefaultValue: string;
  TextEditor: 'Inline' | 'Large';
}

export class FreeTextColumnSettingsWizard
  extends React.Component<FreeTextColumnSettingsWizardProps, FreeTextColumnSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: FreeTextColumnSettingsWizardProps) {
    super(props);
    this.state = {
      ColumnId: this.props.Data.ColumnId,
      ErrorMessage: null,
      DefaultValue: this.props.Data.DefaultValue,
      TextEditor: this.props.Data.TextEditor ? this.props.Data.TextEditor : 'Inline',
    };
  }
  render(): any {
    return (
      <div style={{ height: '100%' }}>
        <WizardPanel>
          <Flex alignItems="center" flexDirection="row">
            <Text style={{ flex: 2 }}>Column Name</Text>

            <Box style={{ flex: 8 }}>
              <Input
                value={this.state.ColumnId}
                style={{ width: '100%', maxWidth: 500 }}
                type="text"
                placeholder="Enter a name"
                onChange={(e: React.SyntheticEvent) => this.handleColumnNameChange(e)}
              />
            </Box>
          </Flex>
          {this.state.ErrorMessage ? (
            <ErrorBox marginTop={2}>{this.state.ErrorMessage}</ErrorBox>
          ) : null}
          <Flex alignItems="center" flexDirection="row" marginTop={3}>
            <Text style={{ flex: 2 }}>Default Value</Text>
            <Box style={{ flex: 8 }}>
              <Input
                value={this.state.DefaultValue}
                style={{ width: '100%', maxWidth: 500 }}
                type="text"
                placeholder="Default Column Value (not required)"
                onChange={(e: React.SyntheticEvent) => this.handleDefaultValueChange(e)}
              />
            </Box>
          </Flex>
          <Flex alignItems="center" flexDirection="row" marginTop={3}>
            <Radio
              value="Inline"
              checked={this.state.TextEditor == 'Inline'}
              onChange={(_, e: any) => this.onDynamicSelectChanged(e)}
              marginRight={2}
            >
              Inline Editor
            </Radio>
            <Radio
              value="Large"
              checked={this.state.TextEditor == 'Large'}
              onChange={(_, e: any) => this.onDynamicSelectChanged(e)}
            >
              Large Editor
            </Radio>
          </Flex>
        </WizardPanel>
      </div>
    );
  }

  handleColumnNameChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        ColumnId: e.value,
        ErrorMessage: ArrayExtensions.ContainsItem(
          this.props.Api.gridApi.getColumns().map(c => c.ColumnId),
          e.value
        )
          ? 'A Column already exists with that name'
          : null,
      },
      () => this.props.UpdateGoBackState()
    );
  }

  private onDynamicSelectChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ TextEditor: e.value } as FreeTextColumnSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  handleDefaultValueChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        DefaultValue: e.value,
      },
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return (
      StringExtensions.IsNotNullOrEmpty(this.state.ColumnId) &&
      StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)
    );
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.ColumnId = this.state.ColumnId;
    this.props.Data.DefaultValue = this.state.DefaultValue;
    this.props.Data.TextEditor = this.state.TextEditor;
  }
  public Back(): void {
    //
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}

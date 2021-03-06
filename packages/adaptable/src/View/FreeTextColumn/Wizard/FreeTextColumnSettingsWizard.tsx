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
import FormLayout, { FormRow } from '../../../components/FormLayout';

export interface FreeTextColumnSettingsWizardProps
  extends AdaptableWizardStepProps<FreeTextColumn> {}
export interface FreeTextColumnSettingsWizardState {
  ColumnId: string;
  ColumnName: string;
  ErrorMessage: string;
  DefaultValue: string;
  ColumnNameFocused: boolean;
  TextEditor: 'Inline' | 'Large';
}

export class FreeTextColumnSettingsWizard
  extends React.Component<FreeTextColumnSettingsWizardProps, FreeTextColumnSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: FreeTextColumnSettingsWizardProps) {
    super(props);
    this.state = {
      ColumnId: this.props.data.ColumnId,
      ColumnName: this.props.data.FriendlyName ?? this.props.data.ColumnId,
      ErrorMessage: null,
      DefaultValue: this.props.data.DefaultValue,
      TextEditor: this.props.data.TextEditor ? this.props.data.TextEditor : 'Inline',
      ColumnNameFocused: false,
    };
  }
  render(): any {
    const inEdit = !!this.props.data.ColumnId;
    return (
      <div style={{ height: '100%' }}>
        <WizardPanel>
          <FormLayout>
            <FormRow label="ColumnId">
              <Input
                autoFocus={!inEdit}
                value={this.state.ColumnId || ''}
                style={{ width: '100%', maxWidth: 500 }}
                disabled={inEdit}
                type="text"
                placeholder="Enter an id"
                onChange={(e: React.SyntheticEvent) => this.handleColumnIdChange(e)}
              />
            </FormRow>

            {this.state.ErrorMessage ? (
              <FormRow label="">
                <ErrorBox style={{ width: '100%', maxWidth: 500 }}>
                  {this.state.ErrorMessage}
                </ErrorBox>
              </FormRow>
            ) : null}

            <FormRow label="Column Name">
              <Input
                autoFocus={inEdit}
                onFocus={() => {
                  this.setState({
                    ColumnNameFocused: true,
                  });
                }}
                onBlur={() => {
                  this.setState({
                    ColumnNameFocused: false,
                  });
                }}
                value={
                  this.state.ColumnNameFocused
                    ? this.state.ColumnName || ''
                    : this.state.ColumnName || this.state.ColumnId || ''
                }
                style={{ width: '100%', maxWidth: 500 }}
                type="text"
                placeholder="Enter a name"
                onChange={(e: React.SyntheticEvent) => this.handleColumnNameChange(e)}
              />
            </FormRow>

            <FormRow label="Default Value">
              <Input
                value={this.state.DefaultValue}
                style={{ width: '100%', maxWidth: 500 }}
                type="text"
                placeholder="Default Column Value (not required)"
                onChange={(e: React.SyntheticEvent) => this.handleDefaultValueChange(e)}
              />
            </FormRow>
            <FormRow label="Editor Type">
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
            </FormRow>
          </FormLayout>
        </WizardPanel>
      </div>
    );
  }

  handleColumnIdChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        ColumnId: e.value,
        ErrorMessage: ArrayExtensions.ContainsItem(
          this.props.api.columnApi.getColumns().map(c => c.ColumnId),
          e.value
        )
          ? 'A Column already exists with that id'
          : null,
      },
      () => this.props.updateGoBackState()
    );
  }

  handleColumnNameChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        ColumnName: e.value,
      },
      () => this.props.updateGoBackState()
    );
  }

  private onDynamicSelectChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ TextEditor: e.value } as FreeTextColumnSettingsWizardState, () =>
      this.props.updateGoBackState()
    );
  }

  handleDefaultValueChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        DefaultValue: e.value,
      },
      () => this.props.updateGoBackState()
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
  public next(): void {
    this.props.data.ColumnId = this.state.ColumnId;
    this.props.data.FriendlyName = this.state.ColumnName || this.state.ColumnId;
    this.props.data.DefaultValue = this.state.DefaultValue;
    this.props.data.TextEditor = this.state.TextEditor;
  }
  public back(): void {
    //
  }
  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}

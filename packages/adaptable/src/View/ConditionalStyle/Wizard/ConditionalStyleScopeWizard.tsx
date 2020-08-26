import * as React from 'react';

import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { SelectionMode } from '../../../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';

import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';
import { ConditionalStyle } from '../../../PredefinedConfig/ConditionalStyleState';
import { Box, Flex, Text } from 'rebass';
import Radio from '../../../components/Radio';
import Dropdown from '../../../components/Dropdown';

import WizardPanel from '../../../components/WizardPanel';
import HelpBlock from '../../../components/HelpBlock';
import CheckBox from '../../../components/CheckBox';
import { Scope, ScopeDataTypes, ScopeDataType } from '../../../PredefinedConfig/Common/Scope';
import { DualListBoxEditor, DisplaySize } from '../../Components/ListBox/DualListBoxEditor';
import Panel from '../../../components/Panel';

export interface ConditionalStyleScopeWizardProps
  extends AdaptableWizardStepProps<ConditionalStyle> {}

export interface ConditionalStyleScopeWizardState {
  ExcludeGroupedRows: boolean;
  ScopeChoice: 'Row' | 'Column' | 'DataType';
  ColumnIds: string[];
  DataTypes: ScopeDataType[];
  // DataType?: 'String' | 'Number' | 'Boolean' | 'Date';
}

export class ConditionalStyleScopeWizard
  extends React.Component<ConditionalStyleScopeWizardProps, ConditionalStyleScopeWizardState>
  implements AdaptableWizardStep {
  constructor(props: ConditionalStyleScopeWizardProps) {
    super(props);
    let scopeChoice: 'Row' | 'Column' | 'DataType' =
      this.props.Data.Scope == undefined
        ? 'Row'
        : this.props.Api.scopeApi.scopeHasColumns(this.props.Data.Scope)
        ? 'Column'
        : 'DataType';
    this.state = {
      ScopeChoice: scopeChoice,
      ExcludeGroupedRows: this.props.Data.ExcludeGroupedRows,
      ColumnIds: this.props.Api.scopeApi.getColumnIdsInScope(this.props.Data.Scope),
      DataTypes: this.props.Api.scopeApi.getDataTypesInScope(this.props.Data.Scope),
    };
  }

  render(): any {
    let optionDataTypes = ['String', 'Number', 'Boolean', 'Date'].map(cc => {
      return {
        value: cc,
        label: cc,
      };
    });

    return (
      <WizardPanel>
        {' '}
        <Flex flexDirection="column" padding={2}>
          <HelpBlock marginBottom={1}>
            Apply Conditional Style to whole row, one or more columns or one or more data types.
          </HelpBlock>{' '}
          <Flex flexDirection="row" padding={2}>
            <Radio
              marginLeft={3}
              value="Row"
              checked={this.state.ScopeChoice == 'Row'}
              onChange={(checked: boolean, e: React.SyntheticEvent) => this.onScopeSelectChanged(e)}
            >
              Whole Row
            </Radio>{' '}
            <Radio
              marginLeft={3}
              value="Column"
              checked={this.state.ScopeChoice == 'Column'}
              onChange={(checked: boolean, e: React.SyntheticEvent) => this.onScopeSelectChanged(e)}
            >
              Column(s)
            </Radio>{' '}
            <Radio
              marginLeft={3}
              value="DataType"
              checked={this.state.ScopeChoice == 'DataType'}
              onChange={(checked: boolean, e: React.SyntheticEvent) => this.onScopeSelectChanged(e)}
            >
              DataType(s)
            </Radio>
          </Flex>
          {this.state.ScopeChoice == 'Column' && (
            <Box marginBottom={2}>
              <DualListBoxEditor
                style={{ flex: 1, overflow: 'hidden', height: '250px' }}
                AvailableValues={this.props.Api.columnApi.getColumns().map(c => {
                  return c.FriendlyName;
                })}
                SelectedValues={this.props.Api.columnApi.getFriendlyNamesFromColumnIds(
                  this.state.ColumnIds
                )}
                HeaderAvailable="Columns"
                HeaderSelected="Columns In Style"
                onChange={SelectedValues => this.onColumnsSelectedChanged(SelectedValues)}
                DisplaySize={DisplaySize.Small}
              />
            </Box>
          )}
          {this.state.ScopeChoice == 'DataType' && (
            <Panel header="Data Types" margin={2} marginLeft={4}>
              {' '}
              <Flex flexDirection="row" padding={2}>
                <CheckBox
                  checked={
                    this.state.DataTypes != undefined && this.state.DataTypes.includes('Date')
                  }
                  marginLeft={2}
                  onChange={(checked: boolean) => this.onDataTypeChecked(checked, 'Date')}
                >
                  Date
                </CheckBox>{' '}
                <CheckBox
                  checked={
                    this.state.DataTypes != undefined && this.state.DataTypes.includes('Number')
                  }
                  marginLeft={4}
                  onChange={(checked: boolean) => this.onDataTypeChecked(checked, 'Number')}
                >
                  Number
                </CheckBox>{' '}
                <CheckBox
                  checked={
                    this.state.DataTypes != undefined && this.state.DataTypes.includes('String')
                  }
                  marginLeft={4}
                  onChange={(checked: boolean) => this.onDataTypeChecked(checked, 'String')}
                >
                  String
                </CheckBox>{' '}
                <CheckBox
                  checked={
                    this.state.DataTypes != undefined && this.state.DataTypes.includes('Boolean')
                  }
                  marginLeft={4}
                  onChange={(checked: boolean) => this.onDataTypeChecked(checked, 'Boolean')}
                >
                  Boolean
                </CheckBox>{' '}
              </Flex>{' '}
            </Panel>
          )}
          <Box>
            <HelpBlock marginBottom={2}>
              Exclude any cells in a Grouped Row from applying the Style
            </HelpBlock>

            <CheckBox
              marginLeft={3}
              onChange={(checked: boolean) => this.onExludeGroupedRowsChanged(checked)}
              checked={this.state.ExcludeGroupedRows}
            >
              Exclude Grouped Rows
            </CheckBox>
          </Box>
        </Flex>
      </WizardPanel>
    );
  }

  private onColumnsSelectedChanged(columnFriendlyNames: string[]) {
    this.setState(
      {
        ColumnIds: this.props.Api.columnApi.getColumnIdsFromFriendlyNames(columnFriendlyNames),
      } as ConditionalStyleScopeWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  private onScopeSelectChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    if (e.value == 'Column') {
      this.setState(
        { ScopeChoice: 'Column', ColumnIds: [] } as ConditionalStyleScopeWizardState,
        () => this.props.UpdateGoBackState()
      );
    } else if (e.value == 'DataType') {
      this.setState(
        {
          ScopeChoice: 'DataType',
          DataTypes: [],
        } as ConditionalStyleScopeWizardState,
        () => this.props.UpdateGoBackState()
      );
    } else {
      this.setState({ ScopeChoice: 'Row' } as ConditionalStyleScopeWizardState, () =>
        this.props.UpdateGoBackState()
      );
    }
  }

  private onDataTypeChecked(checked: boolean, item: ScopeDataType) {
    let dataTypes = this.state.DataTypes;
    if (checked) {
      dataTypes.push(item);
    } else {
      const index = dataTypes.indexOf(item, 0);
      if (index > -1) {
        dataTypes.splice(index, 1);
      }
    }
    this.setState({ DataTypes: dataTypes } as ConditionalStyleScopeWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onExludeGroupedRowsChanged(checked: boolean) {
    this.setState({ ExcludeGroupedRows: checked } as ConditionalStyleScopeWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return true;
  }

  public canBack(): boolean {
    return false;
  }
  public Next(): void {
    if (this.state.ScopeChoice == 'Row') {
      this.props.Data.Scope = undefined;
    } else if (this.state.ScopeChoice == 'Column') {
      this.props.Data.Scope = {
        ColumnIds: this.state.ColumnIds,
      };
    } else {
      // DataTypes
      this.props.Data.Scope = {
        DataTypes: this.state.DataTypes,
      };
    }
    this.props.Data.ExcludeGroupedRows = this.state.ExcludeGroupedRows;
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

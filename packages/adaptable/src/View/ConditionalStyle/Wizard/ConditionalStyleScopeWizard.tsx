import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { ConditionalStyle } from '../../../PredefinedConfig/ConditionalStyleState';
import { Box, Flex } from 'rebass';
import Radio from '../../../components/Radio';
import WizardPanel from '../../../components/WizardPanel';
import HelpBlock from '../../../components/HelpBlock';
import CheckBox from '../../../components/CheckBox';
import { ScopeDataType } from '../../../PredefinedConfig/Common/Scope';
import { DualListBoxEditor, DisplaySize } from '../../Components/ListBox/DualListBoxEditor';
import Panel from '../../../components/Panel';

export interface ConditionalStyleScopeWizardProps
  extends AdaptableWizardStepProps<ConditionalStyle> {}

export interface ConditionalStyleScopeWizardState {
  ExcludeGroupedRows: boolean;
  ScopeChoice: 'All' | 'Column' | 'DataType';
  ColumnIds: string[];
  DataTypes: ScopeDataType[];
}

export class ConditionalStyleScopeWizard
  extends React.Component<ConditionalStyleScopeWizardProps, ConditionalStyleScopeWizardState>
  implements AdaptableWizardStep {
  constructor(props: ConditionalStyleScopeWizardProps) {
    super(props);
    let scopeChoice: 'All' | 'Column' | 'DataType' = this.props.api.scopeApi.scopeIsAll(
      this.props.data.Scope
    )
      ? 'All'
      : this.props.api.scopeApi.scopeHasColumns(this.props.data.Scope)
      ? 'Column'
      : 'DataType';
    this.state = {
      ScopeChoice: scopeChoice,
      ExcludeGroupedRows: this.props.data.ExcludeGroupedRows,
      ColumnIds: this.props.api.scopeApi.getColumnIdsInScope(this.props.data.Scope),
      DataTypes: this.props.api.scopeApi.getDataTypesInScope(this.props.data.Scope),
    };
  }

  render(): any {
    return (
      <WizardPanel>
        {' '}
        <Flex flexDirection="column" padding={2}>
          <HelpBlock marginBottom={1}>
            Apply Scope for: Row, or one or more Columns, or one or more Data Types
          </HelpBlock>{' '}
          <Flex flexDirection="row" padding={2}>
            <Radio
              marginLeft={3}
              value="Row"
              checked={this.state.ScopeChoice == 'All'}
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
                AvailableValues={this.props.api.columnApi.getColumns().map(c => {
                  return c.FriendlyName;
                })}
                SelectedValues={this.props.api.columnApi.getFriendlyNamesFromColumnIds(
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
        ColumnIds: this.props.api.columnApi.getColumnIdsFromFriendlyNames(columnFriendlyNames),
      } as ConditionalStyleScopeWizardState,
      () => this.props.updateGoBackState()
    );
  }

  private onScopeSelectChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    if (e.value == 'Column') {
      this.setState(
        { ScopeChoice: 'Column', ColumnIds: [] } as ConditionalStyleScopeWizardState,
        () => this.props.updateGoBackState()
      );
    } else if (e.value == 'DataType') {
      this.setState(
        {
          ScopeChoice: 'DataType',
          DataTypes: [],
        } as ConditionalStyleScopeWizardState,
        () => this.props.updateGoBackState()
      );
    } else {
      this.setState({ ScopeChoice: 'All' } as ConditionalStyleScopeWizardState, () =>
        this.props.updateGoBackState()
      );
    }
  }

  private onDataTypeChecked(checked: boolean, item: ScopeDataType) {
    let dataTypes = [].concat(this.state.DataTypes);
    if (checked) {
      dataTypes.push(item);
    } else {
      const index = dataTypes.indexOf(item, 0);
      if (index > -1) {
        dataTypes.splice(index, 1);
      }
    }
    this.setState({ DataTypes: dataTypes } as ConditionalStyleScopeWizardState, () =>
      this.props.updateGoBackState()
    );
  }

  private onExludeGroupedRowsChanged(checked: boolean) {
    this.setState({ ExcludeGroupedRows: checked } as ConditionalStyleScopeWizardState, () =>
      this.props.updateGoBackState()
    );
  }

  public canNext(): boolean {
    return true;
  }

  public canBack(): boolean {
    return false;
  }
  public next(): void {
    if (this.state.ScopeChoice == 'All') {
      this.props.data.Scope = {
        All: true,
      };
    } else if (this.state.ScopeChoice == 'Column') {
      this.props.data.Scope = {
        ColumnIds: this.state.ColumnIds,
      };
    } else {
      this.props.data.Scope = {
        DataTypes: this.state.DataTypes,
      };
    }
    this.props.data.ExcludeGroupedRows = this.state.ExcludeGroupedRows;
  }

  public back(): void {
    // todo
  }

  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}

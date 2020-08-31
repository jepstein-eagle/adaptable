import * as React from 'react';

import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { SelectionMode } from '../../../PredefinedConfig/Common/Enums';
import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { FormatColumn } from '../../../PredefinedConfig/FormatColumnState';
import WizardPanel from '../../../components/WizardPanel';
import { ScopeDataType, Scope } from '../../../PredefinedConfig/Common/Scope';
import { Flex, Box } from 'rebass';
import HelpBlock from '../../../components/HelpBlock';
import Radio from '../../../components/Radio';
import { DualListBoxEditor, DisplaySize } from '../../Components/ListBox/DualListBoxEditor';
import Panel from '../../../components/Panel';
import CheckBox from '../../../components/CheckBox';
import ArrayExtensions from '../../../Utilities/Extensions/ArrayExtensions';

export interface FormatColumnScopeWizardProps extends AdaptableWizardStepProps<FormatColumn> {}

export interface FormatColumnScopeWizardState {
  ScopeChoice: 'All' | 'Column' | 'DataType';
  ColumnIds: string[];
  DataType: 'Number' | 'Date' | undefined;
}

export class FormatColumnScopeWizard
  extends React.Component<FormatColumnScopeWizardProps, FormatColumnScopeWizardState>
  implements AdaptableWizardStep {
  constructor(props: FormatColumnScopeWizardProps) {
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
      ColumnIds: this.props.api.scopeApi.getColumnIdsInScope(this.props.data.Scope),
      DataType: this.getInitialDataType(this.props.data.Scope),
    };
  }

  render(): any {
    return (
      <WizardPanel>
        {' '}
        <Flex flexDirection="column" padding={2}>
          <HelpBlock marginBottom={1}>
            Create Format Column for all or some Columns, or for one or more Data Types
          </HelpBlock>{' '}
          <Flex flexDirection="row" padding={2}>
            <Radio
              marginLeft={3}
              value="All"
              checked={this.state.ScopeChoice == 'All'}
              onChange={(checked: boolean, e: React.SyntheticEvent) => this.onScopeSelectChanged(e)}
            >
              All Columns
            </Radio>{' '}
            <Radio
              marginLeft={3}
              value="Column"
              checked={this.state.ScopeChoice == 'Column'}
              onChange={(checked: boolean, e: React.SyntheticEvent) => this.onScopeSelectChanged(e)}
            >
              Selected Column(s)
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
                <Radio
                  checked={this.state.DataType == 'Date'}
                  value="Date"
                  marginLeft={2}
                  onChange={(checked: boolean) => this.onDataTypeChecked(checked, 'Date')}
                >
                  Date
                </Radio>
                <Radio
                  checked={this.state.DataType == 'Number'}
                  value="Number"
                  marginLeft={2}
                  onChange={(checked: boolean) => this.onDataTypeChecked(checked, 'Number')}
                >
                  Number
                </Radio>
              </Flex>{' '}
            </Panel>
          )}
        </Flex>
      </WizardPanel>
    );
  }

  private getInitialDataType(scope: Scope): 'Number' | 'Date' | undefined {
    if (scope == undefined) {
      return undefined;
    }
    if ('DataTypes' in scope && scope.DataTypes.includes('Number')) {
      return 'Number';
    }

    if ('DataTypes' in scope && scope.DataTypes.includes('Date')) {
      return 'Date';
    }
    return undefined;
  }

  private onColumnsSelectedChanged(columnFriendlyNames: string[]) {
    this.setState(
      {
        ColumnIds: this.props.api.columnApi.getColumnIdsFromFriendlyNames(columnFriendlyNames),
      } as FormatColumnScopeWizardState,
      () => this.props.updateGoBackState()
    );
  }

  private onScopeSelectChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    if (e.value == 'Column') {
      this.setState({ ScopeChoice: 'Column', ColumnIds: [] } as FormatColumnScopeWizardState, () =>
        this.props.updateGoBackState()
      );
    } else if (e.value == 'DataType') {
      this.setState(
        {
          ScopeChoice: 'DataType',
          DataType: undefined,
        } as FormatColumnScopeWizardState,
        () => this.props.updateGoBackState()
      );
    } else {
      this.setState({ ScopeChoice: 'All' } as FormatColumnScopeWizardState, () =>
        this.props.updateGoBackState()
      );
    }
  }

  private onDataTypeChecked(checked: boolean, item: 'Number' | 'Date') {
    let e = event.target as HTMLInputElement;
    console.log('event', e);
    if (e.value == 'Date') {
      this.setState({ DataType: 'Date' } as FormatColumnScopeWizardState, () =>
        this.props.updateGoBackState()
      );
    } else if (e.value == 'Number') {
      this.setState(
        {
          DataType: 'Number',
        } as FormatColumnScopeWizardState,
        () => this.props.updateGoBackState()
      );
    }
  }

  public canNext(): boolean {
    if (this.state.ScopeChoice == 'Column' && ArrayExtensions.IsNullOrEmpty(this.state.ColumnIds)) {
      return false;
    }
    if (this.state.ScopeChoice == 'DataType' && this.state.DataType == undefined) {
      return false;
    }
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
        DataTypes: [this.state.DataType],
      };
    }
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
}

import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { AlertDefinition } from '../../../PredefinedConfig/AlertState';
import WizardPanel from '../../../components/WizardPanel';
import { ScopeDataType } from '../../../PredefinedConfig/Common/Scope';
import { Flex, Box } from 'rebass';
import HelpBlock from '../../../components/HelpBlock';
import Radio from '../../../components/Radio';
import { DualListBoxEditor, DisplaySize } from '../../Components/ListBox/DualListBoxEditor';
import Panel from '../../../components/Panel';
import CheckBox from '../../../components/CheckBox';

export interface AlertScopeWizardProps extends AdaptableWizardStepProps<AlertDefinition> {}
export interface AlertScopeWizardState {
  ScopeChoice: 'All' | 'Column' | 'DataType';
  ColumnIds: string[];
  DataTypes: ScopeDataType[];
}

export class AlertScopeWizard extends React.Component<AlertScopeWizardProps, AlertScopeWizardState>
  implements AdaptableWizardStep {
  constructor(props: AlertScopeWizardProps) {
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
        </Flex>
      </WizardPanel>
    );
  }

  private onColumnsSelectedChanged(columnFriendlyNames: string[]) {
    this.setState(
      {
        ColumnIds: this.props.api.columnApi.getColumnIdsFromFriendlyNames(columnFriendlyNames),
      } as AlertScopeWizardState,
      () => this.props.updateGoBackState()
    );
  }

  private onScopeSelectChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    if (e.value == 'Column') {
      this.setState({ ScopeChoice: 'Column', ColumnIds: [] } as AlertScopeWizardState, () =>
        this.props.updateGoBackState()
      );
    } else if (e.value == 'DataType') {
      this.setState(
        {
          ScopeChoice: 'DataType',
          DataTypes: [],
        } as AlertScopeWizardState,
        () => this.props.updateGoBackState()
      );
    } else {
      this.setState({ ScopeChoice: 'All' } as AlertScopeWizardState, () =>
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
    this.setState({ DataTypes: dataTypes } as AlertScopeWizardState, () =>
      this.props.updateGoBackState()
    );
  }

  public canNext(): boolean {
    return true; // to do more
  }

  public canBack(): boolean {
    return true;
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

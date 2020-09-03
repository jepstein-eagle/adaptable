import * as React from 'react';

import { Flex, Box } from 'rebass';
import Panel from '../../components/Panel';
import HelpBlock from '../../components/HelpBlock';
import { AdaptableApi } from '../../Api/AdaptableApi';
import { ScopeDataType, Scope } from '../../PredefinedConfig/Common/Scope';
import Radio from '../../components/Radio';
import { DualListBoxEditor, DisplaySize } from './ListBox/DualListBoxEditor';
import CheckBox from '../../components/CheckBox';

export interface ScopeComponentProps extends React.ClassAttributes<ScopeComponent> {
  api: AdaptableApi;
  scope: Scope;
  updateScope: (scope: Scope) => void;
}

export interface ScopeComponentState {
  ScopeChoice: 'All' | 'Column' | 'DataType';
  componentScope: Scope;
}

export class ScopeComponent extends React.Component<ScopeComponentProps, ScopeComponentState> {
  constructor(props: ScopeComponentProps) {
    super(props);
    let scopeChoice: 'All' | 'Column' | 'DataType' = this.props.api.scopeApi.scopeIsAll(
      this.props.scope
    )
      ? 'All'
      : this.props.api.scopeApi.scopeHasColumns(this.props.scope)
      ? 'Column'
      : 'DataType';
    this.state = {
      ScopeChoice: scopeChoice,
      componentScope: this.props.scope,
    };
  }

  render() {
    return (
      <Panel header="Scope" margin={2} className="ab-ScopeComponent">
        <Flex flexDirection="column">
          <HelpBlock marginBottom={1}>
            Apply Scope for: Row, or one or more Columns, or one or more Data Types
          </HelpBlock>{' '}
          <Flex flexDirection="row" alignItems="center" padding={2}>
            <Radio
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
            <Box marginBottom={2} data-name="column-scope">
              <DualListBoxEditor
                style={{ flex: 1, overflow: 'hidden', height: '250px' }}
                AvailableValues={this.props.api.columnApi.getColumns().map(c => {
                  return c.FriendlyName;
                })}
                SelectedValues={this.props.api.columnApi.getFriendlyNamesFromColumnIds(
                  this.props.api.scopeApi
                    .getColumnsForScope(this.state.componentScope)
                    .map(c => c.ColumnId)
                )}
                HeaderAvailable="Columns"
                HeaderSelected="Columns In Style"
                onChange={SelectedValues => this.onColumnsSelectedChanged(SelectedValues)}
                DisplaySize={DisplaySize.Small}
              />
            </Box>
          )}
          {this.state.ScopeChoice == 'DataType' && (
            <Panel data-name="datatype-scope" variant="modern">
              <Flex flexDirection="row">
                <CheckBox
                  data-name="scope"
                  checked={
                    'DataTypes' in this.state.componentScope &&
                    this.props.api.scopeApi
                      .getDataTypesInScope(this.state.componentScope)
                      .includes('Date')
                  }
                  marginLeft={2}
                  onChange={(checked: boolean) => this.onCheckBoxDataTypeChecked(checked, 'Date')}
                >
                  Date
                </CheckBox>
                <CheckBox
                  data-name="scope"
                  checked={
                    'DataTypes' in this.state.componentScope &&
                    this.props.api.scopeApi
                      .getDataTypesInScope(this.state.componentScope)
                      .includes('Number')
                  }
                  marginLeft={4}
                  onChange={(checked: boolean) => this.onCheckBoxDataTypeChecked(checked, 'Number')}
                >
                  Number
                </CheckBox>
                <CheckBox
                  data-name="scope"
                  checked={
                    'DataTypes' in this.state.componentScope &&
                    this.props.api.scopeApi
                      .getDataTypesInScope(this.state.componentScope)
                      .includes('String')
                  }
                  marginLeft={4}
                  onChange={(checked: boolean) => this.onCheckBoxDataTypeChecked(checked, 'String')}
                >
                  String
                </CheckBox>
                <CheckBox
                  data-name="scope"
                  checked={
                    'DataTypes' in this.state.componentScope &&
                    this.props.api.scopeApi
                      .getDataTypesInScope(this.state.componentScope)
                      .includes('Boolean')
                  }
                  marginLeft={4}
                  onChange={(checked: boolean) =>
                    this.onCheckBoxDataTypeChecked(checked, 'Boolean')
                  }
                >
                  Boolean
                </CheckBox>
              </Flex>
            </Panel>
          )}
        </Flex>
      </Panel>
    );
  }
  private onScopeSelectChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    let newScope: Scope;
    let newScopeChoice: 'All' | 'Column' | 'DataType';
    if (e.value == 'Column') {
      newScope = {
        ColumnIds: [],
      };
      newScopeChoice = 'Column';
    } else if (e.value == 'DataType') {
      newScope = {
        DataTypes: [],
      };
      newScopeChoice = 'DataType';
    } else {
      newScope = {
        All: true,
      };
      newScopeChoice = 'All';
    }
    this.setState(
      { ScopeChoice: newScopeChoice, componentScope: newScope } as ScopeComponentState,
      () => this.forceUpdate()
    );
    this.props.updateScope(newScope);
  }

  private onColumnsSelectedChanged(columnFriendlyNames: string[]) {
    let cols = this.props.api.columnApi.getColumnIdsFromFriendlyNames(columnFriendlyNames);
    let newScope: Scope = {
      ColumnIds: cols,
    };
    this.setState(
      {
        componentScope: newScope,
      } as ScopeComponentState,
      () => this.forceUpdate()
    );
    //  this.updateScope();
    this.props.updateScope(newScope);
  }

  private onCheckBoxDataTypeChecked(checked: boolean, item: ScopeDataType) {
    let dataTypes = [].concat(
      this.props.api.scopeApi.getDataTypesInScope(this.state.componentScope)
    );
    if (checked) {
      dataTypes.push(item);
    } else {
      const index = dataTypes.indexOf(item, 0);
      if (index > -1) {
        dataTypes.splice(index, 1);
      }
    }
    let newScope: Scope = {
      DataTypes: dataTypes,
    };
    this.setState({ componentScope: newScope } as ScopeComponentState, () => this.forceUpdate());
    this.props.updateScope(newScope);
  }
}

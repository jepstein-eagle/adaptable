import * as React from 'react';

import { FontWeight, FontStyle, FontSize } from '../../PredefinedConfig/Common/Enums';
import { EnumExtensions } from '../../Utilities/Extensions/EnumExtensions';
import { ColorPicker } from '../ColorPicker';
import { AdaptablePopover } from '../AdaptablePopover';
import { Text, Flex, Box } from 'rebass';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { AdaptableStyle } from '../../PredefinedConfig/Common/AdaptableStyle';
import Checkbox from '../../components/CheckBox';
import Panel from '../../components/Panel';
import HelpBlock from '../../components/HelpBlock';
import Dropdown from '../../components/Dropdown';
import { CSSProperties } from 'react';
import { AdaptableApi } from '../../Api/AdaptableApi';
import FormLayout, { FormRow } from '../../components/FormLayout';
import { ScopeDataType, Scope } from '../../PredefinedConfig/Common/Scope';
import Radio from '../../components/Radio';
import { DualListBoxEditor, DisplaySize } from './ListBox/DualListBoxEditor';
import CheckBox from '../../components/CheckBox';

export interface ScopeComponentProps extends React.ClassAttributes<ScopeComponent> {
  api: AdaptableApi;
  scope: Scope;
  updateScope: (scope: Scope) => void;
  useAllDataTypes: boolean;
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
      <Panel header="Scope" margin={2}>
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
            <div>
              {this.props.useAllDataTypes == true ? (
                <Panel header="Data Types" margin={2} marginLeft={4}>
                  {' '}
                  <Flex flexDirection="row" padding={2}>
                    <CheckBox
                      checked={
                        'DataTypes' in this.state.componentScope &&
                        this.props.api.scopeApi
                          .getDataTypesInScope(this.state.componentScope)
                          .includes('Date')
                      }
                      marginLeft={2}
                      onChange={(checked: boolean) =>
                        this.onCheckBoxDataTypeChecked(checked, 'Date')
                      }
                    >
                      Date
                    </CheckBox>{' '}
                    <CheckBox
                      checked={
                        'DataTypes' in this.state.componentScope &&
                        this.props.api.scopeApi
                          .getDataTypesInScope(this.state.componentScope)
                          .includes('Number')
                      }
                      marginLeft={4}
                      onChange={(checked: boolean) =>
                        this.onCheckBoxDataTypeChecked(checked, 'Number')
                      }
                    >
                      Number
                    </CheckBox>{' '}
                    <CheckBox
                      checked={
                        'DataTypes' in this.state.componentScope &&
                        this.props.api.scopeApi
                          .getDataTypesInScope(this.state.componentScope)
                          .includes('String')
                      }
                      marginLeft={4}
                      onChange={(checked: boolean) =>
                        this.onCheckBoxDataTypeChecked(checked, 'String')
                      }
                    >
                      String
                    </CheckBox>{' '}
                    <CheckBox
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
                    </CheckBox>{' '}
                  </Flex>{' '}
                </Panel>
              ) : (
                <div>
                  <Panel header="Data Types" margin={2} marginLeft={4}>
                    {' '}
                    <Flex flexDirection="row" padding={2}>
                      <Radio
                        checked={
                          'DataTypes' in this.state.componentScope &&
                          this.props.api.scopeApi
                            .getDataTypesInScope(this.state.componentScope)
                            .includes('Date')
                        }
                        value="Date"
                        marginLeft={2}
                        onChange={(checked: boolean) =>
                          this.onRadioDataTypeChecked(checked, 'Date')
                        }
                      >
                        Date
                      </Radio>
                      <Radio
                        checked={
                          'DataTypes' in this.state.componentScope &&
                          this.props.api.scopeApi
                            .getDataTypesInScope(this.state.componentScope)
                            .includes('Number')
                        }
                        value="Number"
                        marginLeft={2}
                        onChange={(checked: boolean) =>
                          this.onRadioDataTypeChecked(checked, 'Number')
                        }
                      >
                        Number
                      </Radio>
                    </Flex>{' '}
                  </Panel>
                </div>
              )}
            </div>
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
    console.log('new scope', newScope);
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

  private onRadioDataTypeChecked(checked: boolean, item: ScopeDataType) {
    let e = event.target as HTMLInputElement;
    let newScope: Scope;
    if (e.value == 'Date') {
      newScope = {
        DataTypes: ['Date'],
      };
    } else if (e.value == 'Number') {
      newScope = {
        DataTypes: ['Number'],
      };
    }

    this.setState({ componentScope: newScope } as ScopeComponentState, () => this.forceUpdate());
    this.props.updateScope(newScope);
  }
}

import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { DualListBoxEditor, DisplaySize } from '../../Components/ListBox/DualListBoxEditor';
import { Report } from '../../../PredefinedConfig/ExportState';
import WizardPanel from '../../../components/WizardPanel';
import HelpBlock from '../../../components/HelpBlock';
import { ScopeDataType } from '../../../PredefinedConfig/Common/Scope';
import { Flex, Box } from 'rebass';
import Radio from '../../../components/Radio';
import Panel from '../../../components/Panel';
import CheckBox from '../../../components/CheckBox';

export interface ReportScopeWizardProps extends AdaptableWizardStepProps<Report> {}
export interface ReportScopeWizardState {
  ScopeChoice: 'All' | 'Column' | 'DataType';
  ColumnIds: string[];
  DataTypes: ScopeDataType[];
}

export class ReportScopeWizard
  extends React.Component<ReportScopeWizardProps, ReportScopeWizardState>
  implements AdaptableWizardStep {
  constructor(props: ReportScopeWizardProps) {
    super(props);

    let scopeChoice: 'All' | 'Column' | 'DataType' =
      this.props.data.Scope == undefined ||
      this.props.api.scopeApi.scopeIsAll(this.props.data.Scope)
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
            Scope: Include either All Columns, a selection of Columns, or one or more Data Types
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
                HeaderSelected="Columns In Report"
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
      } as ReportScopeWizardState,
      () => this.props.updateGoBackState()
    );
  }

  private onScopeSelectChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    if (e.value == 'Column') {
      this.setState({ ScopeChoice: 'Column', ColumnIds: [] } as ReportScopeWizardState, () =>
        this.props.updateGoBackState()
      );
    } else if (e.value == 'DataType') {
      this.setState(
        {
          ScopeChoice: 'DataType',
          DataTypes: [],
        } as ReportScopeWizardState,
        () => this.props.updateGoBackState()
      );
    } else {
      this.setState({ ScopeChoice: 'All' } as ReportScopeWizardState, () =>
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
    this.setState({ DataTypes: dataTypes } as ReportScopeWizardState, () =>
      this.props.updateGoBackState()
    );
  }

  public canNext(): boolean {
    return true;
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
    } else if (this.state.ScopeChoice == 'DataType') {
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

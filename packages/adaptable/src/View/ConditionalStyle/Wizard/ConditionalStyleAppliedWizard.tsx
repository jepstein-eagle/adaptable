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

export interface ConditionalStyleAppliedWizardProps
  extends AdaptableWizardStepProps<ConditionalStyle> {}

export interface ConditionalStyleAppliedWizardState {
  ColumnId: string;
  StyleApplied: 'Column' | 'Row'; //| 'DataType';
  ExcludeGroupedRows: boolean;
  // DataType?: 'String' | 'Number' | 'Boolean' | 'Date';
}

export class ConditionalStyleAppliedWizard
  extends React.Component<ConditionalStyleAppliedWizardProps, ConditionalStyleAppliedWizardState>
  implements AdaptableWizardStep {
  constructor(props: ConditionalStyleAppliedWizardProps) {
    super(props);
    this.state = {
      ColumnId: StringExtensions.IsNull(this.props.Data.ColumnId) ? '' : this.props.Data.ColumnId,
      StyleApplied: this.props.Data.StyleApplied,
      ExcludeGroupedRows: this.props.Data.ExcludeGroupedRows,
      //  DataType: this.props.Data.DataType,
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
        <Flex flexDirection="column" padding={2}>
          <HelpBlock marginBottom={1}>
            Apply the Conditional Style to ALL cells in each matching row.
          </HelpBlock>

          <Radio
            marginLeft={3}
            value="Row"
            checked={this.state.StyleApplied == 'Row'}
            onChange={(checked: boolean, e: React.SyntheticEvent) => this.onScopeSelectChanged(e)}
          >
            Whole Row
          </Radio>

          <HelpBlock marginBottom={1}>Apply the Conditional Style to a single Column</HelpBlock>

          <Radio
            marginLeft={3}
            value="Column"
            checked={this.state.StyleApplied == 'Column'}
            onChange={(checked: boolean, e: React.SyntheticEvent) => this.onScopeSelectChanged(e)}
          >
            Column
          </Radio>

          {this.state.StyleApplied == 'Column' && (
            <Box marginBottom={2}>
              <ColumnSelector
                SelectedColumnIds={[this.state.ColumnId]}
                ColumnList={this.props.Api.columnApi.getColumns()}
                onColumnChange={columns => this.onColumnSelectedChanged(columns)}
                SelectionMode={SelectionMode.Single}
              />
            </Box>
          )}

          {/*


          <HelpBlock marginBottom={1}>
            Apply the Conditional Style to Columns of a Datatype
          </HelpBlock>

          <Radio
            marginLeft={3}
            value="DataType"
            checked={this.state.ConditionalStyleApplied == 'DataType'}
            onChange={(checked: boolean, e: React.SyntheticEvent) => this.onScopeSelectChanged(e)}
          >
            Data Type
          </Radio>

          {this.state.ConditionalStyleApplied == 'DataType' && (
            <Box>
              <Dropdown
                placeholder="Select a Data Type"
                value={this.state.DataType}
                showEmptyItem={false}
                onChange={(value: any) => this.onDataTypeSelectedChanged(value)}
                options={[
                  {
                    label: 'Select',
                    value: 'select',
                  },
                  ...optionDataTypes,
                ]}
              />
            </Box>
          )}
*/}

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

      /*
      
          </Box>
          <Box >
          <HelpBlock marginBottom={2}>
          Pick the column from the list below which will have conditional style applied.
          </HelpBlock>
            <Radio
             
              value="Column"
              checked={this.state.ConditionalStyleApplied == 'Column'}
              onChange={(checked: boolean, e: React.SyntheticEvent) => this.onScopeSelectChanged(e)}
            >
              Column
            </Radio>{' '}
            
          </Box>

         
               </WizardPanel>
      </div>
      */
    );
  }

  private onColumnSelectedChanged(columns: AdaptableColumn[]) {
    this.setState(
      {
        ColumnId: columns.length > 0 ? columns[0].ColumnId : '',
      } as ConditionalStyleAppliedWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  /*
  private onDataTypeSelectedChanged(value: any) {
    this.setState({ DataType: value } as ConditionalStyleAppliedWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }
  */

  private onScopeSelectChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    if (e.value == 'Column') {
      this.setState({ StyleApplied: 'Column' } as ConditionalStyleAppliedWizardState, () =>
        this.props.UpdateGoBackState()
      );

      /*
    } else if (e.value == 'DataType') {
      this.setState(
        {
          ConditionalStyleApplied: 'DataType',
        } as ConditionalStyleAppliedWizardState,
        () => this.props.UpdateGoBackState()
      );
      */
    } else {
      this.setState(
        {
          StyleApplied: 'Row',
          ColumnId: '',
        } as ConditionalStyleAppliedWizardState,
        () => this.props.UpdateGoBackState()
      );
    }
  }

  private onExludeGroupedRowsChanged(checked: boolean) {
    this.setState({ ExcludeGroupedRows: checked } as ConditionalStyleAppliedWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    if (!this.state.StyleApplied == null) {
      return false;
    }
    if (this.state.StyleApplied == 'Column' && StringExtensions.IsEmpty(this.state.ColumnId)) {
      return false;
    }
    //   if (
    //     this.state.ConditionalStyleApplied == 'DataType' &&
    //     StringExtensions.IsNullOrEmpty(this.state.DataType)
    //   ) {
    //     return false;
    //   }

    return true;
  }

  public canBack(): boolean {
    return false;
  }
  public Next(): void {
    this.props.Data.ColumnId = this.state.ColumnId;
    this.props.Data.StyleApplied = this.state.StyleApplied;
    this.props.Data.ExcludeGroupedRows = this.state.ExcludeGroupedRows;
    //  this.props.Data.DataType =
    //    this.state.ConditionalStyleApplied == 'DataType' ? this.state.DataType : undefined;
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

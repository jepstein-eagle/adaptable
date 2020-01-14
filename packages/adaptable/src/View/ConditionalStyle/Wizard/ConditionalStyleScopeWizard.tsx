import * as React from 'react';

import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { SelectionMode } from '../../../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';

import { ColumnCategory } from '../../../PredefinedConfig/ColumnCategoryState';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';
import { ConditionalStyle } from '../../../PredefinedConfig/ConditionalStyleState';
import { Box, Flex, Text } from 'rebass';
import Radio from '../../../components/Radio';
import Dropdown from '../../../components/Dropdown';

import WizardPanel from '../../../components/WizardPanel';
import HelpBlock from '../../../components/HelpBlock';

export interface ConditionalStyleScopeWizardProps
  extends AdaptableWizardStepProps<ConditionalStyle> {
  ColumnCategories: Array<ColumnCategory>;
}

export interface ConditionalStyleScopeWizardState {
  ColumnId: string;
  ColumnCategoryId: string;
  ConditionalStyleScope: 'Column' | 'Row' | 'ColumnCategory'; //| 'DataType';
  // DataType?: 'String' | 'Number' | 'Boolean' | 'Date';
}

export class ConditionalStyleScopeWizard
  extends React.Component<ConditionalStyleScopeWizardProps, ConditionalStyleScopeWizardState>
  implements AdaptableWizardStep {
  constructor(props: ConditionalStyleScopeWizardProps) {
    super(props);
    this.state = {
      ColumnId: StringExtensions.IsNull(this.props.Data.ColumnId) ? '' : this.props.Data.ColumnId,
      ColumnCategoryId: StringExtensions.IsNull(this.props.Data.ColumnCategoryId)
        ? ''
        : this.props.Data.ColumnCategoryId,
      ConditionalStyleScope: this.props.Data.ConditionalStyleScope,
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

    let optionColumnCategorys = this.props.ColumnCategories.map(cc => {
      return {
        value: cc.ColumnCategoryId,
        label: cc.ColumnCategoryId,
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
            checked={this.state.ConditionalStyleScope == 'Row'}
            onChange={(checked: boolean, e: React.SyntheticEvent) => this.onScopeSelectChanged(e)}
          >
            Whole Row
          </Radio>

          <HelpBlock marginBottom={1}>Apply the Conditional Style to a single Column</HelpBlock>

          <Radio
            marginLeft={3}
            value="Column"
            checked={this.state.ConditionalStyleScope == 'Column'}
            onChange={(checked: boolean, e: React.SyntheticEvent) => this.onScopeSelectChanged(e)}
          >
            Column
          </Radio>

          {this.state.ConditionalStyleScope == 'Column' && (
            <Box marginBottom={2}>
              <ColumnSelector
                SelectedColumnIds={[this.state.ColumnId]}
                ColumnList={this.props.Columns}
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
            checked={this.state.ConditionalStyleScope == 'DataType'}
            onChange={(checked: boolean, e: React.SyntheticEvent) => this.onScopeSelectChanged(e)}
          >
            Data Type
          </Radio>

          {this.state.ConditionalStyleScope == 'DataType' && (
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
          {ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnCategories) && (
            <Box>
              <HelpBlock marginBottom={2}>
                Apply the Conditional Style to all the columns in a Column Category
              </HelpBlock>

              <Radio
                marginLeft={3}
                value="ColumnCategory"
                checked={this.state.ConditionalStyleScope == 'ColumnCategory'}
                onChange={(checked: boolean, e: React.SyntheticEvent) =>
                  this.onScopeSelectChanged(e)
                }
              >
                Column Category
              </Radio>
            </Box>
          )}

          {ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnCategories) &&
            this.state.ConditionalStyleScope == 'ColumnCategory' && (
              <Box>
                <Dropdown
                  placeholder="Select a Column Category"
                  value={this.state.ColumnCategoryId}
                  showEmptyItem={false}
                  onChange={(value: any) => this.onColumnCategorySelectedChanged(value)}
                  options={[
                    {
                      label: 'Select',
                      value: 'select',
                    },
                    ...optionColumnCategorys,
                  ]}
                />
              </Box>
            )}
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
              checked={this.state.ConditionalStyleScope == 'Column'}
              onChange={(checked: boolean, e: React.SyntheticEvent) => this.onScopeSelectChanged(e)}
            >
              Column
            </Radio>{' '}
            
          </Box>

         
          {ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnCategories) && (
             <HelpBlock marginBottom={2}>
            Pick the Column Category from the list below to apply the conditional style to all Column Categorys.
             </HelpBlock>
            <Box >
             {' '}
              <AdaptablePopover
               
                headerText={'Conditional Style: Column Categorys'}
                bodyText={[
                  'Pick the Column Category from the list below to apply the conditional style to all Column Categorys.',
                ]}
              />
            </Box>
          )}
          {ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnCategories) &&
            this.state.ConditionalStyleScope == 'ColumnCategory' && (
              
            )}
        </WizardPanel>
      </div>
      */
    );
  }

  private onColumnSelectedChanged(columns: AdaptableColumn[]) {
    this.setState(
      {
        ColumnId: columns.length > 0 ? columns[0].ColumnId : '',
      } as ConditionalStyleScopeWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  private onColumnCategorySelectedChanged(value: any) {
    this.setState({ ColumnCategoryId: value } as ConditionalStyleScopeWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  /*
  private onDataTypeSelectedChanged(value: any) {
    this.setState({ DataType: value } as ConditionalStyleScopeWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }
  */

  private onScopeSelectChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    if (e.value == 'Column') {
      this.setState({ ConditionalStyleScope: 'Column' } as ConditionalStyleScopeWizardState, () =>
        this.props.UpdateGoBackState()
      );
    } else if (e.value == 'ColumnCategory') {
      this.setState(
        {
          ConditionalStyleScope: 'ColumnCategory',
        } as ConditionalStyleScopeWizardState,
        () => this.props.UpdateGoBackState()
      );
      /*
    } else if (e.value == 'DataType') {
      this.setState(
        {
          ConditionalStyleScope: 'DataType',
        } as ConditionalStyleScopeWizardState,
        () => this.props.UpdateGoBackState()
      );
      */
    } else {
      this.setState(
        {
          ConditionalStyleScope: 'Row',
          ColumnId: '',
        } as ConditionalStyleScopeWizardState,
        () => this.props.UpdateGoBackState()
      );
    }
  }

  public canNext(): boolean {
    if (!this.state.ConditionalStyleScope == null) {
      return false;
    }
    if (
      this.state.ConditionalStyleScope == 'Column' &&
      StringExtensions.IsEmpty(this.state.ColumnId)
    ) {
      return false;
    }
    //   if (
    //     this.state.ConditionalStyleScope == 'DataType' &&
    //     StringExtensions.IsNullOrEmpty(this.state.DataType)
    //   ) {
    //     return false;
    //   }
    if (
      this.state.ConditionalStyleScope == 'ColumnCategory' &&
      StringExtensions.IsEmpty(this.state.ColumnCategoryId)
    ) {
      return false;
    }
    return true;
  }

  public canBack(): boolean {
    return false;
  }
  public Next(): void {
    this.props.Data.ColumnId = this.state.ColumnId;
    this.props.Data.ColumnCategoryId = this.state.ColumnCategoryId;
    this.props.Data.ConditionalStyleScope = this.state.ConditionalStyleScope;
    //  this.props.Data.DataType =
    //    this.state.ConditionalStyleScope == 'DataType' ? this.state.DataType : undefined;
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

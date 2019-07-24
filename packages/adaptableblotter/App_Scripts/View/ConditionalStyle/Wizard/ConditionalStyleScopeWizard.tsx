import * as React from 'react';

import { IColumn } from '../../../Utilities/Interface/IColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { ConditionalStyleScope, SelectionMode } from '../../../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { AdaptablePopover } from '../../AdaptablePopover';
import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';

import { ColumnCategory } from '../../../PredefinedConfig/RunTimeState/ColumnCategoryState';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';
import { ConditionalStyle } from '../../../PredefinedConfig/RunTimeState/ConditionalStyleState';
import { Box } from 'rebass';
import Radio from '../../../components/Radio';
import Dropdown from '../../../components/Dropdown';

import WizardPanel from '../../../components/WizardPanel';

export interface ConditionalStyleScopeWizardProps
  extends AdaptableWizardStepProps<ConditionalStyle> {
  ColumnCategories: Array<ColumnCategory>;
}

export interface ConditionalStyleScopeWizardState {
  ColumnId: string;
  ColumnCategoryId: string;
  ConditionalStyleScope: ConditionalStyleScope;
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
      ConditionalStyleScope: this.props.Data.ConditionalStyleScope as ConditionalStyleScope,
    };
  }

  render(): any {
    let cssClassName: string = this.props.cssClassName + '-scope';

    let optionColumnCategorys = this.props.ColumnCategories.map(cc => {
      return {
        value: cc.ColumnCategoryId,
        label: cc.ColumnCategoryId,
      };
    });

    return (
      <div className={cssClassName} style={{ height: '100%' }}>
        <WizardPanel header="Select Where the Conditional Style is Applied">
          <Box className="ab_large_margin">
            <Radio
              className={cssClassName + '__radiobutton'}
              value="Row"
              checked={this.state.ConditionalStyleScope == ConditionalStyleScope.Row}
              onChange={(checked: boolean, e: React.SyntheticEvent) => this.onScopeSelectChanged(e)}
            >
              Whole Row
            </Radio>{' '}
            <AdaptablePopover
              cssClassName={cssClassName}
              headerText={'Conditional Style: Whole Row'}
              bodyText={[
                'The conditional style will be applied to alls cells in each matching row.',
              ]}
            />
          </Box>
          <Box className="ab_large_margin">
            <Radio
              className={cssClassName + '__radiobutton'}
              value="Column"
              checked={this.state.ConditionalStyleScope == ConditionalStyleScope.Column}
              onChange={(checked: boolean, e: React.SyntheticEvent) => this.onScopeSelectChanged(e)}
            >
              Column
            </Radio>{' '}
            <AdaptablePopover
              cssClassName={cssClassName}
              headerText={'Conditional Style: Single Column'}
              bodyText={[
                'Pick the column from the list below which will have conditional style applied.',
              ]}
            />
          </Box>

          {this.state.ConditionalStyleScope == ConditionalStyleScope.Column && (
            <Box className="ab_large_margin">
              <ColumnSelector
                cssClassName={cssClassName}
                SelectedColumnIds={[this.state.ColumnId]}
                ColumnList={this.props.Columns}
                onColumnChange={columns => this.onColumnSelectedChanged(columns)}
                SelectionMode={SelectionMode.Single}
              />
            </Box>
          )}
          {ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnCategories) && (
            <Box className="ab_large_margin">
              <Radio
                className={cssClassName + '__radiobutton'}
                value="ColumnCategory"
                checked={this.state.ConditionalStyleScope == ConditionalStyleScope.ColumnCategory}
                onChange={(checked: boolean, e: React.SyntheticEvent) =>
                  this.onScopeSelectChanged(e)
                }
              >
                Column Category
              </Radio>{' '}
              <AdaptablePopover
                cssClassName={cssClassName}
                headerText={'Conditional Style: Column Categorys'}
                bodyText={[
                  'Pick the Column Category from the list below to apply the conditional style to all Column Categorys.',
                ]}
              />
            </Box>
          )}
          {ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnCategories) &&
            this.state.ConditionalStyleScope == ConditionalStyleScope.ColumnCategory && (
              <Box className="ab_large_margin">
                <Dropdown
                  placeholder="select"
                  value={this.state.ColumnCategoryId}
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
        </WizardPanel>
      </div>
    );
  }

  private onColumnSelectedChanged(columns: IColumn[]) {
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

  private onScopeSelectChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    if (e.value == 'Column') {
      this.setState(
        { ConditionalStyleScope: ConditionalStyleScope.Column } as ConditionalStyleScopeWizardState,
        () => this.props.UpdateGoBackState()
      );
    } else if (e.value == 'ColumnCategory') {
      this.setState(
        {
          ConditionalStyleScope: ConditionalStyleScope.ColumnCategory,
        } as ConditionalStyleScopeWizardState,
        () => this.props.UpdateGoBackState()
      );
    } else {
      this.setState(
        {
          ConditionalStyleScope: ConditionalStyleScope.Row,
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
      this.state.ConditionalStyleScope == ConditionalStyleScope.Column &&
      StringExtensions.IsEmpty(this.state.ColumnId)
    ) {
      return false;
    }
    if (
      this.state.ConditionalStyleScope == ConditionalStyleScope.ColumnCategory &&
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

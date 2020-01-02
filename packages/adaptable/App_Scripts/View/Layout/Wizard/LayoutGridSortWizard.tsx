import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';

import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { SortOrder, AccessLevel } from '../../../PredefinedConfig/Common/Enums';

import { GridSortRow } from '../GridSortRow';
import { IColItem } from '../../UIInterfaces';
import { AdaptableObjectCollection } from '../../Components/AdaptableObjectCollection';
import { ObjectFactory } from '../../../Utilities/ObjectFactory';

import { PanelWithButton } from '../../Components/Panels/PanelWithButton';
import { Layout } from '../../../PredefinedConfig/LayoutState';
import SimpleButton from '../../../components/SimpleButton';

import EmptyContent from '../../../components/EmptyContent';
import ArrayExtensions from '../../../Utilities/Extensions/ArrayExtensions';
import { ColumnSort } from '../../../PredefinedConfig/Common/ColumnSort';

export interface LayoutGridSortWizardProps extends AdaptableWizardStepProps<Layout> {
  SortableColumns: AdaptableColumn[];
}

export interface LayoutGridSortWizardState {
  ColumnSorts: ColumnSort[];
}

export class LayoutGridSortWizard
  extends React.Component<LayoutGridSortWizardProps, LayoutGridSortWizardState>
  implements AdaptableWizardStep {
  constructor(props: LayoutGridSortWizardProps) {
    super(props);

    this.state = {
      ColumnSorts: this.props.Data.ColumnSorts,
    };
  }
  render(): any {
    let addButton = (
      <SimpleButton
        icon="plus"
        iconPosition="start"
        variant="raised"
        tone="accent"
        onClick={() => this.addSort()}
      >
        Add Sort
      </SimpleButton>
    );

    let colItems: IColItem[] = [
      { Content: 'Column', Size: 4 },
      { Content: 'Sort Order', Size: 4 },
      { Content: '', Size: 4 },
    ];

    let gridSortRows = this.state.ColumnSorts.map((x, index) => {
      return (
        <GridSortRow
          key={index}
          AdaptableObject={null}
          colItems={colItems}
          Columns={this.props.SortableColumns}
          UserFilters={null}
          onEdit={null}
          onDeleteColumnSort={() => this.onDeleteGridSort(index)}
          onColumnSortColumnChanged={column => this.onColumnSelectedChanged(index, column)}
          onColumnSortOrderChanged={sortOrder => this.onSortOrderChanged(index, sortOrder)}
          onShare={null}
          TeamSharingActivated={false}
          onDeleteConfirm={null}
          ColumnSort={x}
          AccessLevel={AccessLevel.Full}
        />
      );
    });

    return (
      <PanelWithButton
        headerText={''}
        variant="default"
        button={addButton}
        bodyProps={{ padding: 0 }}
      >
        {gridSortRows.length > 0 ? (
          <AdaptableObjectCollection
            colItems={colItems}
            items={gridSortRows}
            allowOverflow={true}
          />
        ) : (
          <EmptyContent>
            <p>Click 'Add Sort' if you wish to add Column Sort Orders in this layout.</p>
          </EmptyContent>
        )}
      </PanelWithButton>
    );
  }

  addSort(): any {
    let sorts: ColumnSort[] = [].concat(
      this.state.ColumnSorts,
      ObjectFactory.CreateEmptyColumnSort()
    );
    this.setState({ ColumnSorts: sorts } as LayoutGridSortWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onColumnSelectedChanged(index: number, column: AdaptableColumn) {
    let sorts: ColumnSort[] = [].concat(this.state.ColumnSorts);
    let sort: ColumnSort = sorts[index];
    sort.Column = column ? column.ColumnId : '';
    this.setState({ ColumnSorts: sorts } as LayoutGridSortWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onSortOrderChanged(index: number, sortOrder: SortOrder) {
    let sorts: ColumnSort[] = [].concat(this.state.ColumnSorts);
    let sort: ColumnSort = sorts[index];
    sort.SortOrder = sortOrder;
    this.setState({ ColumnSorts: sorts } as LayoutGridSortWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onDeleteGridSort(index: number): any {
    let sorts: ColumnSort[] = [].concat(this.state.ColumnSorts);
    sorts.splice(index, 1);
    this.setState({ ColumnSorts: sorts } as LayoutGridSortWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    let canNext: boolean = true;
    this.state.ColumnSorts.forEach(gs => {
      if (StringExtensions.IsNullOrEmpty(gs.Column)) {
        canNext = false;
      }
    });
    return canNext;
  }

  public canBack(): boolean {
    return true;
  }

  public Next(): void {
    this.props.Data.ColumnSorts = ArrayExtensions.IsNotEmpty(this.state.ColumnSorts)
      ? this.state.ColumnSorts
      : [];
  }
  public Back(): void {
    // todo
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1; // some way of knowing to go back 2 steps?
  }
}

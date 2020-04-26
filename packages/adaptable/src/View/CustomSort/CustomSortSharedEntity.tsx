import * as React from 'react';
import { SharedEntityComponent } from '../Components/SharedProps/ConfigEntityRowProps';
import { CustomSort } from '../../PredefinedConfig/CustomSortState';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { Flex } from 'rebass';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';
import { AdaptableColumn } from '../../types';

export class CustomSortSharedEntity extends React.Component<
  SharedEntityComponent<CustomSortSharedEntity>,
  {}
> {
  render(): any {
    let customSort: CustomSort = this.props.Entity as CustomSort;

    return (
      <Flex flexDirection="row" alignItems="center">
        <Flex flex={4}>
          {ColumnHelper.getFriendlyNameFromColumnId(customSort.ColumnId, this.props.Columns)}
        </Flex>
        <Flex flex={8}>{this.getCustomSortedValues(customSort)}</Flex>
      </Flex>
    );
  }

  private getCustomSortedValues(customSort: CustomSort): any {
    if (ArrayExtensions.IsNotNullOrEmpty(customSort.SortedValues)) {
      return customSort.SortedValues.join(', ');
    } else {
      return 'Custom Sort uses a bespoke function';
    }
  }
}

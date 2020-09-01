import * as React from 'react';
import { SharedEntityComponent } from '../Components/SharedProps/ConfigEntityRowProps';
import { CustomSort } from '../../PredefinedConfig/CustomSortState';
import { Flex } from 'rebass';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';
import { AdaptableColumn } from '../../types';

export class CustomSortSharedEntity extends React.Component<
  SharedEntityComponent<CustomSortSharedEntity>,
  {}
> {
  render(): any {
    let customSort: CustomSort = this.props.entity as CustomSort;

    return (
      <Flex flexDirection="row" alignItems="center">
        <Flex flex={4}>
          {this.props.api.columnApi.getFriendlyNameFromColumnId(customSort.ColumnId)}
        </Flex>
        <Flex flex={8}>{this.getCustomSortedValues(customSort)}</Flex>
      </Flex>
    );
  }

  private getCustomSortedValues(customSort: CustomSort): any {
    if (ArrayExtensions.IsNotNullOrEmpty(customSort.SortedValues)) {
      return customSort.SortedValues.join(', ');
    } else {
      return '[Has bespoke Custom Sort implementing using bespoke function]';
    }
  }
}

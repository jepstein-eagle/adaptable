import * as React from 'react';
import { SharedEntityComponent } from '../Components/SharedProps/ConfigEntityRowProps';
import { AdvancedSearch } from '../../PredefinedConfig/AdvancedSearchState';
import { Flex } from 'rebass';
import ExpressionHelper from '../../Utilities/Helpers/ExpressionHelper';
import { AdaptableColumn } from '../../types';

export class AdvancedSearchSharedEntity extends React.Component<
  SharedEntityComponent<AdvancedSearchSharedEntity>,
  {}
> {
  render(): any {
    let search: AdvancedSearch = this.props.Entity as AdvancedSearch;
    let expressionString = ExpressionHelper.ConvertExpressionToString(
      search.Expression,
      this.props.Columns
    );
    return (
      <Flex flexDirection="row" alignItems="center">
        <Flex flex={4}>{search.Name}</Flex>
        <Flex flex={8}>{expressionString}</Flex>
      </Flex>
    );
  }
}

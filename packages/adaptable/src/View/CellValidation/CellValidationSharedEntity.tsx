import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { SharedEntityComponent } from '../Components/SharedProps/ConfigEntityRowProps';
import { CellValidationRule } from '../../PredefinedConfig/CellValidationState';
import { Flex } from 'rebass';

interface CellValidationSharedEntityPopupProps
  extends SharedEntityComponent<CellValidationSharedEntity> {}

export class CellValidationSharedEntity extends React.Component<
  CellValidationSharedEntityPopupProps,
  {}
> {
  render(): any {
    let cellVal: CellValidationRule = this.props.Entity as CellValidationRule;

    return (
      <Flex flexDirection="row" alignItems="center">
        <Flex flex={4}>{this.props.Api.gridApi.getFriendlyNameFromColumnId(cellVal.ColumnId)}</Flex>
        <Flex flex={4}>
          {this.props.Api.internalApi
            .getValidationService()
            .createCellValidationDescription(cellVal, this.props.Api.gridApi.getColumns())}
        </Flex>
        <Flex flex={4}>
          {ExpressionHelper.IsNotNullOrEmptyExpression(cellVal.Expression)
            ? 'and Expression:' +
              ExpressionHelper.ConvertExpressionToString(cellVal.Expression, this.props.Api)
            : ''}
        </Flex>
      </Flex>
    );
  }
}

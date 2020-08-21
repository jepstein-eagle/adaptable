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

    let expression = this.props.Api.sharedQueryApi.getExpressionForQueryObject(cellVal);
    let expressionString: string = expression ? expression : 'No Expression';

    return (
      <Flex flexDirection="row" alignItems="center">
        <Flex flex={4}>
          {this.props.Api.columnApi.getFriendlyNameFromColumnId(cellVal.ColumnId)}
        </Flex>
        <Flex flex={4}>
          {this.props.Api.internalApi
            .getValidationService()
            .createCellValidationDescription(cellVal, this.props.Api.columnApi.getColumns())}
        </Flex>
        <Flex flex={4}>{expressionString}</Flex>
      </Flex>
    );
  }
}

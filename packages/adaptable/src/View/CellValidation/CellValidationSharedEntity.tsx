import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
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
    let cellVal: CellValidationRule = this.props.entity as CellValidationRule;

    let expression = this.props.api.queryApi.getExpressionForQueryObject(cellVal);
    let expressionString: string = expression ? expression : 'No Expression';

    return (
      <Flex flexDirection="row" alignItems="center">
        <Flex flex={4}>{this.props.api.scopeApi.getScopeToString(cellVal.Scope)}</Flex>
        <Flex flex={4}>
          {this.props.api.internalApi
            .getValidationService()
            .createCellValidationDescription(cellVal)}
        </Flex>
        <Flex flex={4}>{expressionString}</Flex>
      </Flex>
    );
  }
}

import * as React from 'react';
import { IColItem } from '../UIInterfaces';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { Helper } from '../../Utilities/Helpers/Helper';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { ICellSummmary } from '../../Utilities/Interface/SelectedCell/ICellSummmary';

import { Text } from 'rebass';
import {
  CellSummaryOperation,
  CellSummaryOptionalOperation,
} from '../../PredefinedConfig/Common/Enums';

import HelpBlock from '../../components/HelpBlock';

interface CellSummaryDetailsProps extends React.ClassAttributes<CellSummaryDetails> {
  CellSummary: ICellSummmary;
}

export class CellSummaryDetails extends React.Component<CellSummaryDetailsProps, {}> {
  render() {
    let cssClassName: string = '';
    let colItems: IColItem[] = [{ Content: 'Operation', Size: 4 }, { Content: 'Value', Size: 8 }];

    let rowElements: any[] = [];
    if (this.props.CellSummary != null) {
      rowElements.push(
        this.createRow(colItems, CellSummaryOperation.Sum, this.props.CellSummary.Sum, cssClassName)
      );
      rowElements.push(
        this.createRow(
          colItems,
          CellSummaryOperation.Average,
          this.props.CellSummary.Average,
          cssClassName
        )
      );
      rowElements.push(
        this.createRow(
          colItems,
          CellSummaryOperation.Median,
          this.props.CellSummary.Median,
          cssClassName
        )
      );
      rowElements.push(
        this.createRow(
          colItems,
          CellSummaryOperation.Distinct,
          this.props.CellSummary.Distinct,
          cssClassName
        )
      );
      rowElements.push(
        this.createRow(colItems, CellSummaryOperation.Max, this.props.CellSummary.Max, cssClassName)
      );
      rowElements.push(
        this.createRow(colItems, CellSummaryOperation.Min, this.props.CellSummary.Min, cssClassName)
      );
      rowElements.push(
        this.createRow(
          colItems,
          CellSummaryOperation.Count,
          this.props.CellSummary.Count,
          cssClassName
        )
      );
      if (this.props.CellSummary.Only != null) {
        rowElements.push(
          this.createRow(
            colItems,
            CellSummaryOptionalOperation.Only,
            this.props.CellSummary.Only,
            cssClassName
          )
        );
      }
      if (this.props.CellSummary.VWAP != null) {
        rowElements.push(
          this.createRow(
            colItems,
            CellSummaryOptionalOperation.VWAP,
            this.props.CellSummary.VWAP,
            cssClassName
          )
        );
      }
    }

    return (
      <div className={cssClassName + StyleConstants.ITEMS_TABLE}>
        <PanelWithRow cssClassName={cssClassName} colItems={colItems} bsStyle="info" />
        {this.props.CellSummary != null ? (
          <div className={cssClassName + StyleConstants.ITEMS_TABLE_BODY}>{rowElements}</div>
        ) : (
          <HelpBlock>
            <p>No cells are selected - please select some cells.</p>
          </HelpBlock>
        )}
      </div>
    );
  }

  private createRow(colItems: IColItem[], key: any, value: any, cssClassName: string): any {
    let rowColItems: IColItem[] = Helper.cloneObject(colItems);
    rowColItems[0].Content = key;
    rowColItems[1].Content = value;
    let rowElement = (
      <AdaptableObjectRow cssClassName={cssClassName} key={key} colItems={rowColItems} />
    );
    return rowElement;
  }
}

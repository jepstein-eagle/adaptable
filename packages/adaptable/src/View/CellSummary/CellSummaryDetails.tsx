import * as React from 'react';
import { IColItem } from '../UIInterfaces';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { Helper } from '../../Utilities/Helpers/Helper';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { CellSummmary } from '../../Utilities/Interface/Selection/CellSummmary';
import EmptyContent from '../../components/EmptyContent';

interface CellSummaryDetailsProps extends React.ClassAttributes<CellSummaryDetails> {
  CellSummary: CellSummmary;
}

export class CellSummaryDetails extends React.Component<CellSummaryDetailsProps, {}> {
  render() {
    let colItems: IColItem[] = [{ Content: 'Operation', Size: 5 }, { Content: 'Value', Size: 7 }];

    let rowElements: any[] = [];
    if (this.props.CellSummary != null) {
      Object.keys(this.props.CellSummary).forEach((operationName: string) => {
        rowElements.push(
          this.createRow(colItems, operationName, this.props.CellSummary[operationName])
        );
      });
    }

    return (
      <div>
        <PanelWithRow colItems={colItems} />
        {this.props.CellSummary != null ? (
          <div>{rowElements}</div>
        ) : (
          <EmptyContent>
            <p>No cells are selected - please select some cells.</p>
          </EmptyContent>
        )}
      </div>
    );
  }

  private createRow(colItems: IColItem[], key: any, value: any): any {
    let rowColItems: IColItem[] = Helper.cloneObject(colItems);
    rowColItems[0].Content = key;
    rowColItems[1].Content = value;
    let rowElement = (
      <AdaptableObjectRow style={{ minWidth: 185 }} key={key} colItems={rowColItems} />
    );
    return rowElement;
  }
}

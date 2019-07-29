import * as React from 'react';
import { ICellSummmary } from '../../Utilities/Interface/SelectedCell/ICellSummmary';
import { CellSummaryDetails } from './CellSummaryDetails';

export interface CellSummaryPopoverProps extends React.ClassAttributes<CellSummaryPopover> {
  cssClassName: string;
  CellSummary: ICellSummmary;
}

export class CellSummaryPopover extends React.Component<CellSummaryPopoverProps, {}> {
  render(): any {
    return <CellSummaryDetails CellSummary={this.props.CellSummary} />;
  }
}

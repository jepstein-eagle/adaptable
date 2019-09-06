import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ICellRendererParams, ICellRendererFunc } from 'ag-grid-community';
import SparklineChart from '../components/SparklineChart';
import {
  SparklineColumn,
  SparklineTypeEnum,
} from '../PredefinedConfig/DesignTimeState/SparklineColumnState';

export const getSparklineRendererForColumn = (
  sparklineColumn: SparklineColumn
): ICellRendererFunc => {
  const SparklineRenderer: ICellRendererFunc = (): HTMLElement | string => '';

  const renderSparkline = (params: ICellRendererParams): React.ReactElement => {
    const min = sparklineColumn.MinimumValue;
    const max = sparklineColumn.MaximumValue;

    return (
      <SparklineChart
        type={sparklineColumn.SparklineType as SparklineTypeEnum}
        min={min}
        max={max}
        values={params.value}
        width={params.column.getActualWidth() - 5} // TODO - replace
        height={params.node.rowHeight - 5} // TODO - replace
      />
    );
  };

  SparklineRenderer.prototype.init = function(params: ICellRendererParams) {
    const el = document.createElement('div');

    this.eGui = el;

    ReactDOM.render(renderSparkline(params), this.eGui);
  };

  SparklineRenderer.prototype.getGui = function() {
    return this.eGui;
  };

  SparklineRenderer.prototype.refresh = function(params: ICellRendererParams) {
    ReactDOM.render(renderSparkline(params), this.eGui);
    return true;
  };

  return SparklineRenderer;
};

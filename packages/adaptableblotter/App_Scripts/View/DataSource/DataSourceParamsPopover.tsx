import * as React from 'react';
import { Panel } from 'react-bootstrap';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { DataSourceParams } from '../../PredefinedConfig/RunTimeState/DataSourceState';

export interface DataSourceParamsPopoverProps
  extends React.ClassAttributes<DataSourceParamsPopover> {
  cssClassName: string;
  dataSourceParams: DataSourceParams[];
}

export class DataSourceParamsPopover extends React.Component<DataSourceParamsPopoverProps, {}> {
  render(): any {
    let cssClassName: string = this.props.cssClassName + StyleConstants.CELL_SUMMARY;

    return (
      <div className={cssClassName}>
        <Panel header={''} bsStyle="info" className="ab_preview_panel">
          <span>Going to put Data Source Params here</span>
        </Panel>
      </div>
    );
  }
}

import * as React from 'react';

import { DataSourceParams } from '../../PredefinedConfig/RunTimeState/DataSourceState';
import Panel from '../../components/Panel';

export interface DataSourceParamsPopoverProps
  extends React.ClassAttributes<DataSourceParamsPopover> {
  cssClassName: string;
  dataSourceParams: DataSourceParams[];
}

export class DataSourceParamsPopover extends React.Component<DataSourceParamsPopoverProps, {}> {
  render(): any {
    return <Panel header={''}>Going to put Data Source Params here</Panel>;
  }
}

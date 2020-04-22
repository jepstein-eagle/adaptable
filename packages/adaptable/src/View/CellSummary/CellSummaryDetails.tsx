import * as React from 'react';
import { IColItem } from '../UIInterfaces';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { Helper } from '../../Utilities/Helpers/Helper';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { CellSummmary } from '../../PredefinedConfig/Selection/CellSummmary';
import EmptyContent from '../../components/EmptyContent';

import { DataSource, GridFactory } from '@adaptabletools/grid';

interface CellSummaryDetailsProps extends React.ClassAttributes<CellSummaryDetails> {
  CellSummary: CellSummmary;
}

type OperationAndValue = {
  Operation: string;
  Value: any;
};

const Grid = GridFactory<OperationAndValue>();

export class CellSummaryDetails extends React.Component<CellSummaryDetailsProps, {}> {
  render() {
    let data: OperationAndValue[] = [];
    if (this.props.CellSummary != null) {
      data = Object.keys(this.props.CellSummary).map((operationName: string) => {
        return {
          Operation: operationName,
          Value: this.props.CellSummary[operationName],
        };
      });
    }

    return (
      <>
        {this.props.CellSummary != null ? (
          <DataSource<OperationAndValue>
            data={data}
            fields={['Operation', 'Value']}
            primaryKey="Operation"
          >
            <Grid
              domProps={{
                style: {
                  height: '100%',
                  minWidth: '15rem',
                  minHeight: '20rem',
                },
              }}
              columns={[
                { field: 'Operation', flex: 1 },
                { field: 'Value', flex: 1 },
              ]}
            ></Grid>
          </DataSource>
        ) : (
          <EmptyContent>
            <p>No cells are selected - please select some cells.</p>
          </EmptyContent>
        )}
      </>
    );
  }
}

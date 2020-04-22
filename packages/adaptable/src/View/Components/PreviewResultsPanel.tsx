import * as React from 'react';
import { MessageType } from '../../PredefinedConfig/Common/Enums';
import { AdaptablePopover } from '../AdaptablePopover';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { UserFilter } from '../../PredefinedConfig/UserFilterState';
import { IPreviewInfo, IPreviewResult } from '../../Utilities/Interface/IPreview';
import { CellValidationRule } from '../../PredefinedConfig/CellValidationState';

import { DataSource, GridFactory } from '@adaptabletools/grid';

import Table from '../../components/Table';
import CheckIcon from '../../components/icons/check';
import UIHelper from '../UIHelper';
import Panel from '../../components/Panel';
import { IValidationService } from '../../Utilities/Services/Interface/IValidationService';

type PreviewDataItem = {
  Id: number;
  InitialValue: number;
  ComputedValue: number;
  ValidInfo: React.ReactNode;
};

const Grid = GridFactory<PreviewDataItem>();

export interface PreviewResultsPanelProps extends React.ClassAttributes<PreviewResultsPanel> {
  PreviewInfo: IPreviewInfo;
  Columns: AdaptableColumn[];
  UserFilters: UserFilter[];
  SelectedColumn: AdaptableColumn;
  ShowPanel: boolean;
  style?: React.CSSProperties;
  ShowHeader: boolean;
  ValidationService: IValidationService;
}

export class PreviewResultsPanel extends React.Component<PreviewResultsPanelProps, {}> {
  render(): any {
    let previewHeader: string =
      this.props.ShowHeader && this.props.PreviewInfo != null
        ? 'Preview Results: ' +
          (this.props.SelectedColumn ? this.props.SelectedColumn.FriendlyName : '')
        : '';

    let successColor = UIHelper.getColorByMessageType(MessageType.Success);

    const dataSource: PreviewDataItem[] = this.props.PreviewInfo.PreviewResults.map(
      (previewResult, index) => {
        return {
          Id: index,
          InitialValue: previewResult.InitialValue,
          ComputedValue: previewResult.ComputedValue,
          ValidInfo:
            previewResult.ValidationRules.length > 0 ? (
              <>
                {this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent == true && (
                  <AdaptablePopover
                    showEvent="mouseenter"
                    hideEvent="mouseleave"
                    headerText={'Validation Error'}
                    bodyText={[
                      this.getValidationErrorMessage(
                        previewResult.ValidationRules,
                        this.props.Columns
                      ),
                    ]}
                    MessageType={MessageType.Error}
                  />
                )}
                {this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning == true && (
                  <AdaptablePopover
                    showEvent="mouseenter"
                    hideEvent="mouseleave"
                    headerText={'Validation Error'}
                    bodyText={[
                      this.getValidationErrorMessage(
                        previewResult.ValidationRules,
                        this.props.Columns
                      ),
                    ]}
                    MessageType={MessageType.Warning}
                  />
                )}
              </>
            ) : (
              <>
                {' '}
                <CheckIcon style={{ color: successColor, fill: 'currentColor' }} />
              </>
            ),
        };
      }
    );

    return this.props.ShowPanel ? (
      <Panel
        header={previewHeader}
        style={{ flex: 1 }}
        bodyProps={{
          style: {
            padding: 0,
            display: 'flex',
            flexFlow: 'column',
            minWidth: '15rem',
            minHeight: '20rem',
          },
        }}
      >
        <DataSource<PreviewDataItem>
          data={dataSource}
          primaryKey="Id"
          fields={['ComputedValue', 'InitialValue', 'ValidInfo', 'Id']}
        >
          <Grid
            sortable={false}
            domProps={{
              style: { flex: 1 },
            }}
            rowHeight={35}
            columns={[
              { field: 'InitialValue', flex: 1, header: 'Current', align: 'center' },
              { field: 'ComputedValue', flex: 1, header: 'New', align: 'center' },
              { field: 'ValidInfo', width: 60, header: 'Valid', align: 'center' },
            ]}
          ></Grid>
        </DataSource>
      </Panel>
    ) : null;
  }

  private getValidationErrorMessage(
    CellValidations: CellValidationRule[],
    columns: AdaptableColumn[]
  ): string {
    let returnString: string[] = [];
    for (let CellValidation of CellValidations) {
      let expressionDescription: string = ExpressionHelper.IsNotNullOrEmptyExpression(
        CellValidation.Expression
      )
        ? ' when ' +
          ExpressionHelper.ConvertExpressionToString(CellValidation.Expression, this.props.Columns)
        : '';
      returnString.push(
        this.props.ValidationService.createCellValidationDescription(CellValidation, columns) +
          expressionDescription
      );
    }
    return returnString.join('\n');
  }
}

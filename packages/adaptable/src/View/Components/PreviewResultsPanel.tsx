import * as React from 'react';
import { MessageType } from '../../PredefinedConfig/Common/Enums';
import { AdaptablePopover } from '../AdaptablePopover';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { CellValidationRule } from '../../PredefinedConfig/CellValidationState';
import { DataSource, GridFactory } from '@adaptabletools/grid';
import CheckIcon from '../../components/icons/check';
import UIHelper from '../UIHelper';
import Panel from '../../components/Panel';
import { IValidationService } from '../../Utilities/Services/Interface/IValidationService';
import { AdaptableApi } from '../../Api/AdaptableApi';

type PreviewDataItem = {
  Id: number;
  InitialValue: number;
  ComputedValue: number;
  ValidInfo: React.ReactNode;
};

const Grid = GridFactory<PreviewDataItem>();

export interface PreviewResultsPanelProps extends React.ClassAttributes<PreviewResultsPanel> {
  previewInfo: IPreviewInfo;
  api: AdaptableApi;
  selectedColumn: AdaptableColumn;
  showPanel: boolean;
  style?: React.CSSProperties;
  showHeader: boolean;
}

export class PreviewResultsPanel extends React.Component<PreviewResultsPanelProps, {}> {
  render(): any {
    let previewHeader: string =
      this.props.showHeader && this.props.previewInfo != null
        ? 'Preview Results: ' +
          (this.props.selectedColumn ? this.props.selectedColumn.FriendlyName : '')
        : '';

    let successColor = UIHelper.getColorByMessageType(MessageType.Success);

    const dataSource: PreviewDataItem[] = this.props.previewInfo.PreviewResults.map(
      (previewResult, index) => {
        return {
          Id: index,
          InitialValue: previewResult.InitialValue,
          ComputedValue: previewResult.ComputedValue,
          ValidInfo:
            previewResult.ValidationRules.length > 0 ? (
              <>
                {this.props.previewInfo.PreviewValidationSummary.HasValidationPrevent == true && (
                  <AdaptablePopover
                    showEvent="mouseenter"
                    hideEvent="mouseleave"
                    headerText={'Validation Error'}
                    bodyText={[this.getValidationErrorMessage(previewResult.ValidationRules)]}
                    MessageType={MessageType.Error}
                  />
                )}
                {this.props.previewInfo.PreviewValidationSummary.HasValidationWarning == true && (
                  <AdaptablePopover
                    showEvent="mouseenter"
                    hideEvent="mouseleave"
                    headerText={'Validation Error'}
                    bodyText={[this.getValidationErrorMessage(previewResult.ValidationRules)]}
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

    return this.props.showPanel ? (
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

  private getValidationErrorMessage(cellValidations: CellValidationRule[]): string {
    let columns = this.props.api.columnApi.getColumns();
    let validationService: IValidationService = this.props.api.internalApi.getValidationService();
    let returnString: string[] = [];
    for (let cellValidation of cellValidations) {
      let expression: string | undefined = this.props.api.queryApi.getExpressionForQueryObject(
        cellValidation
      );

      let expressionDescription: string = expression ? ' when ' + expression : '';
      returnString.push(
        validationService.createCellValidationDescription(cellValidation) + expressionDescription
      );
    }
    return returnString.join('\n');
  }
}

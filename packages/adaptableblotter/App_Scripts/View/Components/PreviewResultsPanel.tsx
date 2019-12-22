import * as React from 'react';
import { MessageType } from '../../PredefinedConfig/Common/Enums';
import { AdaptablePopover } from '../AdaptablePopover';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { UserFilter } from '../../PredefinedConfig/UserFilterState';
import { IPreviewInfo, IPreviewResult } from '../../Utilities/Interface/IPreview';
import { CellValidationRule } from '../../PredefinedConfig/CellValidationState';

import Table from '../../components/Table';
import CheckIcon from '../../components/icons/check';
import UIHelper from '../UIHelper';
import Panel from '../../components/Panel';
import { IValidationService } from '../../Utilities/Services/Interface/IValidationService';

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

    var previewItems = this.props.PreviewInfo.PreviewResults.map(
      (previewResult: IPreviewResult, index: number) => {
        return (
          <tr key={index}>
            <td>{previewResult.InitialValue}</td>
            <td>{previewResult.ComputedValue}</td>
            {previewResult.ValidationRules.length > 0 ? (
              <td style={{ textAlign: 'center' }}>
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
              </td>
            ) : (
              <td style={{ textAlign: 'center' }}>
                {' '}
                <CheckIcon style={{ color: successColor, fill: 'currentColor' }} />
              </td>
            )}
          </tr>
        );
      }
    );
    var header = (
      <thead>
        <tr>
          <th>Old</th>
          <th>New</th>
          <th style={{ width: '10%' }}>Valid</th>
        </tr>
      </thead>
    );

    return (
      <div style={{ flex: 1, overflow: 'auto', ...this.props.style }}>
        {this.props.ShowPanel && (
          <Panel header={previewHeader} bodyScroll>
            <Table style={{ width: '100%' }}>
              {header}
              <tbody style={{ minWidth: 500 }}>{previewItems}</tbody>
            </Table>
          </Panel>
        )}
      </div>
    );
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
